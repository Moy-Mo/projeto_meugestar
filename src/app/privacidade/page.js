import { ShieldCheck } from "lucide-react";
import { VERSAO_TERMO } from "@/lib/caderneta-config";
import Callout from "@/components/ui/Callout";
import Checklist from "@/components/ui/Checklist";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Uso dos meus dados",
  description: "Como o Meu Gestar guarda e protege as informações da sua gravidez (LGPD).",
};

/*
 * Termo de uso de dados (LGPD). Descreve só o que o app faz HOJE.
 * Ao mudar o que é coletado ou quem pode ver, atualize o texto E a VERSAO_TERMO.
 * TODO(equipe): preencher o contato do responsável pelo projeto antes de divulgar.
 */
function Secao({ titulo, children }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-extrabold text-rosa-800">{titulo}</h2>
      {children}
    </section>
  );
}

export default function PrivacidadePage() {
  return (
    <div className="lg:mx-auto lg:max-w-3xl">
      <PageHeader backHref="/" backLabel="Início" icon={ShieldCheck} title="Uso dos meus dados" />

      <div className="space-y-7">
        <Callout title="Resumo">
          Seus dados são seus. Guardamos as informações da sua gravidez só para você ver e
          acompanhar. Você pode apagar tudo quando quiser.
        </Callout>

        <Secao titulo="O que guardamos">
          <Checklist
            items={[
              "Seu nome, e-mail e, se você informar, telefone, data de nascimento e UBS.",
              "Os dados da sua gestação: data da última menstruação, data provável do parto e gestações anteriores.",
              "O que você anotar na caderneta: consultas (pressão, peso, batimentos do bebê), exames, vacinas e ultrassons.",
              "Os itens que você marcar nos checklists, como a mala da maternidade.",
            ]}
          />
        </Secao>

        <Secao titulo="Para que usamos">
          <Checklist
            items={[
              "Mostrar sua caderneta digital e calcular suas semanas de gravidez.",
              "Mostrar lembretes de vacinas, consultas e exames.",
            ]}
          />
          <p>
            Não vendemos seus dados, não mostramos propaganda e não usamos suas informações para
            nenhuma outra finalidade.
          </p>
        </Secao>

        <Secao titulo="Quem pode ver">
          <p>
            Só você, quando entra com o seu e-mail e a sua senha. Nesta versão, nem a equipe de
            saúde da UBS tem acesso aos seus dados pelo app. Se isso mudar no futuro, vamos pedir a
            sua autorização antes.
          </p>
        </Secao>

        <Secao titulo="Onde ficam guardados">
          <p>
            Em um banco de dados protegido do serviço Supabase, com acesso por senha e regras que
            impedem que uma usuária veja os dados de outra.
          </p>
        </Secao>

        <Secao titulo="Seus direitos (Lei Geral de Proteção de Dados — LGPD)">
          <Checklist
            items={[
              "Ver e corrigir seus dados a qualquer momento, na sua caderneta e em \"Minha conta\".",
              "Apagar sua conta e todos os seus dados, em \"Minha conta\". A exclusão é definitiva.",
              "Tirar dúvidas sobre o uso dos seus dados com a equipe do projeto.",
            ]}
          />
        </Secao>

        <Secao titulo="Importante">
          <p>
            O Meu Gestar é um projeto de extensão acadêmica, informativo, e{" "}
            <strong>não substitui a consulta</strong>. O que você anota no app não chega
            automaticamente à sua equipe de saúde: continue levando a sua Caderneta da Gestante em
            todas as consultas.
          </p>
        </Secao>

        <p className="text-sm text-texto-suave">Versão do termo: {VERSAO_TERMO}</p>
      </div>
    </div>
  );
}
