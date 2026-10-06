import { ChevronDown } from "lucide-react";

/**
 * Cartão que abre e fecha ao tocar. Usa <details>/<summary> nativos:
 * funciona sem JavaScript e é lido corretamente por leitores de tela.
 */
export default function Expandable({ icon: Icon, title, subtitle, defaultOpen = false, children }) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-cartao border border-borda bg-superficie shadow-cartao open:border-rosa-300"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
        {Icon && (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
          >
            <Icon className="size-5" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-snug">{title}</span>
          {subtitle && <span className="block text-sm text-texto-suave">{subtitle}</span>}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="size-6 shrink-0 text-rosa-500 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-borda px-4 pb-4 pt-3">{children}</div>
    </details>
  );
}
