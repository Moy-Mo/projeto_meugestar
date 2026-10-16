import Link from "next/link";
import TelaConta from "@/components/conta/TelaConta";
import { FormEntrar } from "@/components/forms/FormsConta";

export const metadata = { title: "Entrar" };

export default async function EntrarPage({ searchParams }) {
  const { voltar } = await searchParams;

  return (
    <TelaConta
      titulo="Entrar na minha caderneta"
      subtitulo="Use o e-mail e a senha que você cadastrou."
      gestante={3}
    >
      <FormEntrar voltar={typeof voltar === "string" ? voltar : undefined} />
      <div className="mt-8 rounded-cartao bg-rosa-50 p-4 text-center">
        <p className="font-bold text-rosa-800">Ainda não tem conta?</p>
        <p className="mt-1 text-texto-suave">É grátis e leva menos de 2 minutos.</p>
        <Link
          href="/cadastro"
          className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-rosa-300 bg-superficie px-6 font-bold text-rosa-700 hover:bg-rosa-50"
        >
          Criar minha conta
        </Link>
      </div>
    </TelaConta>
  );
}
