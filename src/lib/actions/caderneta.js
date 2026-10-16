"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";
import { registros } from "@/lib/caderneta-config";
import { validarGestacao, validarRegistro } from "@/lib/regras-caderneta";
import { temErros } from "@/lib/validacao";

/* Ações da própria gestante na caderneta dela. */

export async function salvarGestacao(_estado, formData) {
  const perfil = await exigirPapel(["gestante"], "/caderneta/gestacao");
  const { dados, erros, valores } = validarGestacao(formData);
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase
    .from("gestacoes")
    .upsert({ ...dados, user_id: perfil.id, atualizado_em: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  revalidatePath("/caderneta", "layout");
  return { sucesso: "Dados da gestação salvos!", valores };
}

/** `tipo` vem de bind() na página; mesmo assim é conferido contra a lista permitida. */
export async function adicionarRegistro(tipo, _estado, formData) {
  // Exames são registrados pelo profissional da UBS (decisão da equipe); o banco também bloqueia.
  if (tipo === "exames") return { erro: "Os exames são registrados pela equipe da sua UBS." };

  const perfil = await exigirPapel(["gestante"], `/caderneta/${tipo}`);
  const { config, dados, erros, valores } = validarRegistro(tipo, formData);
  if (!config) return { erro: "Tipo de registro inválido." };
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase.from(tipo).insert({ ...dados, user_id: perfil.id });
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  revalidatePath("/caderneta", "layout");
  return { sucesso: config.mensagemSalvo };
}

export async function removerRegistro(tipo, id) {
  if (!Object.hasOwn(registros, tipo) || typeof id !== "string") return;
  await exigirPapel(["gestante"], `/caderneta/${tipo}`);
  const supabase = await createClient();
  // O RLS garante que só apaga o que é da própria usuária (e, em exames, só o que ela anotou).
  await supabase.from(tipo).delete().eq("id", id);
  revalidatePath("/caderneta", "layout");
}
