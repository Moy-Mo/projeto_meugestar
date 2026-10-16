"use client";

import { useId, useRef, useState } from "react";

/**
 * Abas acessíveis (padrão WAI-ARIA): setas ← → trocam de aba.
 * `tabs`: [{ label, content }] — o conteúdo já vem renderizado do servidor.
 */
export default function Tabs({ label, tabs }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const buttons = useRef([]);

  function onKeyDown(event) {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="mb-4 flex gap-1 rounded-full bg-rosa-100 p-1"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.label}
              ref={(el) => {
                buttons.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`min-h-12 flex-1 rounded-full px-2 text-sm font-bold transition-colors ${selected ? "bg-rosa-600 text-white shadow-cartao" : "text-rosa-800 hover:bg-rosa-200"}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
