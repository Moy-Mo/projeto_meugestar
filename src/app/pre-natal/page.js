import { areas } from "@/content/areas";
import AreaIndex from "@/components/content/AreaIndex";

export const metadata = {
  title: "Pré-natal e Acompanhamento",
  description:
    "Tudo sobre o pré-natal em linguagem simples: consultas, exames, vacinas, alto risco e sinais de alerta.",
};

export default function PreNatalPage() {
  return <AreaIndex area={areas.preNatal} />;
}
