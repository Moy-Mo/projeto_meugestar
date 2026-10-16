import Link from "next/link";
import { ilustracaoDoTopico } from "@/content/areas";
import { getIcon } from "@/content/icons";
import PageHeader from "@/components/ui/PageHeader";
import VideoLink from "@/components/ui/VideoLink";
import CartaoCuidado from "@/components/visual/CartaoCuidado";
import Blocks from "./Blocks";

/** Tela padrão de um assunto: cabeçalho, blocos de conteúdo, vídeos e fonte. */
export default function TopicView({ topic, backHref, backLabel }) {
  const isPending = topic.blocks.some((block) => block.type === "pending");
  // Link genérico para as fontes, só quando o assunto não traz as próprias fontes.
  const showSources =
    topic.slug !== "fontes-confiaveis" &&
    !isPending &&
    !topic.blocks.some((block) => block.type === "sources");

  return (
    <article className="lg:mx-auto lg:max-w-3xl">
      <PageHeader
        backHref={backHref}
        backLabel={backLabel}
        icon={getIcon(topic.icon)}
        title={topic.title}
        subtitle={topic.intro}
      />

      <Blocks blocks={topic.blocks} />

      {topic.videos?.length > 0 && (
        <div className="mt-6 space-y-3">
          {topic.videos.map((video) => (
            <VideoLink key={video.youtubeUrl} {...video} />
          ))}
        </div>
      )}

      {showSources && (
        <p className="mt-8 text-sm text-texto-suave">
          Conteúdo baseado em fontes oficiais.{" "}
          <Link href="/pre-natal/fontes-confiaveis" className="font-bold text-rosa-700 underline">
            Ver fontes
          </Link>
        </p>
      )}

      {/* A tela "em preparação" já mostra uma gestante; aqui não repete. */}
      {!isPending && <CartaoCuidado semente={ilustracaoDoTopico(topic.slug)} />}
    </article>
  );
}
