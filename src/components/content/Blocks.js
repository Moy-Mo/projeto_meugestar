import { ExternalLink, Lock } from "lucide-react";
import { ContentIcon, getIcon } from "@/content/icons";
import Callout from "@/components/ui/Callout";
import Checklist from "@/components/ui/Checklist";
import ContentPending from "@/components/ui/ContentPending";
import EmergencyButton from "@/components/ui/EmergencyButton";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";
import TopicCard from "@/components/ui/TopicCard";
import ExamSearch from "./ExamSearch";

function Card({ block }) {
  const danger = block.tone === "danger";

  return (
    <section
      className={`rounded-cartao border bg-superficie p-4 shadow-cartao ${danger ? "border-alerta-200" : "border-borda"}`}
    >
      {block.title && (
        <h2 className="mb-2 flex items-center gap-2 text-lg font-extrabold text-rosa-800">
          <ContentIcon
            name={block.icon}
            aria-hidden="true"
            className="size-5 shrink-0 text-rosa-600"
          />
          {block.title}
        </h2>
      )}
      {block.text && <p className={block.items ? "mb-2" : ""}>{block.text}</p>}
      {block.items && <Checklist items={block.items} tone={block.tone} />}
    </section>
  );
}

function Timeline({ items }) {
  return (
    <ol className="relative space-y-4 border-l-4 border-rosa-200 pl-6">
      {items.map((item) => (
        <li key={item.label} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[2.15rem] top-1 size-5 rounded-full border-4 border-fundo bg-rosa-600"
          />
          <p className="font-extrabold text-rosa-800">{item.label}</p>
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Links({ title, items }) {
  return (
    <section className="space-y-2">
      {title && <h2 className="text-lg font-extrabold text-rosa-800">{title}</h2>}
      <ul className="space-y-2">
        {items.map((link) => (
          <li key={link.href + link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-cartao border border-borda bg-superficie p-4 hover:border-rosa-300 hover:bg-rosa-50"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-rosa-700">{link.label}</span>
                {link.description && (
                  <span className="block text-sm text-texto-suave">{link.description}</span>
                )}
              </span>
              <ExternalLink aria-hidden="true" className="size-5 shrink-0 text-rosa-500" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ComingSoon({ label }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-cartao border-2 border-dashed border-rosa-300 bg-rosa-50 p-4 text-center">
      <span className="inline-flex items-center gap-2 font-bold text-rosa-700">
        <Lock aria-hidden="true" className="size-5" />
        {label}
      </span>
      <span className="text-sm text-texto-suave">Disponível em breve, com o cadastro no app.</span>
    </div>
  );
}

function renderBlock(block) {
  switch (block.type) {
    case "text":
      return <p>{block.text}</p>;
    case "card":
      return <Card block={block} />;
    case "callout":
      return (
        <Callout variant={block.variant} title={block.title}>
          {block.text}
        </Callout>
      );
    case "steps":
      return (
        <Steps
          steps={block.steps.map((step) => ({
            title: step.title,
            content:
              step.text || step.items ? (
                <>
                  {step.text && <p className={step.items ? "mb-2" : ""}>{step.text}</p>}
                  {step.items && <Checklist items={step.items} />}
                </>
              ) : null,
          }))}
        />
      );
    case "expandables":
      return (
        <div className="space-y-3">
          {block.items.map((item) => (
            <Expandable key={item.title} icon={getIcon(block.icon)} title={item.title}>
              {item.text && <p>{item.text}</p>}
              {item.items && <Checklist items={item.items} />}
            </Expandable>
          ))}
        </div>
      );
    case "timeline":
      return <Timeline items={block.items} />;
    case "examSearch":
      return <ExamSearch items={block.items} />;
    case "links":
      return <Links title={block.title} items={block.items} />;
    case "topicLink":
      return (
        <TopicCard
          href={block.href}
          icon={getIcon(block.icon)}
          title={block.title}
          description={block.description}
        />
      );
    case "emergency":
      return <EmergencyButton />;
    case "pending":
      return <ContentPending topic={block.topic} />;
    case "comingSoon":
      return <ComingSoon label={block.label} />;
    default:
      return null;
  }
}

/** Renderiza a lista de blocos de conteúdo de um assunto. */
export default function Blocks({ blocks }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}
