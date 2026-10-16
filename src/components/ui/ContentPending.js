import { Hourglass } from "lucide-react";
import { Coracao } from "@/components/decor/Ornamentos";
import { GestanteArco } from "@/components/visual/Gestantes";

/**
 * Marca uma tela/seção cujo conteúdo ainda será enviado e revisado pelos alunos.
 * Nunca preencher com texto clínico provisório.
 */
export default function ContentPending({ topic }) {
  return (
    <div className="relative flex flex-col items-center gap-2 overflow-hidden rounded-cartao border-2 border-dashed border-rosa-300 bg-rosa-50 p-6 text-center">
      <Coracao contorno className="absolute left-5 top-5 size-5 animate-flutuar text-rosa-300" />
      <GestanteArco semente={topic ?? "pendente"} sizes="80px" className="mb-2 h-28 w-20" />
      <p className="font-bold">
        <Hourglass aria-hidden="true" className="mr-1.5 inline size-5 align-[-0.2em] text-rosa-600" />
        Conteúdo em preparação
      </p>
      <p className="text-texto-suave">
        {topic ? `As informações sobre "${topic}" ` : "Estas informações "}
        estão sendo preparadas e revisadas pela equipe de saúde. Volte em breve!
      </p>
    </div>
  );
}
