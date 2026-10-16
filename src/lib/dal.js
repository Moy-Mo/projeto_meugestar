import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/*
 * Camada de acesso a dados (DAL). Toda leitura de dados da usuária passa por
 * aqui, e a checagem de quem está logada é feita no servidor (getUser valida o
 * token com o Supabase). O banco ainda protege tudo com RLS.
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

/** Todos os dados da caderneta da usuária logada (ou null se não estiver logada). */
export const getCaderneta = cache(async () => {
  const usuario = await getUsuario();
  if (!usuario) return null;
  const supabase = await createClient();

  const [perfil, gestacao, consultas, exames, vacinas, ultrassons] = await Promise.all([
    supabase.from("perfis").select("nome, telefone, ubs, data_nascimento").eq("id", usuario.id).maybeSingle(),
    supabase
      .from("gestacoes")
      .select("dum, dpp_ultrassom, gestacoes, partos, abortos, alto_risco")
      .eq("user_id", usuario.id)
      .maybeSingle(),
    supabase.from("consultas").select("*").order("data", { ascending: false }),
    supabase.from("exames").select("*").order("data", { ascending: false }),
    supabase.from("vacinas").select("*").order("data_dose", { ascending: false }),
    supabase.from("ultrassons").select("*").order("data", { ascending: false }),
  ]);

  const erro = [perfil, gestacao, consultas, exames, vacinas, ultrassons].find((r) => r.error)?.error;
  if (erro) throw new Error(`Não foi possível carregar a caderneta: ${erro.message}`);

  return {
    usuario,
    perfil: perfil.data,
    gestacao: gestacao.data,
    consultas: consultas.data,
    exames: exames.data,
    vacinas: vacinas.data,
    ultrassons: ultrassons.data,
  };
});
