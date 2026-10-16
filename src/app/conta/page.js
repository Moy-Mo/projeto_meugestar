import Link from "next/link";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { exigirUsuario, getCaderneta } from "@/lib/dal";
import { sair } from "@/lib/actions/conta";
import { FormExcluirConta, FormPerfil } from "@/components/forms/FormsConta";
import BotaoSair from "@/components/conta/BotaoSair";
import Expandable from "@/components/ui/Expandable";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Minha conta" };

export default async function ContaPage() {
  const usuario = await exigirUsuario("/conta");
  const { perfil } = await getCaderneta();

  return (
    <div className="space-y-8 lg:mx-auto lg:max-w-3xl">
      <PageHeader backHref="/caderneta" backLabel="Minha caderneta" icon={UserRound} title="Minha conta" />

      <section aria-labelledby="meus-dados" className="space-y-3">
        <h2 id="meus-dados" className="text-xl font-extrabold text-rosa-800">
          Meus dados
        </h2>
        <p className="text-texto-suave">
          E-mail da conta: <strong className="text-texto">{usuario.email}</strong>
        </p>
        <div className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
          <FormPerfil perfil={perfil} />
        </div>
      </section>

      <BotaoSair acao={sair}>
        <LogOut aria-hidden="true" className="size-5" />
        Sair da conta
      </BotaoSair>

      <section aria-labelledby="privacidade" className="space-y-3">
        <h2 id="privacidade" className="flex items-center gap-2 text-xl font-extrabold text-rosa-800">
          <ShieldCheck aria-hidden="true" className="size-6 text-rosa-600" />
          Privacidade
        </h2>
        <p>
          Seus dados ficam só com você.{" "}
          <Link href="/privacidade" className="font-bold text-rosa-700 underline">
            Veja como usamos e protegemos seus dados
          </Link>
          .
        </p>
        <Expandable title="Excluir minha conta e meus dados">
          <FormExcluirConta />
        </Expandable>
      </section>
    </div>
  );
}
