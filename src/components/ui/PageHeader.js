import Link from "next/link";
import { ChevronLeft } from "lucide-react";

/** Cabeçalho de tela de conteúdo: voltar + ícone + título + frase de apoio. */
export default function PageHeader({ backHref, backLabel = "Voltar", icon: Icon, title, subtitle }) {
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
      <div className="flex items-center gap-3">
        {Icon && (
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
          >
            <Icon className="size-7" />
          </span>
        )}
        <h1 className="text-2xl font-extrabold leading-tight text-rosa-800">{title}</h1>
      </div>
      {subtitle && <p className="mt-3 text-lg text-texto-suave">{subtitle}</p>}
    </header>
  );
}
