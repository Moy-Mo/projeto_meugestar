// Selos de prioridade (guia: Essenciais / Recomendados / Opcionais) e de mitos.
const badges = {
  essencial: { label: "Essencial", className: "bg-rosa-600 text-white" },
  recomendado: { label: "Recomendado", className: "bg-rosa-100 text-rosa-800" },
  opcional: { label: "Opcional", className: "border border-borda bg-superficie text-texto-suave" },
  urgencia: { label: "Procure atendimento", className: "bg-alerta-600 text-white" },
  mito: { label: "Mito", className: "bg-rosa-600 text-white" },
  verdade: { label: "Verdade", className: "bg-sucesso-700 text-white" },
  atencao: { label: "Atenção", className: "bg-alerta-600 text-white" },
};

/** Selo pequeno. `type` escolhe a cor; `children` substitui o texto padrão. */
export default function Badge({ type, children }) {
  const badge = badges[type];
  if (!badge) return null;

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide ${badge.className}`}
    >
      {children ?? badge.label}
    </span>
  );
}
