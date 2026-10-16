/*
 * Área "Parto": preparação, mala da maternidade, direitos e violência obstétrica.
 * Fonte: guia "Meu Gestar — Pré-natal e Acompanhamento (Completo)", seções
 * "Maternidade e preparação para o parto", "Parto e direitos" e "Violência obstétrica".
 * Não altere textos clínicos sem revisão da equipe de saúde.
 */

const fontesPreparacao = {
  type: "sources",
  items: [
    {
      text: "Ministério da Saúde. Caderneta Brasileira da Gestante, 2026. Checklist \"Preparando-se para o parto\".",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf",
    },
    {
      text: "Ministério da Saúde. Saúde Materna: direito de conhecer/vincular-se a uma maternidade e plano de parto.",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna",
    },
    {
      text: "Porto Velho. Secretaria Municipal de Saúde. Protocolo de Assistência ao Pré-Natal na Atenção Primária à Saúde.",
      href: "https://semusa.portovelho.ro.gov.br/arquivos/download/67869/protocolo-de-assistencia-ao-pre-natal-na-atencao-primaria-a-saude",
    },
    {
      text: "HU Brasil / Ebserh. Perguntas frequentes de maternidades universitárias.",
      href: "https://www.gov.br/hubrasil/pt-br/hospitais-universitarios",
    },
  ],
};

const fontesDireitos = {
  type: "sources",
  items: [
    { text: "Ministério da Saúde. Diretrizes Nacionais de Assistência ao Parto Normal." },
    {
      text: "Ministério da Saúde. Saúde Materna, plano de parto e canais de denúncia.",
      href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna",
    },
    {
      text: "Lei nº 11.108/2005 (Lei do Acompanhante).",
      href: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11108.htm",
    },
    {
      text: "Lei nº 11.634/2007 (direito de conhecer e se vincular à maternidade).",
      href: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11634.htm",
    },
  ],
};

const avisoMaternidade = {
  type: "callout",
  variant: "warning",
  title: "Confirme com a sua maternidade",
  text: "Cada maternidade pode ter uma lista própria e fornecer alguns materiais. Antes de fechar a mala, confirme as regras do local onde você pretende ser atendida.",
};

export const parto = {
  id: "parto",
  basePath: "/parto",
  icon: "baby",
  title: "Parto",
  intro:
    "Preparar-se com antecedência ajuda a chegar ao parto com mais segurança e tranquilidade. Conhecer os seus direitos ajuda você a participar das decisões.",
  grupos: [
    { id: "preparacao", title: "Preparação para o parto" },
    { id: "direitos", title: "Parto e direitos" },
  ],
  topicos: [
    // ─── Preparação para o parto ───────────────────────────────────────────
    {
      slug: "preparando-se-para-o-parto",
      group: "preparacao",
      icon: "calendar-check",
      title: "Preparando-se para o parto",
      summary: "Maternidade, transporte, acompanhante e apoio",
      intro:
        "A preparação para o parto não é apenas arrumar uma mala. No 3º trimestre, vale organizar com antecedência o local de atendimento, o transporte, o acompanhante, os documentos e a rede de apoio para os primeiros dias após o nascimento.",
      blocks: [
        {
          type: "checklist",
          id: "preparacao-parto",
          title: "O que pensar com antecedência",
          items: [
            "Saber qual é a maternidade ou Centro de Parto Normal (CPN) de referência.",
            "Anotar endereço, telefone e a melhor rota para chegar ao serviço.",
            "Combinar quem será o acompanhante durante o trabalho de parto, parto e pós-parto.",
            "Definir como será o transporte e ter uma alternativa caso o plano principal não funcione.",
            "Separar documentos e a Caderneta da Gestante em uma pasta de fácil acesso.",
            "Conversar sobre o Plano de Parto, quando houver.",
            "Combinar quem ficará com outros filhos, se houver.",
            "Organizar trabalho ou estudos e, se necessário, afastamento/licença.",
            "Planejar ajuda para alimentação, tarefas de casa e cuidados cotidianos após o nascimento.",
            "Tirar dúvidas sobre amamentação e puerpério durante o pré-natal.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Base oficial",
          text: "A Caderneta Brasileira da Gestante 2026 traz um checklist de preparação para o parto com esses pontos: documentos, bolsa, acompanhante, maternidade de referência, trabalho/estudo, apoio no pós-parto e conversas sobre plano de parto, amamentação e puerpério.",
        },
        {
          type: "card",
          icon: "map-pin",
          title: "Maternidade de referência",
          items: [
            "Saiba qual maternidade ou CPN atende a sua região e o seu tipo de gestação.",
            "Salve o endereço, telefone e rota no celular.",
            "Se o município oferecer visita de vinculação, aproveite para conhecer o serviço ainda no pré-natal.",
          ],
        },
        {
          type: "card",
          icon: "car",
          title: "Transporte e acompanhante",
          items: [
            "Combine quem poderá levar você à maternidade e tenha uma segunda opção de transporte.",
            "Deixe o acompanhante escolhido ciente de onde estão a mala, os documentos e o plano de parto.",
            "Converse com antecedência sobre como essa pessoa pode oferecer apoio durante o trabalho de parto.",
          ],
        },
        {
          type: "card",
          icon: "house",
          title: "Casa, filhos, trabalho e estudos",
          items: [
            "Combine quem ficará com outros filhos, animais ou responsabilidades de casa, se necessário.",
            "Se for estudante, organize atestado ou afastamento quando aplicável.",
            "Informe-se sobre licença e rotinas do trabalho.",
            "Planeje ajuda para refeições, tarefas domésticas e deslocamentos nos primeiros dias após o parto.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Direito e planejamento",
          text: "No SUS, a gestante tem direito de conhecer e se vincular a uma maternidade de referência durante o pré-natal. Em Porto Velho, o pré-natal municipal também orienta o planejamento do local do parto e o encaminhamento para a maternidade conforme a evolução da gestação.",
        },
        {
          type: "topicLink",
          href: "/parto/mala-da-maternidade",
          icon: "briefcase-medical",
          title: "Mala da maternidade",
          description: "O que levar, por ordem de prioridade",
        },
        fontesPreparacao,
      ],
      videos: [],
    },
    {
      slug: "mala-da-maternidade",
      group: "preparacao",
      icon: "briefcase-medical",
      title: "Mala da maternidade",
      summary: "Essenciais, recomendados e opcionais",
      intro:
        "A lista está organizada em três níveis para evitar excesso de itens e facilitar a decisão. Marque o que você já separou: fica salvo neste aparelho.",
      blocks: [
        {
          type: "levels",
          items: [
            {
              badge: "essencial",
              text: "O que é importante ter preparado ou separado antes da ida à maternidade. Esses itens têm prioridade.",
            },
            {
              badge: "recomendado",
              text: "Itens que costumam ser úteis, mas podem variar conforme a maternidade, o clima, o tempo de internação e as suas preferências.",
            },
            {
              badge: "opcional",
              text: "Itens de conforto ou apoio que não são necessários para todas as pessoas. Alguns só devem ser levados se a maternidade permitir ou se houver orientação profissional.",
            },
          ],
        },
        avisoMaternidade,
        {
          type: "tabs",
          label: "Prioridade dos itens da mala",
          tabs: [
            {
              label: "Essenciais",
              blocks: [
                {
                  type: "checklist",
                  id: "mala-essenciais-gestante",
                  badge: "essencial",
                  title: "Para a gestante",
                  items: [
                    "Roupas confortáveis que facilitem a amamentação.",
                    "Roupa íntima confortável.",
                    "Absorventes pós-parto ou os indicados pela maternidade.",
                    "Itens básicos de higiene pessoal: escova e creme dental, sabonete, pente/escova.",
                    "Chinelo.",
                    "Roupa confortável para a alta.",
                  ],
                },
                {
                  type: "checklist",
                  id: "mala-essenciais-bebe",
                  badge: "essencial",
                  title: "Para o bebê",
                  items: [
                    "Roupas adequadas ao clima e ao tempo previsto de internação.",
                    "Fraldas descartáveis.",
                    "Uma roupa para a saída da maternidade.",
                    "Manta ou cueiro quando necessário pelo clima ou solicitado pelo serviço.",
                  ],
                },
                {
                  type: "checklist",
                  id: "mala-essenciais-documentos",
                  badge: "essencial",
                  title: "Documentos que devem ficar junto da mala",
                  items: [
                    "Documento oficial de identificação ou certidão de nascimento.",
                    "CPF.",
                    "Caderneta da Gestante.",
                    "Plano de Parto preenchido, se houver.",
                  ],
                },
                {
                  type: "callout",
                  variant: "warning",
                  title: "Atenção",
                  text: "Não existe uma quantidade única de roupas ou fraldas válida para todas as maternidades. Algumas instituições fornecem parte dos itens e outras pedem quantidades específicas. Confirme antes.",
                },
              ],
            },
            {
              label: "Recomendados",
              blocks: [
                {
                  type: "checklist",
                  id: "mala-recomendados-gestante",
                  badge: "recomendado",
                  title: "Para a gestante",
                  items: [
                    "Cartão do SUS ou do convênio, quando aplicável.",
                    "Exames e ultrassonografias recentes, principalmente se a equipe orientou levar.",
                    "Sutiã de amamentação confortável.",
                    "Meias e toalha, se a maternidade solicitar.",
                    "Prendedor de cabelo e itens pessoais simples de conforto.",
                    "Carregador de celular.",
                  ],
                },
                {
                  type: "checklist",
                  id: "mala-recomendados-bebe",
                  badge: "recomendado",
                  title: "Para o bebê / organização",
                  items: [
                    "Manta ou cueiro, conforme clima e orientação do serviço.",
                    "Saída de maternidade.",
                    "Saco separado para roupas sujas.",
                    "Lista de telefones úteis.",
                    "Itens do acompanhante, se ele permanecer no local e o serviço permitir.",
                  ],
                },
              ],
            },
            {
              label: "Opcionais",
              blocks: [
                {
                  type: "checklist",
                  id: "mala-opcionais-conforto",
                  badge: "opcional",
                  title: "Conforto",
                  items: [
                    "Almofada de amamentação, se você já usa ou prefere.",
                    "Fone de ouvido, máscara de dormir ou outro item simples de conforto.",
                    "Garrafinha de água e lanche, apenas se o serviço permitir.",
                    "Nécessaire extra ou organizadores de mala.",
                  ],
                },
                {
                  type: "checklist",
                  id: "mala-opcionais-amamentacao",
                  badge: "opcional",
                  title: "Amamentação",
                  items: [
                    "Bomba/tira-leite: não é item de rotina. Leve somente se houver orientação e se a maternidade permitir.",
                    "Absorventes para seios podem ser úteis para algumas pessoas, mas não são obrigatórios.",
                  ],
                },
                {
                  type: "callout",
                  variant: "warning",
                  title: "Antes de colocar na mala",
                  text: "Mamadeira, chupeta, bicos, conchas e bombas de ordenha podem ser restringidos por algumas maternidades e não devem ser considerados itens obrigatórios. Não compre ou leve por rotina sem conferir as regras do serviço e sem necessidade.",
                },
              ],
            },
          ],
        },
        {
          type: "topicLink",
          href: "/parto/documentos-importantes",
          icon: "file-text",
          title: "Documentos importantes",
          description: "Por que levar cada um",
        },
        fontesPreparacao,
      ],
      videos: [],
    },
    {
      slug: "documentos-importantes",
      group: "preparacao",
      icon: "file-text",
      title: "Documentos importantes",
      summary: "Deixe tudo junto em uma pasta",
      intro:
        "Deixe os documentos juntos, de preferência em uma pasta ou envelope dentro da mala. Assim, quem estiver acompanhando a gestante também consegue encontrá-los rapidamente. Toque em cada documento para ver por que levar.",
      blocks: [
        {
          type: "expandables",
          icon: "file-text",
          items: [
            {
              title: "Documento oficial de identificação ou certidão de nascimento",
              badge: "essencial",
              text: "Identificação da gestante.",
            },
            {
              title: "CPF",
              badge: "essencial",
              text: "Documento solicitado no checklist do Ministério da Saúde.",
            },
            {
              title: "Caderneta da Gestante",
              badge: "essencial",
              text: "Reúne informações do pré-natal, exames, vacinas e evolução da gestação.",
            },
            {
              title: "Plano de Parto, se houver",
              badge: "essencial",
              text: "Ajuda a comunicar preferências e escolhas discutidas no pré-natal.",
            },
            {
              title: "Cartão do SUS ou do convênio",
              badge: "recomendado",
              text: "Facilita o cadastro e a identificação no serviço.",
            },
            {
              title: "Exames/ultrassonografias recentes",
              badge: "recomendado",
              text: "Podem ajudar a equipe, especialmente quando solicitados ou quando o atendimento ocorre fora do serviço habitual.",
            },
            {
              title: "Lista dos medicamentos em uso",
              badge: "recomendado",
              text: "Útil para informar doses, horários e tratamentos em andamento.",
            },
          ],
        },
        {
          type: "callout",
          variant: "success",
          title: "Dica",
          text: "A Caderneta da Gestante deve acompanhar a gestante nas consultas e atendimentos. Ela é um documento importante para a comunicação entre a pessoa gestante e a equipe de saúde.",
        },
        fontesPreparacao,
      ],
      videos: [],
    },
    {
      slug: "quando-procurar-a-maternidade",
      group: "preparacao",
      icon: "siren",
      title: "Quando procurar a maternidade?",
      summary: "Sinais para não esperar a próxima consulta",
      intro:
        "Converse durante o pré-natal sobre os sinais que indicam avaliação na maternidade. Procure atendimento sem esperar a próxima consulta quando houver sinais importantes.",
      blocks: [
        {
          type: "card",
          tone: "danger",
          badge: "urgencia",
          title: "Procure a maternidade / serviço de urgência",
          items: [
            "Perda de líquido pela vagina ou suspeita de rompimento da bolsa.",
            "Sangramento vaginal.",
            "Redução importante ou ausência dos movimentos do bebê, depois que você já costuma percebê-los.",
            "Contrações regulares e dolorosas que ficam progressivamente mais frequentes e intensas.",
            "Dor forte que não passa, falta de ar importante, dor no peito, desmaio ou convulsão.",
            "Dor de cabeça forte, alterações na visão ou dor forte na parte superior da barriga, principalmente se houver pressão alta.",
            "Febre ou outros sinais de doença que preocupem você.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Para Porto Velho",
          text: "O protocolo municipal de Porto Velho orienta procurar a maternidade imediatamente diante de perda de líquido amniótico. Também orienta avaliação com sangramento, redução/ausência de movimentos fetais e contrações regulares e dolorosas; no protocolo local, um dos critérios descritos é pelo menos 2 contrações a cada 10 minutos, com duração mínima de 40 segundos.",
        },
        {
          type: "callout",
          variant: "danger",
          title: "Urgência",
          text: "Se houver suspeita de urgência grave e dificuldade para chegar ao serviço, acione o SAMU pelo 192. Gestantes de alto risco ou com orientações específicas devem seguir o plano individual definido pela equipe responsável.",
        },
        { type: "emergency" },
        {
          type: "topicLink",
          href: "/pos-parto",
          icon: "house-heart",
          title: "Volta para casa",
          description: "Puerpério, recuperação e amamentação",
        },
        fontesPreparacao,
      ],
      videos: [],
    },

    // ─── Parto e direitos ──────────────────────────────────────────────────
    {
      slug: "tipos-de-parto",
      group: "direitos",
      icon: "baby",
      title: "Tipos de parto",
      summary: "Vaginal, cesariana, na água e posições",
      intro:
        "Existem diferentes formas de dar à luz. A escolha depende das condições de saúde da gestante e do bebê, das circunstâncias do nascimento e das orientações da equipe de saúde. Sempre que possível, as decisões devem ser conversadas com a gestante.",
      blocks: [
        {
          type: "callout",
          variant: "info",
          title: "Seus direitos",
          text: "Toda pessoa tem direito a receber informações claras, ser tratada com respeito e ter sua saúde e dignidade protegidas durante a gestação, o parto e o pós-parto.",
        },
        {
          type: "expandables",
          icon: "baby",
          items: [
            {
              title: "Parto vaginal",
              text: "O bebê nasce pela vagina, após o trabalho de parto. A recuperação costuma ser mais rápida do que após uma cesariana, embora isso varie de pessoa para pessoa. Podem ser utilizados métodos de alívio da dor, conforme a necessidade, a disponibilidade e a avaliação clínica.",
            },
            {
              title: "Parto cesáreo (cesariana)",
              text: "É uma cirurgia realizada por meio de cortes no abdômen e no útero para retirar o bebê. Pode ser necessária quando o parto vaginal oferece riscos ou quando existem indicações clínicas. Exige cuidados de recuperação cirúrgica e tem riscos próprios, que devem ser explicados à gestante.",
            },
            {
              title: "Parto na água",
              text: "É uma modalidade de parto vaginal em que o nascimento acontece dentro de uma banheira ou piscina apropriada. Sua indicação depende das condições de saúde da gestante e do bebê, da estrutura da maternidade e dos protocolos de segurança do serviço.",
            },
            {
              title: "Parto em posição escolhida pela gestante",
              text: "No parto vaginal, a pessoa pode utilizar posições como ficar de lado, de cócoras, sentada ou em pé, conforme as condições clínicas e a assistência disponível. A liberdade de posição pode favorecer o conforto e a participação ativa no nascimento.",
            },
          ],
        },
        {
          type: "callout",
          variant: "success",
          title: "Importante",
          text: "Parto humanizado não é um tipo específico de parto. É uma forma de assistência baseada no respeito, no acolhimento, na segurança, na informação e na autonomia da gestante, seja no parto vaginal ou na cesariana.",
        },
        fontesDireitos,
      ],
      videos: [],
    },
    {
      slug: "trabalho-de-parto",
      group: "direitos",
      icon: "timer",
      title: "O que é o trabalho de parto?",
      summary: "Sinais, fases e quando ir à maternidade",
      intro:
        "O trabalho de parto é o processo em que o corpo se prepara para o nascimento do bebê. Ele envolve mudanças no colo do útero e contrações que ajudam o bebê a nascer.",
      blocks: [
        {
          type: "card",
          title: "Quais são os sinais do trabalho de parto?",
          items: [
            "Contrações regulares: podem ficar mais fortes, longas e frequentes com o passar do tempo.",
            "Saída do tampão mucoso: pode ocorrer a eliminação de uma secreção espessa, às vezes com pequenas manchas de sangue.",
            "Rompimento da bolsa: saída de líquido pela vagina, que pode acontecer antes ou durante o trabalho de parto.",
            "Pressão na pelve e dor nas costas: podem aparecer à medida que o parto evolui.",
          ],
        },
        {
          type: "text",
          text: "Nem todos esses sinais aparecem na mesma ordem. As contrações de treinamento, chamadas de Braxton Hicks, geralmente são irregulares e não evoluem como as contrações do trabalho de parto.",
        },
        {
          type: "heading",
          text: "Quais são as fases do trabalho de parto?",
        },
        {
          type: "timeline",
          items: [
            {
              label: "1. Fase de dilatação",
              text: "As contrações ajudam o colo do útero a afinar e abrir. É comum sentir cólicas e aumento gradual da intensidade das contrações.",
            },
            {
              label: "2. Fase de expulsão",
              text: "O colo do útero está completamente dilatado e ocorre o nascimento do bebê, com os puxos espontâneos ou orientados conforme a situação clínica.",
            },
            {
              label: "3. Dequitação da placenta",
              text: "Depois que o bebê nasce, o útero continua se contraindo para que a placenta seja expulsa. A equipe acompanha o sangramento e as condições de saúde da mãe e do bebê.",
            },
          ],
        },
        {
          type: "card",
          title: "Quando procurar a maternidade?",
          text: "Procure orientação da equipe de pré-natal ou da maternidade de referência quando as contrações se tornarem regulares, quando houver perda de líquido ou se você tiver dúvidas sobre o início do parto. A frequência das contrações e o momento de ir à maternidade variam conforme a gestação e as orientações recebidas no pré-natal.",
        },
        {
          type: "callout",
          variant: "danger",
          title: "Atendimento urgente",
          text: "Procure atendimento urgente em caso de sangramento vaginal intenso, dor forte e contínua, falta de ar, convulsão, dor de cabeça intensa com alterações visuais ou diminuição importante dos movimentos do bebê. Não espere as contrações ficarem regulares diante de sinais de alerta.",
        },
        {
          type: "topicLink",
          href: "/parto/quando-procurar-a-maternidade",
          icon: "siren",
          title: "Quando procurar a maternidade?",
          description: "Sinais para não esperar a próxima consulta",
        },
        fontesDireitos,
      ],
      videos: [],
    },
    {
      slug: "plano-de-parto",
      group: "direitos",
      icon: "clipboard-pen",
      title: "O que é o plano de parto?",
      summary: "Suas preferências, conversadas com a equipe",
      intro:
        "O plano de parto é um documento preparado durante o pré-natal no qual a gestante registra suas preferências para o trabalho de parto, o nascimento e os primeiros cuidados com o bebê. Ele permite conversar antecipadamente com a equipe de saúde sobre desejos, dúvidas, procedimentos e alternativas possíveis.",
      blocks: [
        {
          type: "card",
          title: "O que pode ser incluído no plano de parto?",
          items: [
            "O tipo de parto desejado, considerando que a segurança pode exigir mudanças.",
            "A pessoa escolhida para acompanhar o nascimento.",
            "As formas de alívio da dor, como banho morno, massagens, movimentação e analgesia, quando indicada e disponível.",
            "A liberdade para caminhar e escolher posições durante o trabalho de parto, conforme as condições clínicas.",
            "As preferências sobre intervenções médicas e a explicação de seus benefícios e riscos.",
            "O contato pele a pele com o bebê após o nascimento, quando mãe e bebê estiverem em condições clínicas adequadas.",
            "As preferências sobre a amamentação e os primeiros cuidados com o recém-nascido.",
          ],
        },
        {
          type: "card",
          title: "O plano de parto precisa ser seguido?",
          text: "O plano deve ser considerado e discutido com a equipe. Entretanto, ele não é uma garantia de que todos os procedimentos ocorrerão exatamente como planejado. Se surgir uma situação de risco, pode ser necessário adaptar a assistência. Sempre que possível, a equipe deve explicar o que está acontecendo, quais são as alternativas e por que uma mudança é necessária, respeitando a autonomia da gestante.",
        },
        {
          type: "callout",
          variant: "success",
          title: "Dica",
          text: "Prepare o plano durante o pré-natal, converse sobre cada item com o profissional que acompanha a gestação e leve uma cópia para a maternidade.",
        },
        fontesDireitos,
      ],
      videos: [],
    },
    {
      slug: "direitos-no-parto",
      group: "direitos",
      icon: "scale",
      title: "Quais são os direitos da gestante durante o parto?",
      summary: "Acompanhante, informação, respeito e mais",
      intro:
        "Toda gestante tem direito a atendimento digno, seguro, respeitoso e sem discriminação. Conhecer esses direitos ajuda a identificar situações inadequadas e a buscar ajuda quando necessário.",
      blocks: [
        {
          type: "expandables",
          icon: "scale",
          items: [
            {
              title: "Direito a acompanhante",
              text: "No SUS, a Lei nº 11.108/2005 garante à gestante o direito a um acompanhante de sua escolha durante o trabalho de parto, o parto e o pós-parto imediato. A legislação também prevê direitos de acompanhamento nos serviços de saúde em outras situações. Consulte as regras aplicáveis ao atendimento recebido.",
            },
            {
              title: "Direito à informação",
              text: "A gestante deve receber explicações claras sobre seu estado de saúde, os procedimentos propostos, os riscos, os benefícios e as alternativas disponíveis.",
            },
            {
              title: "Direito ao respeito e à dignidade",
              text: "A gestante deve ser tratada com respeito, privacidade e acolhimento, sem humilhações, ameaças, discriminação ou agressões.",
            },
            {
              title: "Direito de participar das decisões",
              text: "A gestante tem direito de receber informações e participar das decisões sobre sua assistência, manifestando seu consentimento ou sua recusa informada, observadas as situações previstas em lei e as emergências clínicas.",
            },
            {
              title: "Direito de conhecer a maternidade de referência",
              text: "No SUS, a gestante tem direito de conhecer e se vincular à maternidade em que será atendida, conforme a organização da rede de saúde e a Lei nº 11.634/2007.",
            },
            {
              title: "Direito ao contato com o bebê",
              text: "Quando as condições clínicas permitirem, devem ser favorecidos o contato pele a pele logo após o nascimento, o início da amamentação na primeira hora de vida e a permanência conjunta da mãe e do bebê.",
            },
          ],
        },
        {
          type: "topicLink",
          href: "/parto/violencia-obstetrica",
          icon: "hand-heart",
          title: "O que é violência obstétrica?",
          description: "Como reconhecer e onde pedir ajuda",
        },
        {
          type: "links",
          title: "Onde encontrar informações confiáveis",
          items: [
            {
              label: "Ministério da Saúde — Saúde Materna",
              description: "Pré-natal, parto humanizado, plano de parto, maternidades e direitos",
              href: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-materna",
            },
            {
              label: "Lei do Acompanhante (Lei nº 11.108/2005)",
              description: "Presidência da República — Legislação",
              href: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11108.htm",
            },
          ],
        },
        fontesDireitos,
      ],
      videos: [],
    },
    {
      slug: "violencia-obstetrica",
      group: "direitos",
      icon: "hand-heart",
      title: "Violência obstétrica",
      summary: "Informação, respeito e direitos da mulher",
      intro:
        "Violência obstétrica acontece quando a mulher é maltratada, desrespeitada ou sofre procedimentos durante a gestação, o parto ou o pós-parto sem ser devidamente informada ou sem ter sua vontade respeitada. Pode envolver agressões físicas, verbais ou psicológicas, inclusive no atendimento relacionado ao abortamento.",
      blocks: [
        {
          type: "card",
          tone: "danger",
          title: "Como pode acontecer?",
          items: [
            "Gritar, humilhar, ameaçar, debochar ou constranger a mulher.",
            "Ignorar suas dúvidas, medos, dores ou reclamações.",
            "Fazer um procedimento sem explicar adequadamente o que será feito.",
            "Realizar um procedimento sem consentimento, quando a mulher pode participar da decisão.",
            "Impedir a mulher de fazer perguntas ou expressar sua vontade.",
            "Negar ou dificultar atendimento necessário.",
            "Impedir injustificadamente a presença do acompanhante quando esse direito é garantido.",
            "Usar medo ou ameaça para pressionar a mulher a aceitar uma conduta.",
            "Realizar intervenções sem necessidade clínica ou sem explicação adequada.",
            "Desrespeitar a privacidade, a intimidade ou a dignidade da mulher.",
            "Discriminar a gestante por sua raça, condição social, deficiência ou outras características.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Como saber se algo está errado?",
          text: "Pergunte a si mesma: \"Eu fui informada? Entendi o que está acontecendo? Pude fazer perguntas? Minha vontade foi respeitada?\"",
        },
        {
          type: "card",
          title: "O que você pode fazer?",
          items: [
            "Pergunte o que está acontecendo e por que determinado procedimento é necessário.",
            "Peça que expliquem as opções de forma que você consiga entender.",
            "Diga suas dúvidas, medos e preferências.",
            "Peça seu acompanhante quando houver direito à sua presença.",
            "Se sentir-se desrespeitada ou insegura, peça ajuda a outro profissional ou à direção do serviço.",
            "Se necessário, procure a ouvidoria do serviço de saúde e os canais oficiais de orientação e denúncia.",
          ],
        },
        {
          type: "card",
          title: "Seus direitos",
          items: [
            "Ser tratada com respeito e sem discriminação.",
            "Receber informações claras sobre seu atendimento.",
            "Ter sua privacidade e intimidade respeitadas.",
            "Participar das decisões sobre seu cuidado, quando a situação clínica permitir.",
            "Fazer perguntas e tirar dúvidas.",
            "Ter acompanhante nos momentos em que a legislação garante esse direito.",
            "Receber atendimento adequado e seguro.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Importante!",
          text: "Nem todo procedimento médico é violência obstétrica. Uma intervenção pode ser necessária para proteger a saúde da mãe ou do bebê. O mais importante é que a mulher seja informada, respeitada e participe das decisões.",
        },
        {
          type: "card",
          icon: "megaphone",
          title: "Como buscar ajuda ou denunciar?",
          text: "Se você sofrer ou presenciar uma possível violação de direitos, pode:",
          items: [
            "Procurar a ouvidoria do hospital ou serviço de saúde.",
            "Ligar para a Ouvidoria-Geral do SUS, pelo telefone 136.",
            "Procurar o Ministério Público ou a Defensoria Pública.",
            "Buscar outros canais oficiais de denúncia, conforme a situação.",
          ],
        },
        {
          type: "links",
          items: [
            {
              label: "Ligar para a Ouvidoria do SUS — 136",
              description: "Orientação e denúncia",
              href: "tel:136",
            },
          ],
        },
        {
          type: "callout",
          variant: "success",
          text: "Você não precisa ter vergonha de perguntar. Você não precisa aceitar humilhação. Você pode pedir ajuda.",
        },
        {
          type: "text",
          text: "Em caso de risco imediato à saúde, procure atendimento de urgência.",
        },
        fontesDireitos,
      ],
      videos: [],
    },
  ],
};
