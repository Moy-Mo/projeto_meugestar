import { diasEntre, formatarData } from "./datas.js";
import { intervaloEntreConsultas, resumoDaGestacao } from "./gestacao.js";

/*
 * Lembretes da gestante ("notificações pendentes"), calculados a partir da
 * caderneta. Só usam regras que estão no guia revisado pela equipe — nada de
 * conduta individual: o texto sempre manda conversar com a equipe da UBS.
 *
 * Cada lembrete: { id, nivel, titulo, texto, href }
 *   nivel: "atrasado" (vermelho) | "pendente" (rosa) | "agendado" | "info"
 */

const ANTECEDENCIA_DOSE_DIAS = 30;

const temVacina = (vacinas, padrao) => vacinas.some((v) => padrao.test(v.vacina));

export function calcularLembretes({ gestacao, consultas = [], exames = [], vacinas = [] }, dataDeHoje) {
  const lembretes = [];
  // Usa a DPP do ultrassom quando houver; senão, a DUM.
  const ig = resumoDaGestacao(gestacao, dataDeHoje)?.ig ?? null;

  if (!gestacao?.dum && !gestacao?.dpp_ultrassom) {
    lembretes.push({
      id: "sem-dum",
      nivel: "pendente",
      titulo: "Informe a data da sua última menstruação",
      texto: "Com ela, o app calcula quantas semanas de gravidez você tem e a data provável do parto.",
      href: "/caderneta/gestacao",
    });
  }

  // Próximas doses que a equipe anotou.
  for (const v of vacinas) {
    if (!v.proxima_dose) continue;
    const faltam = diasEntre(dataDeHoje, v.proxima_dose);
    if (faltam < 0) {
      lembretes.push({
        id: `dose-${v.id}`,
        nivel: "atrasado",
        titulo: `Dose de ${v.vacina} atrasada`,
        texto: `Estava marcada para ${formatarData(v.proxima_dose)}. Leve sua caderneta à UBS — não é preciso começar tudo de novo.`,
        href: "/pre-natal/vacinas-atrasadas",
      });
    } else if (faltam <= ANTECEDENCIA_DOSE_DIAS) {
      lembretes.push({
        id: `dose-${v.id}`,
        nivel: "agendado",
        titulo: `Próxima dose de ${v.vacina}`,
        texto: faltam === 0 ? "É hoje!" : `Em ${formatarData(v.proxima_dose)} (daqui a ${faltam} ${faltam === 1 ? "dia" : "dias"}).`,
        href: "/caderneta/vacinas",
      });
    }
  }

  // Vacinas indicadas pela idade gestacional (guia, "Vacinação durante a gestação").
  if (ig && ig.semanas >= 20 && !temVacina(vacinas, /dtpa/i)) {
    lembretes.push({
      id: "dtpa",
      nivel: "pendente",
      titulo: "Vacina dTpa",
      texto: "Indicada a partir de 20 semanas, 1 dose em cada gravidez. Ainda não está registrada na sua caderneta — converse com a equipe da UBS.",
      href: "/pre-natal/vacinacao-na-gestacao",
    });
  }
  if (ig && ig.semanas >= 28 && !temVacina(vacinas, /vsr|sincicial/i)) {
    lembretes.push({
      id: "vsr",
      nivel: "pendente",
      titulo: "Vacina VSR",
      texto: "Indicada a partir de 28 semanas, 1 dose em cada gravidez. Ainda não está registrada na sua caderneta — converse com a equipe da UBS.",
      href: "/pre-natal/vacinacao-na-gestacao",
    });
  }

  // Consultas: a próxima marcada, ou um aviso se já passou do intervalo do guia.
  const futuras = consultas.filter((c) => diasEntre(dataDeHoje, c.data) >= 0).sort((a, b) => diasEntre(b.data, a.data));
  if (futuras.length > 0) {
    const proxima = futuras[0];
    lembretes.push({
      id: `consulta-${proxima.id}`,
      nivel: "agendado",
      titulo: "Próxima consulta",
      texto: `Marcada para ${formatarData(proxima.data)}. Leve sua Caderneta da Gestante.`,
      href: "/caderneta/consultas",
    });
  } else if (ig) {
    const passadas = consultas.filter((c) => diasEntre(c.data, dataDeHoje) > 0);
    const ultima = passadas.sort((a, b) => diasEntre(a.data, b.data))[0];
    const intervalo = intervaloEntreConsultas(ig.semanas);
    if (!ultima) {
      lembretes.push({
        id: "registre-consulta",
        nivel: "info",
        titulo: "Registre suas consultas",
        texto: "Anote cada consulta do pré-natal para acompanhar sua pressão, seu peso e os batimentos do bebê.",
        href: "/caderneta/consultas",
      });
    } else if (diasEntre(ultima.data, dataDeHoje) > intervalo) {
      lembretes.push({
        id: "marcar-consulta",
        nivel: "pendente",
        titulo: "Hora de marcar a próxima consulta",
        texto: `Com ${ig.semanas} semanas, o comum é cerca de 1 consulta ${intervalo === 30 ? "por mês" : intervalo === 15 ? "a cada 15 dias" : "por semana"}. A última registrada foi em ${formatarData(ultima.data)}.`,
        href: "/pre-natal/como-funcionam-as-consultas",
      });
    }
  }

  // Exames marcados para hoje ou depois.
  for (const e of exames) {
    const faltam = diasEntre(dataDeHoje, e.data);
    if (faltam >= 0 && faltam <= ANTECEDENCIA_DOSE_DIAS) {
      lembretes.push({
        id: `exame-${e.id}`,
        nivel: "agendado",
        titulo: `Exame: ${e.nome}`,
        texto: faltam === 0 ? "Marcado para hoje." : `Marcado para ${formatarData(e.data)}.`,
        href: "/caderneta/exames",
      });
    }
  }

  // Orientações do guia por fase.
  if (ig && ig.semanas >= 28) {
    lembretes.push({
      id: "pediatra",
      nivel: "info",
      titulo: "Consulta pediátrica pré-natal",
      texto: "A partir da 28ª semana, a família pode conversar com o pediatra antes do nascimento.",
      href: "/pre-natal/consulta-pediatrica-pre-natal",
    });
  }
  if (ig && ig.semanas >= 32) {
    lembretes.push({
      id: "mala",
      nivel: "info",
      titulo: "Prepare a mala da maternidade",
      texto: "No 3º trimestre, vale organizar a mala, os documentos e o transporte com antecedência.",
      href: "/parto/mala-da-maternidade",
    });
  }

  const ordem = { atrasado: 0, pendente: 1, agendado: 2, info: 3 };
  return lembretes.sort((a, b) => ordem[a.nivel] - ordem[b.nivel]);
}
