/*
 * Registros da caderneta digital (guia: "Minha caderneta").
 * Esta configuração é usada pelo formulário (rótulos, tipos) e pela validação
 * no servidor (obrigatórios, limites) — uma única fonte para os dois.
 *
 * Campo: { nome, rotulo, tipo: "date" | "number" | "text" | "textarea",
 *          obrigatorio?, min?, max?, inteiro?, maxLength?, dica?, sufixo? }
 */
export const VERSAO_TERMO = "2026-10-v1";

const observacoes = {
  nome: "observacoes",
  rotulo: "Observações",
  tipo: "textarea",
  maxLength: 1000,
  dica: "Opcional. O que a equipe orientou, como você se sentiu…",
};

export const registros = {
  consultas: {
    titulo: "Consultas",
    singular: "consulta",
    rotuloNovo: "Nova consulta",
    mensagemSalvo: "Consulta registrada!",
    icone: "stethoscope",
    intro: "Anote cada consulta do pré-natal. Se já tiver a próxima marcada, registre com a data futura: ela aparece nos seus lembretes.",
    campoData: "data",
    campos: [
      { nome: "data", rotulo: "Data da consulta", tipo: "date", obrigatorio: true },
      { nome: "peso_kg", rotulo: "Peso", tipo: "number", min: 25, max: 300, sufixo: "kg", passo: "0.1" },
      { nome: "pa_sistolica", rotulo: "Pressão — número de cima", tipo: "number", min: 50, max: 260, inteiro: true, sufixo: "mmHg", dica: "Ex.: em 12 por 8 (120/80), é 120." },
      { nome: "pa_diastolica", rotulo: "Pressão — número de baixo", tipo: "number", min: 30, max: 180, inteiro: true, sufixo: "mmHg", dica: "Ex.: em 12 por 8 (120/80), é 80." },
      { nome: "bcf", rotulo: "Batimentos do bebê (BCF)", tipo: "number", min: 50, max: 240, inteiro: true, sufixo: "bpm" },
      observacoes,
    ],
  },
  exames: {
    titulo: "Exames",
    singular: "exame",
    rotuloNovo: "Novo exame",
    mensagemSalvo: "Exame registrado!",
    icone: "flask-conical",
    intro: "Guarde os resultados dos seus exames. Exames marcados para os próximos dias aparecem nos seus lembretes.",
    campoData: "data",
    campos: [
      { nome: "nome", rotulo: "Nome do exame", tipo: "text", obrigatorio: true, maxLength: 120, lista: "lista-exames", dica: "Ex.: Hemograma, Glicemia, Urocultura…" },
      { nome: "data", rotulo: "Data", tipo: "date", obrigatorio: true },
      { nome: "resultado", rotulo: "Resultado", tipo: "text", maxLength: 500 },
      observacoes,
    ],
  },
  vacinas: {
    titulo: "Vacinas",
    singular: "vacina",
    rotuloNovo: "Nova vacina",
    mensagemSalvo: "Vacina registrada!",
    icone: "syringe",
    intro: "Registre as doses que você tomou. Se a equipe marcou a próxima dose, anote a data: o app avisa quando estiver chegando.",
    campoData: "data_dose",
    campos: [
      { nome: "vacina", rotulo: "Vacina", tipo: "text", obrigatorio: true, maxLength: 120, lista: "lista-vacinas", dica: "Ex.: dTpa, Hepatite B, Influenza (gripe), VSR…" },
      { nome: "data_dose", rotulo: "Data em que tomou", tipo: "date", obrigatorio: true },
      { nome: "proxima_dose", rotulo: "Data da próxima dose", tipo: "date", dica: "Opcional — só se a equipe marcou." },
      observacoes,
    ],
  },
  ultrassons: {
    titulo: "Ultrassons",
    singular: "ultrassom",
    rotuloNovo: "Novo ultrassom",
    mensagemSalvo: "Ultrassom registrado!",
    icone: "scan-line",
    intro: "Anote cada ultrassonografia. A idade gestacional que o exame mostrou ajuda a equipe a acompanhar o crescimento do bebê.",
    campoData: "data",
    campos: [
      { nome: "data", rotulo: "Data do exame", tipo: "date", obrigatorio: true },
      { nome: "ig_semanas", rotulo: "Semanas (no laudo)", tipo: "number", min: 0, max: 44, inteiro: true, sufixo: "semanas" },
      { nome: "ig_dias", rotulo: "Dias (no laudo)", tipo: "number", min: 0, max: 6, inteiro: true, sufixo: "dias" },
      { nome: "resultado", rotulo: "Resultado", tipo: "text", maxLength: 500 },
      observacoes,
    ],
  },
};

// Sugestões para os campos de texto (o usuário pode digitar outra coisa).
export const sugestoes = {
  "lista-exames": [
    "Hemograma", "Tipo de sangue e fator Rh", "Coombs indireto", "Glicemia",
    "Teste de tolerância à glicose (TOTG 75 g)", "Sífilis", "HIV", "Hepatite B (HBsAg)",
    "Hepatite C", "Toxoplasmose", "Urina e urocultura", "Eletroforese de hemoglobina", "TSH (tireoide)",
  ],
  "lista-vacinas": [
    "Hepatite B", "dT (difteria e tétano)", "Influenza (gripe)", "COVID-19", "dTpa",
    "VSR (vírus sincicial respiratório)", "Febre amarela",
  ],
};
