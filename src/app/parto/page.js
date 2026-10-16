import { areas } from "@/content/areas";
import AreaIndex from "@/components/content/AreaIndex";

export const metadata = {
  title: "Parto",
  description:
    "Preparação para o parto, mala da maternidade, tipos de parto, plano de parto, direitos e violência obstétrica.",
};

export default function PartoPage() {
  return <AreaIndex area={areas.parto} />;
}
