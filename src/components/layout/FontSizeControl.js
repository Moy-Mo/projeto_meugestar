"use client";

import { useLayoutEffect } from "react";
import { AArrowUp } from "lucide-react";

export const FONT_STORAGE_KEY = "mg-fonte";
const SIZES = ["normal", "grande", "maior"];

// Executado no <head> antes da primeira pintura (ver layout.js).
export const fontSizeScript = `(function(){try{var f=localStorage.getItem("${FONT_STORAGE_KEY}");if(f&&f!=="normal")document.documentElement.setAttribute("data-fonte",f)}catch(e){}})()`;

function apply(size) {
  if (size === "normal") document.documentElement.removeAttribute("data-fonte");
  else document.documentElement.setAttribute("data-fonte", size);
}

/** Botão "A+": alterna entre 3 tamanhos de letra e lembra a escolha. */
export default function FontSizeControl() {
  // Reaplica após o remount do Strict Mode em desenvolvimento (no-op em produção).
  useLayoutEffect(() => {
    try {
      apply(localStorage.getItem(FONT_STORAGE_KEY) ?? "normal");
    } catch {}
  }, []);

  function cycle() {
    const current = document.documentElement.getAttribute("data-fonte") ?? "normal";
    const next = SIZES[(SIZES.indexOf(current) + 1) % SIZES.length];
    apply(next);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label="Aumentar o tamanho da letra"
      title="Aumentar o tamanho da letra"
      className="flex size-12 items-center justify-center rounded-full text-rosa-700 hover:bg-rosa-100"
    >
      <AArrowUp aria-hidden="true" className="size-7" />
    </button>
  );
}
