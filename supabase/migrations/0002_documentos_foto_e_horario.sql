-- ============================================================================
-- Meu Gestar — 0002: CPF, Cartão SUS, foto de perfil e horário das consultas
-- Como usar: Supabase → SQL Editor → New query → cole este arquivo → Run.
-- Pode rodar de novo sem problema.
-- ============================================================================

-- ─── Perfil: documentos e foto ──────────────────────────────────────────────
-- Guardados só com dígitos. Ficam opcionais NO BANCO para não quebrar contas
-- criadas antes desta versão; o app exige no cadastro e pede para completar.
alter table public.perfis add column if not exists cpf text;
alter table public.perfis add column if not exists cns text;
alter table public.perfis add column if not exists foto_path text;

alter table public.perfis drop constraint if exists perfis_cpf_formato;
alter table public.perfis add constraint perfis_cpf_formato check (cpf is null or cpf ~ '^[0-9]{11}$');
alter table public.perfis drop constraint if exists perfis_cns_formato;
alter table public.perfis add constraint perfis_cns_formato check (cns is null or cns ~ '^[0-9]{15}$');

-- Uma conta por pessoa: o mesmo CPF ou Cartão SUS não pode ter duas contas.
create unique index if not exists perfis_cpf_unico on public.perfis (cpf) where cpf is not null;
create unique index if not exists perfis_cns_unico on public.perfis (cns) where cns is not null;

-- ─── Horário (opcional) de consultas e exames — usado no Google Agenda ──────
alter table public.consultas add column if not exists hora time;
alter table public.exames add column if not exists hora time;

-- ─── Cadastro: grava os novos campos e tira CPF/CNS dos metadados da conta ──
-- Os dados chegam pelo signUp (options.data). Depois de copiados para o perfil
-- (protegido por RLS), CPF e Cartão SUS são apagados dos metadados de login,
-- para não ficarem repetidos em outro lugar.
create or replace function public.criar_perfil_no_cadastro()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := new.raw_user_meta_data;
begin
  if coalesce(meta ->> 'consentimento_versao', '') = '' then
    raise exception 'Cadastro sem consentimento LGPD';
  end if;

  insert into public.perfis (
    id, nome, telefone, ubs, data_nascimento, cpf, cns, consentimento_em, consentimento_versao
  )
  values (
    new.id,
    meta ->> 'nome',
    nullif(meta ->> 'telefone', ''),
    nullif(meta ->> 'ubs', ''),
    nullif(meta ->> 'data_nascimento', '')::date,
    nullif(meta ->> 'cpf', ''),
    nullif(meta ->> 'cns', ''),
    now(),
    meta ->> 'consentimento_versao'
  );

  insert into public.gestacoes (user_id, dum)
  values (new.id, nullif(meta ->> 'dum', '')::date);

  update auth.users
     set raw_user_meta_data = raw_user_meta_data - 'cpf' - 'cns' - 'data_nascimento' - 'telefone'
   where id = new.id;

  return new;
end;
$$;

-- ─── Fotos de perfil (Storage) ──────────────────────────────────────────────
-- Bucket PRIVADO: cada usuária só lê e grava na própria pasta ("<id>/foto.webp").
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos-perfil', 'fotos-perfil', false, 1048576, array['image/webp'])
on conflict (id) do update
  set public = false, file_size_limit = 1048576, allowed_mime_types = array['image/webp'];

drop policy if exists "fotos-perfil: dona lê" on storage.objects;
create policy "fotos-perfil: dona lê" on storage.objects
  for select to authenticated
  using (bucket_id = 'fotos-perfil' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "fotos-perfil: dona envia" on storage.objects;
create policy "fotos-perfil: dona envia" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'fotos-perfil' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "fotos-perfil: dona troca" on storage.objects;
create policy "fotos-perfil: dona troca" on storage.objects
  for update to authenticated
  using (bucket_id = 'fotos-perfil' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'fotos-perfil' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "fotos-perfil: dona apaga" on storage.objects;
create policy "fotos-perfil: dona apaga" on storage.objects
  for delete to authenticated
  using (bucket_id = 'fotos-perfil' and (storage.foldername(name))[1] = (select auth.uid())::text);
