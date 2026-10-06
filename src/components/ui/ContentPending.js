import { Hourglass } from "lucide-react";

/**
 * Marca uma tela/seção cujo conteúdo ainda será enviado e revisado pelos alunos.
 * Nunca preencher com texto clínico provisório.
 */
export default function ContentPending({ topic }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-cartao border-2 border-dashed border-rosa-300 bg-rosa-50 p-6 text-center">
      <Hourglass aria-hidden="true" className="size-8 text-rosa-600" />
      <p className="font-bold">Conteúdo em preparação</p>
      <p className="text-texto-suave">
        {topic ? `As informações sobre "${topic}" ` : "Estas informações "}
        estão sendo preparadas e revisadas pela equipe de saúde. Volte em breve!
      </p>
    </div>
  );
}
