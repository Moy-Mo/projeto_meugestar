import { CalendarPlus, Download } from "lucide-react";
import { arquivoICS, linkGoogleAgenda } from "@/lib/agenda";

/**
 * "Adicionar ao Google Agenda" (abre o Google Agenda já preenchido) e, para
 * iPhone e outras agendas, "Baixar para a agenda" (arquivo .ics).
 * `evento`: { id, titulo, data, hora?, local?, detalhes? }
 */
export default function BotoesAgenda({ evento }) {
  const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(arquivoICS(evento))}`;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <a
        href={linkGoogleAgenda(evento)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rosa-50 px-4 text-sm font-bold text-rosa-700 hover:bg-rosa-100"
      >
        <CalendarPlus aria-hidden="true" className="size-5" />
        Adicionar ao Google Agenda
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
      <a
        href={ics}
        download={`meu-gestar-${evento.data}.ics`}
        className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-texto-suave hover:bg-rosa-50"
      >
        <Download aria-hidden="true" className="size-4" />
        Outra agenda (iPhone)
      </a>
    </div>
  );
}
