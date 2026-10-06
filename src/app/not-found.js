import { HeartCrack } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <HeartCrack aria-hidden="true" className="size-14 text-rosa-500" />
      <h1 className="text-2xl font-extrabold text-rosa-800">Página não encontrada</h1>
      <p className="text-texto-suave">Não achamos o que você procurou. Volte para o início.</p>
      <Button href="/">Voltar para o início</Button>
    </div>
  );
}
