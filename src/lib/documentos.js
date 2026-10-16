/*
 * Validação e formatação de documentos brasileiros usados no cadastro.
 * Tudo é guardado só com os dígitos; a formatação é para mostrar na tela.
 */

export const soDigitos = (texto) => String(texto ?? "").replace(/\D/g, "");

/** CPF: 11 dígitos com os 2 dígitos verificadores da Receita Federal. */
export function cpfValido(cpf) {
  const d = soDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false; // 000.000.000-00 etc.
  const digito = (base) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (base.length + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(d.slice(0, 9)) === Number(d[9]) && digito(d.slice(0, 10)) === Number(d[10]);
}

/**
 * Cartão Nacional de Saúde (CNS / "número do SUS"): 15 dígitos.
 * Validação oficial do Ministério da Saúde: a soma ponderada (pesos 15 a 1)
 * precisa ser múltipla de 11. Começa com 1, 2, 7, 8 ou 9.
 */
export function cnsValido(cns) {
  const d = soDigitos(cns);
  if (d.length !== 15 || !/^[12789]/.test(d)) return false;
  let soma = 0;
  for (let i = 0; i < 15; i++) soma += Number(d[i]) * (15 - i);
  return soma % 11 === 0;
}

/** Celular ou fixo com DDD: 10 ou 11 dígitos; celular começa com 9 depois do DDD. */
export function telefoneValido(telefone) {
  const d = soDigitos(telefone);
  if (d.length === 11) return d[2] === "9" && Number(d.slice(0, 2)) >= 11;
  if (d.length === 10) return Number(d.slice(0, 2)) >= 11;
  return false;
}

export function formatarCPF(cpf) {
  const d = soDigitos(cpf).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

export function formatarCNS(cns) {
  const d = soDigitos(cns).slice(0, 15);
  return d.replace(/^(\d{3})(\d{0,4})(\d{0,4})(\d{0,4})$/, (_, a, b, c, e) =>
    [a, b, c, e].filter(Boolean).join(" "),
  );
}

export function formatarTelefone(telefone) {
  const d = soDigitos(telefone).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const meio = resto.length > 8 ? 5 : 4; // celular (9 dígitos) ou fixo (8)
  return resto.length > meio ? `(${ddd}) ${resto.slice(0, meio)}-${resto.slice(meio)}` : `(${ddd}) ${resto}`;
}

/** CPF parcialmente escondido para exibir: ***.456.789-** */
export function mascararCPF(cpf) {
  const d = soDigitos(cpf);
  return d.length === 11 ? `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**` : "";
}
