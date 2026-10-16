import { dataValida } from "./datas.js";

/*
 * Validação de formulários no servidor a partir da lista de campos
 * (mesma forma de src/lib/caderneta-config.js). Mensagens em linguagem simples.
 * Devolve { dados, erros, valores }:
 *   dados  — valores convertidos, prontos para o banco (vazios viram null)
 *   erros  — { campo: "mensagem" }
 *   valores — o que a pessoa digitou, para devolver ao formulário
 */
export function validarCampos(campos, formData) {
  const dados = {};
  const erros = {};
  const valores = {};

  for (const campo of campos) {
    const bruto = String(formData.get(campo.nome) ?? "").trim();
    valores[campo.nome] = bruto;

    if (bruto === "") {
      if (campo.obrigatorio) erros[campo.nome] = "Preencha este campo.";
      dados[campo.nome] = null;
      continue;
    }

    if (campo.tipo === "date") {
      if (!dataValida(bruto)) erros[campo.nome] = "Informe uma data válida.";
      else dados[campo.nome] = bruto;
    } else if (campo.tipo === "number") {
      const numero = Number(bruto.replace(",", "."));
      if (!Number.isFinite(numero)) erros[campo.nome] = "Digite só números.";
      else if (campo.inteiro && !Number.isInteger(numero)) erros[campo.nome] = "Digite um número inteiro.";
      else if (campo.min !== undefined && numero < campo.min) erros[campo.nome] = `O valor mínimo é ${campo.min}.`;
      else if (campo.max !== undefined && numero > campo.max) erros[campo.nome] = `O valor máximo é ${campo.max}.`;
      else dados[campo.nome] = numero;
    } else {
      if (campo.maxLength && bruto.length > campo.maxLength) {
        erros[campo.nome] = `Use no máximo ${campo.maxLength} caracteres.`;
      } else dados[campo.nome] = bruto;
    }
  }

  return { dados, erros, valores };
}

export const temErros = (erros) => Object.keys(erros).length > 0;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const emailValido = (email) => EMAIL.test(email);
