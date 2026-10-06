import { fontesOficiais } from "./fontes";

/*
 * Conteúdo da aba "Pré-natal e Acompanhamento".
 * Fonte: guia "Meu Gestar — Pré-natal e Acompanhamento", escrito pelos alunos e
 * revisado pela equipe de saúde. Não altere textos clínicos sem revisão.
 *
 * Cada assunto tem uma lista de blocos (ver src/components/content/Blocks.js).
 * `videos`: [{ title, description, duration, source, youtubeUrl, officialUrl }]
 *   — preencher quando os alunos enviarem os links.
 */

export const grupos = [
  { id: "inicio", title: "Começando o pré-natal" },
  { id: "exames-vacinas", title: "Exames e vacinas" },
  { id: "alto-risco", title: "Gestação de alto risco" },
  { id: "cuidados", title: "Cuidados e sinais de alerta" },
  { id: "caderneta", title: "Caderneta e fontes" },
];

export const topicos = [
  // ─── Começando o pré-natal ───────────────────────────────────────────────
  {
    slug: "o-que-e-pre-natal",
    group: "inicio",
    icon: "heart-pulse",
    title: "O que é o pré-natal?",
    summary: "Para que serve e quando começar",
    intro:
      "O pré-natal é o acompanhamento de saúde que a mulher faz durante toda a gravidez. Ele serve para cuidar da sua saúde e ver se o bebê está crescendo bem.",
    blocks: [
      {
        type: "card",
        title: "Durante o pré-natal, a equipe de saúde:",
        items: [
          "acompanha como a gravidez está andando;",
          "vê como está a sua saúde e a do bebê;",
          "pede exames;",
          "confere as suas vacinas;",
          "procura sinais de que a gravidez precisa de mais cuidado;",
          "organiza o que será preciso para o nascimento e para depois do parto.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Quando começar?",
        text: "O melhor é começar o mais cedo possível, de preferência até a 12ª semana de gravidez (cerca de 3 meses). Se você descobriu depois disso, não tem problema: comece assim que puder.",
      },
    ],
    videos: [],
  },
  {
    slug: "descobri-que-estou-gravida",
    group: "inicio",
    icon: "stethoscope",
    title: "Descobri que estou grávida. O que fazer?",
    summary: "O primeiro passo é procurar a UBS",
    intro:
      "O primeiro passo é procurar a UBS (o postinho de saúde) para começar o pré-natal.",
    blocks: [
      {
        type: "steps",
        steps: [
          {
            title: "Procure uma UBS",
            text: "O que levar:",
            items: [
              "Cartão do SUS;",
              "um documento com foto ou número (RG, CPF);",
              "cartão de vacinação;",
              "exames que você já fez;",
              "remédios que você usa;",
              "informações sobre doenças que você já teve;",
              "informações sobre gravidezes anteriores;",
              "a data da sua última menstruação, se você souber.",
            ],
          },
          {
            title: "Faça a primeira consulta",
            text: "A equipe de saúde vai:",
            items: [
              "confirmar a gravidez e calcular de quantas semanas você está;",
              "calcular o dia provável do parto;",
              "ver como está a sua saúde;",
              "perguntar sobre gravidezes e partos anteriores;",
              "ver se existe algum risco;",
              "pedir os exames necessários;",
              "conferir as suas vacinas;",
              "combinar quantas consultas você terá;",
              "encaminhar você para um médico especialista, se for preciso.",
            ],
          },
          {
            title: "Guarde a Caderneta da Gestante",
            text: "É um caderninho que acompanha você durante toda a gravidez. Nele ficam anotadas as consultas, os exames, as vacinas, como a gravidez está indo, o parto e o pós-parto. Leve a caderneta em todas as consultas e atendimentos de saúde.",
          },
        ],
      },
      { type: "links", items: [fontesOficiais.preNatal] },
    ],
    videos: [],
  },
  {
    slug: "descobri-depois-da-12-semana",
    group: "inicio",
    icon: "calendar-clock",
    title: "Descobri a gravidez depois da 12ª semana. E agora?",
    summary: "Você não perdeu o pré-natal!",
    intro:
      "Descobrir a gravidez depois da 12ª semana não quer dizer que é tarde. O mais importante é procurar a UBS assim que descobrir.",
    blocks: [
      {
        type: "callout",
        variant: "success",
        title: "Não perdi o pré-natal!",
        text: "Toque em cada fase para ver o que acontece.",
      },
      {
        type: "expandables",
        icon: "calendar-days",
        items: [
          {
            title: "De 13 a 19 semanas",
            text: "Procure a UBS o quanto antes. A equipe vai calcular as semanas de gravidez, ver a sua saúde, pedir os exames que faltam, conferir as vacinas, ver como o bebê está e organizar as próximas consultas.",
          },
          {
            title: "De 20 a 27 semanas",
            text: "Além do que foi dito acima, serão vistos os exames indicados para essa fase, entre eles o de diabetes da gravidez (quando indicado). As vacinas serão colocadas em dia. A vacina dTpa já pode ser tomada a partir de 20 semanas.",
          },
          {
            title: "De 28 a 35 semanas",
            text: "Ainda dá tempo de fazer o pré-natal. A equipe vê quais exames e vacinas faltam. A partir de 28 semanas, existe também a vacina contra o VSR (um vírus que causa problemas no pulmão dos bebês).",
          },
          {
            title: "Com 36 semanas ou mais",
            text: "Procure atendimento o mais rápido possível. A equipe vai ver a sua saúde e a do bebê, pedir os exames que faltam, dar as vacinas, ver se a gravidez tem algum risco e combinar em qual maternidade será o parto.",
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Lembre-se",
        text: "Quanto mais tarde o pré-natal começa, mais importante é não esperar. Procure a UBS o quanto antes!",
      },
    ],
    videos: [],
  },
  {
    slug: "como-funcionam-as-consultas",
    group: "inicio",
    icon: "calendar-days",
    title: "Como funcionam as consultas?",
    summary: "Com que frequência você vai à UBS",
    intro:
      "Na gravidez sem risco especial (chamada de risco habitual), as consultas ficam mais frequentes conforme a barriga cresce.",
    blocks: [
      {
        type: "timeline",
        items: [
          { label: "Até 28 semanas", text: "Mais ou menos 1 consulta por mês" },
          { label: "De 28 a 36 semanas", text: "Mais ou menos 1 consulta a cada 15 dias" },
          { label: "A partir de 36 semanas", text: "Mais ou menos 1 consulta por semana" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Essa frequência pode mudar conforme a sua necessidade e a do bebê. Na gravidez de alto risco, o número de consultas é decidido para cada mulher, conforme o problema que foi encontrado.",
      },
    ],
    videos: [],
  },
  {
    slug: "o-que-e-avaliado-nas-consultas",
    group: "inicio",
    icon: "clipboard-list",
    title: "O que é avaliado nas consultas?",
    summary: "A saúde da mãe e do bebê",
    intro: "Em cada consulta, a equipe acompanha a saúde da mãe e do bebê, para que a gravidez seja mais segura.",
    blocks: [
      {
        type: "card",
        title: "Avaliação da gestante",
        items: [
          "pressão arterial e peso;",
          "como você está se sentindo e suas queixas;",
          "seu histórico de doenças;",
          "remédios que você usa;",
          "exames que você já fez;",
          "vacinas;",
          "saúde mental (como estão seus sentimentos);",
          "condições de vida, e uso de álcool, cigarro e outras drogas;",
          "situações de violência, quando a equipe perceber.",
        ],
      },
      {
        type: "card",
        title: "Avaliação do bebê",
        text: "De acordo com o tempo de gravidez, a equipe pode ver:",
        items: [
          "os batimentos do coração do bebê;",
          "a altura da barriga (altura uterina), que mostra o crescimento;",
          "como o bebê se mexe;",
          "a posição do bebê;",
          "o ultrassom e outros exames, quando forem indicados.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Cada gestação é única!",
        text: "A equipe pode ajustar o que será avaliado conforme a sua necessidade.",
      },
    ],
    videos: [],
  },

  // ─── Exames e vacinas ────────────────────────────────────────────────────
  {
    slug: "exames-do-pre-natal",
    group: "exames-vacinas",
    icon: "flask-conical",
    title: "Exames do pré-natal: para que serve cada um?",
    summary: "Toque no exame para entender",
    intro:
      "Os exames não são só rotina. Cada um tem um motivo: ajudam a descobrir problemas cedo, evitar complicações e orientar o tratamento, quando ele é preciso.",
    blocks: [
      {
        type: "examSearch",
        items: [
          {
            name: "Hemograma",
            text: "Exame de sangue que mostra as células do sangue. Ajuda a descobrir anemia (sangue fraco) e outras alterações.",
          },
          {
            name: "Tipo de sangue e fator Rh",
            text: "Mostra o seu tipo de sangue (A, B, AB ou O) e se é positivo ou negativo. Se for Rh negativo, pode ser preciso um cuidado a mais, porque o sangue da mãe e o do bebê podem não combinar.",
          },
          {
            name: "Coombs indireto",
            text: "Procura no sangue da mãe defesas (anticorpos) que podem atacar o sangue do bebê. É importante principalmente para mulheres Rh negativo.",
          },
          {
            name: "Glicemia",
            text: "Mede o açúcar no sangue. Ajuda a descobrir se há risco de diabetes na gravidez.",
          },
          {
            name: "Teste de tolerância à glicose (TOTG 75 g)",
            text: "Você toma uma bebida doce e o sangue é colhido depois, para ver como o corpo lida com o açúcar. Serve para descobrir o diabetes da gravidez. Em geral é feito entre 24 e 28 semanas, quando indicado.",
          },
          {
            name: "Sífilis",
            text: "Procura a bactéria que causa a sífilis. A sífilis pode passar da mãe para o bebê. Por isso o teste é repetido em outros momentos e também na hora do parto.",
          },
          {
            name: "HIV",
            text: "Procura o vírus HIV. Se for descoberto na gravidez, há tratamento que diminui muito o risco de passar para o bebê.",
          },
          {
            name: "Hepatite B (HBsAg)",
            text: "Procura o vírus da hepatite B, que pode passar da mãe para o bebê perto do nascimento. Se a mãe tiver o vírus, o recém-nascido recebe cuidados especiais logo depois de nascer.",
          },
          {
            name: "Hepatite C",
            text: "Procura sinais de contato com o vírus da hepatite C. Se der positivo, são feitos outros exames para saber se a infecção está ativa.",
          },
          {
            name: "Toxoplasmose",
            text: "Mostra se você já teve contato com o parasita da toxoplasmose. Se a mãe pegar na gravidez, pode passar para o bebê. O resultado é lido junto com as semanas de gravidez.",
          },
          {
            name: "Urina e urocultura",
            text: "Ajudam a descobrir infecção urinária. A urocultura mostra qual bactéria causa a infecção e qual antibiótico usar.",
          },
          {
            name: "Eletroforese de hemoglobina",
            text: "Procura doenças do sangue que passam de pais para filhos, como a doença falciforme e a talassemia. Elas podem mudar o cuidado durante a gravidez.",
          },
          {
            name: "TSH (tireoide)",
            text: "Mostra como está a tireoide. Não é pedido para todas as gestantes, só quando há sintomas ou histórico.",
          },
          {
            name: "Ultrassonografia obstétrica",
            text: "Avalia a localização, crescimento, anatomia fetal, placenta, líquido amniótico e outras situações.",
            href: "/pre-natal/ultrassonografia-obstetrica",
          },
        ],
      },
    ],
    videos: [],
  },
  {
    slug: "ultrassonografia-obstetrica",
    group: "exames-vacinas",
    icon: "scan-line",
    title: "Ultrassonografia obstétrica",
    summary: "O exame que mostra o bebê na barriga",
    intro: "O ultrassom é um exame que mostra o bebê por dentro da barriga, sem dor e sem risco.",
    blocks: [
      {
        type: "card",
        title: "Ele pode servir para:",
        items: [
          "ver onde a gravidez está e de quantas semanas ela é;",
          "saber quantos bebês há;",
          "acompanhar o crescimento do bebê;",
          "ver como o corpo do bebê está formado;",
          "ver a placenta e o líquido que envolve o bebê (líquido amniótico);",
          "investigar se há algum problema.",
        ],
      },
      {
        type: "card",
        title: "E na gravidez de alto risco?",
        text: "A quantidade de ultrassons depende do problema encontrado. Podem ser necessários mais exames para acompanhar o crescimento do bebê, a placenta, o líquido e a circulação do sangue entre a mãe e o bebê.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Atenção",
        text: "Não existe um número de ultrassons igual para todas as gestantes. Quem decide é a equipe de saúde.",
      },
    ],
    videos: [],
  },
  {
    slug: "vacinacao-na-gestacao",
    group: "exames-vacinas",
    icon: "syringe",
    title: "Vacinação durante a gestação",
    summary: "Proteja você e o seu bebê",
    intro:
      "As vacinas protegem você e o seu bebê e fazem parte do pré-natal. Algumas também passam defesas (anticorpos) para o bebê ainda dentro da barriga.",
    blocks: [
      {
        type: "callout",
        variant: "info",
        title: "No alto risco, a vacinação continua indicada!",
        text: "A equipe de saúde vai avaliar sua condição clínica e revisar seu cartão de vacinas.",
      },
      {
        type: "card",
        icon: "syringe",
        title: "Ao descobrir a gravidez",
        items: [
          "Hepatite B: conforme o histórico de vacinas. Se você não tem as doses em dia, deve tomar as que faltam.",
          "dT (difteria e tétano): depende das doses que você já tomou. Se faltar, completa na gravidez.",
          "Influenza (gripe): 1 dose por temporada, conforme a campanha.",
          "COVID-19: 1 dose em cada gravidez.",
          "Febre amarela: só em situações específicas, avaliando o risco naquela região e o que é melhor para você. Não é para todas as gestantes.",
        ],
      },
      {
        type: "card",
        icon: "syringe",
        title: "A partir de 20 semanas",
        items: [
          "dTpa: 1 dose em cada gravidez. Protege contra difteria, tétano e coqueluche. Os anticorpos passam pela placenta e protegem o bebê.",
        ],
      },
      {
        type: "card",
        icon: "syringe",
        title: "A partir de 28 semanas",
        items: [
          "VSR (vírus sincicial respiratório): 1 dose em cada gravidez. Protege o bebê contra as formas graves da doença nos primeiros meses de vida.",
        ],
      },
      {
        type: "topicLink",
        href: "/pre-natal/vacinas-atrasadas",
        icon: "history",
        title: "E se as vacinas estiverem atrasadas?",
        description: "Você não precisa começar tudo de novo",
      },
      {
        type: "card",
        icon: "baby",
        title: "E o bebê?",
        text: "O bebê também precisa de vacinas! O calendário segue o Programa Nacional de Imunizações (PNI).",
      },
      {
        type: "topicLink",
        href: "/pre-natal/vacinas-do-bebe",
        icon: "baby",
        title: "Vacinas do bebê",
        description: "As vacinas que o bebê recebe ao nascer",
      },
      { type: "links", items: [fontesOficiais.calendarioVacinacao] },
    ],
    videos: [],
  },
  {
    slug: "vacinas-atrasadas",
    group: "exames-vacinas",
    icon: "history",
    title: "E se as vacinas estiverem atrasadas?",
    summary: "O caminho é simples",
    intro: "Fique tranquila, o caminho é simples:",
    blocks: [
      {
        type: "steps",
        steps: [
          { title: "Leve a caderneta ou cartão de vacinação." },
          { title: "Veja quais vacinas e doses você já tomou." },
          { title: "Veja quais doses estão faltando." },
          { title: "A equipe considera a sua saúde e a sua gravidez." },
          { title: "Atualize as vacinas como a equipe de saúde orientar." },
        ],
      },
      {
        type: "callout",
        variant: "success",
        title: "Você não precisa começar tudo de novo",
        text: "Não é preciso começar tudo de novo só porque uma dose atrasou. A equipe vê o que você já tomou e indica o que falta.",
      },
    ],
    videos: [],
  },
  {
    slug: "vacinas-do-bebe",
    group: "exames-vacinas",
    icon: "baby",
    title: "Vacinas do bebê",
    summary: "O calendário do bebê começa ao nascer",
    intro: "Depois que nasce, o bebê começa o seu próprio calendário de vacinas.",
    blocks: [
      {
        type: "card",
        title: "Ao nascer, o bebê recebe:",
        items: [
          "BCG: 1 dose, de preferência logo ao nascer. Protege contra as formas graves da tuberculose, como a meningite tuberculosa.",
          "Hepatite B: 1 dose ao nascer. É muito importante para evitar que a hepatite B passe para o bebê nos primeiros dias de vida.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Quando a mãe tem hepatite B",
        text: "O recém-nascido recebe a vacina contra hepatite B e uma injeção de imunoglobulina (defesa pronta), de preferência nas primeiras 12 horas de vida.",
      },
      {
        type: "text",
        text: "Depois das vacinas do nascimento, o bebê segue o Calendário Nacional de Vacinação da Criança, de acordo com a idade.",
      },
      {
        type: "links",
        items: [{ ...fontesOficiais.calendarioVacinacao, label: "Ver calendário infantil completo" }],
      },
    ],
    videos: [],
  },

  // ─── Gestação de alto risco ──────────────────────────────────────────────
  {
    slug: "o-que-e-alto-risco",
    group: "alto-risco",
    icon: "shield-plus",
    title: "Quando a gestação é considerada de alto risco?",
    summary: "Não quer dizer que há algo grave agora",
    intro:
      "A gravidez é de alto risco quando existe algo que aumenta a chance de complicações para a mãe ou para o bebê. Por isso ela precisa de um acompanhamento mais de perto.",
    blocks: [
      {
        type: "callout",
        variant: "info",
        title: "Não quer dizer que há algo grave agora",
        text: "Ser de alto risco não quer dizer que existe uma complicação grave agora. Quem decide se a gravidez é de alto risco é a equipe de saúde.",
      },
      {
        type: "card",
        title: "Algumas situações que podem levar a essa classificação:",
        items: [
          "pressão alta que já existia antes da gravidez;",
          "diabetes que já existia antes da gravidez;",
          "doenças do coração, dos rins, do sangue, do sistema nervoso ou de defesa do corpo (autoimunes);",
          "algumas infecções;",
          "problemas em gravidezes anteriores;",
          "gravidez de gêmeos ou mais bebês;",
          "problemas encontrados no bebê ou na placenta;",
          "pressão alta que aparece na gravidez ou pré-eclâmpsia;",
          "diabetes da gravidez, quando precisa de acompanhamento especializado;",
          "bebê que não está crescendo como esperado.",
        ],
      },
      {
        type: "topicLink",
        href: "/pre-natal/classificada-alto-risco",
        icon: "route",
        title: "Fui classificada como alto risco. O que fazer?",
        description: "Veja o caminho do seu cuidado",
      },
    ],
    videos: [],
  },
  {
    slug: "classificada-alto-risco",
    group: "alto-risco",
    icon: "route",
    title: "Fui classificada como gestação de alto risco. O que fazer?",
    summary: "Você vai ter um cuidado a mais",
    intro: "Fique tranquila. Você vai ter um cuidado a mais. Veja o caminho:",
    blocks: [
      {
        type: "steps",
        steps: [
          {
            title: "Continue indo à UBS",
            text: "A UBS continua fazendo parte do seu cuidado.",
          },
          {
            title: "Encaminhamento",
            text: "Dependendo do caso, você pode ser enviada para um pré-natal especializado, um ambulatório de alto risco ou um hospital ou maternidade de referência.",
          },
          {
            title: "Acompanhamento junto",
            text: "Em muitos casos, você é acompanhada ao mesmo tempo pela UBS e pelo serviço especializado.",
          },
          {
            title: "Plano feito para você",
            text: "O número de consultas e os exames dependem do motivo do alto risco.",
          },
        ],
      },
      {
        type: "card",
        title: "Quem pode participar do seu cuidado",
        items: [
          "Obstetra (médico da gravidez e do parto)",
          "Cardiologista (coração)",
          "Endocrinologista (diabetes e hormônios)",
          "Nefrologista (rins)",
          "Infectologista (infecções)",
          "Hematologista (sangue)",
          "Geneticista",
          "Pediatra (médico de crianças)",
          "e outros especialistas.",
        ],
      },
    ],
    videos: [],
  },
  {
    slug: "exames-alto-risco",
    group: "alto-risco",
    icon: "test-tubes",
    title: "Exames na gestação de alto risco",
    summary: "Escolhidos conforme cada situação",
    intro:
      "Não existe uma lista de exames igual para todas as gestações de alto risco. Os exames são escolhidos de acordo com o problema de cada mulher.",
    blocks: [
      {
        type: "callout",
        variant: "info",
        text: "O plano de exames é feito para cada mulher. Toque em cada situação para ver os exames que podem ser pedidos.",
      },
      {
        type: "expandables",
        icon: "test-tubes",
        items: [
          {
            title: "Pressão alta",
            text: "Medir a pressão, ver os rins, a urina, o sangue (plaquetas), as enzimas do fígado, o crescimento do bebê e a circulação do sangue (Doppler).",
          },
          {
            title: "Diabetes",
            text: "Medir o açúcar no sangue com mais frequência, ultrassons de crescimento e avaliação do bebê.",
          },
          {
            title: "Doença nos rins",
            text: "Exames de creatinina e proteína na urina, pressão e crescimento do bebê.",
          },
          {
            title: "Doença do coração",
            text: "Avaliação com cardiologista, eletrocardiograma, ecocardiograma e avaliação do bebê.",
          },
          {
            title: "Gravidez de gêmeos",
            text: "Ultrassons mais frequentes para ver o crescimento de cada bebê, o líquido e a placenta.",
          },
          {
            title: "Alteração no bebê",
            text: "Ultrassom morfológico (que vê o corpo do bebê), ecocardiograma fetal (coração do bebê), Doppler, testes genéticos e conversa com especialistas.",
          },
        ],
      },
    ],
    videos: [],
  },
  {
    slug: "vacinacao-alto-risco",
    group: "alto-risco",
    icon: "shield-check",
    title: "Vacinação na gestação de alto risco",
    summary: "As vacinas continuam indicadas",
    intro:
      "Gravidez de alto risco não é motivo para parar de vacinar. As vacinas continuam indicadas. A equipe vai olhar a sua caderneta de vacinação e a sua condição de saúde.",
    blocks: [
      {
        type: "card",
        title: "Vacinas que podem entrar no seu acompanhamento:",
        items: [
          "hepatite B;",
          "dT;",
          "gripe (1 dose por temporada);",
          "COVID-19 (1 dose em cada gravidez);",
          "dTpa (a partir de 20 semanas);",
          "VSR (a partir de 28 semanas);",
          "febre amarela, só em situações específicas.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "CRIE",
        text: "Algumas mulheres, por causa de certas doenças, precisam ser avaliadas no CRIE (Centro de Referência para Imunobiológicos Especiais), que atende casos especiais de vacinação.",
      },
      {
        type: "topicLink",
        href: "/pre-natal/vacinacao-na-gestacao",
        icon: "syringe",
        title: "Vacinação durante a gestação",
        description: "Veja quando tomar cada vacina",
      },
    ],
    videos: [],
  },
  {
    slug: "bebe-alto-risco",
    group: "alto-risco",
    icon: "baby",
    title: "E o bebê de uma gestação de alto risco?",
    summary: "Planejando os cuidados do nascimento",
    intro:
      "Uma gravidez de alto risco não quer dizer que o bebê vai ter alguma doença. Mas, dependendo do caso, pode ser preciso planejar cuidados especiais para o nascimento.",
    blocks: [
      {
        type: "callout",
        variant: "info",
        title: "Alto risco não quer dizer que o bebê terá uma doença",
        text: "O plano depende do seu caso e de como a gravidez evolui.",
      },
      {
        type: "card",
        title: "Durante o pré-natal, a equipe pode ver:",
        items: [
          "qual é o melhor lugar para o parto;",
          "se será preciso uma equipe especial para cuidar do recém-nascido (equipe neonatal);",
          "se o bebê pode precisar de UTI neonatal;",
          "exames específicos depois do nascimento;",
          "vacinas;",
          "acompanhamento com pediatra especializado.",
        ],
      },
      {
        type: "topicLink",
        href: "/pre-natal/consulta-pediatrica-pre-natal",
        icon: "messages-square",
        title: "Consulta pediátrica pré-natal",
        description: "Converse com o pediatra antes do nascimento",
      },
    ],
    videos: [],
  },
  {
    slug: "consulta-pediatrica-pre-natal",
    group: "alto-risco",
    icon: "messages-square",
    title: "Consulta pediátrica pré-natal",
    summary: "Converse com o pediatra antes do nascimento",
    intro:
      "A partir da 28ª semana, você pode conversar com o pediatra (médico de crianças) antes do nascimento.",
    blocks: [
      {
        type: "card",
        title: "Nessa conversa dá para tirar dúvidas sobre:",
        items: [
          "amamentação;",
          "vacinas;",
          "testes que são feitos no recém-nascido (triagem neonatal), como o teste do pezinho;",
          "cuidados com o recém-nascido;",
          "como se preparar para o nascimento;",
          "acompanhamento do bebê com o pediatra.",
        ],
      },
      {
        type: "card",
        icon: "shield-plus",
        title: "Quando é ainda mais importante",
        text: "Nas gestações de alto risco, essa consulta pode ser muito importante quando há chance de:",
        items: [
          "bebê nascer antes da hora (prematuridade);",
          "gravidez de gêmeos ou mais;",
          "alguma alteração no bebê;",
          "doença da mãe que pode afetar o recém-nascido;",
          "necessidade de cuidados especiais para o bebê.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "A consulta com o pediatra não substitui o acompanhamento com o obstetra.",
      },
      { type: "links", items: [fontesOficiais.sbp] },
    ],
    videos: [],
  },

  // ─── Cuidados e sinais de alerta ─────────────────────────────────────────
  {
    slug: "saude-mental",
    group: "cuidados",
    icon: "brain",
    title: "Saúde mental",
    summary: "Cuidar das emoções também é cuidar do bebê",
    intro:
      "A gravidez traz muitas emoções. É normal sentir alegria, ansiedade, medo e até insegurança. O importante é conversar sobre o que sente e buscar ajuda quando precisar. Cuidar da sua saúde mental também é cuidar do seu bebê.",
    blocks: [
      {
        type: "card",
        title: "Quando procurar ajuda?",
        items: [
          "se sentir tristeza constante;",
          "se estiver muito ansiosa;",
          "se tiver dificuldade para dormir;",
          "se sentir que não consegue lidar com as emoções;",
          "se houver situações de violência ou uso de álcool e outras drogas.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "Você não está sozinha",
        text: "Fale com a equipe de saúde da sua UBS. Se for preciso, ela encaminha você para um apoio especializado.",
      },
    ],
    videos: [],
  },
  {
    slug: "sinais-de-alerta",
    group: "cuidados",
    icon: "siren",
    title: "Sinais de alerta",
    summary: "Quando procurar atendimento imediato",
    intro: "Se você sentir qualquer um destes sinais, procure atendimento imediato:",
    blocks: [
      {
        type: "callout",
        variant: "danger",
        title: "Não espere a próxima consulta",
        text: "Em caso de urgência, ligue 192 (SAMU) ou vá à emergência da maternidade.",
      },
      {
        type: "card",
        tone: "danger",
        items: [
          "sangramento pela vagina;",
          "perda de líquido pela vagina;",
          "dor forte ou que não passa na barriga;",
          "contrações regulares antes da hora esperada;",
          "pressão alta (140/90 mmHg ou mais);",
          "dor de cabeça forte;",
          "alterações na visão;",
          "dor forte na parte de cima da barriga;",
          "falta de ar importante;",
          "dor no peito;",
          "convulsão;",
          "desmaio;",
          "febre (37,8 °C ou mais);",
          "bebê mexendo menos ou parou de mexer, depois da época em que você já sente os movimentos.",
        ],
      },
      { type: "emergency" },
    ],
    videos: [],
  },
  {
    slug: "pre-eclampsia",
    group: "cuidados",
    icon: "activity",
    title: "Pré-eclâmpsia",
    summary: "O principal sinal é a pressão alta",
    intro:
      "A pré-eclâmpsia é uma condição que pode aparecer durante a gravidez e causar problemas para a mãe e para o bebê. O principal sinal é a pressão alta.",
    blocks: [
      {
        type: "card",
        title: "Por que o pré-natal é importante?",
        text: "A pressão é medida em todas as consultas. Isso ajuda a descobrir as alterações cedo, para começar o tratamento e o acompanhamento certos.",
      },
      {
        type: "card",
        tone: "danger",
        title: "Sinais que merecem avaliação:",
        items: [
          "dor de cabeça forte;",
          "alterações na visão;",
          "dor na parte de cima da barriga;",
          "inchaço repentino (nas mãos, no rosto ou nos pés);",
          "pressão alta.",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Não se automedique",
        text: "O diagnóstico e o tratamento devem ser feitos por um profissional de saúde.",
      },
      {
        type: "topicLink",
        href: "/pre-natal/sinais-de-alerta",
        icon: "siren",
        title: "Sinais de alerta",
        description: "Quando procurar atendimento imediato",
      },
    ],
    videos: [],
  },
  {
    slug: "acompanhando-o-bebe",
    group: "cuidados",
    icon: "sprout",
    title: "Acompanhando o bebê",
    summary: "O crescimento em cada trimestre",
    intro:
      "O crescimento do bebê é acompanhado em cada fase da gravidez. O acompanhamento com a equipe de saúde é essencial para ver como a gravidez está evoluindo.",
    blocks: [
      {
        type: "timeline",
        items: [
          {
            label: "1º trimestre (0 a 13 semanas)",
            text: "Formação inicial dos órgãos e estruturas.",
          },
          {
            label: "2º trimestre (14 a 27 semanas)",
            text: "Crescimento e desenvolvimento dos sistemas.",
          },
          {
            label: "3º trimestre (28 semanas até o parto)",
            text: "Amadurecimento dos órgãos e preparação para o nascimento.",
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Cada bebê tem seu próprio ritmo de desenvolvimento.",
      },
    ],
    videos: [],
  },
  {
    slug: "planejando-o-parto",
    group: "cuidados",
    icon: "hospital",
    title: "Planejando o parto",
    summary: "O que pensar com antecedência",
    intro:
      "A partir do 3º trimestre, converse com a sua equipe sobre o plano de parto e o local onde você será atendida.",
    blocks: [
      {
        type: "card",
        title: "O que considerar?",
        items: [
          "a maternidade de referência (endereço e telefone);",
          "quem vai ser o seu acompanhante;",
          "como você vai chegar lá (transporte);",
          "documentos;",
          "exames e cartão da gestante;",
          "plano de parto, quando houver.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        title: "É seu direito",
        text: "Você tem direito a um parto seguro e humanizado, com respeito às suas escolhas e necessidades.",
      },
      {
        type: "topicLink",
        href: "/temas/onde-ser-atendida",
        icon: "map-pin",
        title: "Encontrar maternidades e emergências",
        description: "Onde ser atendida em Porto Velho",
      },
    ],
    videos: [],
  },

  // ─── Caderneta e fontes ──────────────────────────────────────────────────
  {
    slug: "caderneta-da-gestante",
    group: "caderneta",
    icon: "book-open",
    title: "Caderneta da gestante",
    summary: "O seu registro de saúde na gravidez",
    intro:
      "A caderneta é o seu registro de saúde durante a gravidez, o parto e o pós-parto.",
    blocks: [
      {
        type: "card",
        title: "Nela você pode acompanhar:",
        items: [
          "consultas;",
          "exames;",
          "vacinação;",
          "pressão arterial;",
          "peso e evolução da gravidez;",
          "parto e pós-parto.",
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Leve sua caderneta em todas as consultas e atendimentos.",
      },
    ],
    videos: [],
  },
  {
    slug: "minha-caderneta",
    group: "caderneta",
    icon: "notebook-pen",
    title: "Minha caderneta (caderneta digital)",
    summary: "Registre as informações da sua gravidez",
    intro:
      "Aqui você pode registrar e acompanhar todas as informações da sua gravidez. Sua caderneta é um documento importante para você e para a equipe de saúde.",
    blocks: [
      {
        type: "card",
        title: "O que você pode registrar:",
        items: [
          "Dados da gestação: DUM (data da última menstruação), DPP (data provável do parto), número de gestações, partos e abortos;",
          "Consultas: data, semanas de gravidez, pressão, peso, batimentos do bebê (BCF);",
          "Exames: resultados e observações;",
          "Vacinas: data em que tomou e data da próxima dose;",
          "Ultrassonografias: data, semanas de gravidez, resultado e observações.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        title: "Dica",
        text: "Mantenha os dados sempre atualizados. Eles ajudam a equipe de saúde a acompanhar a sua gravidez.",
      },
      { type: "comingSoon", label: "Acessar minha caderneta digital" },
    ],
    videos: [],
  },
  {
    slug: "fontes-confiaveis",
    group: "caderneta",
    icon: "globe",
    title: "Fontes confiáveis e vídeos",
    summary: "De onde vêm as informações do app",
    intro:
      "Todas as informações foram baseadas em fontes oficiais e atualizadas. Como as recomendações de saúde e de vacinação podem mudar, o aplicativo mostra links para os sites oficiais.",
    blocks: [
      {
        type: "links",
        title: "Sites oficiais",
        items: [
          fontesOficiais.preNatal,
          fontesOficiais.calendarioVacinacao,
          fontesOficiais.linhasDeCuidado,
          fontesOficiais.febrasgo,
          fontesOficiais.sbp,
          fontesOficiais.fiocruz,
          fontesOficiais.oms,
        ],
      },
      {
        type: "text",
        text: "Os vídeos educativos vêm de instituições confiáveis, como Ministério da Saúde, SBP, FEBRASGO, Fiocruz, universidades e hospitais de referência. O botão \"Assistir no YouTube\" abre o vídeo no YouTube.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Lembre-se",
        text: "Os conteúdos se baseiam em fontes oficiais e as recomendações podem ser atualizadas pelo Ministério da Saúde. Em caso de dúvida, procure a equipe de saúde da sua UBS ou do serviço especializado.",
      },
    ],
    videos: [],
  },
];

export function getTopico(slug) {
  return topicos.find((t) => t.slug === slug);
}
