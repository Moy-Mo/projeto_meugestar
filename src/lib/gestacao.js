import { dataValida, diasEntre, somarDias } from "./datas.js";

/*
 * Cálculos da gestação a partir da DUM (data da última menstruação), como na
 * Caderneta da Gestante: idade gestacional em semanas + dias e DPP pela regra
 * de Naegele (DUM + 280 dias). É uma estimativa — quem confirma é a equipe,
 * muitas vezes pelo ultrassom.
 */
export const DURACAO_DIAS = 280;
const IG_MAXIMA_DIAS = 44 * 7; // além disso, a DUM provavelmente está errada

/** Idade gestacional na `data`: { semanas, dias, totalDias } ou null. */
export function idadeGestacional(dum, data) {
  if (!dataValida(dum) || !dataValida(data)) return null;
  const totalDias = diasEntre(dum, data);
  if (totalDias < 0 || totalDias > IG_MAXIMA_DIAS) return null;
  return { semanas: Math.floor(totalDias / 7), dias: totalDias % 7, totalDias };
}

/** Data provável do parto pela DUM. */
export function dataProvavelDoParto(dum) {
  return dataValida(dum) ? somarDias(dum, DURACAO_DIAS) : null;
}

/**
 * Resumo da gestação para a tela: usa a DPP do ultrassom quando a equipe informou
 * (é a mais precisa); senão, calcula pela DUM.
 * Devolve { ig, dpp, fonte: "ultrassom" | "dum", diasParaDPP } ou null.
 */
export function resumoDaGestacao(gestacao, dataDeHoje) {
  if (!gestacao) return null;
  let dum = gestacao.dum;
  let dpp = dataProvavelDoParto(dum);
  let fonte = "dum";
  if (dataValida(gestacao.dpp_ultrassom)) {
    dpp = gestacao.dpp_ultrassom;
    dum = somarDias(dpp, -DURACAO_DIAS);
    fonte = "ultrassom";
  }
  if (!dpp) return null;
  const ig = idadeGestacional(dum, dataDeHoje);
  if (!ig) return null;
  return { ig, dpp, dum, fonte, diasParaDPP: diasEntre(dataDeHoje, dpp) };
}

/** 1º trimestre: até 13 semanas; 2º: 14 a 27; 3º: 28 em diante (guia, "Acompanhando o bebê"). */
export function trimestre(semanas) {
  if (semanas <= 13) return 1;
  if (semanas <= 27) return 2;
  return 3;
}

/** "24 semanas e 3 dias". */
export function formatarIG(ig) {
  if (!ig) return "";
  const s = `${ig.semanas} ${ig.semanas === 1 ? "semana" : "semanas"}`;
  if (ig.dias === 0) return s;
  return `${s} e ${ig.dias} ${ig.dias === 1 ? "dia" : "dias"}`;
}

/** Abreviação usada na caderneta: "24s 3d". */
export function formatarIGCurta(ig) {
  return ig ? `${ig.semanas}s ${ig.dias}d` : "";
}

/**
 * Valida a DUM informada: não pode ser no futuro nem de mais de 44 semanas atrás.
 * Devolve uma mensagem de erro ou null.
 */
export function validarDUM(dum, dataDeHoje) {
  if (!dataValida(dum)) return "Informe uma data válida.";
  const dias = diasEntre(dum, dataDeHoje);
  if (dias < 0) return "A data da última menstruação não pode ser no futuro.";
  if (dias > IG_MAXIMA_DIAS) return "Essa data é de mais de 44 semanas atrás. Confira o ano.";
  return null;
}

/**
 * Intervalo esperado entre consultas no risco habitual (guia, "Como funcionam as consultas?"):
 * até 28 semanas, ~1 por mês; de 28 a 36, ~a cada 15 dias; a partir de 36, ~1 por semana.
 */
export function intervaloEntreConsultas(semanas) {
  if (semanas < 28) return 30;
  if (semanas < 36) return 15;
  return 7;
}
