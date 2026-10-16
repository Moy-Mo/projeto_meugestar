"use client";

import { useActionState, useTransition } from "react";
import { Check, Power, X } from "lucide-react";
import { adicionarUbs, alternarUbs, definirStatusProfissional } from "@/lib/actions/admin";
import { Aviso, BotaoEnviar, Campo } from "@/components/forms/Campos";

export function BotoesAprovacao({ id, nome, status }) {
  const [pendente, iniciar] = useTransition();
  const mudar = (novo, pergunta) => {
    if (window.confirm(pergunta)) iniciar(() => definirStatusProfissional(id, novo));
  };
  return (
    <div className="flex flex-wrap gap-2">
      {status !== "aprovado" && (
        <button
          type="button"
          disabled={pendente}
          onClick={() => mudar("aprovado", `Aprovar ${nome}? A pessoa passará a ver as gestantes que autorizarem a UBS.`)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-sucesso-700 px-4 font-bold text-white hover:opacity-90 disabled:opacity-50"
        >
          <Check aria-hidden="true" className="size-5" />
          Aprovar
        </button>
      )}
      {status !== "recusado" && (
        <button
          type="button"
          disabled={pendente}
          onClick={() => mudar("recusado", `Recusar ${nome}? Se já estava aprovado, perde o acesso na hora.`)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-alerta-200 px-4 font-bold text-alerta-700 hover:bg-alerta-50 disabled:opacity-50"
        >
          <X aria-hidden="true" className="size-5" />
          {status === "aprovado" ? "Retirar acesso" : "Recusar"}
        </button>
      )}
    </div>
  );
}

export function FormNovaUbs() {
  const [estado, acao] = useActionState(adicionarUbs, null);
  return (
    <form action={acao} noValidate className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <Campo nome="nome" rotulo="Nome da UBS / USF" obrigatorio valor={estado?.valores?.nome} erro={estado?.erros?.nome} maxLength={120} />
      <Campo nome="bairro" rotulo="Bairro" valor={estado?.valores?.bairro} erro={estado?.erros?.bairro} maxLength={120} />
      <div className="sm:pb-0">
        <BotaoEnviar carregando="Salvando…">Cadastrar</BotaoEnviar>
      </div>
      <div className="sm:col-span-3">
        <Aviso estado={estado} />
      </div>
    </form>
  );
}

export function BotaoAtivarUbs({ id, ativa, nome }) {
  const [pendente, iniciar] = useTransition();
  return (
    <button
      type="button"
      disabled={pendente}
      onClick={() => iniciar(() => alternarUbs(id, !ativa))}
      aria-label={`${ativa ? "Desativar" : "Ativar"} ${nome}`}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-texto-suave hover:bg-rosa-50 disabled:opacity-50"
    >
      <Power aria-hidden="true" className="size-4" />
      {ativa ? "Desativar" : "Ativar"}
    </button>
  );
}
