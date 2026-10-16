import { test } from "node:test";
import assert from "node:assert/strict";
import {
  cnsValido,
  cpfValido,
  formatarCNS,
  formatarCPF,
  formatarTelefone,
  mascararCPF,
  telefoneValido,
} from "./documentos.js";

// Números gerados só para teste (válidos pelo algoritmo, não pertencem a ninguém).
test("CPF: dígitos verificadores", () => {
  assert.equal(cpfValido("529.982.247-25"), true);
  assert.equal(cpfValido("52998224725"), true);
  assert.equal(cpfValido("529.982.247-24"), false); // dígito errado
  assert.equal(cpfValido("111.111.111-11"), false); // repetido
  assert.equal(cpfValido("1234"), false);
});

test("Cartão SUS (CNS): soma ponderada múltipla de 11", () => {
  assert.equal(cnsValido("898 0010 1810 2800"), true); // provisório (começa com 8)
  assert.equal(cnsValido("700000000000005"), true); // provisório (começa com 7)
  assert.equal(cnsValido("100 0000 0000 0007"), true); // definitivo (começa com 1)
  assert.equal(cnsValido("898 0010 1810 2805"), false); // dígito errado
  assert.equal(cnsValido("300 0000 0000 0000"), false); // não começa com 1, 2, 7, 8 ou 9
  assert.equal(cnsValido("1234"), false);
});

test("telefone com DDD", () => {
  assert.equal(telefoneValido("(69) 99999-1234"), true);
  assert.equal(telefoneValido("6932221234"), true); // fixo
  assert.equal(telefoneValido("(69) 89999-1234"), false); // celular sem o 9
  assert.equal(telefoneValido("99999-1234"), false); // sem DDD
});

test("formatação enquanto digita", () => {
  assert.equal(formatarCPF("52998224725"), "529.982.247-25");
  assert.equal(formatarCPF("5299"), "529.9");
  assert.equal(formatarCNS("898001018102800"), "898 0010 1810 2800");
  assert.equal(formatarTelefone("69999991234"), "(69) 99999-1234");
  assert.equal(formatarTelefone("6932221234"), "(69) 3222-1234");
  assert.equal(mascararCPF("52998224725"), "***.982.247-**");
});
