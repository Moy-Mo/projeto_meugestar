import TelaConta from "@/components/conta/TelaConta";
import { FormCadastroFamiliar } from "@/components/forms/FormsConta";
import Callout from "@/components/ui/Callout";

export const metadata = { title: "Cadastro de familiar" };

export default async function CadastroFamiliarPage({ searchParams }) {
  const { codigo } = await searchParams;
  const codigoValido = typeof codigo === "string" && /^[A-Z2-9]{8}$/i.test(codigo) ? codigo.toUpperCase() : null;

  return (
    <TelaConta
      titulo="Acompanhar uma gestação"
      subtitulo="Crie sua conta de familiar ou acompanhante."
      gestante={2}
    >
      {!codigoValido && (
        <Callout variant="warning" title="Você precisa de um convite" className="mb-6">
          A gestante cria o convite em &quot;Minha conta&quot; e envia o link para você. Depois de criar
          a conta, você também pode digitar o código.
        </Callout>
      )}
      <FormCadastroFamiliar codigo={codigoValido} />
    </TelaConta>
  );
}
