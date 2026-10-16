"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirUsuario } from "@/lib/dal";
import { diasEntre, hoje } from "@/lib/datas";
import { validarDUM } from "@/lib/gestacao";
import { VERSAO_TERMO } from "@/lib/caderneta-config";
import { cnsValido, cpfValido, soDigitos, telefoneValido } from "@/lib/documentos";
import { salvarFoto, temFoto, validarFoto, BUCKET_FOTOS } from "@/lib/foto";
import { PROFISSOES } from "@/lib/papeis";
import { emailValido, temErros, validarCampos } from "@/lib/validacao";

const SENHA_MINIMA = 8;

// Erros do Supabase Auth (em inglês) → frases simples.
const MENSAGENS = {
  user_already_exists: "Já existe uma conta com este e-mail. Tente entrar.",
  email_exists: "Já existe uma conta com este e-mail. Tente entrar.",
  invalid_credentials: "E-mail ou senha incorretos.",
  weak_password: `Senha fraca. Use pelo menos ${SENHA_MINIMA} caracteres, misturando letras e números.`,
  email_address_invalid: "Este e-mail não é válido.",
  email_not_confirmed: "Confirme seu e-mail pelo link que enviamos antes de entrar.",
  same_password: "A nova senha precisa ser diferente da anterior.",
  over_email_send_rate_limit: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  over_request_rate_limit: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  signup_disabled: "O cadastro está desativado no momento.",
  // O banco recusa o cadastro quando o CPF ou o Cartão SUS já têm conta (índice único).
  unexpected_failure:
    "Não foi possível criar a conta. Confira se este CPF ou Cartão SUS já não está cadastrado em outra conta.",
};

function mensagemDeErro(erro) {
  return MENSAGENS[erro?.code] ?? "Não foi possível concluir agora. Verifique sua internet e tente de novo.";
}

/** Só aceita voltar para páginas do próprio app (evita redirecionar para outro site). */
function destinoSeguro(voltar, padrao = "/caderneta") {
  return typeof voltar === "string" && voltar.startsWith("/") && !voltar.startsWith("//") ? voltar : padrao;
}

// Campos pessoais pedidos no cadastro e no perfil (todos obrigatórios).
const camposPessoais = [
  { nome: "nome", tipo: "text", obrigatorio: true, maxLength: 120 },
  { nome: "cpf", tipo: "text", obrigatorio: true, maxLength: 20 },
  { nome: "cns", tipo: "text", obrigatorio: true, maxLength: 25 },
  { nome: "data_nascimento", tipo: "date", obrigatorio: true },
  { nome: "telefone", tipo: "text", obrigatorio: true, maxLength: 20 },
];

const camposCadastro = [
  ...camposPessoais,
  { nome: "ubs", tipo: "text", maxLength: 120 }, // "minha UBS não está na lista"
  { nome: "email", tipo: "text", obrigatorio: true, maxLength: 200 },
  { nome: "dum", tipo: "date" },
];

/** Confere nome, CPF, Cartão SUS, nascimento e telefone; guarda os documentos só com dígitos. */
function validarDadosPessoais(dados, erros) {
  if (dados.nome && dados.nome.length < 2) erros.nome = "Digite seu nome.";
  if (dados.cpf) {
    if (!cpfValido(dados.cpf)) erros.cpf = "Este CPF não é válido. Confira os números.";
    else dados.cpf = soDigitos(dados.cpf);
  }
  if (dados.cns) {
    if (!cnsValido(dados.cns)) erros.cns = "Este número do Cartão SUS não é válido. Confira os 15 números.";
    else dados.cns = soDigitos(dados.cns);
  }
  if (dados.telefone) {
    if (!telefoneValido(dados.telefone)) erros.telefone = "Digite o número com DDD. Ex.: (69) 99999-1234.";
    else dados.telefone = soDigitos(dados.telefone);
  }
  if (dados.data_nascimento) {
    const anos = diasEntre(dados.data_nascimento, hoje()) / 365.25;
    if (anos < 10 || anos > 60) erros.data_nascimento = "Confira a data de nascimento.";
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Confere se a UBS escolhida existe e está ativa (a lista é pública). */
async function validarUbs(supabase, ubsId, erros, campo = "ubs_id") {
  if (!ubsId) return;
  if (!UUID.test(ubsId)) {
    erros[campo] = "Escolha uma UBS da lista.";
    return;
  }
  const { data } = await supabase.from("ubs").select("id").eq("id", ubsId).eq("ativa", true).maybeSingle();
  if (!data) erros[campo] = "Escolha uma UBS da lista.";
}

/** Campos comuns a todo cadastro: e-mail, senha e consentimento. */
function validarAcesso(dados, senha, formData, erros) {
  if (dados.email && !emailValido(dados.email)) erros.email = "Este e-mail não parece certo. Confira.";
  if (senha.length < SENHA_MINIMA) erros.senha = `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.`;
  if (formData.get("consentimento") !== "sim") {
    erros.consentimento = "Para criar a conta, você precisa concordar com o uso dos seus dados.";
  }
}

/**
 * Cria a conta no Supabase. O banco cria o perfil a partir de `metadados`
 * (ver as migrações 0002 e 0003) e depois apaga os documentos dos metadados de login.
 * Devolve { supabase, data } ou { erro }.
 */
async function criarConta(email, senha, metadados) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password: senha,
    options: { data: { ...metadados, consentimento_versao: VERSAO_TERMO } },
  });
  if (error) return { erro: mensagemDeErro(error) };
  return { supabase, data };
}

// Com a confirmação de e-mail ligada no Supabase, não há sessão logo após o cadastro.
const CONFIRME_EMAIL = "Conta criada! Enviamos um e-mail para você confirmar. Depois de confirmar, é só entrar.";

export async function cadastrar(_estado, formData) {
  const { dados, erros, valores } = validarCampos(
    [...camposCadastro, { nome: "ubs_id", tipo: "text", maxLength: 40 }],
    formData,
  );
  const senha = String(formData.get("senha") ?? "");
  const autorizaUbs = formData.get("autoriza_ubs") === "sim";
  valores.autoriza_ubs = autorizaUbs;

  validarDadosPessoais(dados, erros);
  validarAcesso(dados, senha, formData, erros);
  const erroFoto = validarFoto(formData.get("foto"));
  if (erroFoto) erros.foto = erroFoto;
  if (dados.dum) {
    const erroDUM = validarDUM(dados.dum, hoje());
    if (erroDUM) erros.dum = erroDUM;
  }
  if (autorizaUbs && !dados.ubs_id) erros.ubs_id = "Para autorizar, escolha sua UBS na lista.";
  await validarUbs(await createClient(), dados.ubs_id, erros);
  if (temErros(erros)) return { erros, valores };

  const { supabase, data, erro } = await criarConta(dados.email, senha, {
    tipo: "gestante",
    nome: dados.nome,
    cpf: dados.cpf,
    cns: dados.cns,
    data_nascimento: dados.data_nascimento,
    telefone: dados.telefone,
    ubs: dados.ubs ?? "",
    ubs_id: dados.ubs_id ?? "",
    autoriza_ubs: autorizaUbs,
    dum: dados.dum ?? "",
  });
  if (erro) return { erro, valores };

  if (!data.session) {
    return {
      sucesso: temFoto(formData.get("foto"))
        ? `${CONFIRME_EMAIL} Depois, coloque sua foto em Minha conta.`
        : CONFIRME_EMAIL,
    };
  }

  // Com a sessão já aberta, a foto é gravada na pasta da própria usuária.
  if (temFoto(formData.get("foto"))) await salvarFoto(supabase, data.user.id, formData.get("foto"));

  redirect("/caderneta?bem-vinda=1");
}

export async function cadastrarProfissional(_estado, formData) {
  const { dados, erros, valores } = validarCampos(
    [
      { nome: "nome", tipo: "text", obrigatorio: true, maxLength: 120 },
      { nome: "cpf", tipo: "text", obrigatorio: true, maxLength: 20 },
      { nome: "telefone", tipo: "text", obrigatorio: true, maxLength: 20 },
      { nome: "profissao", tipo: "text", obrigatorio: true, maxLength: 60 },
      { nome: "registro_conselho", tipo: "text", obrigatorio: true, maxLength: 30 },
      { nome: "ubs_id", tipo: "text", obrigatorio: true, maxLength: 40 },
      { nome: "email", tipo: "text", obrigatorio: true, maxLength: 200 },
    ],
    formData,
  );
  const senha = String(formData.get("senha") ?? "");

  validarDadosPessoais(dados, erros);
  validarAcesso(dados, senha, formData, erros);
  if (dados.profissao && !PROFISSOES.includes(dados.profissao)) erros.profissao = "Escolha uma profissão da lista.";
  await validarUbs(await createClient(), dados.ubs_id, erros);
  if (temErros(erros)) return { erros, valores };

  const { data, erro } = await criarConta(dados.email, senha, {
    tipo: "profissional",
    nome: dados.nome,
    cpf: dados.cpf,
    telefone: dados.telefone,
    profissao: dados.profissao,
    registro_conselho: dados.registro_conselho.toUpperCase(),
    ubs_id: dados.ubs_id,
  });
  if (erro) return { erro, valores };
  if (!data.session) return { sucesso: CONFIRME_EMAIL };

  redirect("/ubs");
}

export async function cadastrarFamiliar(_estado, formData) {
  const { dados, erros, valores } = validarCampos(
    [
      { nome: "nome", tipo: "text", obrigatorio: true, maxLength: 120 },
      { nome: "telefone", tipo: "text", obrigatorio: true, maxLength: 20 },
      { nome: "email", tipo: "text", obrigatorio: true, maxLength: 200 },
      { nome: "codigo", tipo: "text", maxLength: 20 },
    ],
    formData,
  );
  const senha = String(formData.get("senha") ?? "");

  validarDadosPessoais(dados, erros); // nome e telefone
  validarAcesso(dados, senha, formData, erros);
  if (temErros(erros)) return { erros, valores };

  const { supabase, data, erro } = await criarConta(dados.email, senha, {
    tipo: "familiar",
    nome: dados.nome,
    telefone: dados.telefone,
  });
  if (erro) return { erro, valores };
  if (!data.session) {
    return { sucesso: `${CONFIRME_EMAIL} Depois, abra de novo o link do convite.` };
  }

  // Aceita na hora o convite que trouxe a pessoa até aqui.
  if (dados.codigo) await supabase.rpc("aceitar_convite", { p_codigo: dados.codigo });
  redirect("/familia");
}

export async function entrar(_estado, formData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const senha = String(formData.get("senha") ?? "");
  const valores = { email };

  if (!email || !senha) return { erro: "Preencha o e-mail e a senha.", valores };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) return { erro: mensagemDeErro(error), valores };

  redirect(destinoSeguro(formData.get("voltar")));
}

export async function sair() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function pedirNovaSenha(_estado, formData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!emailValido(email)) return { erro: "Digite o e-mail da sua conta.", valores: { email } };

  const origem = (await headers()).get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origem}/auth/callback?next=/redefinir-senha`,
  });
  if (error?.code?.startsWith("over_")) return { erro: mensagemDeErro(error), valores: { email } };

  // Mesma resposta exista ou não a conta, para não revelar quem está cadastrada.
  return {
    sucesso:
      "Se este e-mail tiver uma conta, você vai receber um link para criar uma nova senha. Abra o link neste mesmo aparelho.",
  };
}

export async function redefinirSenha(_estado, formData) {
  await exigirUsuario("/redefinir-senha");
  const senha = String(formData.get("senha") ?? "");
  if (senha.length < SENHA_MINIMA) {
    return { erros: { senha: `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.` } };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: senha });
  if (error) return { erro: mensagemDeErro(error) };
  redirect("/caderneta");
}

export async function atualizarPerfil(_estado, formData) {
  const usuario = await exigirUsuario("/conta");
  const { dados, erros, valores } = validarCampos(camposPessoais, formData);
  validarDadosPessoais(dados, erros);
  const foto = formData.get("foto");
  const erroFoto = validarFoto(foto);
  if (erroFoto) erros.foto = erroFoto;
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase.from("perfis").update(dados).eq("id", usuario.id);
  if (error?.code === "23505") {
    return { erro: "Este CPF ou Cartão SUS já está cadastrado em outra conta.", valores };
  }
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };
  // O cabeçalho mostra o nome a partir da sessão; mantém igual ao perfil.
  await supabase.auth.updateUser({ data: { nome: dados.nome } });

  if (temFoto(foto) && !(await salvarFoto(supabase, usuario.id, foto))) {
    return { erro: "Seus dados foram salvos, mas não conseguimos salvar a foto. Tente outra.", valores };
  }

  revalidatePath("/", "layout");
  return { sucesso: "Dados salvos!", valores };
}

export async function excluirConta(_estado, formData) {
  const usuario = await exigirUsuario("/conta");
  if (String(formData.get("confirmacao") ?? "").trim().toUpperCase() !== "EXCLUIR") {
    return { erro: 'Para confirmar, digite a palavra EXCLUIR.' };
  }
  const supabase = await createClient();
  // A foto fica no Storage, que não é apagado junto com a conta: apaga antes.
  await supabase.storage.from(BUCKET_FOTOS).remove([`${usuario.id}/foto.webp`]);
  const { error } = await supabase.rpc("excluir_minha_conta");
  if (error) return { erro: "Não foi possível excluir agora. Tente de novo." };

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/conta-excluida");
}
