import TelaConta from "@/components/conta/TelaConta";
import { FormRecuperar } from "@/components/forms/FormsConta";
import Callout from "@/components/ui/Callout";

export const metadata = { title: "Esqueci minha senha" };

export default async function RecuperarSenhaPage({ searchParams }) {
  const { "link-invalido": linkInvalido } = await searchParams;

  return (
    <TelaConta
      titulo="Esqueci minha senha"
      subtitulo="Digite seu e-mail. Vamos enviar um link para você criar uma senha nova."
      gestante={6}
    >
      {linkInvalido && (
        <Callout variant="warning" title="Este link não funcionou" className="mb-5">
          Ele pode ter vencido, já ter sido usado ou ter sido aberto em outro aparelho. Peça um novo
          link abaixo e abra no mesmo celular.
        </Callout>
      )}
      <FormRecuperar />
    </TelaConta>
  );
}
