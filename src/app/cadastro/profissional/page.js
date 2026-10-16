import { listarUbs } from "@/lib/dal";
import TelaConta from "@/components/conta/TelaConta";
import { FormCadastroProfissional } from "@/components/forms/FormsConta";
import Callout from "@/components/ui/Callout";

export const metadata = { title: "Cadastro de profissional" };

export default async function CadastroProfissionalPage() {
  const listaUbs = await listarUbs();

  return (
    <TelaConta
      titulo="Cadastro de profissional de saúde"
      subtitulo="Para a equipe da UBS acompanhar as gestantes que autorizarem."
      gestante={7}
    >
      <Callout title="Como funciona" className="mb-6">
        Depois do cadastro, a administração do Meu Gestar confere seus dados e aprova o acesso.
        Você só verá as gestantes da sua UBS que autorizarem a equipe.
      </Callout>
      {listaUbs.length === 0 ? (
        <Callout variant="warning" title="Nenhuma UBS cadastrada ainda">
          A administração precisa cadastrar as UBS antes. Fale com a coordenação do projeto.
        </Callout>
      ) : (
        <FormCadastroProfissional listaUbs={listaUbs} />
      )}
    </TelaConta>
  );
}
