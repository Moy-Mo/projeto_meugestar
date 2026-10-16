"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirUsuario } from "@/lib/dal";
import { diasEntre, hoje } from "@/lib/datas";
import { validarDUM } from "@/lib/gestacao";
import { registros } from "@/lib/caderneta-config";
import { temErros, validarCampos } from "@/lib/validacao";

const camposGestacao = [
  { nome: "dum", tipo: "date" },
  { nome: "dpp_ultrassom", tipo: "date" },
  { nome: "gestacoes", tipo: "number", inteiro: true, min: 0, max: 30 },
  { nome: "partos", tipo: "number", inteiro: true, min: 0, max: 30 },
  { nome: "abortos", tipo: "number", inteiro: true, min: 0, max: 30 },
];

export async function salvarGestacao(_estado, formData) {
  const usuario = await exigirUsuario("/caderneta/gestacao");
  const { dados, erros, valores } = validarCampos(camposGestacao, formData);
  const dataDeHoje = hoje();

  if (dados.dum) {
    const erroDUM = validarDUM(dados.dum, dataDeHoje);
    if (erroDUM) erros.dum = erroDUM;
  }
  if (dados.dpp_ultrassom) {
    const dias = diasEntre(dataDeHoje, dados.dpp_ultrassom);
    if (dias < -60 || dias > 300) erros.dpp_ultrassom = "Confira essa data: ela parece longe demais.";
  }
  dados.alto_risco = formData.get("alto_risco") === "sim";
  valores.alto_risco = dados.alto_risco;
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase
    .from("gestacoes")
    .upsert({ ...dados, user_id: usuario.id, atualizado_em: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  revalidatePath("/caderneta", "layout");
  return { sucesso: "Dados da gestação salvos!", valores };
}

/** `tipo` vem de bind() na página; mesmo assim é conferido contra a lista permitida. */
export async function adicionarRegistro(tipo, _estado, formData) {
  const config = Object.hasOwn(registros, tipo) ? registros[tipo] : null;
  if (!config) return { erro: "Tipo de registro inválido." };

  const usuario = await exigirUsuario(`/caderneta/${tipo}`);
  const { dados, erros, valores } = validarCampos(config.campos, formData);

  // Regras que envolvem mais de um campo.
  if (tipo === "consultas" && (dados.pa_sistolica == null) !== (dados.pa_diastolica == null)) {
    erros.pa_diastolica = "Preencha os dois números da pressão (ou deixe os dois em branco).";
  }
  if (tipo === "consultas" && dados.pa_sistolica != null && dados.pa_diastolica >= dados.pa_sistolica) {
    erros.pa_diastolica = "O número de baixo costuma ser menor que o de cima. Confira.";
  }
  if (tipo === "vacinas" && dados.proxima_dose && dados.data_dose && diasEntre(dados.data_dose, dados.proxima_dose) <= 0) {
    erros.proxima_dose = "A próxima dose precisa ser depois da data em que você tomou.";
  }
  if (tipo === "ultrassons" && dados.ig_dias != null && dados.ig_semanas == null) {
    erros.ig_semanas = "Preencha as semanas também.";
  }
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase.from(tipo).insert({ ...dados, user_id: usuario.id });
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  revalidatePath("/caderneta", "layout");
  return { sucesso: config.mensagemSalvo };
}

export async function removerRegistro(tipo, id) {
  if (!Object.hasOwn(registros, tipo) || typeof id !== "string") return;
  await exigirUsuario(`/caderneta/${tipo}`);
  const supabase = await createClient();
  // O RLS garante que só apaga se o registro for da própria usuária.
  await supabase.from(tipo).delete().eq("id", id);
  revalidatePath("/caderneta", "layout");
}
