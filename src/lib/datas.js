/*
 * Datas "de calendário" (sem horário), no formato do banco: "AAAA-MM-DD".
 * Toda conta é feita em UTC para não sofrer com fuso/horário de verão, e o
 * "hoje" é o de Porto Velho (UTC-4), onde as gestantes estão.
 */
const DIA_MS = 24 * 60 * 60 * 1000;
export const FUSO = "America/Porto_Velho";

const FORMATO = /^\d{4}-\d{2}-\d{2}$/;

/** "AAAA-MM-DD" válido? (também rejeita 2026-02-30). */
export function dataValida(texto) {
  if (typeof texto !== "string" || !FORMATO.test(texto)) return false;
  const [a, m, d] = texto.split("-").map(Number);
  const data = new Date(Date.UTC(a, m - 1, d));
  return data.getUTCFullYear() === a && data.getUTCMonth() === m - 1 && data.getUTCDate() === d;
}

function paraDias(texto) {
  const [a, m, d] = texto.split("-").map(Number);
  return Date.UTC(a, m - 1, d) / DIA_MS;
}

function deDias(dias) {
  return new Date(dias * DIA_MS).toISOString().slice(0, 10);
}

/** Data de hoje em Porto Velho, "AAAA-MM-DD". */
export function hoje(agora = new Date()) {
  // en-CA formata como AAAA-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }).format(agora);
}

export function somarDias(data, dias) {
  return deDias(paraDias(data) + dias);
}

/** Quantos dias de `inicio` até `fim` (negativo se `fim` vier antes). */
export function diasEntre(inicio, fim) {
  return paraDias(fim) - paraDias(inicio);
}

/** "16/10/2026". */
export function formatarData(data) {
  if (!data) return "";
  const [a, m, d] = data.split("-");
  return `${d}/${m}/${a}`;
}

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** "16 de outubro de 2026". */
export function formatarDataExtenso(data) {
  if (!data) return "";
  const [a, m, d] = data.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}
