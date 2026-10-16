-- ============================================================================
-- Meu Gestar — Fase 2: cadastro, caderneta digital e lembretes
-- Como usar: Supabase → SQL Editor → New query → cole este arquivo → Run.
-- Pode rodar de novo sem problema (usa "if not exists" / "or replace").
--
-- Regra de ouro: cada gestante só vê e altera os PRÓPRIOS dados (RLS).
-- O acesso da equipe da UBS virá na Fase 3, com consentimento próprio.
-- ============================================================================

-- ─── Perfil da usuária ──────────────────────────────────────────────────────
create table if not exists public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null check (char_length(nome) between 2 and 120),
  data_nascimento date,
  telefone text check (telefone is null or char_length(telefone) <= 20),
  ubs text check (ubs is null or char_length(ubs) <= 120),
  papel text not null default 'gestante'
    check (papel in ('gestante', 'familiar', 'profissional', 'admin')),
  -- LGPD: quando e qual versão do termo a usuária aceitou.
  consentimento_em timestamptz not null,
  consentimento_versao text not null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- ─── Dados da gestação (uma gestação atual por usuária, nesta versão) ───────
create table if not exists public.gestacoes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  dum date,                                -- data da última menstruação
  dpp_ultrassom date,                      -- DPP informada pelo ultrassom, se houver
  gestacoes smallint check (gestacoes between 0 and 30),
  partos smallint check (partos between 0 and 30),
  abortos smallint check (abortos between 0 and 30),
  alto_risco boolean not null default false,
  atualizado_em timestamptz not null default now()
);

-- ─── Registros da caderneta ─────────────────────────────────────────────────
create table if not exists public.consultas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  data date not null,
  peso_kg numeric(5, 1) check (peso_kg is null or peso_kg between 25 and 300),
  pa_sistolica smallint check (pa_sistolica is null or pa_sistolica between 50 and 260),
  pa_diastolica smallint check (pa_diastolica is null or pa_diastolica between 30 and 180),
  bcf smallint check (bcf is null or bcf between 50 and 240), -- batimentos do bebê
  observacoes text check (observacoes is null or char_length(observacoes) <= 1000),
  criado_em timestamptz not null default now()
);

create table if not exists public.exames (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  nome text not null check (char_length(nome) between 1 and 120),
  data date not null,
  resultado text check (resultado is null or char_length(resultado) <= 500),
  observacoes text check (observacoes is null or char_length(observacoes) <= 1000),
  criado_em timestamptz not null default now()
);

create table if not exists public.vacinas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  vacina text not null check (char_length(vacina) between 1 and 120),
  data_dose date not null,
  proxima_dose date,
  observacoes text check (observacoes is null or char_length(observacoes) <= 1000),
  criado_em timestamptz not null default now()
);

create table if not exists public.ultrassons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  data date not null,
  ig_semanas smallint check (ig_semanas is null or ig_semanas between 0 and 44),
  ig_dias smallint check (ig_dias is null or ig_dias between 0 and 6),
  resultado text check (resultado is null or char_length(resultado) <= 500),
  observacoes text check (observacoes is null or char_length(observacoes) <= 1000),
  criado_em timestamptz not null default now()
);

-- Itens marcados nos checklists (mala da maternidade etc.).
create table if not exists public.checklist_marcados (
  user_id uuid not null references auth.users (id) on delete cascade,
  checklist_id text not null check (char_length(checklist_id) <= 80),
  item text not null check (char_length(item) <= 300),
  marcado_em timestamptz not null default now(),
  primary key (user_id, checklist_id, item)
);

create index if not exists consultas_user_data_idx on public.consultas (user_id, data desc);
create index if not exists exames_user_data_idx on public.exames (user_id, data desc);
create index if not exists vacinas_user_data_idx on public.vacinas (user_id, data_dose desc);
create index if not exists ultrassons_user_data_idx on public.ultrassons (user_id, data desc);

-- ─── Segurança: Row Level Security ──────────────────────────────────────────
alter table public.perfis enable row level security;
alter table public.gestacoes enable row level security;
alter table public.consultas enable row level security;
alter table public.exames enable row level security;
alter table public.vacinas enable row level security;
alter table public.ultrassons enable row level security;
alter table public.checklist_marcados enable row level security;

-- Perfil: a usuária lê e edita o próprio. Ela NÃO pode mudar o próprio papel
-- nem o registro de consentimento (ver gatilho logo abaixo).
drop policy if exists "perfil: ler o próprio" on public.perfis;
create policy "perfil: ler o próprio" on public.perfis
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "perfil: editar o próprio" on public.perfis;
create policy "perfil: editar o próprio" on public.perfis
  for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Tabelas da caderneta: tudo restrito à dona dos dados.
do $$
declare
  t text;
begin
  foreach t in array array['gestacoes', 'consultas', 'exames', 'vacinas', 'ultrassons', 'checklist_marcados']
  loop
    execute format('drop policy if exists "dona: tudo" on public.%I', t);
    execute format(
      'create policy "dona: tudo" on public.%I for all to authenticated
         using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)',
      t
    );
  end loop;
end
$$;

-- Impede que a usuária altere o próprio papel ou o consentimento pela API.
create or replace function public.proteger_campos_do_perfil()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select auth.role()) = 'authenticated' then
    new.papel := old.papel;
    new.consentimento_em := old.consentimento_em;
    new.consentimento_versao := old.consentimento_versao;
  end if;
  new.atualizado_em := now();
  return new;
end;
$$;

drop trigger if exists proteger_campos_do_perfil on public.perfis;
create trigger proteger_campos_do_perfil
  before update on public.perfis
  for each row execute function public.proteger_campos_do_perfil();

-- ─── Cadastro: cria o perfil quando a conta é criada ────────────────────────
-- Os dados vêm do formulário de cadastro (options.data no signUp).
-- Sem consentimento registrado, o cadastro é recusado.
create or replace function public.criar_perfil_no_cadastro()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce(new.raw_user_meta_data ->> 'consentimento_versao', '') = '' then
    raise exception 'Cadastro sem consentimento LGPD';
  end if;

  insert into public.perfis (id, nome, telefone, ubs, consentimento_em, consentimento_versao)
  values (
    new.id,
    new.raw_user_meta_data ->> 'nome',
    nullif(new.raw_user_meta_data ->> 'telefone', ''),
    nullif(new.raw_user_meta_data ->> 'ubs', ''),
    now(),
    new.raw_user_meta_data ->> 'consentimento_versao'
  );

  insert into public.gestacoes (user_id, dum)
  values (new.id, nullif(new.raw_user_meta_data ->> 'dum', '')::date);

  return new;
end;
$$;

drop trigger if exists criar_perfil_no_cadastro on auth.users;
create trigger criar_perfil_no_cadastro
  after insert on auth.users
  for each row execute function public.criar_perfil_no_cadastro();

-- ─── LGPD: a usuária pode excluir a própria conta e todos os dados ──────────
-- Os registros das outras tabelas somem junto (on delete cascade).
create or replace function public.excluir_minha_conta()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    raise exception 'Não autenticado';
  end if;
  delete from auth.users where id = (select auth.uid());
end;
$$;

revoke all on function public.excluir_minha_conta() from public, anon;
grant execute on function public.excluir_minha_conta() to authenticated;
