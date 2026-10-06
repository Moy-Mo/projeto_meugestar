import { Baby, CalendarDays, Heart, Stethoscope, Syringe } from "lucide-react";
import Button from "@/components/ui/Button";
import Callout from "@/components/ui/Callout";
import Checklist from "@/components/ui/Checklist";
import ContentPending from "@/components/ui/ContentPending";
import EmergencyButton from "@/components/ui/EmergencyButton";
import Expandable from "@/components/ui/Expandable";
import PageHeader from "@/components/ui/PageHeader";
import Steps from "@/components/ui/Steps";
import TopicCard from "@/components/ui/TopicCard";
import VideoLink from "@/components/ui/VideoLink";

export const metadata = {
  title: "Componentes",
  robots: { index: false },
};

// Vitrine do design system (Fase 0) para aprovação da equipe. Os textos são exemplos
// tirados do guia "Meu Gestar — Pré-natal e Acompanhamento".
const cores = [
  ["rosa-50", "bg-rosa-50"],
  ["rosa-100", "bg-rosa-100"],
  ["rosa-200", "bg-rosa-200"],
  ["rosa-300", "bg-rosa-300"],
  ["rosa-500", "bg-rosa-500"],
  ["rosa-600", "bg-rosa-600"],
  ["rosa-700", "bg-rosa-700"],
  ["rosa-800", "bg-rosa-800"],
];

function Secao({ titulo, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-extrabold text-rosa-800">{titulo}</h2>
      {children}
    </section>
  );
}

export default function ComponentesPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        backHref="/"
        backLabel="Início"
        icon={Heart}
        title="Componentes visuais"
        subtitle="Prévia da identidade do Meu Gestar para aprovação da equipe."
      />

      <Secao titulo="Cores">
        <ul className="grid grid-cols-4 gap-2">
          {cores.map(([nome, classe]) => (
            <li key={nome} className="text-center text-xs">
              <span className={`block h-12 rounded-xl border border-borda ${classe}`} />
              {nome}
            </li>
          ))}
        </ul>
      </Secao>

      <Secao titulo="Texto">
        <p className="text-2xl font-extrabold text-rosa-800">Título de tela</p>
        <p>Texto normal, com letra grande e frases curtas para facilitar a leitura.</p>
        <p className="text-texto-suave">Texto de apoio, usado em explicações curtas.</p>
      </Secao>

      <Secao titulo="Botões">
        <div className="flex flex-col gap-3">
          <Button size="lg" fullWidth>
            Botão principal
          </Button>
          <Button variant="secondary" fullWidth>
            Botão secundário
          </Button>
          <Button variant="ghost">Botão discreto</Button>
        </div>
      </Secao>

      <Secao titulo="Lista de assuntos">
        <div className="space-y-3">
          <TopicCard
            href="#"
            icon={Stethoscope}
            title="Descobri que estou grávida. O que fazer?"
            description="O primeiro passo é procurar a UBS"
          />
          <TopicCard
            href="#"
            icon={Syringe}
            title="Vacinação durante a gestação"
            description="Proteja você e o seu bebê"
          />
        </div>
      </Secao>

      <Secao titulo="Avisos">
        <Callout>O ideal é fazer a primeira consulta até a 12ª semana de gravidez.</Callout>
        <Callout variant="warning" title="Não se automedique">
          O diagnóstico e o tratamento devem ser feitos por um profissional de saúde.
        </Callout>
        <Callout variant="danger" title="Procure atendimento imediato">
          Em caso de urgência, ligue 192 (SAMU) ou vá à emergência da maternidade.
        </Callout>
        <Callout variant="success">Você não precisa começar tudo de novo.</Callout>
      </Secao>

      <Secao titulo="Cartões que abrem e fecham">
        <div className="space-y-3">
          <Expandable icon={CalendarDays} title="De 13 a 19 semanas" defaultOpen>
            Procure a UBS o quanto antes. A equipe vai calcular as semanas de gravidez e pedir os
            exames que faltam.
          </Expandable>
          <Expandable icon={CalendarDays} title="De 20 a 27 semanas">
            A vacina dTpa já pode ser tomada a partir de 20 semanas.
          </Expandable>
        </div>
      </Secao>

      <Secao titulo="Passos numerados">
        <Steps
          steps={[
            { title: "Procure uma UBS", content: "Leve o Cartão do SUS e um documento." },
            { title: "Faça a primeira consulta" },
            { title: "Guarde a Caderneta da Gestante" },
          ]}
        />
      </Secao>

      <Secao titulo="Lista com marcas">
        <Checklist
          items={["Pressão arterial e peso", "Como você está se sentindo", "Vacinas"]}
        />
      </Secao>

      <Secao titulo="Vídeo">
        <VideoLink
          title="Exemplo de vídeo educativo"
          description="Os vídeos abrem no YouTube; o app não guarda o vídeo."
          duration="6:12"
          source="Ministério da Saúde"
          youtubeUrl="https://www.youtube.com/"
        />
      </Secao>

      <Secao titulo="Botão de emergência">
        <EmergencyButton />
      </Secao>

      <Secao titulo="Conteúdo pendente">
        <ContentPending topic="Violência obstétrica" />
      </Secao>

      <Secao titulo="Ícones">
        <p className="flex gap-4 text-rosa-600">
          <Baby aria-label="Bebê" className="size-8" />
          <Syringe aria-label="Vacina" className="size-8" />
          <Stethoscope aria-label="Consulta" className="size-8" />
          <CalendarDays aria-label="Calendário" className="size-8" />
        </p>
      </Secao>
    </div>
  );
}
