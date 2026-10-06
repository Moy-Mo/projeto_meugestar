import { notFound } from "next/navigation";
import { getTema, temas } from "@/content/temas";
import TopicView from "@/components/content/TopicView";

export const dynamicParams = false;

export function generateStaticParams() {
  return temas.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tema = getTema(slug);
  return tema ? { title: tema.title, description: tema.summary } : {};
}

export default async function TemaPage({ params }) {
  const { slug } = await params;
  const tema = getTema(slug);
  if (!tema) notFound();

  return <TopicView topic={tema} backHref="/" backLabel="Início" />;
}
