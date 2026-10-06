import { notFound } from "next/navigation";
import { getTopico, topicos } from "@/content/pre-natal";
import TopicView from "@/components/content/TopicView";

// Só os assuntos conhecidos existem; qualquer outro endereço vira 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return topicos.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topico = getTopico(slug);
  return topico ? { title: topico.title, description: topico.intro } : {};
}

export default async function TopicoPage({ params }) {
  const { slug } = await params;
  const topico = getTopico(slug);
  if (!topico) notFound();

  return <TopicView topic={topico} backHref="/pre-natal" backLabel="Pré-natal" />;
}
