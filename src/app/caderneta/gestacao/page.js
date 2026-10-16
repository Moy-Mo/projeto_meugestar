import { exigirPapel, getCaderneta } from "@/lib/dal";
import { FormGestacao } from "@/components/forms/FormsCaderneta";

export const metadata = { title: "Dados da gestação" };

export default async function GestacaoPage() {
  await exigirPapel(["gestante"], "/caderneta/gestacao");
  const { gestacao } = await getCaderneta();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-rosa-800">Dados da gestação</h1>
        <p className="mt-1 text-texto-suave">
          Como na sua Caderneta da Gestante. Você pode mudar quando quiser.
        </p>
      </div>
      <div className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao lg:p-6">
        <FormGestacao gestacao={gestacao} />
      </div>
    </div>
  );
}
