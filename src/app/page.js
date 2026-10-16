import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/marca/logo.webp";
import { Coracao, DivisorCoracao, Flor } from "@/components/decor/Ornamentos";
import HomeDesktop from "@/components/home/HomeDesktop";
import { DesfileGestantes } from "@/components/visual/Gestantes";
import {
  AArrowUp,
  Baby,
  BookOpen,
  BriefcaseMedical,
  ChevronRight,
  CircleHelp,
  HouseHeart,
  FlaskConical,
  HandHeart,
  HeartPulse,
  MapPin,
  NotebookPen,
  Salad,
  Siren,
  Syringe,
  UserRoundPlus,
} from "lucide-react";
import { passosCadastro } from "@/content/tutorial";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";
import TopicCard from "@/components/ui/TopicCard";

// As três fases do cuidado, na ordem em que acontecem.
const fases = [
  {
    href: "/pre-natal",
    icon: HeartPulse,
    title: "Pré-natal e Acompanhamento",
    description: "Consultas, exames, vacinas, alto risco e bem-estar",
  },
  {
    href: "/parto",
    icon: Baby,
    title: "Parto",
    description: "Mala da maternidade, tipos de parto e seus direitos",
  },
  {
    href: "/pos-parto",
    icon: HouseHeart,
    title: "Pós-parto e amamentação",
    description: "Recuperação, sinais de alerta, pega e posições",
  },
  {
    href: "/duvidas",
    icon: CircleHelp,
    title: "Dúvidas, mitos e curiosidades",
    description: "Mito ou verdade? Descubra aqui",
  },
];

const assuntos = [
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
    href: "/parto/mala-da-maternidade",
    icon: BriefcaseMedical,
    title: "Mala da maternidade",
    description: "Checklist para marcar o que já separou",
  },
  {
    href: "/parto/violencia-obstetrica",
    icon: HandHeart,
    title: "Violência obstétrica",
    description: "Conheça seus direitos e onde pedir ajuda",
  },
  {
    href: "/temas/alimentacao",
    icon: Salad,
    title: "Alimentação na gestação",
    description: "Mitos e verdades e o que comer",
  },
  {
    href: "/temas/onde-ser-atendida",
    icon: MapPin,
    title: "Onde ser atendida",
    description: "Maternidade e pronto atendimento em Porto Velho",
  },
  {
    href: "/caderneta",
    icon: NotebookPen,
    title: "Minha caderneta",
    description: "Suas semanas, consultas, vacinas e lembretes",
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
    <>
      <div className="hidden lg:block">
        <HomeDesktop assuntos={assuntos} ajuda={<Ajuda telaGrande />} />
      </div>
      <HomeCelular />
    </>
  );
}

/** Layout do celular (e tablet) — aprovado pela equipe; não alterar sem pedido. */
function HomeCelular() {
  return (
    <div className="space-y-8 lg:hidden">
      {/* O fundo da página é o mesmo creme da logo, então ela "encaixa" sem moldura. */}
      <section className="relative -mt-2 animate-surgir text-center">
        <Coracao
          contorno
          className="absolute left-2 top-8 size-6 animate-flutuar text-rosa-300"
        />
        <Flor className="absolute right-3 top-4 size-8 animate-flutuar text-rosa-200 [animation-delay:2s]" />
        <Coracao className="absolute left-4 top-48 size-4 animate-flutuar text-rosa-300/80 [animation-delay:1s]" />
        <Image
          src={logo}
          alt="Meu Gestar"
          sizes="(max-width: 640px) 80vw, 340px"
          loading="eager"
          fetchPriority="high"
          className="mx-auto w-4/5 max-w-[340px]"
        />
        <h1 className="mt-1 text-2xl font-extrabold text-rosa-800">Bem-vinda!</h1>
        <p className="mx-auto mt-2 max-w-md text-lg">
          Informações confiáveis e em palavras simples para acompanhar a sua gravidez, o parto e
          o pós-parto.
        </p>
        <DivisorCoracao className="mx-auto mt-3 h-6 text-rosa-400" />
        <p className="mt-1 font-bold text-rosa-700">Cuidar de você também é cuidar do seu bebê.</p>
      </section>

      <section aria-labelledby="todas" className="space-y-3">
        <h2 id="todas" className="text-center text-xl font-extrabold text-rosa-800">
          Cada gestação é única
        </h2>
        <DesfileGestantes />
        <p className="text-center text-texto-suave">
          Toda gestante merece cuidado, informação e respeito.
        </p>
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

      <section aria-labelledby="fases" className="space-y-3">
        <h2 id="fases" className="text-xl font-extrabold text-rosa-800">
          Em cada fase
        </h2>
        {fases.map((f) => (
          <TopicCard key={f.href} {...f} />
        ))}
      </section>

      <section aria-labelledby="assuntos" className="space-y-3">
        <h2 id="assuntos" className="text-xl font-extrabold text-rosa-800">
          Mais procurados
        </h2>
        {assuntos.map((a) => (
          <TopicCard key={a.href} {...a} />
        ))}
      </section>

      <section aria-labelledby="ajuda" className="space-y-3">
        <h2 id="ajuda" className="text-xl font-extrabold text-rosa-800">
          Primeira vez aqui?
        </h2>
        <Ajuda />
      </section>
    </div>
  );
}

/** "Como usar" + glossário. A navegação muda: barra de baixo no celular, atalhos no alto nas telas grandes. */
function Ajuda({ telaGrande = false }) {
  return (
    <div className="space-y-3">
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
            telaGrande
              ? {
                  title: "Use os atalhos",
                  content:
                    "Os cartões abaixo dos destaques levam à sua gestação, à rede de apoio, aos sinais de alerta e aos seus lembretes.",
                }
              : {
                  title: "Use a barra de baixo",
                  content:
                    "Ela leva você de volta ao início, ao pré-natal, aos sinais de alerta e à sua caderneta.",
                },
            {
              title: "Em caso de urgência",
              content: telaGrande
                ? "Clique em \"Sinais de alerta\", no alto da tela, e ligue para o SAMU (192)."
                : "Abra \"Alerta\" e toque no botão vermelho para ligar para o SAMU (192).",
            },
          ]}
        />
      </Expandable>
      <Expandable icon={UserRoundPlus} title="Como criar sua conta">
        <Steps
          steps={
            telaGrande
              ? [{ title: "Clique em \"Entrar\", no alto da tela, e depois em \"Criar minha conta\"" }, ...passosCadastro.slice(1)]
              : passosCadastro
          }
        />
        <Link
          href="/cadastro"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-rosa-600 px-6 font-bold text-white hover:bg-rosa-700"
        >
          Criar minha conta agora
        </Link>
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
    </div>
  );
}
