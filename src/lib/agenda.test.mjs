import { test } from "node:test";
import assert from "node:assert/strict";
import { arquivoICS, linkGoogleAgenda } from "./agenda.js";

test("Google Agenda: consulta com horário (1 hora, fuso de Porto Velho)", () => {
  const url = new URL(
    linkGoogleAgenda({ titulo: "Consulta do pré-natal", data: "2026-10-20", hora: "14:30", local: "UBS Centro" }),
  );
  assert.equal(url.hostname, "calendar.google.com");
  assert.equal(url.searchParams.get("action"), "TEMPLATE");
  assert.equal(url.searchParams.get("dates"), "20261020T143000/20261020T153000");
  assert.equal(url.searchParams.get("ctz"), "America/Porto_Velho");
  assert.equal(url.searchParams.get("location"), "UBS Centro");
});

test("Google Agenda: sem horário vira evento de dia inteiro", () => {
  const url = new URL(linkGoogleAgenda({ titulo: "Vacina", data: "2026-12-31" }));
  assert.equal(url.searchParams.get("dates"), "20261231/20270101");
  assert.equal(url.searchParams.get("ctz"), null);
});

test("consulta às 23:30 termina no dia seguinte", () => {
  const url = new URL(linkGoogleAgenda({ titulo: "X", data: "2026-10-20", hora: "23:30" }));
  assert.equal(url.searchParams.get("dates"), "20261020T233000/20261021T003000");
});

test("arquivo .ics válido, com lembrete 1 dia antes e texto escapado", () => {
  const ics = arquivoICS({
    id: "abc",
    titulo: "Exame: Glicemia, jejum",
    data: "2026-10-20",
    hora: "07:00",
    detalhes: "Leve a caderneta; vá em jejum",
  });
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/);
  assert.match(ics, /DTSTART;TZID=America\/Porto_Velho:20261020T070000/);
  assert.match(ics, /SUMMARY:Exame: Glicemia\\, jejum/);
  assert.match(ics, /DESCRIPTION:Leve a caderneta\\; vá em jejum/);
  assert.match(ics, /TRIGGER:-P1D/);
  assert.match(ics, /END:VCALENDAR$/);
});
