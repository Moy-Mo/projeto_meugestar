"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  atualizarPerfil,
  cadastrar,
  entrar,
  excluirConta,
  pedirNovaSenha,
  redefinirSenha,
} from "@/lib/actions/conta";
import { limparChecklistsLocais } from "@/components/content/InteractiveChecklist";
import { Aviso, BotaoEnviar, Campo, CampoSenha } from "./Campos";

export function FormCadastro() {
  const [estado, acao] = useActionState(cadastrar, null);
  const v = estado?.valores ?? {};
  const e = estado?.erros ?? {};

  if (estado?.sucesso) return <Aviso estado={estado} />;

  return (
    <form action={acao} noValidate className="space-y-5">
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">1. Seus dados</legend>
        <Campo nome="nome" rotulo="Seu nome" obrigatorio valor={v.nome} erro={e.nome} autoComplete="name" maxLength={120} />
        <Campo
          nome="telefone"
          rotulo="Telefone / WhatsApp"
          tipo="tel"
          valor={v.telefone}
          erro={e.telefone}
          autoComplete="tel"
          maxLength={20}
        />
        <Campo
          nome="ubs"
          rotulo="Sua UBS / USF"
          valor={v.ubs}
          erro={e.ubs}
          maxLength={120}
          dica="O nome do postinho onde você faz o pré-natal."
        />
        <Campo
          nome="dum"
          rotulo="Data da última menstruação (DUM)"
          tipo="date"
          valor={v.dum}
          erro={e.dum}
          dica="Se não souber agora, pode deixar em branco e preencher depois."
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">2. Acesso</legend>
        <Campo
          nome="email"
          rotulo="E-mail"
          tipo="email"
          obrigatorio
          valor={v.email}
          erro={e.email}
          autoComplete="email"
          inputMode="email"
        />
        <CampoSenha
          erro={e.senha}
          autoComplete="new-password"
          dica="Pelo menos 8 caracteres. Anote em um lugar seguro."
        />
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">3. Seus dados estão protegidos</legend>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-borda bg-superficie p-3">
          <input
            type="checkbox"
            name="consentimento"
            value="sim"
            defaultChecked={false}
            aria-invalid={e.consentimento ? true : undefined}
            aria-describedby={e.consentimento ? "erro-consentimento" : undefined}
            className="mt-1 size-6 shrink-0 accent-rosa-600"
          />
          <span>
            Li e concordo com o{" "}
            <Link href="/privacidade" target="_blank" className="font-bold text-rosa-700 underline">
              uso dos meus dados
              <span className="sr-only"> (abre em nova aba)</span>
            </Link>
            . Entendo que o Meu Gestar guarda as informações da minha gravidez só para mim, e que posso
            apagar tudo quando quiser.
          </span>
        </label>
        {e.consentimento && (
          <p id="erro-consentimento" className="mt-1 text-sm font-bold text-alerta-700">
            {e.consentimento}
          </p>
        )}
      </fieldset>

      <Aviso estado={estado} />
      <BotaoEnviar carregando="Criando sua conta…">Criar minha conta</BotaoEnviar>
      <p className="text-center">
        Já tem conta?{" "}
        <Link href="/entrar" className="font-bold text-rosa-700 underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}

export function FormEntrar({ voltar }) {
  const [estado, acao] = useActionState(entrar, null);

  return (
    <form action={acao} className="space-y-4">
      <input type="hidden" name="voltar" value={voltar ?? ""} />
      <Campo
        nome="email"
        rotulo="E-mail"
        tipo="email"
        obrigatorio
        valor={estado?.valores?.email}
        autoComplete="email"
        inputMode="email"
      />
      <CampoSenha />
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Entrando…">Entrar</BotaoEnviar>
      <p className="text-center">
        <Link href="/recuperar-senha" className="font-bold text-rosa-700 underline">
          Esqueci minha senha
        </Link>
      </p>
    </form>
  );
}

export function FormRecuperar() {
  const [estado, acao] = useActionState(pedirNovaSenha, null);
  if (estado?.sucesso) return <Aviso estado={estado} />;

  return (
    <form action={acao} className="space-y-4">
      <Campo
        nome="email"
        rotulo="E-mail da sua conta"
        tipo="email"
        obrigatorio
        valor={estado?.valores?.email}
        autoComplete="email"
        inputMode="email"
      />
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Enviando…">Enviar link</BotaoEnviar>
    </form>
  );
}

export function FormRedefinir() {
  const [estado, acao] = useActionState(redefinirSenha, null);
  return (
    <form action={acao} className="space-y-4">
      <CampoSenha
        rotulo="Nova senha"
        erro={estado?.erros?.senha}
        autoComplete="new-password"
        dica="Pelo menos 8 caracteres."
      />
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Salvando…">Salvar nova senha</BotaoEnviar>
    </form>
  );
}

export function FormPerfil({ perfil }) {
  const [estado, acao] = useActionState(atualizarPerfil, null);
  const v = estado?.valores ?? perfil ?? {};
  const e = estado?.erros ?? {};

  return (
    <form action={acao} className="space-y-4">
      <Campo nome="nome" rotulo="Seu nome" obrigatorio valor={v.nome} erro={e.nome} autoComplete="name" />
      <Campo nome="telefone" rotulo="Telefone / WhatsApp" tipo="tel" valor={v.telefone} erro={e.telefone} />
      <Campo nome="ubs" rotulo="Sua UBS / USF" valor={v.ubs} erro={e.ubs} />
      <Campo nome="data_nascimento" rotulo="Data de nascimento" tipo="date" valor={v.data_nascimento} erro={e.data_nascimento} />
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Salvando…">Salvar meus dados</BotaoEnviar>
    </form>
  );
}

export function FormExcluirConta() {
  const [estado, acao] = useActionState(excluirConta, null);
  return (
    <form action={acao} onSubmit={limparChecklistsLocais} className="space-y-4">
      <Campo
        nome="confirmacao"
        rotulo='Para confirmar, digite EXCLUIR'
        obrigatorio
        dica="Isto apaga sua conta e todos os registros da sua caderneta. Não dá para desfazer."
      />
      <Aviso estado={estado} />
      <BotaoEnviar variante="perigo" carregando="Excluindo…">
        Excluir minha conta e meus dados
      </BotaoEnviar>
    </form>
  );
}
