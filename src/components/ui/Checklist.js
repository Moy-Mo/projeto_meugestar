import { Check } from "lucide-react";

/** Lista com marcas de "certo". `items`: array de textos ou nós React. */
export default function Checklist({ items, className = "" }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-rosa-600" strokeWidth={3} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
