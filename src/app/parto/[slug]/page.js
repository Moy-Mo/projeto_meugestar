import { notFound } from "next/navigation";
import { areas, getTopico } from "@/content/areas";
import TopicView from "@/components/content/TopicView";

const area = areas.parto;

export const dynamicParams = false;

export function generateStaticParams() {
  return area.topicos.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topico = getTopico(area, slug);
  return topico ? { title: topico.title, description: topico.summary } : {};
}

export default async function TopicoPage({ params }) {
  const { slug } = await params;
  const topico = getTopico(area, slug);
  if (!topico) notFound();

  return <TopicView topic={topico} backHref={area.basePath} backLabel="Parto" />;
}
