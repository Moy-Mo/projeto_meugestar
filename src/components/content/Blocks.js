import { BookMarked, Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { formatarTelefone } from "@/lib/documentos";
import { ContentIcon, getIcon } from "@/content/icons";
import Badge from "@/components/ui/Badge";
import Callout from "@/components/ui/Callout";
import Checklist from "@/components/ui/Checklist";
import ContentPending from "@/components/ui/ContentPending";
import EmergencyButton from "@/components/ui/EmergencyButton";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";
import TopicCard from "@/components/ui/TopicCard";
import ExamSearch from "./ExamSearch";
import InteractiveChecklist from "./InteractiveChecklist";
import Tabs from "./Tabs";

function Card({ block }) {
  const danger = block.tone === "danger";

  return (
    <section
      className={`rounded-cartao border bg-superficie p-4 shadow-cartao ${danger ? "border-alerta-200" : "border-borda"}`}
    >
      {block.badge && (
        <div className="mb-1">
          <Badge type={block.badge} />
        </div>
      )}
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
        {items.map((link) => {
          const isPhone = link.href.startsWith("tel:");
          return (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                {...(isPhone ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="flex items-center gap-3 rounded-cartao border border-borda bg-superficie p-4 hover:border-rosa-300 hover:bg-rosa-50"
              >
                {isPhone && <Phone aria-hidden="true" className="size-5 shrink-0 text-rosa-600" />}
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-rosa-700">{link.label}</span>
                  {link.description && (
                    <span className="block text-sm text-texto-suave">{link.description}</span>
                  )}
                </span>
                {!isPhone && (
                  <>
                    <ExternalLink aria-hidden="true" className="size-5 shrink-0 text-rosa-500" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ExpandableItemContent({ item }) {
  return (
    <div className="space-y-2">
      {item.text && <p>{item.text}</p>}
      {item.items &&
        (item.numbered ? (
          <ol className="list-decimal space-y-1 pl-6 marker:font-bold marker:text-rosa-700">
            {item.items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        ) : (
          <Checklist items={item.items} />
        ))}
      {item.footer && (
        <p className={`font-semibold ${item.urgent ? "text-alerta-700" : "text-rosa-800"}`}>
          {item.footer}
        </p>
      )}
      {item.note && (
        <Callout variant="warning" title="Atenção">
          {item.note}
        </Callout>
      )}
    </div>
  );
}

/** Lista de perguntas com selo (Mito, Verdade, Atenção…). Usada também em /duvidas. */
export function MythList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Expandable
          key={item.question}
          title={`"${item.question}"`}
          badge={<Badge type={item.verdict}>{item.label}</Badge>}
        >
          <p>{item.text}</p>
        </Expandable>
      ))}
    </div>
  );
}

/** "Fontes desta seção" — fica fechado para não pesar a leitura. */
export function Sources({ items }) {
  return (
    <Expandable icon={BookMarked} title="Fontes desta seção">
      <ul className="space-y-2 text-sm">
        {items.map((source) => (
          <li key={source.text}>
            {source.text}{" "}
            {source.href && (
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-rosa-700 underline"
              >
                Acessar<span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-texto-suave">
        As recomendações podem ser atualizadas; confirme sempre as orientações com a sua equipe de
        saúde.
      </p>
    </Expandable>
  );
}

/**
 * Unidades de saúde: nome, endereço, horário, botões de ligar e "Ver no mapa".
 * `telefones` vêm só com dígitos (ex.: "6939012838").
 * O mapa abre no Google Maps só se a pessoa tocar (busca pelo nome + endereço).
 */
function Locais({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((local) => {
        const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${local.nome}, ${local.endereco}, Porto Velho - RO`,
        )}`;
        return (
          <li
            key={local.nome}
            className={`rounded-cartao border-2 bg-superficie p-4 shadow-cartao ${local.destaque ? "border-rosa-300" : "border-borda"}`}
          >
            <h3 className="text-lg font-extrabold text-rosa-800">{local.nome}</h3>
            {local.descricao && <p className="mt-1">{local.descricao}</p>}
            <p className="mt-2 flex items-start gap-1.5 text-texto-suave">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-rosa-600" />
              {local.endereco}
            </p>
            {local.horario && (
              <p className="mt-1 flex items-start gap-1.5 text-texto-suave">
                <Clock aria-hidden="true" className="mt-1 size-4 shrink-0 text-rosa-600" />
                {local.horario}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {(local.telefones ?? []).map((tel) => (
                <a
                  key={tel}
                  href={`tel:+55${tel}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rosa-600 px-4 font-bold text-white hover:bg-rosa-700"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {formatarTelefone(tel)}
                </a>
              ))}
              <a
                href={mapa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-rosa-300 px-4 font-bold text-rosa-700 hover:bg-rosa-50"
              >
                <MapPin aria-hidden="true" className="size-4" />
                Ver no mapa
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Levels({ items }) {
  return (
    <ul className="space-y-2 rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
      {items.map((item) => (
        <li key={item.badge}>
          <Badge type={item.badge} />
          <p className="mt-1">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function renderBlock(block) {
  switch (block.type) {
    case "text":
      return <p>{block.text}</p>;
    case "heading":
      return <h2 className="text-lg font-extrabold text-rosa-800">{block.text}</h2>;
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
            <Expandable
              key={item.title}
              icon={getIcon(item.icon ?? block.icon)}
              title={item.title}
              subtitle={item.subtitle}
              badge={item.badge && <Badge type={item.badge} />}
            >
              <ExpandableItemContent item={item} />
            </Expandable>
          ))}
        </div>
      );
    case "timeline":
      return <Timeline items={block.items} />;
    case "examSearch":
      return <ExamSearch items={block.items} />;
    case "checklist":
      return (
        <InteractiveChecklist
          id={block.id}
          title={block.title}
          badge={block.badge}
          items={block.items}
        />
      );
    case "tabs":
      return (
        <Tabs
          label={block.label}
          tabs={block.tabs.map((tab) => ({
            label: tab.label,
            content: <Blocks blocks={tab.blocks} />,
          }))}
        />
      );
    case "locais":
      return <Locais items={block.items} />;
    case "levels":
      return <Levels items={block.items} />;
    case "myths":
      return <MythList items={block.items} />;
    case "sources":
      return <Sources items={block.items} />;
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
