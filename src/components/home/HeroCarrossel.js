"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const INTERVALO = 7000;

/**
 * Banner com slides (versão de telas grandes). Troca sozinho a cada 7 s, para
 * quando o mouse ou o foco estão nele, tem botão de pausar (WCAG 2.2.2) e não
 * troca sozinho para quem pediu "menos movimento".
 * `slides`: [{ id, rotulo, conteudo }] — o conteúdo já vem renderizado do servidor.
 */
export default function HeroCarrossel({ slides }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [emFoco, setEmFoco] = useState(false);

  useEffect(() => {
    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pausado || emFoco || menosMovimento) return;
    const timer = setInterval(() => setAtual((i) => (i + 1) % slides.length), INTERVALO);
    return () => clearInterval(timer);
  }, [pausado, emFoco, slides.length]);

  const ir = (i) => setAtual((i + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setEmFoco(true)}
      onMouseLeave={() => setEmFoco(false)}
      onFocus={() => setEmFoco(true)}
      onBlur={() => setEmFoco(false)}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-rosa-100 via-rosa-50 to-rosa-100"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} de ${slides.length}: ${slide.rotulo}`}
          hidden={i !== atual}
          className="animate-surgir"
        >
          {slide.conteudo}
        </div>
      ))}

      <button
        type="button"
        onClick={() => ir(atual - 1)}
        aria-label="Destaque anterior"
        className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-superficie/90 text-rosa-700 shadow-cartao hover:bg-superficie"
      >
        <ChevronLeft aria-hidden="true" className="size-6" />
      </button>
      <button
        type="button"
        onClick={() => ir(atual + 1)}
        aria-label="Próximo destaque"
        className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-superficie/90 text-rosa-700 shadow-cartao hover:bg-superficie"
      >
        <ChevronRight aria-hidden="true" className="size-6" />
      </button>

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => ir(i)}
            aria-label={`Ir para o destaque ${i + 1}: ${slide.rotulo}`}
            aria-current={i === atual ? "true" : undefined}
            className="flex size-6 items-center justify-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all ${i === atual ? "w-6 bg-rosa-600" : "w-2.5 bg-rosa-300"}`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-label={pausado ? "Continuar a troca automática" : "Pausar a troca automática"}
          className="ml-2 flex size-8 items-center justify-center rounded-full text-rosa-700 hover:bg-superficie/70"
        >
          {pausado ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
    </section>
  );
}
