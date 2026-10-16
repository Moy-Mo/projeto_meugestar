"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, ShieldPlus } from "lucide-react";
import { soDigitos } from "@/lib/documentos";

const normalizar = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Lista de pacientes da UBS com busca por nome, CPF ou Cartão SUS.
 * `pacientes`: [{ id, nome, cpfFormatado, cpf, cns, igTexto, dppTexto, altoRisco }]
 */
export default function ListaPacientes({ pacientes }) {
  const [busca, setBusca] = useState("");
  const termo = normalizar(busca.trim());
  const digitos = soDigitos(busca);
  const filtradas = pacientes.filter(
    (p) =>
      !termo ||
      normalizar(p.nome).includes(termo) ||
      (digitos.length >= 3 && (p.cpf?.includes(digitos) || p.cns?.includes(digitos))),
  );

  return (
    <div className="space-y-3">
      <label className="relative block">
        <span className="sr-only">Buscar paciente por nome, CPF ou Cartão SUS</span>
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-texto-suave" />
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, CPF ou Cartão SUS…"
          className="min-h-12 w-full rounded-full border-2 border-borda bg-superficie py-2 pl-12 pr-4 focus:border-rosa-500 focus:outline-none"
        />
      </label>
      <p className="sr-only" aria-live="polite">
        {filtradas.length} {filtradas.length === 1 ? "paciente encontrada" : "pacientes encontradas"}
      </p>

      {filtradas.length === 0 && <p className="py-4 text-center text-texto-suave">Nenhuma paciente encontrada.</p>}

      <ul className="grid gap-3 lg:grid-cols-2">
        {filtradas.map((p) => (
          <li key={p.id}>
            <Link
              href={`/ubs/gestante/${p.id}`}
              className="flex items-center gap-3 rounded-cartao border border-borda bg-superficie p-4 shadow-cartao hover:border-rosa-300 hover:bg-rosa-50"
            >
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-lg font-extrabold text-rosa-700"
              >
                {p.nome[0]?.toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 font-bold">
                  {p.nome}
                  {p.altoRisco && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-alerta-50 px-2 text-xs font-extrabold text-alerta-700">
                      <ShieldPlus aria-hidden="true" className="size-3.5" />
                      Alto risco
                    </span>
                  )}
                </span>
                <span className="block text-sm text-texto-suave">
                  {p.igTexto ?? "Sem DUM"} {p.dppTexto && `· DPP ${p.dppTexto}`}
                </span>
                <span className="block text-xs text-texto-suave">CPF {p.cpfFormatado || "—"}</span>
              </span>
              <ChevronRight aria-hidden="true" className="size-6 shrink-0 text-rosa-500" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
