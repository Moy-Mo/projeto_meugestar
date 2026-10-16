"use client";

import { useActionState, useState, useTransition } from "react";
import { Check, Copy, Share2, Trash2, UserPlus } from "lucide-react";
import { criarConvite, removerConvite, salvarUbsEAutorizacao } from "@/lib/actions/gestante";
import { aceitarConvite } from "@/lib/actions/familia";
import { formatarData } from "@/lib/datas";
import { CamposUbs } from "./FormsConta";
import { Aviso, BotaoEnviar, Campo } from "./Campos";

/* Formulários de vínculo: UBS da gestante, convites de familiares e aceite do convite. */

export function FormUbsAutorizacao({ listaUbs, perfil }) {
  const [estado, acao] = useActionState(salvarUbsEAutorizacao, null);
  const v = estado?.valores ?? perfil ?? {};
  return (
    <form action={acao} noValidate className="space-y-4">
      <CamposUbs listaUbs={listaUbs} valores={v} erros={estado?.erros ?? {}} />
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Salvando…">Salvar</BotaoEnviar>
    </form>
  );
}

/** Link do convite com botões de compartilhar (WhatsApp etc.) e copiar. */
function LinkDoConvite({ codigo }) {
  const [copiado, setCopiado] = useState(false);
  // O endereço do site só existe no navegador: o link é montado na hora do toque.
  const montarLink = () => `${window.location.origin}/convite/${codigo}`;

  async function compartilhar() {
    const texto = `Quero que você acompanhe minha gestação no Meu Gestar. Abra o link: ${montarLink()}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Convite Meu Gestar", text: texto });
        return;
      } catch {}
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(montarLink());
      setCopiado(true);
    } catch {}
  }

  return (
    <div className="space-y-2 rounded-xl bg-rosa-50 p-3">
      <p className="text-sm text-texto-suave">
        Código: <strong className="font-mono text-lg tracking-widest text-rosa-800">{codigo}</strong> · vale 7 dias
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={compartilhar}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rosa-600 px-4 font-bold text-white hover:bg-rosa-700"
        >
          <Share2 aria-hidden="true" className="size-5" />
          Enviar convite
        </button>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-rosa-300 bg-superficie px-4 font-bold text-rosa-700 hover:bg-rosa-50"
        >
          {copiado ? <Check aria-hidden="true" className="size-5" /> : <Copy aria-hidden="true" className="size-5" />}
          {copiado ? "Link copiado!" : "Copiar link"}
        </button>
      </div>
    </div>
  );
}

function BotaoRemoverConvite({ id, descricao }) {
  const [pendente, iniciar] = useTransition();
  return (
    <button
      type="button"
      disabled={pendente}
      onClick={() => {
        if (window.confirm(`${descricao}?`)) iniciar(() => removerConvite(id));
      }}
      aria-label={descricao}
      className="flex size-11 shrink-0 items-center justify-center rounded-full text-texto-suave hover:bg-alerta-50 hover:text-alerta-600 disabled:opacity-50"
    >
      <Trash2 aria-hidden="true" className="size-5" />
    </button>
  );
}

/** A gestante convida familiares e vê/retira quem tem acesso. */
export function GerenciarFamiliares({ convites }) {
  const [estado, acao] = useActionState(criarConvite, null);
  // Convites vencidos já vêm filtrados do servidor (/conta).
  const ativos = convites.filter((c) => c.familiar_id);
  const pendentes = convites.filter((c) => !c.familiar_id);

  return (
    <div className="space-y-4">
      {ativos.length > 0 && (
        <ul className="space-y-2">
          {ativos.map((c) => (
            <li key={c.id} className="flex items-center gap-3 rounded-xl border border-borda bg-superficie p-3">
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{c.familiar_nome}</span>
                <span className="block text-sm text-texto-suave">
                  {c.apelido ? `${c.apelido} · ` : ""}acompanha desde {formatarData(c.aceito_em?.slice(0, 10))}
                </span>
              </span>
              <BotaoRemoverConvite id={c.id} descricao={`Tirar o acesso de ${c.familiar_nome}`} />
            </li>
          ))}
        </ul>
      )}

      {pendentes.map((c) => (
        <div key={c.id} className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold">Convite aguardando{c.apelido ? ` (${c.apelido})` : ""}</p>
            <BotaoRemoverConvite id={c.id} descricao="Cancelar este convite" />
          </div>
          <LinkDoConvite codigo={c.codigo} />
        </div>
      ))}

      <form action={acao} className="space-y-3">
        <Campo nome="apelido" rotulo="Para quem é o convite?" valor="" maxLength={60} dica="Ex.: Minha mãe, Parceiro. Só para você lembrar." />
        <Aviso estado={estado?.erro ? estado : null} />
        <BotaoEnviar carregando="Criando…">
          <UserPlus aria-hidden="true" className="size-5" />
          Criar convite
        </BotaoEnviar>
      </form>
    </div>
  );
}

export function FormAceitarConvite({ codigo }) {
  const [estado, acao] = useActionState(aceitarConvite, null);
  if (estado?.sucesso) return <Aviso estado={estado} />;
  return (
    <form action={acao} className="space-y-3">
      <Campo
        nome="codigo"
        rotulo="Código do convite"
        obrigatorio
        valor={estado?.valores?.codigo ?? codigo ?? ""}
        maxLength={8}
        dica="As 8 letras e números que a gestante enviou."
      />
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Conferindo…">Aceitar convite</BotaoEnviar>
    </form>
  );
}
