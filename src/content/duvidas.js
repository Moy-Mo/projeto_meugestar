/*
 * "Dúvidas, mitos e curiosidades".
 * Fonte: guia "Meu Gestar — Pré-natal e Acompanhamento (Completo)".
 * `verdict` define a cor do selo: "mito" | "verdade" | "atencao".
 */

export const duvidasIntro =
  "Respostas simples para as perguntas mais comuns, organizadas por etapa. Toque na pergunta para ver a resposta.";

export const duvidas = [
  {
    id: "gestacao",
    title: "Gestação",
    icon: "heart-pulse",
    items: [
      {
        question: "A gestante precisa comer por dois?",
        label: "Mito",
        verdict: "mito",
        text: "Estar grávida não significa precisar comer o dobro. Durante a gestação, aumentam as necessidades de alguns nutrientes, mas a alimentação deve ser equilibrada e adequada às necessidades da gestante. O mais importante é priorizar alimentos variados e nutritivos, como frutas, verduras, legumes, feijão, cereais, ovos e carnes, além de manter uma boa hidratação. A qualidade da alimentação é mais importante do que simplesmente aumentar muito a quantidade de comida.",
      },
      {
        question: "Grávida pode fazer exercício físico?",
        label: "Verdade",
        verdict: "verdade",
        text: "Em uma gestação sem contraindicações, a atividade física pode trazer benefícios para a saúde da gestante e contribuir para o bem-estar durante a gravidez. Porém, nem todo exercício é adequado para todas as gestantes. O tipo, a intensidade e a frequência devem considerar as condições de saúde e a evolução da gestação, sendo importante conversar com a equipe que acompanha o pré-natal.",
      },
      {
        question: "A gestante pode tomar qualquer medicamento se a dose for pequena?",
        label: "Mito",
        verdict: "mito",
        text: "Mesmo uma dose pequena de determinado medicamento pode não ser adequada durante a gravidez. Alguns medicamentos atravessam a placenta e podem oferecer riscos ao bebê, enquanto outros podem ser utilizados quando corretamente indicados. Por isso, não inicie, suspenda ou altere medicamentos por conta própria. Isso também vale para fitoterápicos, suplementos e medicamentos considerados \"naturais\".",
      },
      {
        question: "As vacinas podem fazer mal ao bebê durante a gravidez?",
        label: "Mito",
        verdict: "mito",
        text: "As vacinas indicadas durante a gestação são seguras e importantes para proteger a mãe e o bebê. Algumas delas também ajudam a proteger o bebê nos primeiros meses de vida, por meio da passagem de anticorpos da mãe para o bebê. No calendário atual, por exemplo, a dTpa é indicada a partir da 20ª semana e a vacina contra o VSR a partir da 28ª semana, uma dose em cada gestação.",
      },
      {
        question: "O formato da barriga mostra se o bebê é menino ou menina?",
        label: "Mito",
        verdict: "mito",
        text: "O formato e o tamanho da barriga podem variar bastante entre as gestantes. Eles são influenciados por fatores como posição do bebê, idade gestacional, características corporais, musculatura abdominal e número de gestações. Barriga pontuda, redonda, alta ou baixa não determina o sexo do bebê.",
      },
    ],
  },
  {
    id: "duvidas",
    title: "Dúvidas",
    icon: "circle-help",
    items: [
      {
        question: "É normal qualquer sangramento durante a gravidez?",
        label: "Não ignore",
        verdict: "atencao",
        text: "Os sangramentos durante a gestação precisam ser avaliados de acordo com a idade gestacional, quantidade, presença de dor e outros sintomas. A gestante não deve tentar descobrir sozinha se o sangramento é \"normal\". Na presença de sangramento, especialmente se for intenso ou acompanhado de dor, procure atendimento.",
      },
      {
        question: "Se eu perder líquido pela vagina, posso esperar para ver se passa?",
        label: "Não",
        verdict: "atencao",
        text: "A saída de líquido pela vagina durante a gestação pode representar perda de líquido amniótico e precisa ser avaliada. Não é recomendado esperar horas para verificar se o líquido vai parar.",
      },
      {
        question: "Dor de cabeça forte na gravidez é sempre normal?",
        label: "Não necessariamente",
        verdict: "atencao",
        text: "Alguns desconfortos são comuns durante a gestação, mas uma dor de cabeça intensa, persistente ou acompanhada de alterações visuais, inchaço importante, dor na parte superior do abdome ou outros sintomas precisa ser avaliada. A gestante deve procurar orientação da equipe de saúde.",
      },
      {
        question: "Todo sintoma durante a gravidez é normal e precisa ser apenas aguentado?",
        label: "Não",
        verdict: "atencao",
        text: "A gravidez pode causar sintomas comuns, como enjoos, cansaço e aumento da frequência urinária. Porém, alguns sintomas podem indicar que algo precisa ser avaliado e não devem ser ignorados. Por isso, se surgir um sintoma forte, diferente do habitual ou preocupante, a gestante deve procurar orientação da equipe de saúde.",
      },
    ],
  },
  {
    id: "parto",
    title: "Parto",
    icon: "baby",
    items: [
      {
        question: "A gestante pode escolher um acompanhante?",
        label: "Verdade",
        verdict: "verdade",
        text: "A gestante tem direito a um acompanhante de sua escolha durante o trabalho de parto, parto e pós-parto, conforme a legislação brasileira. O acompanhante pode ser uma pessoa escolhida pela própria gestante, independentemente de ser o pai do bebê, parceiro, familiar ou amigo. Esse direito vale tanto para parto vaginal quanto para cesariana.",
      },
      {
        question: "A gestante pode participar das decisões sobre o próprio parto?",
        label: "Verdade",
        verdict: "verdade",
        text: "A gestante tem direito a receber informações claras sobre os procedimentos realizados e participar das decisões relacionadas ao seu cuidado. O Ministério da Saúde orienta que a mulher seja informada sobre procedimentos e que tenha sua autonomia e dignidade respeitadas.",
      },
      {
        question: "O plano de parto é uma garantia de que tudo acontecerá exatamente como planejado?",
        label: "Mito",
        verdict: "mito",
        text: "O plano de parto é uma carta de intenções na qual a gestante registra preferências e expectativas para o atendimento. Ele não é um contrato e pode ser revisto durante a gestação ou o trabalho de parto. Se surgir uma situação que exija mudança de conduta para proteger a mãe ou o bebê, a equipe pode propor alterações. Mesmo assim, a gestante deve receber explicações claras e participar das decisões sempre que suas condições permitirem.",
      },
      {
        question: "Durante o trabalho de parto a mulher precisa ficar deitada?",
        label: "Mito",
        verdict: "mito",
        text: "Quando não há contraindicação, a gestante pode se movimentar, caminhar e escolher posições que sejam confortáveis durante o trabalho de parto. A liberdade de movimento pode contribuir para o conforto e faz parte da assistência respeitosa ao parto.",
      },
      {
        question: "O contato pele a pele precisa acontecer apenas depois do parto normal?",
        label: "Mito",
        verdict: "mito",
        text: "O contato pele a pele pode acontecer tanto após o parto vaginal quanto após a cesariana, quando mãe e bebê estiverem clinicamente bem. O Ministério da Saúde recomenda que o contato seja iniciado precocemente, de preferência imediatamente após o nascimento, e mantido de forma ininterrupta durante a primeira hora de vida quando possível.",
      },
    ],
  },
  {
    id: "bebe",
    title: "Bebê e recém-nascido",
    icon: "baby",
    items: [
      {
        question: "O bebê precisa tomar água antes dos seis meses?",
        label: "Mito",
        verdict: "mito",
        text: "Para o bebê em aleitamento materno exclusivo, não é necessário oferecer água, mesmo em dias quentes. O leite materno fornece os líquidos necessários. Em períodos de calor, a orientação é oferecer o peito com maior frequência, respeitando a livre demanda.",
      },
      {
        question: "O bebê deve dormir de barriga para baixo para não engasgar?",
        label: "Mito",
        verdict: "mito",
        text: "Para o sono do bebê, a orientação é colocá-lo de barriga para cima. A posição de barriga para baixo aumenta o risco de eventos relacionados ao sono. Por isso, a posição segura deve ser adotada desde os primeiros dias de vida.",
      },
      {
        question: "O bebê precisa tomar a vacina somente depois dos dois meses?",
        label: "Mito",
        verdict: "mito",
        text: "A vacinação começa desde o nascimento. No calendário brasileiro de 2026, por exemplo, há indicação de BCG e hepatite B ao nascer, além das vacinas previstas para os meses seguintes.",
      },
      {
        question: "O bebê precisa ficar em silêncio para conseguir se desenvolver?",
        label: "Mito",
        verdict: "mito",
        text: "O bebê aprende por meio da interação com as pessoas ao seu redor. Conversar, cantar, olhar, responder aos sons e expressões do bebê e brincar de maneira adequada à idade são formas importantes de estimular a comunicação, vínculo e desenvolvimento.",
      },
      {
        question: "O recém-nascido precisa ficar separado da mãe para descansar?",
        label: "Mito",
        verdict: "mito",
        text: "Quando mãe e bebê estão bem, o contato e a permanência juntos favorecem o vínculo e a amamentação. O Ministério da Saúde recomenda o contato pele a pele logo após o nascimento e o início da amamentação na primeira hora de vida, quando possível.",
      },
    ],
  },
  {
    id: "amamentacao",
    title: "Amamentação",
    icon: "milk",
    items: [
      {
        question: "Quanto mais o bebê mama, mais leite a mãe produz?",
        label: "Verdade",
        verdict: "verdade",
        text: "A produção de leite está relacionada à retirada do leite da mama. Quando o bebê mama de forma frequente e efetiva, ou quando o leite é retirado manualmente ou com bomba, há estímulo para que o organismo continue produzindo leite.",
      },
      {
        question: "Depois dos seis meses o leite materno deixa de ser importante?",
        label: "Mito",
        verdict: "mito",
        text: "Aos seis meses, o bebê começa a receber alimentação complementar adequada, mas o leite materno continua sendo importante. A recomendação é manter a amamentação até dois anos ou mais, junto à alimentação complementar a partir dos seis meses.",
      },
      {
        question: "Quem tem seios pequenos produz pouco leite?",
        label: "Mito",
        verdict: "mito",
        text: "O tamanho das mamas não determina a capacidade de produzir leite. O volume mamário está muito relacionado à quantidade de tecido adiposo e não significa que uma mulher com seios menores produzirá menos leite.",
      },
      {
        question: "O bebê deve mamar apenas de três em três horas?",
        label: "Mito",
        verdict: "mito",
        text: "A recomendação é a amamentação em livre demanda: oferecer o peito quando o bebê demonstrar sinais de fome, sem estabelecer obrigatoriamente intervalos rígidos. Os bebês possuem ritmos diferentes e a frequência das mamadas pode mudar conforme crescem.",
      },
      {
        question: "Chupeta e mamadeira podem atrapalhar a amamentação?",
        label: "Podem",
        verdict: "atencao",
        text: "A sucção na mamadeira e na chupeta é diferente da sucção no peito. O uso pode interferir na pega e reduzir a frequência das mamadas, podendo prejudicar a amamentação em algumas situações. Por isso, seu uso deve ser avaliado com cuidado, especialmente no início da amamentação.",
      },
    ],
  },
];

export const voceSabia = [
  {
    title: "O bebê pode reconhecer a voz da mãe antes de nascer?",
    text: "Sim. Durante a gestação, o feto entra em contato com diferentes sons e pode responder a estímulos sonoros. Após o nascimento, a voz materna pode ser familiar para o bebê.",
  },
  {
    title: "O bebê pode ouvir sons ainda dentro do útero?",
    text: "Sim. A audição fetal se desenvolve durante a gestação e o bebê passa a responder a diferentes estímulos sonoros.",
  },
  {
    title: "O contato pele a pele não serve apenas para \"dar carinho\".",
    text: "Ele favorece o vínculo, ajuda na adaptação do recém-nascido à vida fora do útero e favorece o início da amamentação quando mãe e bebê estão bem.",
  },
  {
    title: "A vacina da gestante pode ajudar a proteger o bebê.",
    text: "Anticorpos produzidos pela mãe podem atravessar a placenta e contribuir para a proteção do bebê nos primeiros meses de vida.",
  },
  {
    title: "A frequência das mamadas pode variar.",
    text: "Não existe necessariamente um número rígido de mamadas que sirva para todos os bebês. A recomendação é observar os sinais de fome e oferecer o peito em livre demanda.",
  },
];

export const duvidasFontes = {
  type: "sources",
  items: [
    {
      text: "Ministério da Saúde. Caderneta Brasileira da Gestante, 2026.",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf",
    },
    {
      text: "Ministério da Saúde. Saúde Materna: parto, plano de parto, direitos, acompanhante, contato pele a pele e violência obstétrica.",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna",
    },
    { text: "Ministério da Saúde. Amamentação: conheça alguns mitos e verdades, 2026." },
    {
      text: "Ministério da Saúde. Amamentação, 2026.",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/amamentacao",
    },
    {
      text: "Ministério da Saúde. Calendário Nacional de Vacinação — Gestante e Criança, 2026.",
      href: "https://www.gov.br/saude/pt-br/vacinacao/calendario",
    },
  ],
};
