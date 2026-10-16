"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  atualizarPerfil,
  cadastrar,
  cadastrarFamiliar,
  cadastrarProfissional,
  entrar,
  excluirConta,
  pedirNovaSenha,
  redefinirSenha,
} from "@/lib/actions/conta";
import { PROFISSOES } from "@/lib/papeis";
import { limparChecklistsLocais } from "@/components/content/InteractiveChecklist";
import { Aviso, BotaoEnviar, Campo, CampoFoto, CampoMarcar, CampoSelecao, CampoSenha } from "./Campos";

/**
 * Dados pessoais pedidos no cadastro e no perfil. Obrigatórios: nome, CPF,
 * Cartão SUS, nascimento e telefone (pedido da equipe). A foto é opcional.
 */
function CamposPessoais({ valores: v, erros: e, fotoAtual }) {
  return (
    <>
      <CampoFoto fotoAtual={fotoAtual} erro={e.foto} />
      <Campo nome="nome" rotulo="Nome completo" obrigatorio valor={v.nome} erro={e.nome} autoComplete="name" maxLength={120} />
      <Campo
        nome="cpf"
        rotulo="CPF"
        obrigatorio
        mascara="cpf"
        valor={v.cpf}
        erro={e.cpf}
        maxLength={14}
        dica="Só os números; os pontos aparecem sozinhos."
      />
      <Campo
        nome="cns"
        rotulo="Número do Cartão SUS"
        obrigatorio
        mascara="cns"
        valor={v.cns}
        erro={e.cns}
        maxLength={18}
        dica="Os 15 números do Cartão Nacional de Saúde (também aparece no app Meu SUS Digital)."
      />
      <Campo
        nome="data_nascimento"
        rotulo="Data de nascimento"
        tipo="date"
        obrigatorio
        valor={v.data_nascimento}
        erro={e.data_nascimento}
        autoComplete="bday"
      />
      <Campo
        nome="telefone"
        rotulo="Telefone / WhatsApp"
        tipo="tel"
        obrigatorio
        mascara="telefone"
        valor={v.telefone}
        erro={e.telefone}
        autoComplete="tel"
        maxLength={16}
        dica="Com DDD. Ex.: (69) 99999-1234."
      />
    </>
  );
}

/** Escolha da UBS + autorização para a equipe ver a caderneta (cadastro e Minha conta). */
export function CamposUbs({ listaUbs, valores: v, erros: e, comTextoLivre = false }) {
  return (
    <>
      <CampoSelecao
        nome="ubs_id"
        rotulo="Sua UBS / USF"
        opcoes={listaUbs.map((u) => ({ valor: u.id, rotulo: u.bairro ? `${u.nome} — ${u.bairro}` : u.nome }))}
        valor={v.ubs_id}
        erro={e.ubs_id}
        dica="O postinho onde você faz o pré-natal."
      />
      {comTextoLivre && (
        <Campo
          nome="ubs"
          rotulo="Sua UBS não está na lista? Escreva o nome"
          valor={v.ubs}
          erro={e.ubs}
          maxLength={120}
        />
      )}
      <CampoMarcar nome="autoriza_ubs" marcado={Boolean(v.autoriza_ubs)}>
        <strong>Autorizo a equipe da minha UBS</strong> a ver minha caderneta e a registrar
        consultas, exames e vacinas nela. Posso retirar esta autorização quando quiser.
      </CampoMarcar>
    </>
  );
}

/** Aceite do termo de uso de dados (obrigatório em todo cadastro). */
function Consentimento({ numero, erro, children }) {
  return (
    <fieldset>
      <legend className="mb-2 text-lg font-extrabold text-rosa-800">{numero}. Seus dados estão protegidos</legend>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-borda bg-superficie p-3">
        <input
          type="checkbox"
          name="consentimento"
          value="sim"
          defaultChecked={false}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? "erro-consentimento" : undefined}
          className="mt-1 size-6 shrink-0 accent-rosa-600"
        />
        <span>
          Li e concordo com o{" "}
          <Link href="/privacidade" target="_blank" className="font-bold text-rosa-700 underline">
            uso dos meus dados
            <span className="sr-only"> (abre em nova aba)</span>
          </Link>
          . {children}
        </span>
      </label>
      {erro && (
        <p id="erro-consentimento" className="mt-1 text-sm font-bold text-alerta-700">
          {erro}
        </p>
      )}
    </fieldset>
  );
}

/** E-mail e senha (todo cadastro). */
function CamposAcesso({ numero, valores: v, erros: e }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-2 text-lg font-extrabold text-rosa-800">{numero}. Acesso</legend>
      <Campo nome="email" rotulo="E-mail" tipo="email" obrigatorio valor={v.email} erro={e.email} autoComplete="email" inputMode="email" />
      <CampoSenha erro={e.senha} autoComplete="new-password" dica="Pelo menos 8 caracteres. Anote em um lugar seguro." />
    </fieldset>
  );
}

export function FormCadastro({ listaUbs = [] }) {
  const [estado, acao] = useActionState(cadastrar, null);
  const v = estado?.valores ?? {};
  const e = estado?.erros ?? {};

  if (estado?.sucesso) return <Aviso estado={estado} />;

  return (
    <form action={acao} noValidate className="space-y-5">
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">1. Seus dados</legend>
        <CamposPessoais valores={v} erros={e} />
        <CamposUbs listaUbs={listaUbs} valores={v} erros={e} comTextoLivre />
        <Campo
          nome="dum"
          rotulo="Data da última menstruação (DUM)"
          tipo="date"
          valor={v.dum}
          erro={e.dum}
          dica="Se não souber agora, pode deixar em branco e preencher depois."
        />
      </fieldset>

      <CamposAcesso numero={2} valores={v} erros={e} />

      <Consentimento numero={3} erro={e.consentimento}>
        Entendo que o Meu Gestar guarda as informações da minha gravidez para mim e, se eu autorizar,
        para a equipe da minha UBS. Posso apagar tudo quando quiser.
      </Consentimento>

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

export function FormCadastroProfissional({ listaUbs = [] }) {
  const [estado, acao] = useActionState(cadastrarProfissional, null);
  const v = estado?.valores ?? {};
  const e = estado?.erros ?? {};
  if (estado?.sucesso) return <Aviso estado={estado} />;

  return (
    <form action={acao} noValidate className="space-y-5">
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">1. Seus dados profissionais</legend>
        <Campo nome="nome" rotulo="Nome completo" obrigatorio valor={v.nome} erro={e.nome} autoComplete="name" maxLength={120} />
        <Campo nome="cpf" rotulo="CPF" obrigatorio mascara="cpf" valor={v.cpf} erro={e.cpf} maxLength={14} />
        <Campo
          nome="telefone"
          rotulo="Telefone"
          tipo="tel"
          obrigatorio
          mascara="telefone"
          valor={v.telefone}
          erro={e.telefone}
          autoComplete="tel"
          maxLength={16}
        />
        <CampoSelecao
          nome="profissao"
          rotulo="Profissão"
          obrigatorio
          opcoes={PROFISSOES.map((p) => ({ valor: p, rotulo: p }))}
          valor={v.profissao}
          erro={e.profissao}
        />
        <Campo
          nome="registro_conselho"
          rotulo="Registro no conselho"
          obrigatorio
          valor={v.registro_conselho}
          erro={e.registro_conselho}
          maxLength={30}
          dica="Ex.: COREN-RO 123456 ou CRM-RO 1234. Agente comunitário: matrícula."
        />
        <CampoSelecao
          nome="ubs_id"
          rotulo="UBS / USF onde trabalha"
          obrigatorio
          opcoes={listaUbs.map((u) => ({ valor: u.id, rotulo: u.bairro ? `${u.nome} — ${u.bairro}` : u.nome }))}
          valor={v.ubs_id}
          erro={e.ubs_id}
          dica="Você só verá as gestantes desta UBS que autorizarem."
        />
      </fieldset>
      <CamposAcesso numero={2} valores={v} erros={e} />
      <Consentimento numero={3} erro={e.consentimento}>
        Comprometo-me a usar as informações das gestantes só para o cuidado em saúde, com sigilo
        profissional. Meu acesso só começa depois da aprovação da administração do Meu Gestar.
      </Consentimento>
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Enviando cadastro…">Enviar cadastro para aprovação</BotaoEnviar>
    </form>
  );
}

export function FormCadastroFamiliar({ codigo }) {
  const [estado, acao] = useActionState(cadastrarFamiliar, null);
  const v = estado?.valores ?? {};
  const e = estado?.erros ?? {};
  if (estado?.sucesso) return <Aviso estado={estado} />;

  return (
    <form action={acao} noValidate className="space-y-5">
      <input type="hidden" name="codigo" value={codigo ?? ""} />
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">1. Seus dados</legend>
        <Campo nome="nome" rotulo="Seu nome" obrigatorio valor={v.nome} erro={e.nome} autoComplete="name" maxLength={120} />
        <Campo
          nome="telefone"
          rotulo="Telefone / WhatsApp"
          tipo="tel"
          obrigatorio
          mascara="telefone"
          valor={v.telefone}
          erro={e.telefone}
          autoComplete="tel"
          maxLength={16}
        />
      </fieldset>
      <CamposAcesso numero={2} valores={v} erros={e} />
      <Consentimento numero={3} erro={e.consentimento}>
        Entendo que vou ver só um resumo da gestação (semanas, data provável do parto, consultas e
        lembretes), e que a gestante pode tirar meu acesso quando quiser.
      </Consentimento>
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Criando sua conta…">Criar conta de familiar</BotaoEnviar>
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

export function FormPerfil({ perfil, fotoUrl }) {
  const [estado, acao] = useActionState(atualizarPerfil, null);
  const v = estado?.valores ?? perfil ?? {};
  const e = estado?.erros ?? {};

  return (
    <form action={acao} noValidate className="space-y-4">
      <CamposPessoais valores={v} erros={e} fotoAtual={fotoUrl} />
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
