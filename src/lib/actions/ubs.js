"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";
import { dataValida } from "@/lib/datas";
import { registros } from "@/lib/caderneta-config";
import { validarGestacao, validarRegistro } from "@/lib/regras-caderneta";
import { temErros } from "@/lib/validacao";

/*
 * Ações do profissional da UBS na caderneta de uma paciente.
 * O banco só aceita se ele estiver APROVADO e a gestante tiver AUTORIZADO a UBS
 * dele (RLS); aqui a checagem serve para dar uma mensagem clara.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_EXAMES = 20;

async function exigirProfissionalAprovado(gestanteId) {
  const perfil = await exigirPapel(["profissional"], "/ubs");
  if (perfil.status_profissional !== "aprovado") return { erro: "Seu cadastro ainda não foi aprovado." };
  if (typeof gestanteId !== "string" || !UUID.test(gestanteId)) return { erro: "Paciente inválida." };
  return { perfil };
}

const atualizar = (gestanteId) => revalidatePath(`/ubs/gestante/${gestanteId}`);

/**
 * Registra uma consulta e, junto, os exames pedidos ou com resultado naquela consulta.
 * Cada linha de exame chega como exame_nome / exame_data / exame_resultado (repetidos).
 */
export async function registrarConsulta(gestanteId, _estado, formData) {
  const { erro: erroAcesso } = await exigirProfissionalAprovado(gestanteId);
  if (erroAcesso) return { erro: erroAcesso };

  const { dados, erros, valores } = validarRegistro("consultas", formData);

  const nomes = formData.getAll("exame_nome").map((v) => String(v).trim());
  const datas = formData.getAll("exame_data").map((v) => String(v).trim());
  const resultados = formData.getAll("exame_resultado").map((v) => String(v).trim());
  const exames = [];
  const errosExames = [];
  nomes.forEach((nome, i) => {
    const data = datas[i] || dados.data;
    const resultado = resultados[i] ?? "";
    if (!nome && !resultado) return; // linha vazia
    if (!nome) errosExames[i] = "Escreva o nome do exame.";
    else if (nome.length > 120) errosExames[i] = "Nome muito longo.";
    else if (data && !dataValida(data)) errosExames[i] = "Data inválida.";
    else if (resultado.length > 500) errosExames[i] = "Resultado muito longo (máx. 500 caracteres).";
    else exames.push({ nome, data, resultado: resultado || null });
  });
  if (exames.length > MAX_EXAMES) erros.exames = `No máximo ${MAX_EXAMES} exames por consulta.`;
  if (errosExames.some(Boolean)) erros.exames = "Confira os exames marcados.";
  valores.exames = nomes.map((nome, i) => ({ nome, data: datas[i] ?? "", resultado: resultados[i] ?? "" }));
  if (temErros(erros)) return { erros, errosExames, valores };

  const supabase = await createClient();
  const { data: consulta, error } = await supabase
    .from("consultas")
    .insert({ ...dados, user_id: gestanteId })
    .select("id")
    .single();
  if (error) return { erro: "Não foi possível salvar a consulta. Tente de novo.", valores };

  if (exames.length > 0) {
    const { error: erroExames } = await supabase
      .from("exames")
      .insert(exames.map((e) => ({ ...e, user_id: gestanteId, consulta_id: consulta.id })));
    if (erroExames) {
      atualizar(gestanteId);
      return { erro: "A consulta foi salva, mas os exames não. Registre os exames de novo.", valores };
    }
  }

  atualizar(gestanteId);
  return {
    sucesso: exames.length
      ? `Consulta e ${exames.length} ${exames.length === 1 ? "exame registrados" : "exames registrados"}!`
      : "Consulta registrada!",
  };
}

/** Exame, vacina ou ultrassom avulso (fora de uma consulta). */
export async function adicionarRegistroPaciente(gestanteId, tipo, _estado, formData) {
  const { erro: erroAcesso } = await exigirProfissionalAprovado(gestanteId);
  if (erroAcesso) return { erro: erroAcesso };

  const { config, dados, erros, valores } = validarRegistro(tipo, formData);
  if (!config || tipo === "consultas") return { erro: "Tipo de registro inválido." };
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase.from(tipo).insert({ ...dados, user_id: gestanteId });
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  atualizar(gestanteId);
  return { sucesso: config.mensagemSalvo };
}

export async function atualizarGestacaoPaciente(gestanteId, _estado, formData) {
  const { erro: erroAcesso } = await exigirProfissionalAprovado(gestanteId);
  if (erroAcesso) return { erro: erroAcesso };

  const { dados, erros, valores } = validarGestacao(formData);
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase
    .from("gestacoes")
    .update({ ...dados, atualizado_em: new Date().toISOString() })
    .eq("user_id", gestanteId);
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };

  atualizar(gestanteId);
  return { sucesso: "Dados da gestação atualizados!", valores };
}

/** Apaga um registro — o banco só deixa apagar o que o próprio profissional registrou. */
export async function removerRegistroPaciente(gestanteId, tipo, id) {
  const { erro } = await exigirProfissionalAprovado(gestanteId);
  if (erro || !Object.hasOwn(registros, tipo) || typeof id !== "string") return;
  const supabase = await createClient();
  await supabase.from(tipo).delete().eq("id", id);
  atualizar(gestanteId);
}
