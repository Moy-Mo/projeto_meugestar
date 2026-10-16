import { parto } from "./parto";
import { posParto } from "./pos-parto";
import { preNatal } from "./pre-natal";

// Áreas de conteúdo do app, na ordem das fases: gestação → parto → pós-parto.
// Cada área tem a mesma forma: { id, basePath, icon, title, intro, notice?, grupos, topicos }.
// `ilustracao`: qual gestante aparece no cabeçalho da área (0 a 7).
export const areas = {
  preNatal: { ...preNatal, ilustracao: 1 },
  parto: { ...parto, ilustracao: 5 },
  posParto: { ...posParto, ilustracao: 2 },
};

export function getTopico(area, slug) {
  return area.topicos.find((t) => t.slug === slug);
}

// Rodízio das ilustrações: cada assunto recebe a próxima gestante, na ordem do app.
// Assim todas aparecem por igual e dois assuntos seguidos nunca repetem a mesma.
const ordem = Object.values(areas).flatMap((area) => area.topicos.map((t) => t.slug));

export function ilustracaoDoTopico(slug) {
  const posicao = ordem.indexOf(slug);
  return posicao === -1 ? slug : posicao;
}
