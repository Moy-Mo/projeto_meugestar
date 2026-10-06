import Link from "next/link";
import { getIcon } from "@/content/icons";
import PageHeader from "@/components/ui/PageHeader";
import VideoLink from "@/components/ui/VideoLink";
import Blocks from "./Blocks";

/** Tela padrão de um assunto: cabeçalho, blocos de conteúdo, vídeos e fonte. */
export default function TopicView({ topic, backHref, backLabel }) {
  const showSources =
    topic.slug !== "fontes-confiaveis" && !topic.blocks.some((block) => block.type === "pending");

  return (
    <article>
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
    </article>
  );
}
