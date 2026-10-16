"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirUsuario } from "@/lib/dal";
import { hoje } from "@/lib/datas";
import { validarDUM } from "@/lib/gestacao";
import { VERSAO_TERMO } from "@/lib/caderneta-config";
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
};

function mensagemDeErro(erro) {
  return MENSAGENS[erro?.code] ?? "Não foi possível concluir agora. Verifique sua internet e tente de novo.";
}

/** Só aceita voltar para páginas do próprio app (evita redirecionar para outro site). */
function destinoSeguro(voltar, padrao = "/caderneta") {
  return typeof voltar === "string" && voltar.startsWith("/") && !voltar.startsWith("//") ? voltar : padrao;
}

const camposCadastro = [
  { nome: "nome", tipo: "text", obrigatorio: true, maxLength: 120 },
  { nome: "email", tipo: "text", obrigatorio: true, maxLength: 200 },
  { nome: "telefone", tipo: "text", maxLength: 20 },
  { nome: "ubs", tipo: "text", maxLength: 120 },
  { nome: "dum", tipo: "date" },
];

export async function cadastrar(_estado, formData) {
  const { dados, erros, valores } = validarCampos(camposCadastro, formData);
  const senha = String(formData.get("senha") ?? "");

  if (dados.nome && dados.nome.length < 2) erros.nome = "Digite seu nome.";
  if (dados.email && !emailValido(dados.email)) erros.email = "Este e-mail não parece certo. Confira.";
  if (senha.length < SENHA_MINIMA) erros.senha = `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.`;
  if (dados.dum) {
    const erroDUM = validarDUM(dados.dum, hoje());
    if (erroDUM) erros.dum = erroDUM;
  }
  if (formData.get("consentimento") !== "sim") {
    erros.consentimento = "Para criar a conta, você precisa concordar com o uso dos seus dados.";
  }
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: dados.email.toLowerCase(),
    password: senha,
    options: {
      // O banco cria o perfil a partir destes dados (ver a migração 0001).
      data: {
        nome: dados.nome,
        telefone: dados.telefone ?? "",
        ubs: dados.ubs ?? "",
        dum: dados.dum ?? "",
        consentimento_versao: VERSAO_TERMO,
      },
    },
  });

  if (error) return { erro: mensagemDeErro(error), valores };

  // Se a confirmação de e-mail estiver ligada no Supabase, não há sessão ainda.
  if (!data.session) {
    return {
      sucesso: "Conta criada! Enviamos um e-mail para você confirmar. Depois de confirmar, é só entrar.",
    };
  }

  redirect("/caderneta?bem-vinda=1");
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

const camposPerfil = [
  { nome: "nome", tipo: "text", obrigatorio: true, maxLength: 120 },
  { nome: "telefone", tipo: "text", maxLength: 20 },
  { nome: "ubs", tipo: "text", maxLength: 120 },
  { nome: "data_nascimento", tipo: "date" },
];

export async function atualizarPerfil(_estado, formData) {
  const usuario = await exigirUsuario("/conta");
  const { dados, erros, valores } = validarCampos(camposPerfil, formData);
  if (dados.nome && dados.nome.length < 2) erros.nome = "Digite seu nome.";
  if (temErros(erros)) return { erros, valores };

  const supabase = await createClient();
  const { error } = await supabase.from("perfis").update(dados).eq("id", usuario.id);
  if (error) return { erro: "Não foi possível salvar. Tente de novo.", valores };
  // O cabeçalho mostra o nome a partir da sessão; mantém igual ao perfil.
  await supabase.auth.updateUser({ data: { nome: dados.nome } });

  revalidatePath("/", "layout");
  return { sucesso: "Dados salvos!", valores };
}

export async function excluirConta(_estado, formData) {
  await exigirUsuario("/conta");
  if (String(formData.get("confirmacao") ?? "").trim().toUpperCase() !== "EXCLUIR") {
    return { erro: 'Para confirmar, digite a palavra EXCLUIR.' };
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("excluir_minha_conta");
  if (error) return { erro: "Não foi possível excluir agora. Tente de novo." };

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/conta-excluida");
}
