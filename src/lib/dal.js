import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { linkDaFoto } from "@/lib/foto";

/*
 * Camada de acesso a dados (DAL). Toda leitura de dados passa por aqui, e a
 * checagem de quem está logada é feita no servidor (getUser valida o token com
 * o Supabase). O banco ainda protege tudo com RLS (ver supabase/migrations).
 */

export const getUsuario = cache(async () => {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Usuária logada, ou redireciona para /entrar voltando depois para `voltar`. */
export async function exigirUsuario(voltar = "/caderneta") {
  const usuario = await getUsuario();
  if (!usuario) redirect(`/entrar?voltar=${encodeURIComponent(voltar)}`);
  return usuario;
}

/** Papel e dados básicos de quem está logada: gestante, profissional, familiar ou admin. */
export const getPerfilAtual = cache(async () => {
  const usuario = await getUsuario();
  if (!usuario) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("perfis")
    .select("id, nome, papel, status_profissional, profissao, ubs_id, ubs:ubs_id (nome)")
    .eq("id", usuario.id)
    .maybeSingle();
  return data ? { ...data, email: usuario.email } : null;
});

/** Onde cada papel "mora" no app. */
export const PAINEL_DO_PAPEL = {
  gestante: "/caderneta",
  profissional: "/ubs",
  familiar: "/familia",
  admin: "/admin",
};

/**
 * Exige um dos papéis. Quem não tem vai para o próprio painel.
 * Ex.: exigirPapel(["profissional"], "/ubs")
 */
export async function exigirPapel(papeis, voltar) {
  await exigirUsuario(voltar);
  const perfil = await getPerfilAtual();
  if (!perfil || !papeis.includes(perfil.papel)) redirect(PAINEL_DO_PAPEL[perfil?.papel] ?? "/");
  return perfil;
}

/** UBS ativas (lista pública, para os cadastros). */
export const listarUbs = cache(async () => {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("ubs").select("id, nome, bairro").eq("ativa", true).order("nome");
  return data ?? [];
});

/** Lê a caderneta de uma gestante (a própria, ou de uma paciente autorizada — o RLS decide). */
async function carregarCaderneta(supabase, gestanteId) {
  const [perfil, gestacao, consultas, exames, vacinas, ultrassons] = await Promise.all([
    supabase
      .from("perfis")
      .select("nome, telefone, ubs, ubs_id, autoriza_ubs, data_nascimento, cpf, cns, foto_path, ubs_cadastrada:ubs_id (nome)")
      .eq("id", gestanteId)
      .maybeSingle(),
    supabase
      .from("gestacoes")
      .select("dum, dpp_ultrassom, gestacoes, partos, abortos, alto_risco")
      .eq("user_id", gestanteId)
      .maybeSingle(),
    supabase.from("consultas").select("*").eq("user_id", gestanteId).order("data", { ascending: false }),
    supabase.from("exames").select("*").eq("user_id", gestanteId).order("data", { ascending: false }),
    supabase.from("vacinas").select("*").eq("user_id", gestanteId).order("data_dose", { ascending: false }),
    supabase.from("ultrassons").select("*").eq("user_id", gestanteId).order("data", { ascending: false }),
  ]);

  const erro = [perfil, gestacao, consultas, exames, vacinas, ultrassons].find((r) => r.error)?.error;
  if (erro) throw new Error(`Não foi possível carregar a caderneta: ${erro.message}`);
  if (!perfil.data) return null; // sem permissão ou inexistente

  return {
    perfil: perfil.data,
    fotoUrl: await linkDaFoto(supabase, perfil.data.foto_path),
    // Contas criadas antes de CPF/Cartão SUS/nascimento/telefone serem obrigatórios.
    perfilIncompleto: ["cpf", "cns", "data_nascimento", "telefone"].some((c) => !perfil.data[c]),
    gestacao: gestacao.data,
    consultas: consultas.data,
    exames: exames.data,
    vacinas: vacinas.data,
    ultrassons: ultrassons.data,
  };
}

/** A caderneta da própria gestante logada (ou null se não estiver logada). */
export const getCaderneta = cache(async () => {
  const usuario = await getUsuario();
  if (!usuario) return null;
  const supabase = await createClient();
  const caderneta = await carregarCaderneta(supabase, usuario.id);
  return caderneta ? { usuario, ...caderneta } : null;
});

/**
 * Caderneta de uma paciente, para o profissional da UBS autorizada.
 * 404 se ela não autorizou (o banco não devolve nada). Registra o acesso, que a
 * gestante pode ver em "Minha conta".
 */
export const getCadernetaDaPaciente = cache(async (gestanteId) => {
  const supabase = await createClient();
  const caderneta = await carregarCaderneta(supabase, gestanteId);
  if (!caderneta) notFound();
  await supabase.rpc("registrar_acesso_caderneta", { gestante: gestanteId });
  return caderneta;
});
