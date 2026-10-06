"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, FlaskConical, ScanLine, Search } from "lucide-react";
import Expandable from "@/components/ui/Expandable";

// Remove acentos para "sifilis" achar "Sífilis".
function normalize(text) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Lista de exames com barra de busca ("Buscar exame..."). */
export default function ExamSearch({ items }) {
  const [query, setQuery] = useState("");
  const q = normalize(query.trim());
  const filtered = q
    ? items.filter((item) => normalize(`${item.name} ${item.text}`).includes(q))
    : items;

  return (
    <div className="space-y-3">
      <label className="relative block">
        <span className="sr-only">Buscar exame</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-texto-suave"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar exame..."
          className="min-h-12 w-full rounded-full border-2 border-borda bg-superficie py-2 pl-12 pr-4 placeholder:text-texto-suave focus:border-rosa-500 focus:outline-none"
        />
      </label>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "exame encontrado" : "exames encontrados"}
      </p>

      {filtered.length === 0 && (
        <p className="py-4 text-center text-texto-suave">
          Nenhum exame encontrado. Tente outra palavra.
        </p>
      )}

      {filtered.map((item) => (
        <Expandable
          key={item.name}
          icon={item.href ? ScanLine : FlaskConical}
          title={item.name}
        >
          <p>{item.text}</p>
          {item.href && (
            <Link
              href={item.href}
              className="mt-2 inline-flex min-h-12 items-center gap-1 font-bold text-rosa-700 hover:underline"
            >
              Saiba mais
              <ChevronRight aria-hidden="true" className="size-5" />
            </Link>
          )}
        </Expandable>
      ))}
    </div>
  );
}
