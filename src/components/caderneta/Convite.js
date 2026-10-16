import Link from "next/link";
import { BookOpen, Check } from "lucide-react";
import { passosCadastro } from "@/content/tutorial";
import { DivisorCoracao } from "@/components/decor/Ornamentos";
import Expandable from "@/components/ui/Expandable";
import Steps from "@/components/ui/Steps";
import { GestanteArco } from "@/components/visual/Gestantes";

/** O que aparece em /caderneta para quem ainda não entrou. */
export default function Convite() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-cartao bg-gradient-to-br from-rosa-100 to-rosa-50 p-5 text-center">
        <GestanteArco semente={4} sizes="96px" eager className="mx-auto h-32 w-24" />
        <h1 className="mt-4 text-2xl font-extrabold text-rosa-800">Minha caderneta digital</h1>
        <DivisorCoracao className="mx-auto mt-2 h-5 text-rosa-400" />
        <p className="mt-2">
          Guarde as informações da sua gravidez e receba lembretes de vacinas e consultas.
        </p>
        <ul className="mx-auto mt-4 max-w-sm space-y-2 text-left">
          {[
            "Suas semanas de gravidez e a data provável do parto",
            "Consultas, exames, vacinas e ultrassons",
            "Lembretes do que está pendente",
            "Checklist da mala da maternidade salvo na sua conta",
          ].map((texto) => (
            <li key={texto} className="flex gap-2">
              <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-rosa-600" strokeWidth={3} />
              {texto}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/cadastro"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-rosa-600 px-6 font-bold text-white hover:bg-rosa-700"
          >
            Criar minha conta
          </Link>
          <Link
            href="/entrar?voltar=/caderneta"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-rosa-300 bg-superficie px-6 font-bold text-rosa-700 hover:bg-rosa-50"
          >
            Já tenho conta
          </Link>
        </div>
        <p className="mt-4 text-sm text-texto-suave">
          É grátis. Seus dados ficam só com você.{" "}
          <Link href="/privacidade" className="font-bold text-rosa-700 underline">
            Saiba como
          </Link>
        </p>
      </section>

      <Expandable icon={BookOpen} title="Como fazer o cadastro (passo a passo)">
        <Steps steps={passosCadastro.slice(1)} />
      </Expandable>
    </div>
  );
}
