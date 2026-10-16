import { Phone } from "lucide-react";
import { DivisorCoracao, Galho } from "@/components/decor/Ornamentos";
import Disclaimer from "@/components/ui/Disclaimer";

export default function AppFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-borda bg-superficie pb-20 lg:pb-0">
      <Galho className="pointer-events-none absolute -bottom-6 -left-6 h-40 rotate-[-25deg] text-rosa-100" />
      <Galho className="pointer-events-none absolute -bottom-6 -right-6 h-40 -scale-x-100 rotate-[25deg] text-rosa-100" />
      <div className="relative mx-auto max-w-2xl space-y-4 px-4 py-6 lg:max-w-3xl">
        <Disclaimer />
        <a
          href="tel:192"
          className="inline-flex min-h-12 items-center gap-2 rounded-full font-bold text-alerta-600 hover:underline"
        >
          <Phone aria-hidden="true" className="size-5" />
          Emergência: ligue 192 (SAMU)
        </a>
        <DivisorCoracao className="mx-auto h-6 text-rosa-300" />
        <p className="text-center text-sm font-semibold text-rosa-700">
          Cuidar de você também é cuidar do seu bebê.
        </p>
      </div>
    </footer>
  );
}
