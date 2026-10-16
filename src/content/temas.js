/*
 * Temas avulsos da v1 (fora das áreas Pré-natal, Parto e Pós-parto).
 * Textos enviados pelos alunos e revisados pela equipe de saúde. Enquanto um tema
 * não tem texto, a tela mostra "Conteúdo em preparação" — não preencher com texto provisório.
 * (Violência obstétrica já tem conteúdo e foi para /parto/violencia-obstetrica.)
 */

export const temas = [
  {
    // Texto enviado pelos alunos em 2026-10-16 ("Alimentação na gestação: mitos e verdades,
    // alimentos recomendados e cuidados em cada trimestre").
    slug: "alimentacao",
    icon: "salad",
    title: "Alimentação na gestação",
    summary: "Mitos e verdades, o que comer e cuidados em cada trimestre",
    intro:
      "A gestação é um período de várias mudanças no corpo da mulher e exige alguns cuidados especiais com a alimentação. Uma alimentação saudável ajuda a manter a saúde da mãe e contribui para o crescimento e desenvolvimento adequado do bebê.",
    blocks: [
      {
        type: "text",
        text: "Nesse período, é importante consumir alimentos variados, como frutas, verduras, legumes, feijão, cereais, leite, ovos e carnes bem cozidas. Também é necessário ter cuidado com a higiene dos alimentos e evitar alguns produtos que podem oferecer riscos para a mãe e para o bebê.",
      },
      {
        type: "card",
        icon: "sprout",
        title: "Principais cuidados no início da gestação",
        text: "O primeiro trimestre é uma fase importante para a formação dos órgãos e do sistema nervoso do bebê. Por isso, os cuidados com a alimentação e o acompanhamento pré-natal devem começar assim que a gravidez for descoberta. Nessa fase, algumas mulheres apresentam enjoo, vômitos, cansaço, azia e mudanças no apetite, o que pode dificultar a alimentação.",
        items: [
          "Procurar a unidade de saúde para iniciar o pré-natal o mais cedo possível.",
          "Consumir alimentos variados, respeitando a tolerância alimentar da gestante.",
          "Comer em pequenas quantidades, se houver enjoo, evitando ficar muitas horas sem se alimentar.",
          "Beber água ao longo do dia.",
          "Consumir alimentos fontes de ferro, como feijão e carnes bem cozidas.",
          "Consumir frutas, verduras e legumes bem cozidos.",
          "Atenção à quantidade: na gestação, não é preciso comer por dois. A alimentação deve ser equilibrada e suficiente.",
        ],
      },
      { type: "heading", text: "Mitos e verdades sobre alimentação na gestação" },
      {
        type: "myths",
        items: [
          {
            question: "A gestante precisa comer por dois.",
            label: "Mito",
            verdict: "mito",
            text: "Não é necessário dobrar a quantidade de comida. As necessidades nutricionais mudam durante a gravidez, mas a alimentação deve ser ajustada conforme cada mulher.",
          },
          {
            question: "Comer frutas e verduras faz bem durante a gestação.",
            label: "Verdade",
            verdict: "verdade",
            text: "Esses alimentos fornecem vitaminas, minerais e fibras, que ajudam a manter uma alimentação equilibrada e o funcionamento intestinal.",
          },
          {
            question: "Todo chá natural é seguro para a gestante.",
            label: "Mito",
            verdict: "mito",
            text: "Nem todos os chás são seguros durante a gravidez. Algumas plantas podem apresentar riscos, por isso é importante consultar um profissional antes de consumir chás medicinais.",
          },
          {
            question: "É necessário ter cuidado com carnes cruas ou malpassadas.",
            label: "Verdade",
            verdict: "verdade",
            text: "Carnes cruas ou insuficientemente cozidas podem transmitir microrganismos e parasitas que oferecem riscos durante a gestação.",
          },
        ],
      },
      { type: "heading", text: "O que pode ou não comer na gestação" },
      {
        type: "card",
        icon: "salad",
        title: "Alimentos recomendados",
        items: [
          "Frutas: banana, maçã, mamão, laranja e outras frutas bem higienizadas.",
          "Verduras e legumes: cenoura, abóbora, couve, alface e brócolis.",
          "Cereais e tubérculos: arroz, aveia, milho, batata, mandioca e macaxeira.",
          "Leguminosas: feijão, lentilha e ervilha.",
          "Proteínas: frango, carne, peixe com baixo teor de mercúrio e ovos, sempre bem cozidos.",
          "Leite e derivados: leite pasteurizado, iogurte e queijos preparados com leite pasteurizado.",
          "Água: consumida ao longo do dia.",
        ],
      },
      {
        type: "card",
        tone: "danger",
        title: "Alimentos não recomendados",
        items: [
          "Bebidas alcoólicas: devem ser evitadas durante toda a gestação, pois não há quantidade comprovadamente segura.",
          "Carnes, peixes e frutos do mar crus ou malcozidos: podem transmitir infecções.",
          "Ovos crus ou malcozidos: podem apresentar risco de contaminação por Salmonella.",
          "Leite e queijos não pasteurizados: podem transmitir microrganismos prejudiciais.",
          "Peixes com alto teor de mercúrio: devem ser evitados, seguindo a orientação sobre as espécies apropriadas.",
          "Frutas, verduras e legumes mal higienizados: podem conter microrganismos e parasitas.",
          "Chás medicinais e suplementos sem orientação: podem apresentar riscos para a gestante.",
        ],
      },
      { type: "heading", text: "Cuidados em cada trimestre" },
      {
        type: "expandables",
        icon: "calendar-days",
        items: [
          {
            title: "1º trimestre",
            subtitle: "Da 1ª à 13ª semana",
            text: "É o período de formação inicial dos órgãos e de estruturas importantes do bebê. A gestante pode apresentar enjoo, vômitos, cansaço e alterações no apetite. Cuidados principais:",
            items: [
              "Iniciar o pré-natal.",
              "Consumir ácido fólico conforme orientação profissional.",
              "Manter uma alimentação variada.",
              "Fazer pequenas refeições, se necessário, para lidar com os enjoos.",
            ],
          },
          {
            title: "2º trimestre",
            subtitle: "Da 14ª à 27ª semana",
            text: "Nessa fase, o bebê continua crescendo e a gestante pode perceber melhora dos enjoos. As necessidades nutricionais aumentam conforme o desenvolvimento da gravidez. Cuidados principais:",
            items: [
              "Consumir alimentos ricos em ferro e proteínas.",
              "Incluir fontes de cálcio, como leite e derivados pasteurizados.",
              "Consumir frutas, verduras e legumes diariamente.",
              "Acompanhar o ganho de peso e os exames do pré-natal.",
            ],
          },
          {
            title: "3º trimestre",
            subtitle: "Da 28ª semana até o parto",
            text: "O bebê ganha peso e continua amadurecendo. A gestante pode sentir mais cansaço, azia, desconforto abdominal e sensação de estômago cheio. Cuidados principais:",
            items: [
              "Fazer refeições menores, se houver desconforto após comer.",
              "Manter o consumo de água e fibras.",
              "Continuar consumindo alimentos variados e nutritivos.",
              "Seguir as orientações de suplementação e comparecer às consultas do pré-natal.",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "A divisão por semanas é aproximada e segue a organização habitual dos trimestres. As necessidades de nutrientes e de suplementação variam conforme a gestante.",
      },
      {
        type: "callout",
        variant: "success",
        title: "Com orientação, mais segurança",
        text: "A alimentação durante a gestação é importante tanto para a saúde da mãe quanto para o desenvolvimento do bebê. Com orientações adequadas, acompanhamento pré-natal e hábitos alimentares saudáveis, a gestante pode passar por esse período com mais segurança e qualidade de vida.",
      },
      {
        type: "sources",
        items: [
          {
            text: "Ministério da Saúde. Caderneta da gestante. 4. ed. Brasília, DF, 2018.",
            href: "https://bvsms.saude.gov.br/bvs/publicacoes/caderneta_gestante_4ed.pdf",
          },
          {
            text: "Ministério da Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília, DF, 2014.",
            href: "https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf",
          },
          {
            text: "Ministério da Saúde. Fascículo 3: protocolo de uso do Guia Alimentar para a População Brasileira na orientação alimentar da gestante. Brasília, DF, 2021.",
            href: "https://bvsms.saude.gov.br/bvs/publicacoes/protocolos_guia_alimentar_fasciculo3.pdf",
          },
        ],
      },
    ],
    videos: [],
  },
  {
    // Lista enviada pelos alunos em 2026-10-16, publicada SÓ no que foi conferido com a fonte
    // oficial abaixo (SEMUSA, 2024). Telefones e endereços de urgência não podem estar errados:
    // antes de incluir uma unidade, confirme os dados numa fonte oficial.
    slug: "onde-ser-atendida",
    icon: "map-pin",
    title: "Onde ser atendida",
    summary: "Maternidade e pronto atendimento em Porto Velho",
    intro:
      "Os principais serviços de urgência e de atenção à gestante da rede municipal de saúde de Porto Velho. Para o pré-natal, procure a UBS do seu bairro.",
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
      { type: "heading", text: "Maternidade" },
      {
        type: "locais",
        items: [
          {
            nome: "Maternidade Municipal Mãe Esperança",
            descricao:
              "Funciona 24 horas. É referência para urgências obstétricas, partos de risco habitual, planejamento reprodutivo e atendimento a mulheres em situação de violência sexual.",
            endereco: "Rua Venezuela (antiga Rua Antônio Lourenço Pereira Lima) — Bairro Embratel",
            telefones: ["6939012838"],
            destaque: true,
          },
        ],
      },
      { type: "heading", text: "Gestação de alto risco" },
      {
        type: "locais",
        items: [
          {
            nome: "Centro Integrado Materno Infantil",
            descricao:
              "Atende gestantes de alto risco e crianças de 0 a 2 anos com condições de alto risco. As consultas são marcadas a partir do encaminhamento da sua UBS.",
            endereco: "Av. Dom Pedro II, 2687 — Bairro São Cristóvão",
            horario: "Segunda a sexta, das 7h às 19h",
            telefones: ["6939013375"],
          },
        ],
      },
      { type: "heading", text: "Pronto atendimento 24 horas" },
      {
        type: "text",
        text: "Para urgências em geral. Em caso de sinais de alerta da gravidez, prefira a maternidade ou ligue 192.",
      },
      {
        type: "locais",
        items: [
          {
            nome: "UPA Zona Sul",
            endereco: "Rua Urtiga Vermelha, esquina com Av. Jatuarana — Cohab Floresta",
            telefones: ["6939013335"],
          },
          {
            nome: "UPA Zona Leste",
            endereco: "Av. Mamoré, 3585 — Bairro Tancredo Neves",
            telefones: ["6939013349"],
          },
          {
            nome: "Pronto Atendimento Ana Adelaide",
            endereco: "Rua Padre Chiquinho, 1060 — Bairro Pedrinhas",
            telefones: ["6939012961"],
          },
          {
            nome: "Pronto Atendimento José Adelino",
            endereco: "Rua Blumenau, 11646 — Bairro Ulisses Guimarães",
            telefones: ["6939012801"],
          },
          {
            nome: "UPA Jacy-Paraná",
            endereco: "Rua José Saleh, s/n — Distrito de Jacy-Paraná",
            telefones: ["69996008784"],
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Confira antes de ir",
        text: "Endereços, telefones e horários podem mudar. Na dúvida, ligue para a unidade ou pergunte na sua UBS. Dados conferidos em outubro de 2026.",
      },
      {
        type: "sources",
        items: [
          {
            text: "Prefeitura de Porto Velho. Secretaria Municipal de Saúde (SEMUSA). Rede de saúde: unidades de urgência e emergência, maternidade e rede especializada, 2024.",
            href: "https://transp-arquivos.portovelho.ro.gov.br/uploads/arquivos/2024/08/49573/1725049336semusa-1.pdf",
          },
        ],
      },
    ],
    videos: [],
  },
];

export function getTema(slug) {
  return temas.find((t) => t.slug === slug);
}
