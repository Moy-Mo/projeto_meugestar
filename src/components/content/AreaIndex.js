import { getIcon } from "@/content/icons";
import Callout from "@/components/ui/Callout";
import PageHeader from "@/components/ui/PageHeader";
import TopicCard from "@/components/ui/TopicCard";

/** Tela inicial de uma área: lista de assuntos separados por grupo. */
export default function AreaIndex({ area }) {
  return (
    <div className="lg:mx-auto lg:max-w-5xl">
      <PageHeader
        backHref="/"
        backLabel="Início"
        icon={getIcon(area.icon)}
        title={area.title}
        subtitle={area.intro}
        ilustracao={area.ilustracao}
      />

      {area.notice && <Callout className="mb-6">{area.notice}</Callout>}

      <div className="space-y-8">
        {area.grupos.map((grupo) => (
          <section key={grupo.id} aria-labelledby={`grupo-${grupo.id}`} className="space-y-3">
            <h2 id={`grupo-${grupo.id}`} className="text-lg font-extrabold text-rosa-800">
              {grupo.title}
            </h2>
            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
              {area.topicos
                .filter((t) => t.group === grupo.id)
                .map((t) => (
                  <TopicCard
                    key={t.slug}
                    href={`${area.basePath}/${t.slug}`}
                    icon={getIcon(t.icon)}
                    title={t.title}
                    description={t.summary}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
