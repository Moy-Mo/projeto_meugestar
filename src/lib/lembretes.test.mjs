import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularLembretes } from "./lembretes.js";

const HOJE = "2026-10-16";
const ids = (lista) => lista.map((l) => l.id);

test("sem DUM: pede a data da última menstruação", () => {
  assert.deepEqual(ids(calcularLembretes({ gestacao: { dum: null } }, HOJE)), ["sem-dum"]);
});

test("dTpa a partir de 20 semanas e VSR a partir de 28, se não registradas", () => {
  // DUM 2026-05-01 → 24 semanas em 16/10
  const com24 = ids(calcularLembretes({ gestacao: { dum: "2026-05-01" } }, HOJE));
  assert.ok(com24.includes("dtpa"));
  assert.ok(!com24.includes("vsr"));

  // DUM 2026-03-27 → 29 semanas
  const com29 = calcularLembretes(
    { gestacao: { dum: "2026-03-27" }, vacinas: [{ id: 1, vacina: "dTpa", data_dose: "2026-09-01" }] },
    HOJE,
  );
  assert.ok(!ids(com29).includes("dtpa"));
  assert.ok(ids(com29).includes("vsr"));
  assert.ok(ids(com29).includes("pediatra"));
});

test("dose atrasada vem primeiro; próxima dose em até 30 dias é 'agendado'", () => {
  const lista = calcularLembretes(
    {
      gestacao: { dum: "2026-08-01" },
      vacinas: [
        { id: "a", vacina: "Hepatite B", proxima_dose: "2026-10-01" },
        { id: "b", vacina: "dT", proxima_dose: "2026-10-30" },
        { id: "c", vacina: "Influenza", proxima_dose: "2027-03-01" },
      ],
    },
    HOJE,
  );
  assert.equal(lista[0].id, "dose-a");
  assert.equal(lista[0].nivel, "atrasado");
  assert.equal(lista.find((l) => l.id === "dose-b").nivel, "agendado");
  assert.ok(!ids(lista).includes("dose-c"));
});

test("consultas: mostra a próxima marcada ou avisa quando passou do intervalo do guia", () => {
  const marcada = calcularLembretes(
    {
      gestacao: { dum: "2026-08-01" },
      consultas: [
        { id: 1, data: "2026-11-20" },
        { id: 2, data: "2026-10-25" },
      ],
    },
    HOJE,
  );
  assert.ok(ids(marcada).includes("consulta-2")); // a mais próxima

  // 24 semanas (mensal), última consulta há 40 dias → avisar
  const atrasada = calcularLembretes(
    { gestacao: { dum: "2026-05-01" }, consultas: [{ id: 1, data: "2026-09-06" }] },
    HOJE,
  );
  assert.ok(ids(atrasada).includes("marcar-consulta"));

  // 24 semanas, última há 10 dias → ainda não
  const emDia = calcularLembretes(
    { gestacao: { dum: "2026-05-01" }, consultas: [{ id: 1, data: "2026-10-06" }] },
    HOJE,
  );
  assert.ok(!ids(emDia).includes("marcar-consulta"));
});
