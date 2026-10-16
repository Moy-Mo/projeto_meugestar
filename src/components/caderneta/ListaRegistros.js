import { FlaskConical, UserCheck } from "lucide-react";
import { diasEntre, formatarData } from "@/lib/datas";
import { formatarIGCurta, idadeGestacional } from "@/lib/gestacao";
import { registros } from "@/lib/caderneta-config";
import { BotaoRemover } from "@/components/forms/FormsCaderneta";
import BotoesAgenda from "./BotoesAgenda";

/** Linhas de detalhe de cada registro, em linguagem simples. */
function detalhes(tipo, r) {
  const linhas = [];
  if (tipo === "consultas") {
    if (r.pa_sistolica) linhas.push(["Pressão", `${r.pa_sistolica}/${r.pa_diastolica} mmHg`]);
    if (r.peso_kg) linhas.push(["Peso", `${String(r.peso_kg).replace(".", ",")} kg`]);
    if (r.bcf) linhas.push(["Batimentos do bebê", `${r.bcf} bpm`]);
  }
  if (tipo === "exames") linhas.push(["Resultado", r.resultado || "Pedido — aguardando resultado"]);
  if (tipo === "vacinas" && r.proxima_dose) linhas.push(["Próxima dose", formatarData(r.proxima_dose)]);
  if (tipo === "ultrassons") {
    if (r.ig_semanas != null) linhas.push(["Idade no laudo", `${r.ig_semanas} semanas e ${r.ig_dias ?? 0} dias`]);
    if (r.resultado) linhas.push(["Resultado", r.resultado]);
  }
  if (r.observacoes) linhas.push(["Observações", r.observacoes]);
  return linhas;
}

function titulo(tipo, r) {
  if (tipo === "exames") return r.nome;
  if (tipo === "vacinas") return r.vacina;
  if (tipo === "consultas") return "Consulta";
  return "Ultrassom";
}

/** Evento de agenda para o que ainda vai acontecer (consulta/exame marcados, próxima dose). */
function eventoDaAgenda(tipo, r, local, dataDeHoje) {
  const detalhes = "Leve sua Caderneta da Gestante. Lembrete criado pelo app Meu Gestar.";
  const hora = r.hora?.slice(0, 5);
  const base = { id: `${tipo}-${r.id}`, local, detalhes };
  if (tipo === "consultas" && diasEntre(dataDeHoje, r.data) >= 0) {
    return { ...base, titulo: "Consulta do pré-natal", data: r.data, hora };
  }
  if (tipo === "exames" && diasEntre(dataDeHoje, r.data) >= 0) {
    return { ...base, titulo: `Exame: ${r.nome}`, data: r.data, hora };
  }
  if (tipo === "vacinas" && r.proxima_dose && diasEntre(dataDeHoje, r.proxima_dose) >= 0) {
    return { ...base, titulo: `Vacina: próxima dose de ${r.vacina}`, data: r.proxima_dose };
  }
  return null;
}

/**
 * Lista de registros da caderneta — usada pela gestante e pelo profissional.
 * - `examesPorConsulta`: { [consultaId]: exames[] } para mostrar os exames dentro da consulta.
 * - `podeApagar(r)`: quem pode apagar cada registro (o banco confere de novo).
 * - `acaoRemover`: Server Action (tipo, id) do profissional; sem ela, usa a da gestante.
 * - `comAgenda`: mostra "Adicionar ao Google Agenda" (só faz sentido para a gestante).
 */
export default function ListaRegistros({
  tipo,
  lista,
  dum,
  dataDeHoje,
  local,
  examesPorConsulta = {},
  podeApagar = () => true,
  acaoRemover,
  comAgenda = false,
  vazio,
}) {
  const config = registros[tipo];

  if (lista.length === 0) {
    return (
      <p className="rounded-cartao border-2 border-dashed border-rosa-200 p-6 text-center text-texto-suave">
        {vazio ?? "Nenhum registro ainda."}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {lista.map((r) => {
        const data = r[config.campoData];
        const ig = dum ? idadeGestacional(dum, data) : null;
        const futura = diasEntre(dataDeHoje, data) > 0;
        const descricao = `${titulo(tipo, r).toLowerCase()} de ${formatarData(data)}`;
        const evento = comAgenda ? eventoDaAgenda(tipo, r, local, dataDeHoje) : null;
        const exames = examesPorConsulta[r.id] ?? [];
        return (
          <li key={r.id} className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-rosa-800">{titulo(tipo, r)}</p>
                <p className="text-sm text-texto-suave">
                  {formatarData(data)}
                  {r.hora && ` às ${r.hora.slice(0, 5)}`}
                  {ig && ` · ${formatarIGCurta(ig)} de gestação`}
                  {futura && (
                    <span className="ml-2 rounded-full bg-rosa-100 px-2 py-0.5 text-xs font-bold text-rosa-800">
                      Data futura
                    </span>
                  )}
                </p>
              </div>
              {podeApagar(r) && <BotaoRemover tipo={tipo} id={r.id} descricao={descricao} acao={acaoRemover} />}
            </div>

            {detalhes(tipo, r).length > 0 && (
              <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {detalhes(tipo, r).map(([rotulo, valor]) => (
                  <div key={rotulo} className={rotulo === "Observações" ? "sm:col-span-2" : ""}>
                    <dt className="text-sm font-bold text-texto-suave">{rotulo}</dt>
                    <dd className="break-words">{valor}</dd>
                  </div>
                ))}
              </dl>
            )}

            {exames.length > 0 && (
              <div className="mt-3 rounded-xl bg-rosa-50 p-3">
                <p className="flex items-center gap-1.5 text-sm font-bold text-rosa-800">
                  <FlaskConical aria-hidden="true" className="size-4" />
                  Exames desta consulta
                </p>
                <ul className="mt-1 space-y-1">
                  {exames.map((e) => (
                    <li key={e.id} className="text-sm">
                      <strong>{e.nome}</strong> — {e.resultado || "pedido, aguardando resultado"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {r.registrado_por_nome && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-texto-suave">
                <UserCheck aria-hidden="true" className="size-4 text-rosa-600" />
                Registrado por {r.registrado_por_nome}
              </p>
            )}

            {evento && <BotoesAgenda evento={evento} />}
          </li>
        );
      })}
    </ul>
  );
}
