"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, House, NotebookPen, Siren } from "lucide-react";

const ALERTA = "/pre-natal/sinais-de-alerta";
const CADERNETA = "/pre-natal/minha-caderneta";

const items = [
  { href: "/", label: "Início", icon: House, match: (p) => p === "/" },
  {
    href: "/pre-natal",
    label: "Pré-natal",
    icon: HeartPulse,
    match: (p) => p.startsWith("/pre-natal") && p !== ALERTA && p !== CADERNETA,
  },
  { href: ALERTA, label: "Alerta", icon: Siren, match: (p) => p === ALERTA, danger: true },
  { href: CADERNETA, label: "Caderneta", icon: NotebookPen, match: (p) => p === CADERNETA },
];

/** Barra de navegação fixa no rodapé da tela (padrão de app no celular). */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-borda bg-superficie/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto flex max-w-2xl">
        {items.map(({ href, label, icon: Icon, match, danger }) => {
          const active = match(pathname);
          const color = danger
            ? "text-alerta-600"
            : active
              ? "text-rosa-700"
              : "text-texto-suave";
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-bold ${color} hover:bg-rosa-50`}
              >
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full ${active ? (danger ? "bg-alerta-50" : "bg-rosa-100") : ""}`}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
