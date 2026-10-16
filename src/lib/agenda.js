import { FUSO, somarDias } from "./datas.js";

/*
 * Links para colocar consultas, exames e doses de vacina na agenda do celular.
 * - Google Agenda: link "modelo de evento" — abre o Google Agenda já preenchido,
 *   a pessoa só confirma. Não precisa de login no Meu Gestar nem de permissão
 *   especial do Google.
 * - Arquivo .ics: funciona no iPhone e em outros aplicativos de agenda.
 * Sem horário, o evento fica como "dia inteiro". Com horário, dura 1 hora,
 * no fuso de Porto Velho.
 */

const DURACAO_MIN = 60;

const compacta = (data) => data.replaceAll("-", "");

function somarMinutos(hora, minutos) {
  const [h, m] = hora.split(":").map(Number);
  const total = h * 60 + m + minutos;
  return { hora: `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`, viraDia: total >= 24 * 60 };
}

/** Início e fim no formato das agendas (AAAAMMDD ou AAAAMMDDTHHMMSS, hora local). */
function periodo(data, hora) {
  if (!hora) return { inicio: compacta(data), fim: compacta(somarDias(data, 1)), diaInteiro: true };
  const fim = somarMinutos(hora, DURACAO_MIN);
  const dataFim = fim.viraDia ? somarDias(data, 1) : data;
  return {
    inicio: `${compacta(data)}T${hora.replace(":", "")}00`,
    fim: `${compacta(dataFim)}T${fim.hora.replace(":", "")}00`,
    diaInteiro: false,
  };
}

export function linkGoogleAgenda({ titulo, data, hora, local, detalhes }) {
  const { inicio, fim, diaInteiro } = periodo(data, hora);
  const params = new URLSearchParams({ action: "TEMPLATE", text: titulo, dates: `${inicio}/${fim}` });
  if (!diaInteiro) params.set("ctz", FUSO);
  if (detalhes) params.set("details", detalhes);
  if (local) params.set("location", local);
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Texto do .ics precisa escapar vírgula, ponto e vírgula e quebras de linha.
const escapar = (texto) => String(texto).replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

/** Conteúdo de um arquivo .ics com um evento (e um lembrete 1 dia antes). */
export function arquivoICS({ id, titulo, data, hora, local, detalhes }) {
  const { inicio, fim, diaInteiro } = periodo(data, hora);
  const tempo = (valor) => (diaInteiro ? `;VALUE=DATE:${valor}` : `;TZID=${FUSO}:${valor}`);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Meu Gestar//PT-BR",
    "BEGIN:VEVENT",
    `UID:${id}@meugestar`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART${tempo(inicio)}`,
    `DTEND${tempo(fim)}`,
    `SUMMARY:${escapar(titulo)}`,
    detalhes && `DESCRIPTION:${escapar(detalhes)}`,
    local && `LOCATION:${escapar(local)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapar(titulo)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
