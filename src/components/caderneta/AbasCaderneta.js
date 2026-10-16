"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const abas = [
  { href: "/caderneta", rotulo: "Resumo" },
  { href: "/caderneta/gestacao", rotulo: "Gestação" },
  { href: "/caderneta/consultas", rotulo: "Consultas" },
  { href: "/caderneta/exames", rotulo: "Exames" },
  { href: "/caderneta/vacinas", rotulo: "Vacinas" },
  { href: "/caderneta/ultrassons", rotulo: "Ultrassons" },
];

/** Abas da caderneta (guia: "quatro abas no alto"). Rola na horizontal no celular. */
export default function AbasCaderneta() {
  const caminho = usePathname();
  return (
    <nav aria-label="Seções da caderneta" className="-mx-4 mb-6 overflow-x-auto px-4 lg:mx-0 lg:px-0">
      <ul className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
        {abas.map((aba) => {
          const ativa = caminho === aba.href;
          return (
            <li key={aba.href}>
              <Link
                href={aba.href}
                aria-current={ativa ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 font-bold transition-colors ${ativa ? "bg-rosa-600 text-white" : "border-2 border-rosa-200 bg-superficie text-rosa-700 hover:bg-rosa-50"}`}
              >
                {aba.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
