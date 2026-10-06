import { HeartPulse } from "lucide-react";
import { getIcon } from "@/content/icons";
import { grupos, topicos } from "@/content/pre-natal";
import PageHeader from "@/components/ui/PageHeader";
import TopicCard from "@/components/ui/TopicCard";

export const metadata = {
  title: "Pré-natal e Acompanhamento",
  description: "Tudo sobre o pré-natal em linguagem simples: consultas, exames, vacinas, alto risco e sinais de alerta.",
};

export default function PreNatalPage() {
  return (
    <div>
      <PageHeader
        backHref="/"
        backLabel="Início"
        icon={HeartPulse}
        title="Pré-natal e Acompanhamento"
        subtitle="Toque em um assunto para abrir."
      />

      <div className="space-y-8">
        {grupos.map((grupo) => (
          <section key={grupo.id} aria-labelledby={`grupo-${grupo.id}`} className="space-y-3">
            <h2 id={`grupo-${grupo.id}`} className="text-lg font-extrabold text-rosa-800">
              {grupo.title}
            </h2>
            {topicos
              .filter((t) => t.group === grupo.id)
              .map((t) => (
                <TopicCard
                  key={t.slug}
                  href={`/pre-natal/${t.slug}`}
                  icon={getIcon(t.icon)}
                  title={t.title}
                  description={t.summary}
                />
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}
