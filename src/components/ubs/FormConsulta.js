"use client";

import { useActionState, useId, useState } from "react";
import { FlaskConical, Plus, Trash2 } from "lucide-react";
import { registros, sugestoes } from "@/lib/caderneta-config";
import { Aviso, BotaoEnviar, Campo } from "@/components/forms/Campos";

let proximaChave = 0;
const novaLinha = (valores = {}) => ({ chave: ++proximaChave, nome: "", data: "", resultado: "", ...valores });

/**
 * Registro de consulta pelo profissional, com VÁRIOS exames na mesma tela
 * (pedido da equipe: "alimentar vários exames conforme as consultas").
 * Exame sem resultado = pedido; o resultado pode ser registrado depois.
 */
export function FormConsulta({ acao: acaoServidor }) {
  const [estado, acao] = useActionState(acaoServidor, null);
  const [linhas, setLinhas] = useState(() => [novaLinha()]);
  const idLista = useId();
  const v = estado?.valores ?? {};
  const e = estado?.erros ?? {};

  // Depois de salvar com sucesso, volta para uma linha vazia; com erro, mostra o que foi digitado.
  const [ultimoEstado, setUltimoEstado] = useState(estado);
  if (estado !== ultimoEstado) {
    setUltimoEstado(estado);
    if (estado?.sucesso) setLinhas([novaLinha()]);
    else if (estado?.valores?.exames?.length) setLinhas(estado.valores.exames.map((x) => novaLinha(x)));
  }

  const atualizar = (chave, campo, valor) =>
    setLinhas((atuais) => atuais.map((l) => (l.chave === chave ? { ...l, [campo]: valor } : l)));

  return (
    <form action={acao} noValidate className="space-y-5">
      <fieldset className="space-y-4">
        <legend className="mb-2 text-lg font-extrabold text-rosa-800">Consulta</legend>
        {registros.consultas.campos.map((campo) => (
          <Campo
            key={campo.nome}
            nome={campo.nome}
            rotulo={campo.rotulo}
            tipo={campo.tipo}
            obrigatorio={campo.obrigatorio}
            dica={campo.nome.startsWith("pa_") ? undefined : campo.dica}
            sufixo={campo.sufixo}
            min={campo.min}
            max={campo.max}
            passo={campo.passo}
            maxLength={campo.maxLength}
            valor={v[campo.nome]}
            erro={e[campo.nome]}
          />
        ))}
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="mb-1 flex items-center gap-2 text-lg font-extrabold text-rosa-800">
          <FlaskConical aria-hidden="true" className="size-5 text-rosa-600" />
          Exames desta consulta
        </legend>
        <p className="text-sm text-texto-suave">
          Sem resultado = exame pedido. A data em branco usa a data da consulta.
        </p>
        <datalist id={idLista}>
          {sugestoes["lista-exames"].map((opcao) => (
            <option key={opcao} value={opcao} />
          ))}
        </datalist>

        {linhas.map((linha, i) => {
          const erro = estado?.errosExames?.[i];
          return (
            <div
              key={linha.chave}
              role="group"
              aria-label={`Exame ${i + 1}`}
              className={`grid gap-2 rounded-xl border-2 bg-superficie p-3 sm:grid-cols-[1.4fr_1fr_1.4fr_auto] sm:items-end ${erro ? "border-alerta-600" : "border-borda"}`}
            >
              <label className="block">
                <span className="mb-1 block text-sm font-bold">Exame {i + 1}</span>
                <input
                  name="exame_nome"
                  list={idLista}
                  value={linha.nome}
                  onChange={(ev) => atualizar(linha.chave, "nome", ev.target.value)}
                  maxLength={120}
                  placeholder="Ex.: Hemograma"
                  className="min-h-12 w-full rounded-xl border-2 border-borda px-3 focus:border-rosa-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-bold">Data</span>
                <input
                  name="exame_data"
                  type="date"
                  value={linha.data}
                  onChange={(ev) => atualizar(linha.chave, "data", ev.target.value)}
                  className="min-h-12 w-full rounded-xl border-2 border-borda px-3 focus:border-rosa-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-bold">Resultado</span>
                <input
                  name="exame_resultado"
                  value={linha.resultado}
                  onChange={(ev) => atualizar(linha.chave, "resultado", ev.target.value)}
                  maxLength={500}
                  placeholder="Deixe vazio se só foi pedido"
                  className="min-h-12 w-full rounded-xl border-2 border-borda px-3 focus:border-rosa-500 focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => setLinhas((atuais) => (atuais.length > 1 ? atuais.filter((l) => l.chave !== linha.chave) : [novaLinha()]))}
                aria-label={`Remover o exame ${i + 1}`}
                className="flex size-12 items-center justify-center justify-self-end rounded-full text-texto-suave hover:bg-alerta-50 hover:text-alerta-600"
              >
                <Trash2 aria-hidden="true" className="size-5" />
              </button>
              {erro && <p className="text-sm font-bold text-alerta-700 sm:col-span-4">{erro}</p>}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setLinhas((atuais) => [...atuais, novaLinha()])}
          className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-dashed border-rosa-300 px-5 font-bold text-rosa-700 hover:bg-rosa-50"
        >
          <Plus aria-hidden="true" className="size-5" />
          Adicionar outro exame
        </button>
        {e.exames && <p className="text-sm font-bold text-alerta-700">{e.exames}</p>}
      </fieldset>

      <Aviso estado={estado} />
      <BotaoEnviar carregando="Salvando…">Salvar consulta e exames</BotaoEnviar>
    </form>
  );
}
