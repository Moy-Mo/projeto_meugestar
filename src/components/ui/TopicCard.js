import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Botão grande de assunto: ícone + título + frase curta + seta. */
export default function TopicCard({ href, icon: Icon, title, description }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-cartao border border-borda bg-superficie p-4 shadow-cartao transition-colors hover:border-rosa-300 hover:bg-rosa-50"
    >
      {Icon && (
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
        >
          <Icon className="size-6" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-bold leading-snug">{title}</span>
        {description && (
          <span className="mt-0.5 block text-sm text-texto-suave">
            {description}
          </span>
        )}
      </span>
      <ChevronRight aria-hidden="true" className="size-6 shrink-0 text-rosa-500" />
    </Link>
  );
}
