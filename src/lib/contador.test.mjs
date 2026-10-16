import { test } from "node:test";
import assert from "node:assert/strict";
import { caminhoAnonimo } from "./contador.js";

test("contador não guarda identificadores de paciente nem códigos de convite", () => {
  assert.equal(caminhoAnonimo("/ubs/gestante/3f2b8c1e-1a2b-4c3d-8e9f-0a1b2c3d4e5f"), "/ubs/gestante/:id");
  assert.equal(caminhoAnonimo("/convite/ABCD2345"), "/convite/:codigo");
  assert.equal(caminhoAnonimo("/pre-natal/sinais-de-alerta"), "/pre-natal/sinais-de-alerta");
});
