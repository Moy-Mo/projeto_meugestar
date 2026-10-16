import Link from "next/link";
import { ChevronRight, UserRound } from "lucide-react";
import { redirect } from "next/navigation";
import { getCaderneta, getPerfilAtual, PAINEL_DO_PAPEL } from "@/lib/dal";
import { hoje } from "@/lib/datas";
import { resumoDaGestacao } from "@/lib/gestacao";
import { calcularLembretes } from "@/lib/lembretes";
import { registros } from "@/lib/caderneta-config";
import { ContentIcon } from "@/content/icons";
import Convite from "@/components/caderneta/Convite";
import { MeusLembretes, MinhaGestacao } from "@/components/caderneta/Resumo";
import Callout from "@/components/ui/Callout";

export const metadata = { title: "Minha caderneta" };

export default async function CadernetaPage({ searchParams }) {
  const perfilAtual = await getPerfilAtual();
  if (!perfilAtual) return <Convite />;
  // Profissional, familiar e admin têm o próprio painel.
  if (perfilAtual.papel !== "gestante") redirect(PAINEL_DO_PAPEL[perfilAtual.papel]);
  const caderneta = await getCaderneta();

  const { "bem-vinda": bemVinda } = await searchParams;
  const dataDeHoje = hoje();
  const resumo = resumoDaGestacao(caderneta.gestacao, dataDeHoje);
  const lembretes = calcularLembretes(caderneta, dataDeHoje);

  return (
    <div className="space-y-8">
      <h1 className="sr-only">Minha caderneta</h1>
      {bemVinda && (
        <Callout variant="success" title="Conta criada! Bem-vinda ao Meu Gestar.">
          Esta é a sua caderneta digital. Comece pelos dados da gestação.
        </Callout>
      )}

      {caderneta.perfilIncompleto && (
        <Callout variant="warning" title="Complete seu cadastro">
          Agora pedimos também CPF, número do Cartão SUS, data de nascimento e telefone.{" "}
          <Link href="/conta" className="font-bold underline">
            Completar meus dados
          </Link>
        </Callout>
      )}

      <div className="space-y-8 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:space-y-0">
        <MinhaGestacao
          nome={caderneta.perfil?.nome}
          fotoUrl={caderneta.fotoUrl}
          resumo={resumo}
          altoRisco={caderneta.gestacao?.alto_risco}
        />
        <MeusLembretes lembretes={lembretes} />
      </div>

      <section aria-labelledby="registros" className="space-y-3">
        <h2 id="registros" className="text-xl font-extrabold text-rosa-800">
          Meus registros
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {Object.entries(registros).map(([tipo, config]) => {
            const total = caderneta[tipo].length;
            return (
              <li key={tipo}>
                <Link
                  href={`/caderneta/${tipo}`}
                  className="flex items-center gap-4 rounded-cartao border border-borda bg-superficie p-4 shadow-cartao hover:border-rosa-300 hover:bg-rosa-50"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
                  >
                    <ContentIcon name={config.icone} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{config.titulo}</span>
                    <span className="block text-sm text-texto-suave">
                      {total === 0 ? "Nenhum registro ainda" : `${total} ${total === 1 ? "registro" : "registros"}`}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-6 shrink-0 text-rosa-500" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <Link
        href="/conta"
        className="flex items-center gap-3 rounded-cartao border border-borda bg-superficie p-4 hover:bg-rosa-50"
      >
        <UserRound aria-hidden="true" className="size-6 text-rosa-600" />
        <span className="flex-1 font-bold">Minha conta e meus dados</span>
        <ChevronRight aria-hidden="true" className="size-5 text-rosa-500" />
      </Link>
    </div>
  );
}
