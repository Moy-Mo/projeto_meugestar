"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";

/* Ações da gestante sobre QUEM pode ver a caderneta dela: a UBS e os familiares. */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function salvarUbsEAutorizacao(_estado, formData) {
  const perfil = await exigirPapel(["gestante"], "/conta");
  const ubsId = String(formData.get("ubs_id") ?? "");
  const autoriza = formData.get("autoriza_ubs") === "sim";
  const valores = { ubs_id: ubsId, autoriza_ubs: autoriza };

  if (ubsId && !UUID.test(ubsId)) return { erros: { ubs_id: "Escolha uma UBS da lista." }, valores };
  if (autoriza && !ubsId) return { erros: { ubs_id: "Para autorizar, escolha sua UBS." }, valores };

  const supabase = await createClient();
  const { error } = await supabase
    .from("perfis")
    .update({ ubs_id: ubsId || null, autoriza_ubs: autoriza })
    .eq("id", perfil.id);
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  revalidatePath("/conta");
  return {
    sucesso: autoriza
      ? "Pronto! A equipe da sua UBS já pode ver e anotar na sua caderneta."
      : "Pronto! A equipe da UBS não tem mais acesso à sua caderneta.",
    valores,
  };
}

// Sem letras e números que se confundem (O/0, I/1), para ditar o código por telefone.
const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const novoCodigo = () => Array.from({ length: 8 }, () => ALFABETO[randomInt(ALFABETO.length)]).join("");

export async function criarConvite(_estado, formData) {
  const perfil = await exigirPapel(["gestante"], "/conta");
  const apelido = String(formData.get("apelido") ?? "").trim().slice(0, 60) || null;
  const supabase = await createClient();

  // Tenta de novo no caso (raríssimo) de o código já existir.
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    const codigo = novoCodigo();
    const { error } = await supabase.from("convites_familiares").insert({ gestante_id: perfil.id, codigo, apelido });
    if (!error) {
      revalidatePath("/conta");
      return { sucesso: "Convite criado! Envie o link para a pessoa.", codigo };
    }
    if (error.code !== "23505") break;
  }
  return { erro: "Não foi possível criar o convite. Tente de novo." };
}

/** Cancela um convite ou tira o acesso de um familiar que já entrou. */
export async function removerConvite(id) {
  await exigirPapel(["gestante"], "/conta");
  if (typeof id !== "string" || !UUID.test(id)) return;
  const supabase = await createClient();
  await supabase.from("convites_familiares").delete().eq("id", id); // RLS: só os da própria gestante
  revalidatePath("/conta");
}
