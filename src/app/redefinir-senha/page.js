import TelaConta from "@/components/conta/TelaConta";
import { FormRedefinir } from "@/components/forms/FormsConta";
import { exigirUsuario } from "@/lib/dal";

export const metadata = { title: "Nova senha" };

export default async function RedefinirSenhaPage() {
  // Quem chega pelo link do e-mail já entra com uma sessão temporária.
  await exigirUsuario("/redefinir-senha");

  return (
    <TelaConta titulo="Criar uma nova senha" subtitulo="Escolha uma senha nova para sua conta." gestante={6}>
      <FormRedefinir />
    </TelaConta>
  );
}
