import { Phone } from "lucide-react";
import Disclaimer from "@/components/ui/Disclaimer";

export default function AppFooter() {
  return (
    <footer className="mt-10 border-t border-borda bg-superficie pb-20">
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
        <Disclaimer />
        <a
          href="tel:192"
          className="inline-flex min-h-12 items-center gap-2 rounded-full font-bold text-alerta-600 hover:underline"
        >
          <Phone aria-hidden="true" className="size-5" />
          Emergência: ligue 192 (SAMU)
        </a>
        <p className="text-center text-sm font-semibold text-rosa-700">
          Cuidar de você também é cuidar do seu bebê.
        </p>
      </div>
    </footer>
  );
}
