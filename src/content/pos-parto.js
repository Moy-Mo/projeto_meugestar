/*
 * Área "Pós-parto e amamentação".
 * Fonte: guia "Meu Gestar — Pré-natal e Acompanhamento (Completo)", seção
 * "Pós-parto e amamentação". Não altere textos clínicos sem revisão da equipe de saúde.
 */

const fontes = {
  type: "sources",
  items: [
    {
      text: "Ministério da Saúde. Caderno de Atenção Básica nº 23: Saúde da criança: aleitamento materno e alimentação complementar.",
    },
    { text: "OMS. Recomendações sobre cuidados maternos e neonatais pós-natais (2022)." },
    { text: "OMS. Guideline: Counselling of women to improve breastfeeding practices (2018)." },
    { text: "OMS/UNICEF. Implementation guidance (2021). Aconselhamento e suporte à lactante." },
    {
      text: "Ministério da Saúde. Amamentação (2026). Recomendações nacionais atuais.",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/amamentacao",
    },
  ],
};

export const posParto = {
  id: "pos-parto",
  basePath: "/pos-parto",
  icon: "house-heart",
  title: "Pós-parto e amamentação",
  intro:
    "Os primeiros dias e semanas depois do nascimento. Cuidar de você também é cuidar do seu bebê. Pedir ajuda faz parte do cuidado.",
  notice:
    "Cada mulher e cada bebê são diferentes. Em caso de dúvida, procure a Unidade Básica de Saúde, a maternidade ou o seu profissional de saúde.",
  grupos: [
    { id: "puerperio", title: "Depois do parto" },
    { id: "amamentacao", title: "Amamentação" },
    { id: "apoio", title: "Apoio e direitos" },
  ],
  topicos: [
    // ─── Depois do parto ────────────────────────────────────────────────────
    {
      slug: "puerperio",
      group: "puerperio",
      icon: "flower",
      title: "O puerpério: o que esperar",
      summary: "Mudanças no corpo, nas emoções e na rotina",
      intro:
        "O puerpério (ou pós-parto) é o período que começa logo após o nascimento e dura, em geral, até cerca de 6 semanas. É uma fase de grandes mudanças no corpo, nas emoções e na rotina da família. Nada disso significa que algo está errado: o corpo está voltando ao estado anterior à gravidez.",
      blocks: [
        {
          type: "card",
          icon: "heart-pulse",
          title: "No corpo",
          items: [
            "Sangramento vaginal (lóquios), que diminui aos poucos e muda de cor ao longo das semanas.",
            "Cólicas no útero, mais fortes durante as mamadas, nos primeiros dias.",
            "Dor ou desconforto na região do parto normal (períneo) ou na cicatriz da cesárea.",
            "Seios mais cheios e sensíveis quando o leite \"desce\", em geral entre o 2º e o 5º dia.",
            "Suor, cansaço e alterações do intestino.",
          ],
        },
        {
          type: "card",
          icon: "brain",
          title: "Nas emoções e na rotina",
          items: [
            "Alegria, medo, cansaço e choro podem aparecer no mesmo dia.",
            "Sono picado, porque o bebê mama muitas vezes, inclusive à noite.",
            "Insegurança com os cuidados do recém-nascido.",
            "Mudança na relação com o corpo, com o parceiro e com a família.",
            "Necessidade de ajuda prática em casa.",
          ],
        },
        {
          type: "card",
          title: "Tristeza passageira ou algo mais?",
          text: "É comum sentir tristeza, choro fácil e irritação nos primeiros dias depois do parto. Esse quadro costuma melhorar sozinho em cerca de duas semanas, com descanso, apoio e acolhimento.",
        },
        {
          type: "callout",
          variant: "danger",
          title: "Procure ajuda sem demora",
          text: "Se a tristeza for intensa, durar mais tempo, atrapalhar os cuidados com você ou com o bebê, ou vier com pensamentos de se machucar ou de machucar o bebê. A depressão pós-parto tem tratamento.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Consultas no pós-parto",
          text: "O Ministério da Saúde orienta a consulta de puerpério na primeira semana e outra até cerca de 42 dias após o parto. A OMS recomenda contatos com a equipe de saúde no primeiro dia, por volta do 3º dia, entre o 7º e o 14º dia e em torno de 6 semanas.",
        },
        fontes,
      ],
      videos: [],
    },
    {
      slug: "recuperacao",
      group: "puerperio",
      icon: "bed",
      title: "Recuperação do corpo e da mente",
      summary: "Descanso, cuidados e movimento",
      intro:
        "Não existe jeito \"certo\" de se sentir no pós-parto. Cuidar da sua saúde física e emocional é parte do cuidado com o bebê.",
      blocks: [
        {
          type: "checklist",
          id: "recuperacao-cuidados",
          badge: "essencial",
          title: "Cuidados básicos",
          items: [
            "Descansar sempre que possível, inclusive durante o dia, quando o bebê dormir.",
            "Manter boa alimentação, com comidas variadas e água ao longo do dia.",
            "Higiene íntima com água e sabonete neutro; trocar absorventes com frequência.",
            "Manter limpos e secos os pontos do períneo ou a cicatriz da cesárea.",
            "Aceitar ajuda de familiares e amigos nas tarefas da casa.",
          ],
        },
        {
          type: "card",
          badge: "essencial",
          title: "Movimentar-se com cuidado",
          items: [
            "Caminhadas leves costumam ser bem-vindas, aos poucos, se a equipe liberar.",
            "Evitar pegar peso e esforço intenso até ser orientada.",
            "Após cesárea, levantar-se com apoio e evitar movimentos bruscos.",
            "Voltar a exercícios mais intensos só com liberação do profissional.",
          ],
        },
        {
          type: "card",
          badge: "essencial",
          title: "Cicatriz, períneo e dor",
          text: "Dor leve a moderada nos primeiros dias é esperada. Se a dor aumentar, se a região ficar muito vermelha, inchada, com secreção ou mau cheiro, ou se houver febre, procure atendimento. Medicamentos para dor devem ser usados conforme a orientação da equipe, principalmente durante a amamentação.",
        },
        {
          type: "card",
          badge: "essencial",
          title: "Relações sexuais e contracepção",
          text: "Não há data única para voltar às relações. Em geral, espera-se o conforto físico e a orientação da equipe na consulta de puerpério. Amamentar não garante, por si só, proteção contra uma nova gravidez: converse na consulta sobre um método contraceptivo adequado para quem amamenta.",
        },
        {
          type: "card",
          badge: "recomendado",
          title: "Também ajuda",
          items: [
            "Planejar refeições simples e prontas para os primeiros dias.",
            "Combinar com a rede de apoio quem ajuda em cada tarefa.",
            "Evitar bebidas alcoólicas e cigarro e conversar com a equipe antes de usar medicamentos ou chás.",
          ],
        },
        fontes,
      ],
      videos: [],
    },
    {
      slug: "sinais-de-alerta-pos-parto",
      group: "puerperio",
      icon: "siren",
      title: "Sinais de alerta no pós-parto",
      summary: "Na mulher e no bebê",
      intro:
        "Procure atendimento sem esperar a próxima consulta quando houver qualquer um destes sinais.",
      blocks: [
        {
          type: "card",
          tone: "danger",
          badge: "urgencia",
          title: "Na mulher",
          items: [
            "Sangramento muito intenso (por exemplo, encharcar um absorvente em cerca de 1 hora) ou saída de coágulos grandes.",
            "Febre (a partir de 38 °C) ou calafrios.",
            "Secreção vaginal com mau cheiro.",
            "Dor forte na barriga que não melhora.",
            "Cicatriz ou pontos com vermelhidão, calor, secreção ou abertura.",
            "Dor, inchaço ou vermelhidão em uma das pernas.",
            "Falta de ar, dor no peito, desmaio ou convulsão.",
            "Dor de cabeça forte ou alteração na visão.",
            "Seio vermelho, quente e dolorido com febre.",
            "Tristeza intensa ou pensamentos de se ferir ou ferir o bebê.",
          ],
        },
        {
          type: "card",
          tone: "danger",
          badge: "urgencia",
          title: "No bebê",
          items: [
            "Não consegue mamar, recusa o peito ou mama muito pouco.",
            "Muito sonolento, difícil de acordar para mamar.",
            "Febre ou temperatura muito baixa.",
            "Pele e olhos amarelados que aumentam ou chegam à barriga e às pernas.",
            "Poucas fraldas molhadas ou urina muito escura.",
            "Respiração difícil, gemido ou lábios arroxeados.",
            "Vômitos repetidos ou barriga muito distendida.",
            "Umbigo com vermelhidão, secreção ou mau cheiro.",
            "Choro diferente do habitual, irritabilidade intensa ou moleza.",
          ],
        },
        {
          type: "callout",
          variant: "danger",
          title: "Urgência",
          text: "Em caso de suspeita de urgência grave, ligue para o SAMU: 192. Mulheres com condições de saúde específicas ou gestação de alto risco devem seguir o plano individual definido pela equipe responsável.",
        },
        { type: "emergency" },
        {
          type: "links",
          items: [
            {
              label: "Em sofrimento emocional intenso: ligue 188 (CVV)",
              description: "Centro de Valorização da Vida — apoio emocional gratuito",
              href: "tel:188",
            },
          ],
        },
        fontes,
      ],
      videos: [],
    },

    // ─── Amamentação ────────────────────────────────────────────────────────
    {
      slug: "comecando-a-amamentar",
      group: "amamentacao",
      icon: "milk",
      title: "Começando a amamentar",
      summary: "Primeiras mamadas e sinais de fome",
      intro:
        "A amamentação é natural, mas é também uma habilidade que mãe e bebê aprendem juntos. É normal precisar de ajuda no começo.",
      blocks: [
        {
          type: "card",
          badge: "essencial",
          title: "Nas primeiras horas",
          items: [
            "Se mãe e bebê estiverem bem, o contato pele a pele logo após o nascimento ajuda o bebê a procurar o peito.",
            "A primeira mamada, ainda na primeira hora de vida, é incentivada.",
            "O primeiro leite (colostro) é produzido em pequena quantidade e é muito importante para o bebê.",
            "Pedir ajuda da equipe na primeira mamada.",
          ],
        },
        {
          type: "card",
          badge: "essencial",
          title: "Nos primeiros dias e meses",
          items: [
            "Oferecer o peito sempre que o bebê der sinais de fome, de dia e de noite (livre demanda).",
            "Em geral, são 8 a 12 mamadas em 24 horas no início.",
            "Aleitamento materno exclusivo até 6 meses.",
            "Depois, continuar amamentando junto com alimentos adequados até 2 anos ou mais.",
          ],
        },
        {
          type: "card",
          title: "Sinais de fome do bebê",
          text: "Colocar a mão na boca, fazer movimentos de sucção, virar a cabeça procurando o peito e ficar mais agitado. Choro é um sinal tardio: vale oferecer o peito antes dele.",
        },
        {
          type: "card",
          title: "Como saber se o bebê está mamando bem",
          items: [
            "Mama com frequência e parece satisfeito depois das mamadas.",
            "Tem fraldas molhadas e evacuações regulares; após os primeiros dias, em geral 6 ou mais fraldas molhadas por dia.",
            "Ganha peso conforme acompanhado pela equipe.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Essencial",
          text: "Mamadeira, chupeta e bicos podem atrapalhar o aprendizado da pega no início. Não use por rotina e, se precisar, converse antes com a equipe de saúde.",
        },
        {
          type: "topicLink",
          href: "/pos-parto/pega-e-posicoes",
          icon: "hand-heart",
          title: "Pega e posições",
          description: "Passo a passo para uma boa pega",
        },
        fontes,
      ],
      videos: [],
    },
    {
      slug: "pega-e-posicoes",
      group: "amamentacao",
      icon: "hand-heart",
      title: "Pega e posições",
      summary: "Passo a passo e posições para amamentar",
      intro:
        "A pega é a forma como o bebê abocanha a mama. Uma boa pega protege os mamilos, ajuda o bebê a retirar o leite e evita muitas dificuldades.",
      blocks: [
        {
          type: "card",
          badge: "essencial",
          title: "Sinais de boa pega",
          items: [
            "Boca bem aberta, abocanhando o mamilo e boa parte da aréola.",
            "Lábio inferior virado para fora.",
            "Queixo encostado na mama.",
            "Mais aréola visível acima da boca do que abaixo.",
            "Sucções lentas e profundas, com pausas, e deglutição.",
            "Mamada sem dor (um desconforto leve no início pode ocorrer).",
          ],
        },
        {
          type: "card",
          tone: "danger",
          title: "Sinais de pega a ajustar",
          items: [
            "Dor que continua durante a mamada.",
            "Bochechas \"para dentro\" ou estalidos.",
            "Mamilo achatado, com marca ou \"bico de batom\" ao sair da boca do bebê.",
            "Bebê agitado, soltando e pegando o peito várias vezes.",
            "Mamilo machucado.",
          ],
        },
        {
          type: "heading",
          text: "Passo a passo para uma boa pega",
        },
        {
          type: "steps",
          steps: [
            { title: "Fique em posição confortável, com costas e braços apoiados." },
            {
              title: "Deixe o bebê com a barriga junto da sua, cabeça e corpo alinhados e nariz na altura do mamilo.",
            },
            { title: "Apoie a mama com a mão em \"C\", longe da aréola." },
            { title: "Toque o lábio do bebê com o mamilo e espere a boca abrir bem." },
            { title: "Leve o bebê à mama, e não a mama ao bebê." },
            {
              title: "Para retirar, coloque o dedo limpo no canto da boca do bebê e interrompa a sucção.",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Atenção",
          text: "Se a mamada dói ou o mamilo machuca, não é preciso insistir: ajuste a pega ou peça ajuda a um profissional.",
        },
        {
          type: "heading",
          text: "Posições para amamentar",
        },
        {
          type: "text",
          text: "Não existe posição única. A melhor é a que deixa mãe e bebê confortáveis e permite uma boa pega.",
        },
        {
          type: "expandables",
          icon: "baby",
          items: [
            {
              title: "Sentada (tradicional)",
              subtitle: "Posição mais comum; boa para o dia a dia",
              text: "Mãe sentada com as costas apoiadas; bebê deitado de lado no colo, barriga com barriga.",
            },
            {
              title: "Deitada de lado",
              subtitle: "Descanso, noite e pós-cesárea",
              text: "Mãe e bebê deitados frente a frente, com apoio de travesseiros para a mãe.",
            },
            {
              title: "Invertida (\"bola de futebol\")",
              subtitle: "Pós-cesárea, mamas grandes, gêmeos",
              text: "Bebê apoiado ao lado do corpo da mãe, com as pernas para trás; cabeça apoiada na mão.",
            },
            {
              title: "Cavalinho",
              subtitle: "Bebês maiores e que engasgam com facilidade",
              text: "Bebê sentado de frente para a mãe, com as pernas ao redor da cintura.",
            },
          ],
        },
        {
          type: "callout",
          variant: "danger",
          title: "Segurança",
          text: "Se a mamada for à noite e você sentir sono, coloque o bebê de volta no berço, de barriga para cima, em superfície firme. Evite adormecer com o bebê no sofá ou na poltrona.",
        },
        fontes,
      ],
      videos: [],
    },
    {
      slug: "dificuldades-na-amamentacao",
      group: "amamentacao",
      icon: "life-buoy",
      title: "Dificuldades comuns e como lidar",
      summary: "Mamilo machucado, seio cheio, pouco leite…",
      intro:
        "Dificuldades são comuns e, na maioria das vezes, têm solução com ajuda precoce. Procure a Unidade Básica de Saúde, a maternidade ou um Banco de Leite Humano. Toque em cada situação.",
      blocks: [
        {
          type: "expandables",
          icon: "life-buoy",
          items: [
            {
              title: "Mamilos machucados (fissuras)",
              text: "O que pode ajudar: corrigir a pega; começar pela mama menos dolorida; deixar os mamilos secarem ao ar; passar um pouco do próprio leite no fim da mamada.",
              footer: "Quando procurar ajuda: se não melhorar em poucos dias ou houver sangramento ou secreção.",
            },
            {
              title: "Seios muito cheios (ingurgitamento)",
              text: "O que pode ajudar: mamar com frequência; massagem delicada e ordenha manual para amolecer a aréola; compressas frias após as mamadas, para alívio.",
              footer: "Quando procurar ajuda: se houver febre, vermelhidão ou dor intensa.",
            },
            {
              title: "Caroço dolorido (ducto obstruído)",
              text: "O que pode ajudar: manter as mamadas, mudar as posições e massagear com delicadeza em direção ao mamilo.",
              footer: "Quando procurar ajuda: se persistir por mais de 24 a 48 horas.",
            },
            {
              title: "Mastite",
              text: "O que pode ajudar: continuar amamentando ou ordenhando, descansar, beber líquidos.",
              footer:
                "Quando procurar ajuda: procurar atendimento no mesmo dia se houver febre, calafrios e seio vermelho e quente.",
              urgent: true,
            },
            {
              title: "Mamilo plano ou invertido",
              text: "O que pode ajudar: experimentar posições; ajudar o bebê a abocanhar mais aréola; pedir orientação no pré-natal ou na maternidade.",
              footer: "Quando procurar ajuda: se o bebê não conseguir pegar ou ganhar peso.",
            },
            {
              title: "Sensação de pouco leite",
              text: "O que pode ajudar: mamar com mais frequência, garantir boa pega e esvaziar bem as mamas. Observar fraldas e ganho de peso.",
              footer:
                "Quando procurar ajuda: se o bebê mamar pouco, tiver poucas fraldas ou não ganhar peso.",
            },
            {
              title: "Bebê sonolento ou que recusa o peito",
              text: "O que pode ajudar: contato pele a pele; estimular suavemente; oferecer o peito com frequência.",
              footer: "Quando procurar ajuda: sempre, se mamar muito pouco ou parecer mole.",
              urgent: true,
            },
          ],
        },
        {
          type: "card",
          title: "Ordenha manual",
          text: "Pode aliviar seios cheios e ajudar a oferecer leite quando mãe e bebê estão separados. A equipe de saúde ou o Banco de Leite Humano ensina a técnica e orienta como guardar o leite com segurança.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Antes de comprar",
          text: "Bomba de tirar leite, conchas e protetores não são itens obrigatórios para amamentar. Use somente se houver orientação.",
        },
        fontes,
      ],
      videos: [],
    },

    // ─── Apoio e direitos ───────────────────────────────────────────────────
    {
      slug: "rede-de-apoio-e-direitos",
      group: "apoio",
      icon: "users",
      title: "Rede de apoio e direitos",
      summary: "Onde pedir ajuda e direitos da lactante",
      intro: "Pedir ajuda não significa fracasso. A maioria das dificuldades melhora com apoio de quem entende do assunto.",
      blocks: [
        {
          type: "card",
          badge: "essencial",
          title: "Onde buscar apoio",
          items: [
            "Unidade Básica de Saúde: consulta de puerpério, acompanhamento do bebê e orientação sobre amamentação.",
            "Maternidade: orientação antes da alta e canais para dúvidas.",
            "Banco de Leite Humano: apoio e orientação à amamentação e doação.",
            "Visita domiciliar da equipe de saúde, quando disponível.",
            "Família, amigos e grupos de apoio à amamentação.",
          ],
        },
        {
          type: "card",
          badge: "essencial",
          title: "Direitos que ajudam",
          items: [
            "Licença-maternidade de 120 dias; algumas empresas aderem ao Empresa Cidadã, de 180 dias.",
            "Pausas para amamentar durante a jornada de trabalho até o bebê completar 6 meses, conforme a lei trabalhista.",
            "Acompanhamento de saúde da mulher e do bebê no SUS.",
            "Direito a informação clara sobre cuidados e amamentação.",
          ],
        },
        {
          type: "checklist",
          id: "primeiros-cuidados-bebe",
          badge: "essencial",
          title: "Primeiros cuidados com o bebê",
          items: [
            "Levar o bebê à Unidade Básica de Saúde na primeira semana de vida.",
            "Realizar o teste do pezinho, idealmente entre o 3º e o 5º dia de vida.",
            "Manter as vacinas e as consultas conforme a Caderneta da Criança.",
          ],
        },
        {
          type: "topicLink",
          href: "/pre-natal/vacinas-do-bebe",
          icon: "syringe",
          title: "Vacinas do bebê",
          description: "As vacinas que o bebê recebe ao nascer",
        },
        fontes,
      ],
      videos: [],
    },
  ],
};
