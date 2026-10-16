import Link from "next/link";
import { Bell, CalendarHeart, ChevronRight, Clock, Info, TriangleAlert } from "lucide-react";
import { formatarDataExtenso } from "@/lib/datas";
import { formatarIG, trimestre } from "@/lib/gestacao";
import { Coracao, Galho } from "@/components/decor/Ornamentos";
import { GestanteArco } from "@/components/visual/Gestantes";

// Fases do bebê por trimestre (guia, "Acompanhando o bebê").
const FASES = {
  1: "Formação inicial dos órgãos e estruturas do bebê.",
  2: "Crescimento e desenvolvimento dos sistemas do bebê.",
  3: "Amadurecimento dos órgãos e preparação para o nascimento.",
};

/** "Minha gestação": semanas, trimestre, DPP e uma barra de progresso até 40 semanas. */
export function MinhaGestacao({ nome, resumo, altoRisco }) {
  const primeiroNome = nome?.split(" ")[0];

  if (!resumo) {
    return (
      <section className="relative overflow-hidden rounded-cartao bg-gradient-to-br from-rosa-100 to-rosa-50 p-5">
        <h2 className="text-xl font-extrabold text-rosa-800">Olá{primeiroNome ? `, ${primeiroNome}` : ""}!</h2>
        <p className="mt-2">
          Para calcular suas semanas de gravidez e a data provável do parto, informe a data da sua
          última menstruação (ou a data do ultrassom).
        </p>
        <Link
          href="/caderneta/gestacao"
          className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-rosa-600 px-6 font-bold text-white hover:bg-rosa-700"
        >
          Informar a data
          <ChevronRight aria-hidden="true" className="size-5" />
        </Link>
      </section>
    );
  }

  const { ig, dpp, fonte, diasParaDPP } = resumo;
  const tri = trimestre(ig.semanas);
  const progresso = Math.min(100, Math.round((ig.totalDias / 280) * 100));

  return (
    <section
      aria-labelledby="minha-gestacao"
      className="relative overflow-hidden rounded-cartao bg-gradient-to-br from-rosa-100 via-rosa-50 to-superficie p-5 shadow-cartao"
    >
      <Galho className="pointer-events-none absolute -right-6 -top-6 h-40 rotate-12 text-rosa-200/80" />
      <div className="relative flex items-center gap-4">
        <GestanteArco semente={ig.semanas} sizes="80px" className="h-28 w-20 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-rosa-700">Olá{primeiroNome ? `, ${primeiroNome}` : ""}! Você está com</p>
          <h2 id="minha-gestacao" className="text-3xl font-extrabold leading-tight text-rosa-800">
            {formatarIG(ig)}
          </h2>
          <p className="mt-1 font-bold">{tri}º trimestre</p>
        </div>
      </div>

      <div className="relative mt-5">
        <div className="flex justify-between text-sm font-bold text-texto-suave">
          <span>Início</span>
          <span>40 semanas</span>
        </div>
        <div
          role="progressbar"
          aria-label="Andamento da gestação"
          aria-valuemin={0}
          aria-valuemax={40}
          aria-valuenow={ig.semanas}
          aria-valuetext={formatarIG(ig)}
          className="mt-1 h-4 overflow-hidden rounded-full bg-superficie ring-1 ring-borda"
        >
          <div className="h-full rounded-full bg-gradient-to-r from-rosa-300 to-rosa-600" style={{ width: `${progresso}%` }} />
        </div>
      </div>

      <dl className="relative mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-superficie p-3">
          <dt className="flex items-center gap-1.5 text-sm font-bold text-texto-suave">
            <CalendarHeart aria-hidden="true" className="size-4 text-rosa-600" />
            Data provável do parto
          </dt>
          <dd className="mt-1 text-lg font-extrabold text-rosa-800">{formatarDataExtenso(dpp)}</dd>
          <dd className="text-sm text-texto-suave">
            {fonte === "ultrassom" ? "Pelo ultrassom" : "Calculada pela DUM"}
            {diasParaDPP > 0 && ` · faltam ${diasParaDPP} dias`}
          </dd>
        </div>
        <div className="rounded-xl bg-superficie p-3">
          <dt className="text-sm font-bold text-texto-suave">O bebê nesta fase</dt>
          <dd className="mt-1">{FASES[tri]}</dd>
          <dd>
            <Link href="/pre-natal/acompanhando-o-bebe" className="text-sm font-bold text-rosa-700 underline">
              Saiba mais
            </Link>
          </dd>
        </div>
      </dl>

      {altoRisco && (
        <p className="relative mt-3 text-sm">
          <strong>Gestação de alto risco:</strong> siga o plano feito pela sua equipe.{" "}
          <Link href="/pre-natal/classificada-alto-risco" className="font-bold text-rosa-700 underline">
            Entenda
          </Link>
        </p>
      )}
      <p className="relative mt-3 text-xs text-texto-suave">
        É uma estimativa. Quem confirma as semanas é a equipe de saúde, muitas vezes pelo ultrassom.
      </p>
    </section>
  );
}

const ESTILO = {
  atrasado: { icone: TriangleAlert, cor: "border-alerta-200 bg-alerta-50", corIcone: "text-alerta-600", selo: "Atrasado" },
  pendente: { icone: Bell, cor: "border-rosa-300 bg-rosa-50", corIcone: "text-rosa-600", selo: "Pendente" },
  agendado: { icone: Clock, cor: "border-borda bg-superficie", corIcone: "text-rosa-600", selo: "Marcado" },
  info: { icone: Info, cor: "border-borda bg-superficie", corIcone: "text-rosa-500", selo: "Dica" },
};

/** "Meus lembretes": notificações pendentes da gestante. */
export function MeusLembretes({ lembretes }) {
  return (
    <section id="lembretes" aria-labelledby="titulo-lembretes" className="scroll-mt-24 space-y-3">
      <h2 id="titulo-lembretes" className="flex items-center gap-2 text-xl font-extrabold text-rosa-800">
        <Bell aria-hidden="true" className="size-6 text-rosa-600" />
        Meus lembretes
        {lembretes.length > 0 && (
          <span className="rounded-full bg-rosa-600 px-2.5 text-sm text-white">{lembretes.length}</span>
        )}
      </h2>
      {lembretes.length === 0 ? (
        <p className="flex items-center gap-2 rounded-cartao bg-sucesso-50 p-4 font-bold text-sucesso-700">
          <Coracao className="size-5" />
          Tudo em dia por aqui!
        </p>
      ) : (
        <ul className="space-y-3">
          {lembretes.map((l) => {
            const e = ESTILO[l.nivel];
            const Icone = e.icone;
            return (
              <li key={l.id}>
                <Link href={l.href} className={`flex gap-3 rounded-cartao border-2 p-4 hover:shadow-cartao ${e.cor}`}>
                  <Icone aria-hidden="true" className={`mt-0.5 size-6 shrink-0 ${e.corIcone}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-extrabold uppercase tracking-wide text-texto-suave">{e.selo}</span>
                    <span className="block font-extrabold">{l.titulo}</span>
                    <span className="block text-sm">{l.texto}</span>
                  </span>
                  <ChevronRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-rosa-500" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <p className="text-xs text-texto-suave">
        Os lembretes usam o que você anotou na caderneta e as orientações do guia. Eles não substituem
        as orientações da sua equipe.
      </p>
    </section>
  );
}
