"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";
import { temErros, validarCampos } from "@/lib/validacao";

/* Ações do painel admin. O banco confere de novo se é admin (RLS e funções). */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function adicionarUbs(_estado, formData) {
  await exigirPapel(["admin"], "/admin");
  const { dados, erros, valores } = validarCampos(
    [
      { nome: "nome", tipo: "text", obrigatorio: true, maxLength: 120 },
      { nome: "bairro", tipo: "text", maxLength: 120 },
    ],
    formData,
  );
  if (dados.nome && dados.nome.length < 3) erros.nome = "Nome muito curto.";
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase.from("ubs").insert(dados);
  if (error?.code === "23505") return { erros: { nome: "Já existe uma UBS com este nome." }, valores };
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  revalidatePath("/admin");
  return { sucesso: `UBS "${dados.nome}" cadastrada!` };
}

export async function alternarUbs(id, ativa) {
  await exigirPapel(["admin"], "/admin");
  if (typeof id !== "string" || !UUID.test(id)) return;
  const supabase = await createClient();
  await supabase.from("ubs").update({ ativa: Boolean(ativa) }).eq("id", id);
  revalidatePath("/admin");
}

export async function definirStatusProfissional(id, status) {
  await exigirPapel(["admin"], "/admin");
  if (typeof id !== "string" || !UUID.test(id) || !["aprovado", "recusado", "pendente"].includes(status)) return;
  const supabase = await createClient();
  await supabase.rpc("definir_status_profissional", { profissional: id, novo_status: status });
  revalidatePath("/admin");
}
