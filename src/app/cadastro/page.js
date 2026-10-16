import Link from "next/link";
import { BookOpen, Stethoscope, Users } from "lucide-react";
import { passosCadastro } from "@/content/tutorial";
import { listarUbs } from "@/lib/dal";
import TelaConta from "@/components/conta/TelaConta";
import { FormCadastro } from "@/components/forms/FormsConta";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";

export const metadata = { title: "Criar conta" };

export default async function CadastroPage() {
  const listaUbs = await listarUbs();

  return (
    <TelaConta
      titulo="Criar minha conta"
      subtitulo="Com a conta você guarda sua caderneta digital e recebe lembretes de vacinas e consultas."
      gestante={1}
    >
      <div className="mb-6">
        <Expandable icon={BookOpen} title="Como fazer o cadastro (passo a passo)">
          <Steps steps={passosCadastro.slice(1)} />
        </Expandable>
      </div>
      <FormCadastro listaUbs={listaUbs} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href="/cadastro/profissional"
          className="flex items-center gap-3 rounded-cartao border border-borda bg-superficie p-4 hover:bg-rosa-50"
        >
          <Stethoscope aria-hidden="true" className="size-6 shrink-0 text-rosa-600" />
          <span>
            <span className="block font-bold">É profissional de saúde?</span>
            <span className="block text-sm text-texto-suave">Cadastro da equipe da UBS</span>
          </span>
        </Link>
        <Link
          href="/cadastro/familiar"
          className="flex items-center gap-3 rounded-cartao border border-borda bg-superficie p-4 hover:bg-rosa-50"
        >
          <Users aria-hidden="true" className="size-6 shrink-0 text-rosa-600" />
          <span>
            <span className="block font-bold">É familiar ou acompanhante?</span>
            <span className="block text-sm text-texto-suave">Use o convite da gestante</span>
          </span>
        </Link>
      </div>
    </TelaConta>
  );
}
