-- ============================================================================
-- Meu Gestar — Fase 3: painel da UBS, acesso de familiares e painel admin
-- Como usar: Supabase → SQL Editor → New query → cole este arquivo → Run.
-- Pode rodar de novo sem problema.
--
-- Quem vê o quê (regras no BANCO, valem mesmo fora do app):
--   gestante     → os próprios dados. Exames: só lê (quem registra é o profissional).
--   profissional → só gestantes que AUTORIZARAM a UBS dele, e só depois de
--                  APROVADO pelo admin. Registra consultas, exames, vacinas e
--                  ultrassons dessas gestantes.
--   familiar     → nenhuma tabela direto; só um RESUMO (semanas, DPP, consultas,
--                  vacinas) das gestantes que o convidaram.
--   admin        → cadastra UBS, aprova profissionais e vê o contador de acessos.
--                  NÃO vê dados de saúde das gestantes.
--
-- Para tornar alguém admin (rode UMA vez, trocando o e-mail):
--   update public.perfis set papel = 'admin'
--    where id = (select id from auth.users where email = 'email-do-admin@exemplo.com');
-- ============================================================================

-- ─── UBS ────────────────────────────────────────────────────────────────────
create table if not exists public.ubs (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique check (char_length(nome) between 3 and 120),
  bairro text check (bairro is null or char_length(bairro) <= 120),
  ativa boolean not null default true,
  criado_em timestamptz not null default now()
);

-- ─── Perfil: UBS, autorização e dados do profissional ───────────────────────
alter table public.perfis add column if not exists ubs_id uuid references public.ubs (id) on delete set null;
alter table public.perfis add column if not exists autoriza_ubs boolean not null default false;
alter table public.perfis add column if not exists autoriza_ubs_em timestamptz;
alter table public.perfis add column if not exists profissao text check (profissao is null or char_length(profissao) <= 60);
alter table public.perfis add column if not exists registro_conselho text
  check (registro_conselho is null or char_length(registro_conselho) <= 30);
alter table public.perfis add column if not exists status_profissional text
  check (status_profissional is null or status_profissional in ('pendente', 'aprovado', 'recusado'));

create index if not exists perfis_ubs_idx on public.perfis (ubs_id) where ubs_id is not null;

-- ─── Funções de permissão (usadas nas regras abaixo) ────────────────────────
create or replace function public.eh_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.perfis where id = (select auth.uid()) and papel = 'admin');
$$;

-- A usuária logada é profissional APROVADO da UBS que esta gestante AUTORIZOU?
create or replace function public.eh_profissional_da_gestante(gestante uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
      from public.perfis p
      join public.perfis g on g.id = gestante
     where p.id = (select auth.uid())
       and p.papel = 'profissional'
       and p.status_profissional = 'aprovado'
       and g.papel = 'gestante'
       and g.autoriza_ubs
       and g.ubs_id is not null
       and g.ubs_id = p.ubs_id
  );
$$;

revoke all on function public.eh_admin() from public, anon;
revoke all on function public.eh_profissional_da_gestante(uuid) from public, anon;
grant execute on function public.eh_admin() to authenticated;
grant execute on function public.eh_profissional_da_gestante(uuid) to authenticated;

-- ─── UBS: todos veem as ativas (para escolher no cadastro); só admin altera ─
alter table public.ubs enable row level security;

drop policy if exists "ubs: ler ativas" on public.ubs;
create policy "ubs: ler ativas" on public.ubs
  for select to anon, authenticated using (ativa or (select public.eh_admin()));

drop policy if exists "ubs: admin cadastra" on public.ubs;
create policy "ubs: admin cadastra" on public.ubs
  for insert to authenticated with check ((select public.eh_admin()));

drop policy if exists "ubs: admin altera" on public.ubs;
create policy "ubs: admin altera" on public.ubs
  for update to authenticated using ((select public.eh_admin())) with check ((select public.eh_admin()));

-- ─── Perfil: proteção dos campos sensíveis ──────────────────────────────────
-- Ninguém muda o próprio papel, a própria aprovação ou o consentimento.
-- Profissional que troca de UBS ou de registro volta para "pendente".
create or replace function public.proteger_campos_do_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.role()) = 'authenticated' and not public.eh_admin() then
    new.papel := old.papel;
    new.status_profissional := old.status_profissional;
    new.consentimento_em := old.consentimento_em;
    new.consentimento_versao := old.consentimento_versao;
    if old.papel = 'profissional'
       and (new.ubs_id is distinct from old.ubs_id or new.registro_conselho is distinct from old.registro_conselho) then
      new.status_profissional := 'pendente';
    end if;
  end if;
  if new.autoriza_ubs and not old.autoriza_ubs then
    new.autoriza_ubs_em := now();
  elsif not new.autoriza_ubs then
    new.autoriza_ubs_em := null;
  end if;
  new.atualizado_em := now();
  return new;
end;
$$;

-- O profissional vê o perfil (nome, CPF, Cartão SUS…) das gestantes autorizadas.
drop policy if exists "perfil: profissional lê gestante autorizada" on public.perfis;
create policy "perfil: profissional lê gestante autorizada" on public.perfis
  for select to authenticated using ((select public.eh_profissional_da_gestante(id)));

-- ─── Cadastro: gestante, profissional ou familiar ───────────────────────────
-- "admin" nunca vem do formulário (só pelo comando no topo deste arquivo).
create or replace function public.criar_perfil_no_cadastro()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := new.raw_user_meta_data;
  tipo text := coalesce(nullif(meta ->> 'tipo', ''), 'gestante');
begin
  if coalesce(meta ->> 'consentimento_versao', '') = '' then
    raise exception 'Cadastro sem consentimento LGPD';
  end if;
  if tipo not in ('gestante', 'profissional', 'familiar') then
    raise exception 'Tipo de cadastro inválido';
  end if;

  insert into public.perfis (
    id, nome, telefone, ubs, ubs_id, autoriza_ubs, data_nascimento, cpf, cns,
    papel, profissao, registro_conselho, status_profissional,
    consentimento_em, consentimento_versao
  )
  values (
    new.id,
    meta ->> 'nome',
    nullif(meta ->> 'telefone', ''),
    nullif(meta ->> 'ubs', ''),
    nullif(meta ->> 'ubs_id', '')::uuid,
    tipo = 'gestante' and coalesce((meta ->> 'autoriza_ubs')::boolean, false),
    nullif(meta ->> 'data_nascimento', '')::date,
    nullif(meta ->> 'cpf', ''),
    nullif(meta ->> 'cns', ''),
    tipo,
    case when tipo = 'profissional' then nullif(meta ->> 'profissao', '') end,
    case when tipo = 'profissional' then nullif(meta ->> 'registro_conselho', '') end,
    case when tipo = 'profissional' then 'pendente' end,
    now(),
    meta ->> 'consentimento_versao'
  );

  if tipo = 'gestante' then
    insert into public.gestacoes (user_id, dum)
    values (new.id, nullif(meta ->> 'dum', '')::date);
  end if;

  update auth.users
     set raw_user_meta_data = raw_user_meta_data - 'cpf' - 'cns' - 'data_nascimento' - 'telefone'
                              - 'registro_conselho'
   where id = new.id;

  return new;
end;
$$;

-- ─── Registros: quem registrou, e exames ligados à consulta ─────────────────
do $$
declare
  t text;
begin
  foreach t in array array['consultas', 'exames', 'vacinas', 'ultrassons']
  loop
    execute format(
      'alter table public.%I add column if not exists registrado_por uuid references auth.users (id) on delete set null', t);
    execute format(
      'alter table public.%I add column if not exists registrado_por_nome text', t);
  end loop;
end
$$;

alter table public.exames add column if not exists consulta_id uuid references public.consultas (id) on delete set null;
create index if not exists exames_consulta_idx on public.exames (consulta_id) where consulta_id is not null;

-- Carimbo automático: quem registrou (e, se for profissional, nome e profissão).
create or replace function public.carimbar_registro()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.registrado_por := (select auth.uid());
  new.registrado_por_nome := (
    select p.nome || coalesce(' — ' || p.profissao, '')
      from public.perfis p
     where p.id = (select auth.uid()) and p.papel = 'profissional'
  );
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['consultas', 'exames', 'vacinas', 'ultrassons']
  loop
    execute format('drop trigger if exists carimbar_registro on public.%I', t);
    execute format(
      'create trigger carimbar_registro before insert on public.%I
         for each row execute function public.carimbar_registro()', t);
  end loop;
end
$$;

-- ─── Regras dos registros ───────────────────────────────────────────────────
-- Exames: a gestante só LÊ (e pode apagar o que ela mesma anotou antes desta versão).
drop policy if exists "dona: tudo" on public.exames;
drop policy if exists "dona: ler" on public.exames;
create policy "dona: ler" on public.exames
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "dona: apagar o que anotou" on public.exames;
create policy "dona: apagar o que anotou" on public.exames
  for delete to authenticated
  using ((select auth.uid()) = user_id and (registrado_por is null or registrado_por = (select auth.uid())));

-- Profissional da UBS autorizada: lê, registra e apaga o que ele registrou.
do $$
declare
  t text;
begin
  foreach t in array array['consultas', 'exames', 'vacinas', 'ultrassons']
  loop
    execute format('drop policy if exists "profissional: ler" on public.%I', t);
    execute format(
      'create policy "profissional: ler" on public.%I for select to authenticated
         using ((select public.eh_profissional_da_gestante(user_id)))', t);
    execute format('drop policy if exists "profissional: registrar" on public.%I', t);
    execute format(
      'create policy "profissional: registrar" on public.%I for insert to authenticated
         with check ((select public.eh_profissional_da_gestante(user_id)))', t);
    execute format('drop policy if exists "profissional: apagar o que registrou" on public.%I', t);
    execute format(
      'create policy "profissional: apagar o que registrou" on public.%I for delete to authenticated
         using (registrado_por = (select auth.uid()) and (select public.eh_profissional_da_gestante(user_id)))', t);
  end loop;
end
$$;

-- Dados da gestação: o profissional lê e atualiza (DUM, DPP do ultrassom, alto risco).
drop policy if exists "profissional: ler" on public.gestacoes;
create policy "profissional: ler" on public.gestacoes
  for select to authenticated using ((select public.eh_profissional_da_gestante(user_id)));
drop policy if exists "profissional: atualizar" on public.gestacoes;
create policy "profissional: atualizar" on public.gestacoes
  for update to authenticated
  using ((select public.eh_profissional_da_gestante(user_id)))
  with check ((select public.eh_profissional_da_gestante(user_id)));

-- ─── Transparência: quem da UBS abriu a caderneta ───────────────────────────
create table if not exists public.acessos_caderneta (
  id uuid primary key default gen_random_uuid(),
  gestante_id uuid not null references auth.users (id) on delete cascade,
  profissional_id uuid references auth.users (id) on delete set null,
  profissional_nome text,
  em timestamptz not null default now()
);
create index if not exists acessos_caderneta_gestante_idx on public.acessos_caderneta (gestante_id, em desc);
alter table public.acessos_caderneta enable row level security;

drop policy if exists "dona: ver quem acessou" on public.acessos_caderneta;
create policy "dona: ver quem acessou" on public.acessos_caderneta
  for select to authenticated using ((select auth.uid()) = gestante_id);

-- Registra a abertura (no máximo 1 vez por hora por profissional e gestante).
create or replace function public.registrar_acesso_caderneta(gestante uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.eh_profissional_da_gestante(gestante) then
    raise exception 'Sem autorização';
  end if;
  if exists (
    select 1 from public.acessos_caderneta
     where gestante_id = gestante and profissional_id = (select auth.uid())
       and em > now() - interval '1 hour'
  ) then
    return;
  end if;
  insert into public.acessos_caderneta (gestante_id, profissional_id, profissional_nome)
  select gestante, p.id, p.nome || coalesce(' — ' || p.profissao, '')
    from public.perfis p where p.id = (select auth.uid());
end;
$$;
revoke all on function public.registrar_acesso_caderneta(uuid) from public, anon;
grant execute on function public.registrar_acesso_caderneta(uuid) to authenticated;

-- ─── Familiares: convite da gestante ────────────────────────────────────────
create table if not exists public.convites_familiares (
  id uuid primary key default gen_random_uuid(),
  gestante_id uuid not null references auth.users (id) on delete cascade,
  codigo text not null unique check (codigo ~ '^[A-Z2-9]{8}$'),
  apelido text check (apelido is null or char_length(apelido) <= 60), -- "Mãe", "Parceiro"…
  criado_em timestamptz not null default now(),
  expira_em timestamptz not null default now() + interval '7 days',
  familiar_id uuid references auth.users (id) on delete cascade,
  familiar_nome text,
  aceito_em timestamptz,
  revogado boolean not null default false
);
create index if not exists convites_gestante_idx on public.convites_familiares (gestante_id);
create index if not exists convites_familiar_idx on public.convites_familiares (familiar_id) where familiar_id is not null;
alter table public.convites_familiares enable row level security;

-- A gestante cria, vê e revoga os próprios convites.
drop policy if exists "gestante: convites" on public.convites_familiares;
create policy "gestante: convites" on public.convites_familiares
  for all to authenticated
  using ((select auth.uid()) = gestante_id)
  with check ((select auth.uid()) = gestante_id and familiar_id is null);

-- O familiar aceita o convite pelo código (só contas de familiar).
create or replace function public.aceitar_convite(p_codigo text)
returns text language plpgsql security definer set search_path = '' as $$
declare
  convite public.convites_familiares;
  nome_gestante text;
begin
  if not exists (select 1 from public.perfis where id = (select auth.uid()) and papel = 'familiar') then
    raise exception 'Só contas de familiar podem aceitar convites';
  end if;

  update public.convites_familiares c
     set familiar_id = (select auth.uid()),
         familiar_nome = (select nome from public.perfis where id = (select auth.uid())),
         aceito_em = now()
   where c.codigo = upper(trim(p_codigo))
     and c.familiar_id is null
     and not c.revogado
     and c.expira_em > now()
  returning * into convite;

  if convite.id is null then
    raise exception 'Convite inválido, vencido ou já usado';
  end if;

  select nome into nome_gestante from public.perfis where id = convite.gestante_id;
  return nome_gestante;
end;
$$;
revoke all on function public.aceitar_convite(text) from public, anon;
grant execute on function public.aceitar_convite(text) to authenticated;

-- Resumo para o familiar: só o necessário para semanas, DPP e lembretes.
-- Sem CPF, Cartão SUS, exames, pressão, peso ou anotações.
create or replace function public.resumo_familiar()
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'gestante_id', c.gestante_id,
    'nome', p.nome,
    'gestacao', (select jsonb_build_object('dum', g.dum, 'dpp_ultrassom', g.dpp_ultrassom, 'alto_risco', g.alto_risco)
                   from public.gestacoes g where g.user_id = c.gestante_id),
    'consultas', coalesce((select jsonb_agg(jsonb_build_object('id', x.id, 'data', x.data, 'hora', x.hora))
                             from public.consultas x where x.user_id = c.gestante_id), '[]'::jsonb),
    'vacinas', coalesce((select jsonb_agg(jsonb_build_object('id', v.id, 'vacina', v.vacina, 'data_dose', v.data_dose,
                                                             'proxima_dose', v.proxima_dose))
                           from public.vacinas v where v.user_id = c.gestante_id), '[]'::jsonb)
  ) order by p.nome), '[]'::jsonb)
    from public.convites_familiares c
    join public.perfis p on p.id = c.gestante_id
   where c.familiar_id = (select auth.uid()) and not c.revogado;
$$;
revoke all on function public.resumo_familiar() from public, anon;
grant execute on function public.resumo_familiar() to authenticated;

-- ─── Contador de acessos (sem dados pessoais: só página e dia) ──────────────
create table if not exists public.acessos_paginas (
  dia date not null default (now() at time zone 'America/Porto_Velho')::date,
  caminho text not null check (char_length(caminho) <= 200),
  total bigint not null default 0,
  primary key (dia, caminho)
);
alter table public.acessos_paginas enable row level security; -- ninguém lê direto; só pelas funções

create or replace function public.contar_acesso(p_caminho text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if p_caminho is null or left(p_caminho, 1) <> '/' or char_length(p_caminho) > 200 then
    return;
  end if;
  insert into public.acessos_paginas (dia, caminho, total)
  values ((now() at time zone 'America/Porto_Velho')::date, p_caminho, 1)
  on conflict (dia, caminho) do update set total = public.acessos_paginas.total + 1;
end;
$$;
revoke all on function public.contar_acesso(text) from public;
grant execute on function public.contar_acesso(text) to anon, authenticated;

-- ─── Funções do painel admin ────────────────────────────────────────────────
create or replace function public.estatisticas_admin()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  hoje date := (now() at time zone 'America/Porto_Velho')::date;
begin
  if not public.eh_admin() then raise exception 'Só admin'; end if;
  return jsonb_build_object(
    'acessos_total', (select coalesce(sum(total), 0) from public.acessos_paginas),
    'acessos_hoje', (select coalesce(sum(total), 0) from public.acessos_paginas where dia = hoje),
    'acessos_30_dias', (select coalesce(sum(total), 0) from public.acessos_paginas where dia > hoje - 30),
    'por_dia', (select coalesce(jsonb_agg(jsonb_build_object('dia', d.dia, 'total', d.total) order by d.dia), '[]'::jsonb)
                  from (select dia, sum(total) as total from public.acessos_paginas
                         where dia > hoje - 30 group by dia) d),
    'mais_vistas', (select coalesce(jsonb_agg(jsonb_build_object('caminho', m.caminho, 'total', m.total) order by m.total desc), '[]'::jsonb)
                      from (select caminho, sum(total) as total from public.acessos_paginas
                             where dia > hoje - 30 group by caminho order by sum(total) desc limit 10) m),
    'gestantes', (select count(*) from public.perfis where papel = 'gestante'),
    'gestantes_autorizaram_ubs', (select count(*) from public.perfis where papel = 'gestante' and autoriza_ubs),
    'familiares', (select count(*) from public.perfis where papel = 'familiar'),
    'profissionais_aprovados', (select count(*) from public.perfis where papel = 'profissional' and status_profissional = 'aprovado'),
    'profissionais_pendentes', (select count(*) from public.perfis where papel = 'profissional' and status_profissional = 'pendente'),
    'ubs_ativas', (select count(*) from public.ubs where ativa)
  );
end;
$$;

create or replace function public.listar_profissionais()
returns table (id uuid, nome text, email text, telefone text, profissao text, registro_conselho text,
               status_profissional text, ubs_nome text, criado_em timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.eh_admin() then raise exception 'Só admin'; end if;
  return query
    select p.id, p.nome, u.email::text, p.telefone, p.profissao, p.registro_conselho,
           p.status_profissional, b.nome, p.criado_em
      from public.perfis p
      join auth.users u on u.id = p.id
      left join public.ubs b on b.id = p.ubs_id
     where p.papel = 'profissional'
     order by (p.status_profissional = 'pendente') desc, p.criado_em desc;
end;
$$;

create or replace function public.definir_status_profissional(profissional uuid, novo_status text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.eh_admin() then raise exception 'Só admin'; end if;
  if novo_status not in ('pendente', 'aprovado', 'recusado') then raise exception 'Status inválido'; end if;
  update public.perfis set status_profissional = novo_status
   where id = profissional and papel = 'profissional';
end;
$$;

revoke all on function public.estatisticas_admin() from public, anon;
revoke all on function public.listar_profissionais() from public, anon;
revoke all on function public.definir_status_profissional(uuid, text) from public, anon;
grant execute on function public.estatisticas_admin() to authenticated;
grant execute on function public.listar_profissionais() to authenticated;
grant execute on function public.definir_status_profissional(uuid, text) to authenticated;
