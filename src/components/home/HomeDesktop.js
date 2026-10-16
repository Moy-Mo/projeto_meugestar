import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Siren,
  UserRound,
  Users,
} from "lucide-react";
import { Coracao, DivisorCoracao, Flor, Galho } from "@/components/decor/Ornamentos";
import TopicCard from "@/components/ui/TopicCard";
import { DesfileGestantes, GestanteArco, gestantes } from "@/components/visual/Gestantes";
import HeroCarrossel from "./HeroCarrossel";

/*
 * Tela inicial para telas grandes (a partir de "lg"), no modelo do protótipo da equipe.
 * No celular continua valendo o layout de page.js.
 */

// Textos dos destaques tirados do conteúdo do guia que já está no app.
const destaques = [
  {
    id: "violencia",
    chamada: "Informação também é cuidado",
    titulo: "Violência obstétrica",
    texto:
      "Conheça seus direitos, entenda o que é e saiba onde pedir ajuda. Informação é o primeiro passo para um parto mais seguro e respeitoso.",
    botao: "Conhecer meus direitos",
    href: "/parto/violencia-obstetrica",
    frase: ["Seu corpo,", "suas escolhas,", "seus direitos"],
    gestante: 5,
  },
  {
    id: "pre-natal",
    chamada: "Comece cedo",
    titulo: "Pré-natal",
    texto:
      "O melhor é começar até a 12ª semana de gravidez. Se você descobriu depois, não tem problema: procure a UBS assim que puder.",
    botao: "Entender o pré-natal",
    href: "/pre-natal",
    frase: ["Cuidar de você", "também é cuidar", "do seu bebê"],
    gestante: 1,
  },
  {
    id: "mala",
    chamada: "Preparação para o parto",
    titulo: "Mala da maternidade",
    texto:
      "Separe o que é essencial, o que é recomendado e o que é opcional. Marque o que já está pronto e chegue com mais tranquilidade.",
    botao: "Montar minha mala",
    href: "/parto/mala-da-maternidade",
    frase: ["Preparar-se", "com calma", "faz diferença"],
    gestante: 3,
  },
  {
    id: "amamentacao",
    chamada: "Pós-parto",
    titulo: "Amamentação",
    texto:
      "Primeiras mamadas, sinais de fome, pega e posições. É normal precisar de ajuda no começo.",
    botao: "Aprender a amamentar",
    href: "/pos-parto/comecando-a-amamentar",
    frase: ["Pedir ajuda", "faz parte", "do cuidado"],
    gestante: 6,
  },
];

function Destaque({ d }) {
  return (
    <div className="relative grid min-h-[24rem] grid-cols-[1.1fr_1fr] items-center gap-6 px-24 py-12">
      <div className="relative z-[1]">
        <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.2em] text-rosa-700">
          {d.chamada}
          <Coracao contorno className="size-4 text-rosa-500" />
        </p>
        <h2 className="mt-3 text-5xl font-extrabold leading-tight text-rosa-800">{d.titulo}</h2>
        <p className="mt-4 max-w-md text-lg text-texto-suave">{d.texto}</p>
        <Link
          href={d.href}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-rosa-600 px-6 font-bold text-white shadow-cartao hover:bg-rosa-700"
        >
          {d.botao}
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </div>

      {/* Gestante (com coração e galhos atrás) e, ao lado, a frase em caligrafia. */}
      <div aria-hidden="true" className="flex h-full items-center justify-end gap-2">
        <div className="relative flex shrink-0 items-center justify-center px-10">
          <Coracao className="absolute size-80 text-rosa-200/70" />
          <Galho className="absolute -bottom-6 left-0 h-56 -rotate-12 text-rosa-300" />
          <Galho className="absolute -bottom-4 right-0 h-44 -scale-x-100 rotate-12 text-rosa-300/80" />
          {/* Todas carregam já: os slides escondidos não podem "piscar" borrados ao aparecer. */}
          <GestanteArco
            imagem={gestantes[d.gestante]}
            sizes="176px"
            eager
            className="relative h-72 w-44"
          />
        </div>
        <p className="w-44 shrink-0 rotate-[-8deg] font-script text-4xl leading-tight text-rosa-600">
          {d.frase.map((linha) => (
            <span key={linha} className="block">
              {linha}
            </span>
          ))}
          <Coracao contorno className="mt-1 size-6 text-rosa-500" />
        </p>
      </div>
    </div>
  );
}

/** Cartões de atalho logo abaixo do banner. */
function Atalhos() {
  return (
    <section
      aria-label="Atalhos"
      className="grid grid-cols-5 divide-x divide-borda rounded-[2rem] border border-borda bg-superficie py-6 shadow-cartao"
    >
      {/* Aba de informações da gestante (anotação da equipe). */}
      <Link
        href="/caderneta"
        className="col-span-2 flex items-center gap-5 rounded-l-[2rem] px-8 hover:bg-rosa-50"
      >
        <span
          aria-hidden="true"
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
        >
          <UserRound className="size-8" />
        </span>
        <span>
          <span className="block text-lg font-extrabold text-rosa-800">Minha gestação</span>
          <span className="mt-1 block text-texto-suave">
            Seus dados, semanas de gravidez, data provável do parto e o andamento do seu pré-natal.
          </span>
          <span className="mt-2 inline-flex items-center gap-1 font-bold text-rosa-700">
            Abrir minha caderneta
            <ChevronRight aria-hidden="true" className="size-4" />
          </span>
        </span>
      </Link>

      <Atalho
        href="/pre-natal/sexualidade-e-rede-de-apoio"
        icon={Users}
        titulo="Rede de apoio"
        texto="Família, parceiro(a) e profissionais que cuidam de você."
      />
      <Atalho
        href="/pre-natal/sinais-de-alerta"
        icon={Siren}
        titulo="Sinais de alerta"
        texto="Quando procurar atendimento imediato."
        alerta
      />

      {/* Aba de notificações pendentes (anotação da equipe). */}
      <Link
        href="/caderneta#lembretes"
        className="flex flex-col items-center rounded-r-[2rem] px-5 text-center hover:bg-rosa-50"
      >
        <span
          aria-hidden="true"
          className="relative flex size-14 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
        >
          <Bell className="size-7" />
          <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-rosa-600 ring-2 ring-rosa-100" />
        </span>
        <span className="mt-3 font-extrabold text-rosa-800">Meus lembretes</span>
        <span className="mt-1 text-sm text-texto-suave">Vacinas, consultas e exames pendentes.</span>
      </Link>
    </section>
  );
}

function Atalho({ href, icon: Icon, titulo, texto, alerta = false }) {
  return (
    <Link href={href} className="flex flex-col items-center px-5 text-center hover:bg-rosa-50">
      <span
        aria-hidden="true"
        className={`flex size-14 items-center justify-center rounded-full ${alerta ? "bg-alerta-50 text-alerta-600" : "bg-rosa-100 text-rosa-700"}`}
      >
        <Icon className="size-7" />
      </span>
      <span className={`mt-3 font-extrabold ${alerta ? "text-alerta-700" : "text-rosa-800"}`}>
        {titulo}
      </span>
      <span className="mt-1 text-sm text-texto-suave">{texto}</span>
    </Link>
  );
}

// "Explore os temas": cada cartão leva a uma área com explicação, vídeos e exemplos.
const temas = [
  {
    href: "/pre-natal",
    titulo: "Pré-natal",
    texto: "Consultas, exames, vacinas e cuidados essenciais em cada fase.",
    gestante: 0,
  },
  {
    href: "/parto",
    titulo: "Parto",
    texto: "Mala da maternidade, tipos de parto, plano de parto e seus direitos.",
    gestante: 2,
  },
  {
    href: "/pos-parto",
    titulo: "Pós-parto e amamentação",
    texto: "Recuperação, sinais de alerta, pega e posições para amamentar.",
    gestante: 4,
  },
  {
    href: "/duvidas",
    titulo: "Dúvidas e mitos",
    texto: "Mito ou verdade? Respostas simples para as perguntas mais comuns.",
    gestante: 7,
  },
];

function ExploreTemas() {
  return (
    <section
      aria-labelledby="explore"
      className="relative grid grid-cols-[15rem_1fr_9rem] items-center gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-r from-rosa-100 to-rosa-50 p-8"
    >
      <div>
        <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-rosa-700">
          <Coracao contorno className="size-4 text-rosa-500" />
          Acesso rápido
        </p>
        <h2 id="explore" className="mt-2 text-3xl font-extrabold text-rosa-800">
          Explore os temas
        </h2>
        <p className="mt-2 text-texto-suave">
          Explicações em palavras simples, checklists e vídeos sobre cada fase da gestação.
        </p>
      </div>

      <ul className="grid grid-cols-4 gap-4">
        {temas.map((t, i) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className={`group flex h-full flex-col rounded-cartao p-4 shadow-cartao transition-colors ${i === 0 ? "bg-rosa-200/70 hover:bg-rosa-200" : "bg-superficie hover:bg-rosa-50"}`}
            >
              <span className="relative block size-16 overflow-hidden rounded-full ring-4 ring-superficie">
                <Image
                  src={gestantes[t.gestante]}
                  alt=""
                  sizes="64px"
                  className="h-full w-full object-cover object-top"
                />
              </span>
              <span className="mt-3 font-extrabold text-rosa-800">{t.titulo}</span>
              <span className="mt-1 flex-1 text-sm text-texto-suave">{t.texto}</span>
              <span
                aria-hidden="true"
                className="mt-3 flex size-8 items-center justify-center self-end rounded-full bg-superficie text-rosa-700 shadow-cartao group-hover:bg-rosa-600 group-hover:text-white"
              >
                <ChevronRight className="size-5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="relative h-full">
        <p className="rotate-[-8deg] pt-6 text-center font-script text-3xl leading-snug text-rosa-600">
          Juntas por uma gestação mais segura e respeitosa
        </p>
        <Coracao contorno className="mx-auto mt-2 size-6 text-rosa-500" />
        <Galho className="absolute -bottom-12 -right-8 h-36 -scale-x-100 rotate-12 text-rosa-200" />
      </div>
    </section>
  );
}

export default function HomeDesktop({ assuntos, ajuda }) {
  return (
    <div className="space-y-10">
      <h1 className="sr-only">Meu Gestar: informações para a gestação, o parto e o pós-parto</h1>
      <HeroCarrossel
        slides={destaques.map((d) => ({
          id: d.id,
          rotulo: d.titulo,
          conteudo: <Destaque d={d} />,
        }))}
      />

      <Atalhos />

      <ExploreTemas />

      <div className="grid grid-cols-[1fr_22rem] gap-10">
        <section aria-labelledby="mais-procurados-lg" className="space-y-4">
          <h2 id="mais-procurados-lg" className="text-2xl font-extrabold text-rosa-800">
            Mais procurados
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {assuntos.map((a) => (
              <TopicCard key={a.href} {...a} />
            ))}
          </div>
        </section>
        <section aria-labelledby="ajuda-lg" className="space-y-4">
          <h2 id="ajuda-lg" className="text-2xl font-extrabold text-rosa-800">
            Primeira vez aqui?
          </h2>
          {ajuda}
        </section>
      </div>

      <section aria-labelledby="todas-lg" className="relative space-y-4 text-center">
        <Flor className="absolute left-1/4 top-0 size-7 animate-flutuar text-rosa-200" />
        <h2 id="todas-lg" className="text-2xl font-extrabold text-rosa-800">
          Cada gestação é única
        </h2>
        <DesfileGestantes />
        <DivisorCoracao className="mx-auto h-6 text-rosa-400" />
        <p className="text-texto-suave">Toda gestante merece cuidado, informação e respeito.</p>
      </section>
    </div>
  );
}
