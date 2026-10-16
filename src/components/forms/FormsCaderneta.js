"use client";

import { useActionState, useState, useTransition } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { salvarGestacao, removerRegistro } from "@/lib/actions/caderneta";
import { registros, sugestoes } from "@/lib/caderneta-config";
import { Aviso, BotaoEnviar, Campo } from "./Campos";

/** Dados da gestação. `acao`: da própria gestante (padrão) ou do profissional da UBS. */
export function FormGestacao({ gestacao, acao: acaoServidor = salvarGestacao, daGestante = true }) {
  const [estado, acao] = useActionState(acaoServidor, null);
  const v = estado?.valores ?? gestacao ?? {};
  const e = estado?.erros ?? {};

  return (
    <form action={acao} noValidate className="space-y-4">
      <Campo
        nome="dum"
        rotulo="Data da última menstruação (DUM)"
        tipo="date"
        valor={v.dum}
        erro={e.dum}
        dica="O primeiro dia da última menstruação. Com ela calculamos suas semanas e a data provável do parto."
      />
      <Campo
        nome="dpp_ultrassom"
        rotulo="Data provável do parto pelo ultrassom"
        tipo="date"
        valor={v.dpp_ultrassom}
        erro={e.dpp_ultrassom}
        dica="Só se a equipe informou. Quando preenchida, ela é usada no lugar da calculada pela DUM."
      />
      <fieldset>
        <legend className="mb-2 font-bold">Gestações anteriores</legend>
        <div className="grid grid-cols-3 gap-3">
          <Campo nome="gestacoes" rotulo="Gestações" tipo="number" min={0} max={30} valor={v.gestacoes} erro={e.gestacoes} inputMode="numeric" />
          <Campo nome="partos" rotulo="Partos" tipo="number" min={0} max={30} valor={v.partos} erro={e.partos} inputMode="numeric" />
          <Campo nome="abortos" rotulo="Abortos" tipo="number" min={0} max={30} valor={v.abortos} erro={e.abortos} inputMode="numeric" />
        </div>
        <p className="mt-1 text-sm text-texto-suave">Conte incluindo a gravidez atual, como na Caderneta da Gestante.</p>
      </fieldset>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-borda bg-superficie p-3">
        <input
          type="checkbox"
          name="alto_risco"
          value="sim"
          defaultChecked={Boolean(v.alto_risco)}
          className="mt-1 size-6 shrink-0 accent-rosa-600"
        />
        <span>
          {daGestante
            ? "A equipe de saúde classificou minha gestação como de alto risco."
            : "Gestação classificada como de alto risco."}
        </span>
      </label>
      <Aviso estado={estado} />
      <BotaoEnviar carregando="Salvando…">Salvar</BotaoEnviar>
    </form>
  );
}

/**
 * Formulário para adicionar um registro (consulta, exame, vacina, ultrassom).
 * Fica recolhido atrás de um botão para a lista ser o foco da tela.
 */
export function FormRegistro({ tipo, acao: acaoServidor }) {
  const config = registros[tipo];
  const [estado, acao] = useActionState(acaoServidor, null);
  const [aberto, setAberto] = useState(false);
  // A cada resposta do servidor: fecha se salvou, mantém aberto se houve erro.
  const [ultimoEstado, setUltimoEstado] = useState(estado);
  if (estado !== ultimoEstado) {
    setUltimoEstado(estado);
    setAberto(Boolean(estado?.erros || estado?.erro));
  }
  const v = estado?.valores ?? {};
  const e = estado?.erros ?? {};

  if (!aberto) {
    return (
      <div className="space-y-3">
        <Aviso estado={estado} />
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-rosa-600 px-6 font-bold text-white hover:bg-rosa-700"
        >
          <Plus aria-hidden="true" className="size-5" />
          Adicionar {config.singular}
        </button>
      </div>
    );
  }

  return (
    <form
      action={acao}
      noValidate
      className="space-y-4 rounded-cartao border-2 border-rosa-200 bg-superficie p-4 shadow-cartao"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-rosa-800">{config.rotuloNovo}</h2>
        <button
          type="button"
          onClick={() => setAberto(false)}
          aria-label="Fechar sem salvar"
          className="flex size-11 items-center justify-center rounded-full text-rosa-700 hover:bg-rosa-50"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      {config.campos.map((campo) => (
        <Campo
          key={campo.nome}
          nome={campo.nome}
          rotulo={campo.rotulo}
          tipo={campo.tipo}
          obrigatorio={campo.obrigatorio}
          dica={campo.dica}
          sufixo={campo.sufixo}
          min={campo.min}
          max={campo.max}
          passo={campo.passo}
          maxLength={campo.maxLength}
          lista={campo.lista}
          valor={v[campo.nome]}
          erro={e[campo.nome]}
        />
      ))}
      {config.campos
        .filter((c) => c.lista)
        .map((c) => (
          <datalist key={c.lista} id={c.lista}>
            {sugestoes[c.lista].map((opcao) => (
              <option key={opcao} value={opcao} />
            ))}
          </datalist>
        ))}
      <Aviso estado={estado?.sucesso ? null : estado} />
      <BotaoEnviar carregando="Salvando…">Salvar</BotaoEnviar>
    </form>
  );
}

/** Botão de apagar um registro, com confirmação. `acao(tipo, id)`: da gestante (padrão) ou do profissional. */
export function BotaoRemover({ tipo, id, descricao, acao = removerRegistro }) {
  const [pendente, iniciar] = useTransition();
  return (
    <button
      type="button"
      disabled={pendente}
      onClick={() => {
        if (window.confirm(`Apagar ${descricao}? Isto não pode ser desfeito.`)) {
          iniciar(() => acao(tipo, id));
        }
      }}
      aria-label={`Apagar ${descricao}`}
      className="flex size-11 shrink-0 items-center justify-center rounded-full text-texto-suave hover:bg-alerta-50 hover:text-alerta-600 disabled:opacity-50"
    >
      <Trash2 aria-hidden="true" className="size-5" />
    </button>
  );
}
