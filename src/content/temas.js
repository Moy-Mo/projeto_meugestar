import { duvidas } from "./duvidas";

/*
 * Temas indispensáveis da v1 que ainda não têm texto completo no guia.
 * O conteúdo será enviado pelos alunos e revisado pela equipe de saúde —
 * até lá as telas mostram "Conteúdo em preparação". Não preencher com texto provisório.
 * (Violência obstétrica já tem conteúdo e foi para /parto/violencia-obstetrica.)
 */

function mito(pergunta) {
  return duvidas.flatMap((g) => g.items).find((item) => item.question === pergunta);
}

export const temas = [
  {
    slug: "alimentacao",
    icon: "salad",
    title: "Alimentação adequada",
    summary: "Como se alimentar bem na gravidez",
    blocks: [
      { type: "myths", items: [mito("A gestante precisa comer por dois?")] },
      { type: "pending", topic: "Alimentação adequada" },
    ],
    videos: [],
  },
  {
    slug: "medicamentos",
    icon: "pill",
    title: "Medicamentos na gestação",
    summary: "Cuidados com remédios na gravidez",
    blocks: [
      {
        type: "callout",
        variant: "warning",
        title: "Não se automedique",
        text: "Só use remédios indicados pelo profissional de saúde.",
      },
      {
        type: "myths",
        items: [mito("A gestante pode tomar qualquer medicamento se a dose for pequena?")],
      },
      { type: "pending", topic: "Medicamentos na gestação" },
    ],
    videos: [],
  },
  {
    slug: "onde-ser-atendida",
    icon: "map-pin",
    title: "Onde ser atendida",
    summary: "Maternidades e emergências em Porto Velho",
    blocks: [
      {
        type: "callout",
        variant: "danger",
        title: "Em caso de urgência",
        text: "Ligue 192 (SAMU) ou vá à emergência da maternidade. Não espere a próxima consulta.",
      },
      { type: "emergency" },
      {
        type: "topicLink",
        href: "/parto/quando-procurar-a-maternidade",
        icon: "siren",
        title: "Quando procurar a maternidade?",
        description: "Sinais para não esperar a próxima consulta",
      },
      { type: "pending", topic: "Maternidades e serviços de emergência" },
    ],
    videos: [],
  },
];

export function getTema(slug) {
  return temas.find((t) => t.slug === slug);
}
