import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { EnfeitesCabecalho } from "@/components/decor/Ornamentos";
import { GestanteArco } from "@/components/visual/Gestantes";

/**
 * Cabeçalho de tela: voltar + cartão enfeitado com ícone e título + frase de apoio.
 * `ilustracao`: número (ou texto) que escolhe a gestante mostrada ao lado do título
 * (usado nas telas de área; nas telas de assunto a gestante aparece no fim).
 */
export default function PageHeader({
  backHref,
  backLabel = "Voltar",
  icon: Icon,
  title,
  subtitle,
  ilustracao,
}) {
  const temIlustracao = ilustracao !== undefined;

  return (
    <header className="mb-6">
      {backHref && (
        <Link
          href={backHref}
          className="-ml-2 mb-3 inline-flex min-h-12 items-center gap-1 rounded-full px-2 font-bold text-rosa-700 hover:bg-rosa-50"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
          {backLabel}
        </Link>
      )}
      <div className="relative flex animate-surgir items-center gap-3 overflow-hidden rounded-cartao bg-gradient-to-br from-rosa-100 to-rosa-50 p-4">
        {!temIlustracao && <EnfeitesCabecalho />}
        {Icon && (
          <span
            aria-hidden="true"
            className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-superficie text-rosa-700 shadow-cartao"
          >
            <Icon className="size-7" />
          </span>
        )}
        <h1
          className={`relative min-w-0 flex-1 text-2xl font-extrabold leading-tight text-rosa-800 ${temIlustracao ? "" : "pr-16"}`}
        >
          {title}
        </h1>
        {temIlustracao && (
          <GestanteArco
            semente={ilustracao}
            eager
            sizes="96px"
            className="relative -my-1 h-32 w-24 shrink-0"
          />
        )}
      </div>
      {subtitle && <p className="mt-4 text-lg text-texto-suave">{subtitle}</p>}
    </header>
  );
}
