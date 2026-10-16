import { BookOpen } from "lucide-react";
import { passosCadastro } from "@/content/tutorial";
import TelaConta from "@/components/conta/TelaConta";
import { FormCadastro } from "@/components/forms/FormsConta";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";

export const metadata = { title: "Criar conta" };

export default function CadastroPage() {
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
      <FormCadastro />
    </TelaConta>
  );
}
