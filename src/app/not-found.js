import { DivisorCoracao } from "@/components/decor/Ornamentos";
import Button from "@/components/ui/Button";
import { GestanteArco } from "@/components/visual/Gestantes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <GestanteArco semente={6} sizes="112px" className="h-40 w-28" />
      <h1 className="text-2xl font-extrabold text-rosa-800">Página não encontrada</h1>
      <DivisorCoracao className="h-6 text-rosa-400" />
      <p className="text-texto-suave">Não achamos o que você procurou. Volte para o início.</p>
      <Button href="/">Voltar para o início</Button>
    </div>
  );
}
