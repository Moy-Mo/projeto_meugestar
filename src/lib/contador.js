/**
 * Caminho "anônimo" para o contador de acessos: identificadores no endereço
 * (paciente, código de convite) viram ":id" / ":codigo" antes de contar.
 */
export function caminhoAnonimo(caminho) {
  return caminho
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, ":id")
    .replace(/^\/convite\/[^/]+/, "/convite/:codigo")
    .slice(0, 200);
}
