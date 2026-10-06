import { Palette } from "lucide-react";
import Callout from "@/components/ui/Callout";
import TopicCard from "@/components/ui/TopicCard";

// Tela inicial provisória — o conteúdo real (tutorial + assuntos) entra na Fase 1.
export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-cartao bg-rosa-100 p-6 text-center">
        <h1 className="text-3xl font-extrabold text-rosa-800">Bem-vinda ao Meu Gestar</h1>
        <p className="mt-2 text-lg">Cuidar de você também é cuidar do seu bebê.</p>
      </section>

      <Callout title="Em construção">
        O conteúdo do aplicativo está sendo preparado pela equipe e será publicado em breve.
      </Callout>

      <TopicCard
        href="/componentes"
        icon={Palette}
        title="Ver componentes visuais"
        description="Prévia das cores, botões e cartões do app"
      />
    </div>
  );
}
