import { notFound } from "next/navigation";
import { exigirUsuario, getCaderneta } from "@/lib/dal";
import { diasEntre, formatarData, hoje } from "@/lib/datas";
import { formatarIGCurta, idadeGestacional, resumoDaGestacao } from "@/lib/gestacao";
import { registros } from "@/lib/caderneta-config";
import { adicionarRegistro } from "@/lib/actions/caderneta";
import { ContentIcon } from "@/content/icons";
import { BotaoRemover, FormRegistro } from "@/components/forms/FormsCaderneta";

export async function generateMetadata({ params }) {
  const { tipo } = await params;
  return { title: registros[tipo]?.titulo ?? "Caderneta" };
}

/** Linhas de detalhe de cada registro, em linguagem simples. */
function detalhes(tipo, r) {
  const linhas = [];
  if (tipo === "consultas") {
    if (r.pa_sistolica) linhas.push(["Pressão", `${r.pa_sistolica}/${r.pa_diastolica} mmHg`]);
    if (r.peso_kg) linhas.push(["Peso", `${String(r.peso_kg).replace(".", ",")} kg`]);
    if (r.bcf) linhas.push(["Batimentos do bebê", `${r.bcf} bpm`]);
  }
  if (tipo === "exames" && r.resultado) linhas.push(["Resultado", r.resultado]);
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

export default async function RegistrosPage({ params }) {
  const { tipo } = await params;
  const config = Object.hasOwn(registros, tipo) ? registros[tipo] : null;
  if (!config) notFound();

  await exigirUsuario(`/caderneta/${tipo}`);
  const caderneta = await getCaderneta();
  const dataDeHoje = hoje();
  // DUM "efetiva" (considera a DPP do ultrassom), para mostrar as semanas em cada registro.
  const dum = resumoDaGestacao(caderneta.gestacao, dataDeHoje)?.dum ?? caderneta.gestacao?.dum;
  const lista = caderneta[tipo];

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
        >
          <ContentIcon name={config.icone} className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-rosa-800">{config.titulo}</h1>
          <p className="mt-1 text-texto-suave">{config.intro}</p>
        </div>
      </div>

      <FormRegistro tipo={tipo} acao={adicionarRegistro.bind(null, tipo)} />

      {lista.length === 0 ? (
        <p className="rounded-cartao border-2 border-dashed border-rosa-200 p-6 text-center text-texto-suave">
          Nenhum registro ainda. Toque em &quot;Adicionar {config.singular}&quot; para começar.
        </p>
      ) : (
        <ul className="space-y-3">
          {lista.map((r) => {
            const data = r[config.campoData];
            const ig = dum ? idadeGestacional(dum, data) : null;
            const futura = diasEntre(dataDeHoje, data) > 0;
            const descricao = `${titulo(tipo, r).toLowerCase()} de ${formatarData(data)}`;
            return (
              <li key={r.id} className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-rosa-800">{titulo(tipo, r)}</p>
                    <p className="text-sm text-texto-suave">
                      {formatarData(data)}
                      {ig && ` · ${formatarIGCurta(ig)} de gestação`}
                      {futura && (
                        <span className="ml-2 rounded-full bg-rosa-100 px-2 py-0.5 text-xs font-bold text-rosa-800">
                          Data futura
                        </span>
                      )}
                    </p>
                  </div>
                  <BotaoRemover tipo={tipo} id={r.id} descricao={descricao} />
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
