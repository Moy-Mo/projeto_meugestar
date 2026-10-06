import { ShieldAlert } from "lucide-react";

/** Aviso obrigatório: o app é informativo e não substitui o acompanhamento profissional. */
export default function Disclaimer({ className = "" }) {
  return (
    <p className={`flex gap-2 text-sm text-texto-suave ${className}`}>
      <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-rosa-600" />
      <span>
        <strong className="text-texto">Importante:</strong> o Meu Gestar é informativo e{" "}
        <strong className="text-texto">não substitui a consulta</strong>. Quem faz o diagnóstico e o
        tratamento é sempre o profissional de saúde. Em caso de dúvida, procure a equipe da sua UBS.
      </span>
    </p>
  );
}
