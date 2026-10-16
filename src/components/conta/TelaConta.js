import { Coracao, DivisorCoracao, Galho } from "@/components/decor/Ornamentos";
import { GestanteArco } from "@/components/visual/Gestantes";

/** Moldura das telas de conta (entrar, cadastro, senha): gestante + título + formulário. */
export default function TelaConta({ titulo, subtitulo, gestante = 0, children, lateral }) {
  return (
    <div className="mx-auto max-w-md lg:grid lg:max-w-5xl lg:grid-cols-[1fr_28rem] lg:items-start lg:gap-12">
      {/* Painel decorativo nas telas grandes; no celular, só a gestante pequena no topo. */}
      <aside
        aria-hidden="true"
        className="relative hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-rosa-100 to-rosa-50 p-10 lg:block"
      >
        <Galho className="absolute -bottom-6 -left-6 h-56 -rotate-12 text-rosa-200" />
        <Coracao contorno className="absolute right-10 top-10 size-8 animate-flutuar text-rosa-400" />
        <GestanteArco semente={gestante} sizes="192px" className="relative mx-auto h-80 w-48" />
        <p className="relative mt-6 text-center font-script text-4xl text-rosa-600">
          Cuidar de você também é cuidar do seu bebê
        </p>
        {lateral}
      </aside>

      <div>
        <div className="mb-6 flex items-center gap-4 lg:block">
          <GestanteArco semente={gestante} sizes="80px" className="h-28 w-20 shrink-0 lg:hidden" />
          <div>
            <h1 className="text-2xl font-extrabold leading-tight text-rosa-800 lg:text-3xl">{titulo}</h1>
            {subtitulo && <p className="mt-2 text-texto-suave">{subtitulo}</p>}
            <DivisorCoracao className="mt-2 h-5 w-32 text-rosa-400" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
