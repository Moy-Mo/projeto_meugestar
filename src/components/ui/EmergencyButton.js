import { Phone } from "lucide-react";

/** Botão grande que liga direto para o SAMU (192). */
export default function EmergencyButton({ className = "" }) {
  return (
    <a
      href="tel:192"
      className={`flex min-h-16 w-full items-center justify-center gap-3 rounded-cartao bg-alerta-600 px-5 py-3 text-center text-white shadow-cartao transition-colors hover:bg-alerta-700 ${className}`}
    >
      <Phone aria-hidden="true" className="size-7 shrink-0" />
      <span>
        <span className="block text-lg font-extrabold leading-tight">
          Preciso de atendimento agora
        </span>
        <span className="block text-sm font-semibold">
          Ligar para o SAMU 192 / Emergência Obstétrica
        </span>
      </span>
    </a>
  );
}
