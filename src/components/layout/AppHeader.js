import Link from "next/link";
import { Siren } from "lucide-react";
import BotaoConta from "./BotaoConta";
import FontSizeControl from "./FontSizeControl";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-borda bg-fundo/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-1 lg:max-w-6xl lg:px-8 lg:py-2">
        {/* Marca em texto, no estilo da logo: "MEU" fino e espaçado + "Gestar" em caligrafia. */}
        <Link
          href="/"
          aria-label="Meu Gestar — página inicial"
          className="flex min-h-12 flex-col justify-center rounded-full px-1 text-rosa-600"
        >
          <span aria-hidden="true" className="pl-7 text-[0.7rem] font-light uppercase leading-none tracking-[0.45em]">
            Meu
          </span>
          <span aria-hidden="true" className="-mt-1 font-script text-[2.1rem] leading-none">
            Gestar
          </span>
        </Link>
        <div className="flex items-center gap-1 lg:gap-2">
          {/* No celular, os sinais de alerta ficam na barra de baixo; nas telas grandes, aqui. */}
          <Link
            href="/pre-natal/sinais-de-alerta"
            className="hidden min-h-12 items-center gap-2 rounded-full border-2 border-alerta-200 bg-alerta-50 px-4 font-bold text-alerta-700 hover:bg-alerta-200/50 lg:inline-flex"
          >
            <Siren aria-hidden="true" className="size-5" />
            Sinais de alerta
          </Link>
          <FontSizeControl />
          <BotaoConta />
        </div>
      </div>
    </header>
  );
}
