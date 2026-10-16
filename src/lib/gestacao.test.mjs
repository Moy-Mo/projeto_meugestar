import { test } from "node:test";
import assert from "node:assert/strict";
import { dataValida, diasEntre, hoje, somarDias } from "./datas.js";
import {
  dataProvavelDoParto,
  formatarIG,
  idadeGestacional,
  intervaloEntreConsultas,
  resumoDaGestacao,
  trimestre,
  validarDUM,
} from "./gestacao.js";

test("datas: validação e contas sem fuso", () => {
  assert.equal(dataValida("2026-02-28"), true);
  assert.equal(dataValida("2026-02-30"), false);
  assert.equal(dataValida("16/10/2026"), false);
  assert.equal(somarDias("2026-12-31", 1), "2027-01-01");
  assert.equal(diasEntre("2026-01-01", "2026-03-01"), 59);
  assert.equal(diasEntre("2028-02-28", "2028-03-01"), 2); // ano bissexto
});

test("hoje é calculado no fuso de Porto Velho (UTC-4)", () => {
  // 02:00 UTC de 17/10 ainda é 22:00 de 16/10 em Porto Velho.
  assert.equal(hoje(new Date("2026-10-17T02:00:00Z")), "2026-10-16");
  assert.equal(hoje(new Date("2026-10-17T05:00:00Z")), "2026-10-17");
});

test("idade gestacional pela DUM", () => {
  assert.deepEqual(idadeGestacional("2026-05-01", "2026-05-01"), { semanas: 0, dias: 0, totalDias: 0 });
  assert.deepEqual(idadeGestacional("2026-05-01", "2026-10-16"), { semanas: 24, dias: 0, totalDias: 168 });
  assert.equal(idadeGestacional("2026-10-20", "2026-10-16"), null); // DUM no futuro
  assert.equal(idadeGestacional("2025-01-01", "2026-10-16"), null); // mais de 44 semanas
  assert.equal(formatarIG({ semanas: 24, dias: 1 }), "24 semanas e 1 dia");
  assert.equal(formatarIG({ semanas: 1, dias: 0 }), "1 semana");
});

test("DPP pela regra de Naegele (DUM + 280 dias)", () => {
  assert.equal(dataProvavelDoParto("2026-01-01"), "2026-10-08");
  assert.equal(dataProvavelDoParto("2026-05-01"), "2027-02-05");
  assert.equal(dataProvavelDoParto("inválida"), null);
});

test("trimestres e intervalo entre consultas seguem o guia", () => {
  assert.equal(trimestre(13), 1);
  assert.equal(trimestre(14), 2);
  assert.equal(trimestre(27), 2);
  assert.equal(trimestre(28), 3);
  assert.equal(intervaloEntreConsultas(27), 30);
  assert.equal(intervaloEntreConsultas(28), 15);
  assert.equal(intervaloEntreConsultas(36), 7);
});

test("resumo: a DPP do ultrassom tem prioridade sobre a DUM", () => {
  const pelaDUM = resumoDaGestacao({ dum: "2026-05-01" }, "2026-10-16");
  assert.equal(pelaDUM.fonte, "dum");
  assert.equal(pelaDUM.dpp, "2027-02-05");
  assert.equal(pelaDUM.ig.semanas, 24);
  assert.equal(pelaDUM.diasParaDPP, 112);

  const peloUS = resumoDaGestacao({ dum: "2026-05-01", dpp_ultrassom: "2027-02-12" }, "2026-10-16");
  assert.equal(peloUS.fonte, "ultrassom");
  assert.equal(peloUS.dpp, "2027-02-12");
  assert.deepEqual(peloUS.ig, { semanas: 23, dias: 0, totalDias: 161 });

  assert.equal(resumoDaGestacao({ dum: null }, "2026-10-16"), null);
});

test("validação da DUM", () => {
  assert.equal(validarDUM("2026-05-01", "2026-10-16"), null);
  assert.match(validarDUM("2026-11-01", "2026-10-16"), /futuro/);
  assert.match(validarDUM("2025-01-01", "2026-10-16"), /44 semanas/);
  assert.match(validarDUM("", "2026-10-16"), /válida/);
});
