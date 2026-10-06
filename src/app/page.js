import Link from "next/link";
import {
  AArrowUp,
  BookOpen,
  ChevronRight,
  FlaskConical,
  HandHeart,
  Heart,
  HeartPulse,
  MapPin,
  NotebookPen,
  Pill,
  Salad,
  Siren,
  Syringe,
} from "lucide-react";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";
import TopicCard from "@/components/ui/TopicCard";

const assuntos = [
  {
    href: "/pre-natal",
    icon: HeartPulse,
    title: "Pré-natal e Acompanhamento",
    description: "Consultas, exames, vacinas e alto risco",
  },
  {
    href: "/pre-natal/exames-do-pre-natal",
    icon: FlaskConical,
    title: "Exames do pré-natal",
    description: "Para que serve cada um",
  },
  {
    href: "/pre-natal/vacinacao-na-gestacao",
    icon: Syringe,
    title: "Vacinas da gestante e do bebê",
    description: "Quando tomar cada vacina",
  },
  {
    href: "/temas/violencia-obstetrica",
    icon: HandHeart,
    title: "Violência obstétrica",
    description: "Conheça seus direitos",
  },
  {
    href: "/temas/alimentacao",
    icon: Salad,
    title: "Alimentação adequada",
    description: "Como se alimentar bem na gravidez",
  },
  {
    href: "/temas/medicamentos",
    icon: Pill,
    title: "Medicamentos na gestação",
    description: "Cuidados com remédios",
  },
  {
    href: "/temas/onde-ser-atendida",
    icon: MapPin,
    title: "Onde ser atendida",
    description: "Maternidades e emergências",
  },
  {
    href: "/pre-natal/minha-caderneta",
    icon: NotebookPen,
    title: "Minha caderneta",
    description: "Registre as informações da sua gravidez",
  },
];

const palavras = [
  ["UBS", "Unidade Básica de Saúde, o \"postinho\" do seu bairro."],
  ["Idade gestacional", "Quantas semanas de gravidez você tem."],
  ["Pré-natal", "O acompanhamento de saúde durante a gravidez."],
  ["Caderneta da Gestante", "O caderninho onde ficam anotadas todas as informações da sua gravidez."],
  ["Gestação de alto risco", "Gravidez que precisa de um cuidado mais próximo."],
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-cartao bg-rosa-100 p-6 text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-rosa-600 text-white"
        >
          <Heart className="size-8" fill="currentColor" />
        </span>
        <h1 className="text-3xl font-extrabold text-rosa-800">Bem-vinda ao Meu Gestar</h1>
        <p className="mt-2 text-lg">
          Informações confiáveis e em palavras simples para acompanhar a sua gravidez.
        </p>
        <p className="mt-2 font-bold text-rosa-700">Cuidar de você também é cuidar do seu bebê.</p>
      </section>

      <Link
        href="/pre-natal/sinais-de-alerta"
        className="flex items-center gap-4 rounded-cartao border-2 border-alerta-200 bg-alerta-50 p-4 hover:bg-alerta-200/40"
      >
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-alerta-600 text-white"
        >
          <Siren className="size-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold text-alerta-700">Sinais de alerta</span>
          <span className="block text-sm">
            Sangramento, perda de líquido, dor forte? Veja quando procurar atendimento.
          </span>
        </span>
        <ChevronRight aria-hidden="true" className="size-6 shrink-0 text-alerta-600" />
      </Link>

      <section aria-labelledby="assuntos" className="space-y-3">
        <h2 id="assuntos" className="text-xl font-extrabold text-rosa-800">
          Assuntos
        </h2>
        {assuntos.map((a) => (
          <TopicCard key={a.href} {...a} />
        ))}
      </section>

      <section aria-labelledby="ajuda" className="space-y-3">
        <h2 id="ajuda" className="text-xl font-extrabold text-rosa-800">
          Primeira vez aqui?
        </h2>
        <Expandable icon={BookOpen} title="Como usar o Meu Gestar">
          <Steps
            steps={[
              {
                title: "Escolha um assunto",
                content: "Toque em um dos botões da lista para abrir as informações.",
              },
              {
                title: "Aumente a letra, se precisar",
                content: (
                  <p>
                    Toque no botão{" "}
                    <AArrowUp aria-label="A+" className="inline size-5 align-text-bottom text-rosa-700" />{" "}
                    no alto da tela para deixar a letra maior.
                  </p>
                ),
              },
              {
                title: "Use a barra de baixo",
                content:
                  "Ela leva você de volta ao início, ao pré-natal, aos sinais de alerta e à sua caderneta.",
              },
              {
                title: "Em caso de urgência",
                content: "Abra \"Alerta\" e toque no botão vermelho para ligar para o SAMU (192).",
              },
            ]}
          />
        </Expandable>
        <Expandable icon={BookOpen} title="Palavras que você vai encontrar">
          <dl className="space-y-2">
            {palavras.map(([termo, definicao]) => (
              <div key={termo}>
                <dt className="font-bold text-rosa-800">{termo}</dt>
                <dd>{definicao}</dd>
              </div>
            ))}
          </dl>
        </Expandable>
      </section>
    </div>
  );
}
