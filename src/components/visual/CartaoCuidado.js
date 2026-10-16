import { Coracao, DivisorCoracao, Flor } from "@/components/decor/Ornamentos";
import { GestanteArco } from "./Gestantes";

/** Cartão de fechamento das telas de assunto: uma gestante e a frase do app. */
export default function CartaoCuidado({ semente, frase = "Cuidar de você também é cuidar do seu bebê." }) {
  return (
    <aside
      aria-label="Mensagem de cuidado"
      className="relative mt-10 flex items-center gap-4 overflow-hidden rounded-cartao bg-gradient-to-br from-rosa-100 via-rosa-50 to-superficie p-4 pr-5"
    >
      <Flor className="absolute -right-2 -top-2 size-14 rotate-12 text-rosa-200" />
      <Coracao
        contorno
        className="absolute bottom-3 right-6 size-5 animate-flutuar text-rosa-400/70"
      />
      <GestanteArco semente={semente} sizes="88px" className="h-32 w-22 shrink-0" />
      <div className="relative min-w-0 flex-1">
        <p className="text-lg font-extrabold leading-snug text-rosa-800">{frase}</p>
        <DivisorCoracao className="mt-2 h-5 w-32 text-rosa-400" />
        <p className="mt-1 text-sm text-texto-suave">
          Em caso de dúvida, converse com a equipe da sua UBS.
        </p>
      </div>
    </aside>
  );
}
