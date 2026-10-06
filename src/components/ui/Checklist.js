import { Check, CircleAlert } from "lucide-react";

/**
 * Lista com marcas. `items`: array de textos ou nós React.
 * `tone="danger"` troca o "certo" por um alerta vermelho (ex.: sinais de alerta).
 */
export default function Checklist({ items, tone, className = "" }) {
  const danger = tone === "danger";
  const Icon = danger ? CircleAlert : Check;

  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <Icon
            aria-hidden="true"
            className={`mt-1 size-5 shrink-0 ${danger ? "text-alerta-600" : "text-rosa-600"}`}
            strokeWidth={danger ? 2.5 : 3}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
