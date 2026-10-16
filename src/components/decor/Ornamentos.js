/*
 * Enfeites em SVG inspirados na logo: galho com folhas, flor, coração e o
 * divisor com coração. Todos são decorativos (aria-hidden) e usam currentColor,
 * então a cor vem da classe de texto (ex.: "text-rosa-300").
 */

// Folha com nervura central; desenhada deitada, com a base em (0,0).
const FOLHA = "M0 0 C9 -11 27 -13 42 -3 C28 7 10 8 0 0Z";

function Folha({ x, y, angulo, escala = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angulo}) scale(${escala})`}>
      <path d={FOLHA} fill="currentColor" />
      <path d="M2 -0.5 C14 -4 26 -5 38 -3" fill="none" stroke="var(--color-fundo)" strokeWidth="1" opacity="0.55" />
    </g>
  );
}

/** Galho curvo com folhas alternadas, como o da logo. */
export function Galho({ className = "" }) {
  return (
    <svg viewBox="0 0 120 220" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M58 216 C50 170 46 120 60 70 C66 48 72 30 70 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Folha x={54} y={186} angulo={-160} escala={1.15} />
      <Folha x={52} y={160} angulo={-25} escala={1.1} />
      <Folha x={52} y={128} angulo={-165} escala={1} />
      <Folha x={56} y={98} angulo={-30} escala={0.95} />
      <Folha x={62} y={70} angulo={-170} escala={0.85} />
      <Folha x={67} y={44} angulo={-40} escala={0.75} />
      <Folha x={70} y={18} angulo={-110} escala={0.6} />
    </svg>
  );
}

/** Flor simples de cinco pétalas. */
export function Flor({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      {[0, 72, 144, 216, 288].map((angulo) => (
        <ellipse
          key={angulo}
          cx="20"
          cy="10.5"
          rx="6.5"
          ry="9.5"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${angulo} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="5" fill="var(--color-fundo)" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

/** Coração. `contorno` desenha só a linha, como o da logo. */
export function Coracao({ className = "", contorno = false }) {
  return (
    <svg viewBox="0 0 24 22" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M12 20 C5.5 14.8 1.5 11 1.5 6.8 A5 5 0 0 1 12 4.6 A5 5 0 0 1 22.5 6.8 C22.5 11 18.5 14.8 12 20Z"
        fill={contorno ? "none" : "currentColor"}
        stroke={contorno ? "currentColor" : "none"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Linha com um coração no meio — como o traço embaixo de "Gestar" na logo. */
export function DivisorCoracao({ className = "" }) {
  return (
    <svg viewBox="0 0 220 28" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M4 16 C40 18 70 8 98 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M216 16 C180 18 150 8 122 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M110 25 C103 19.5 99 16 99 11.8 A5 5 0 0 1 110 9.6 A5 5 0 0 1 121 11.8 C121 16 117 19.5 110 25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Enfeites para o fundo de um cabeçalho (galho, flor e coração flutuando), todos
 * na faixa da direita — o título reserva esse espaço com `pr-16`, para nada
 * ficar por cima do texto. O elemento pai precisa de `relative overflow-hidden`.
 */
export function EnfeitesCabecalho() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-20">
      <Galho className="absolute -right-4 -top-4 h-36 rotate-[18deg] text-rosa-300/70" />
      <Flor className="absolute bottom-2 right-2 size-6 animate-flutuar text-rosa-300" />
      <Coracao
        contorno
        className="absolute right-12 top-3 size-4 animate-flutuar text-rosa-400/80 [animation-delay:1.5s]"
      />
    </div>
  );
}
