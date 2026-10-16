import { CircleHelp, Lightbulb } from "lucide-react";
import { ContentIcon } from "@/content/icons";
import { duvidas, duvidasFontes, duvidasIntro, voceSabia } from "@/content/duvidas";
import { MythList, Sources } from "@/components/content/Blocks";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Dúvidas, mitos e curiosidades",
  description: "Mitos e verdades sobre gestação, parto, bebê e amamentação, em palavras simples.",
};

export default function DuvidasPage() {
  return (
    <div className="lg:mx-auto lg:max-w-3xl">
      <PageHeader
        backHref="/"
        backLabel="Início"
        icon={CircleHelp}
        title="Dúvidas, mitos e curiosidades"
        subtitle={duvidasIntro}
        ilustracao={7}
      />

      <nav aria-label="Etapas" className="mb-8 flex flex-wrap gap-2">
        {duvidas.map((grupo) => (
          <a
            key={grupo.id}
            href={`#${grupo.id}`}
            className="inline-flex min-h-12 items-center rounded-full border-2 border-rosa-200 bg-superficie px-4 font-bold text-rosa-700 hover:bg-rosa-50"
          >
            {grupo.title}
          </a>
        ))}
        <a
          href="#voce-sabia"
          className="inline-flex min-h-12 items-center rounded-full border-2 border-rosa-200 bg-superficie px-4 font-bold text-rosa-700 hover:bg-rosa-50"
        >
          Você sabia?
        </a>
      </nav>

      <div className="space-y-10">
        {duvidas.map((grupo) => (
          <section key={grupo.id} id={grupo.id} aria-labelledby={`titulo-${grupo.id}`} className="scroll-mt-20 space-y-3">
            <h2
              id={`titulo-${grupo.id}`}
              className="flex items-center gap-2 text-xl font-extrabold text-rosa-800"
            >
              <ContentIcon name={grupo.icon} aria-hidden="true" className="size-6 text-rosa-600" />
              {grupo.title}
            </h2>
            <MythList items={grupo.items} />
          </section>
        ))}

        <section id="voce-sabia" aria-labelledby="titulo-voce-sabia" className="scroll-mt-20 space-y-3">
          <h2
            id="titulo-voce-sabia"
            className="flex items-center gap-2 text-xl font-extrabold text-rosa-800"
          >
            <Lightbulb aria-hidden="true" className="size-6 text-rosa-600" />
            Você sabia?
          </h2>
          <ul className="space-y-3">
            {voceSabia.map((fato) => (
              <li key={fato.title} className="rounded-cartao bg-rosa-50 p-4">
                <p className="font-bold text-rosa-800">{fato.title}</p>
                <p className="mt-1">{fato.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <Sources items={duvidasFontes.items} />
      </div>
    </div>
  );
}
