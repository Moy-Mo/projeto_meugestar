import { areas } from "@/content/areas";
import AreaIndex from "@/components/content/AreaIndex";

export const metadata = {
  title: "Pós-parto e amamentação",
  description:
    "Puerpério, recuperação, sinais de alerta, amamentação, pega, posições, dificuldades e direitos.",
};

export default function PosPartoPage() {
  return <AreaIndex area={areas.posParto} />;
}
