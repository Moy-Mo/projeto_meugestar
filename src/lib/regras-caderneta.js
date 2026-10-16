import { diasEntre, hoje } from "./datas.js";
import { validarDUM } from "./gestacao.js";
import { registros } from "./caderneta-config.js";
import { validarCampos } from "./validacao.js";

/*
 * Regras de validação da caderneta, iguais para a gestante e para o
 * profissional da UBS (as Server Actions das duas áreas usam estas funções).
 */

const camposGestacao = [
  { nome: "dum", tipo: "date" },
  { nome: "dpp_ultrassom", tipo: "date" },
  { nome: "gestacoes", tipo: "number", inteiro: true, min: 0, max: 30 },
  { nome: "partos", tipo: "number", inteiro: true, min: 0, max: 30 },
  { nome: "abortos", tipo: "number", inteiro: true, min: 0, max: 30 },
];

export function validarGestacao(formData) {
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
  return { dados, erros, valores };
}

/** Valida um registro (consulta, exame, vacina, ultrassom). `config` é null se o tipo não existir. */
export function validarRegistro(tipo, formData) {
  const config = Object.hasOwn(registros, tipo) ? registros[tipo] : null;
  if (!config) return { config: null, dados: {}, erros: {}, valores: {} };
  const { dados, erros, valores } = validarCampos(config.campos, formData);

  // Regras que envolvem mais de um campo.
  if (tipo === "consultas" && (dados.pa_sistolica == null) !== (dados.pa_diastolica == null)) {
    erros.pa_diastolica = "Preencha os dois números da pressão (ou deixe os dois em branco).";
  }
  if (tipo === "consultas" && dados.pa_sistolica != null && dados.pa_diastolica >= dados.pa_sistolica) {
    erros.pa_diastolica = "O número de baixo costuma ser menor que o de cima. Confira.";
  }
  if (tipo === "vacinas" && dados.proxima_dose && dados.data_dose && diasEntre(dados.data_dose, dados.proxima_dose) <= 0) {
    erros.proxima_dose = "A próxima dose precisa ser depois da data em que tomou.";
  }
  if (tipo === "ultrassons" && dados.ig_dias != null && dados.ig_semanas == null) {
    erros.ig_semanas = "Preencha as semanas também.";
  }
  return { config, dados, erros, valores };
}
