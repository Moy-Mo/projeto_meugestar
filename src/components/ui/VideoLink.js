import { CirclePlay, Clock, ExternalLink } from "lucide-react";

/**
 * "Quer saber mais?" — vídeo educativo de fonte confiável.
 * O vídeo não é hospedado no app: o botão abre no YouTube.
 */
export default function VideoLink({ title, description, duration, source, youtubeUrl, officialUrl }) {
  return (
    <section
      aria-label={`Vídeo: ${title}`}
      className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-rosa-700">Quer saber mais?</p>
      <p className="mt-1 font-bold leading-snug">{title}</p>
      {description && <p className="mt-1 text-texto-suave">{description}</p>}
      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-texto-suave">
        {duration && (
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="size-4" />
            <span className="sr-only">Duração:</span> {duration}
          </span>
        )}
        {source && <span>Fonte: {source}</span>}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rosa-600 px-5 font-bold text-white hover:bg-rosa-700"
        >
          <CirclePlay aria-hidden="true" className="size-5" />
          Assistir no YouTube
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
        {officialUrl && (
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-bold text-rosa-700 hover:bg-rosa-50"
          >
            Ver no site oficial
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
      </div>
    </section>
  );
}
