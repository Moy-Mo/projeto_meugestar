import { DivisorCoracao } from "@/components/decor/Ornamentos";
import Button from "@/components/ui/Button";
import { GestanteArco } from "@/components/visual/Gestantes";

export const metadata = { title: "Conta excluída", robots: { index: false } };

export default function ContaExcluidaPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <GestanteArco semente={2} sizes="112px" className="h-40 w-28" />
      <h1 className="text-2xl font-extrabold text-rosa-800">Sua conta foi excluída</h1>
      <DivisorCoracao className="h-6 text-rosa-400" />
      <p className="max-w-md text-texto-suave">
        Apagamos sua conta e todos os dados da sua caderneta. Você continua podendo usar todas as
        informações do Meu Gestar sem conta.
      </p>
      <Button href="/">Voltar para o início</Button>
    </div>
  );
}
