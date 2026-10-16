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
              "Seus dados de identificação: nome, CPF, número do Cartão SUS, data de nascimento, telefone e e-mail. A UBS e a foto são opcionais.",
              "Os dados da sua gestação: data da última menstruação, data provável do parto e gestações anteriores.",
              "O que você anotar na caderneta: consultas (pressão, peso, batimentos do bebê), exames, vacinas e ultrassons.",
              "Os itens que você marcar nos checklists, como a mala da maternidade.",
            ]}
          />
        </Secao>

        <Secao titulo="Para que usamos">
          <Checklist
            items={[
              "Identificar você com segurança e evitar que a mesma pessoa tenha duas contas (CPF e Cartão SUS). Se você autorizar sua UBS, a equipe usa esses números para encontrar seu cadastro.",
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
          <Checklist
            items={[
              "Você, quando entra com o seu e-mail e a sua senha.",
              "A equipe da sua UBS — só se você autorizar, em \"Minha conta\". São profissionais de saúde aprovados pela administração do Meu Gestar, que podem ver sua caderneta e registrar consultas, exames e vacinas. Você vê quem abriu sua caderneta e pode retirar a autorização quando quiser.",
              "Familiares e acompanhantes que você convidar — veem só um resumo: semanas, data provável do parto, consultas e lembretes. Não veem exames, documentos nem anotações. Você pode tirar o acesso quando quiser.",
            ]}
          />
          <p>
            A administração do Meu Gestar cadastra as UBS e aprova os profissionais, mas não vê os
            dados de saúde das gestantes. O app conta quantas vezes cada página foi aberta, sem
            guardar quem abriu.
          </p>
        </Secao>

        <Secao titulo="Sua foto">
          <p>
            A foto é opcional e só aparece para você. Antes de guardar, o app diminui a foto e apaga
            as informações escondidas nela, como o lugar onde foi tirada.
          </p>
        </Secao>

        <Secao titulo="Google Agenda">
          <p>
            Se você tocar em &quot;Adicionar ao Google Agenda&quot;, o nome da consulta, a data, o
            horário e o nome da sua UBS vão para o Google, para criar o lembrete na sua agenda.
            Nada é enviado se você não tocar no botão.
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
