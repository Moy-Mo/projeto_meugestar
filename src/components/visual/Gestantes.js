import Image from "next/image";
import gestante1 from "@/assets/ilustracoes/gestante-1.webp";
import gestante2 from "@/assets/ilustracoes/gestante-2.webp";
import gestante3 from "@/assets/ilustracoes/gestante-3.webp";
import gestante4 from "@/assets/ilustracoes/gestante-4.webp";
import gestante5 from "@/assets/ilustracoes/gestante-5.webp";
import gestante6 from "@/assets/ilustracoes/gestante-6.webp";
import gestante7 from "@/assets/ilustracoes/gestante-7.webp";
import gestante8 from "@/assets/ilustracoes/gestante-8.webp";

/*
 * Ilustrações de gestantes diversas. São decorativas (alt=""): a informação da
 * página não depende delas. Não rotulamos etnia no app.
 */
export const gestantes = [
  gestante1,
  gestante2,
  gestante3,
  gestante4,
  gestante5,
  gestante6,
  gestante7,
  gestante8,
];

/**
 * Escolhe sempre a mesma gestante para a mesma página — sem sorteio, para o
 * servidor e o navegador mostrarem a mesma imagem.
 * `semente`: número (posição no rodízio) ou texto (ex.: slug, vira um número).
 */
export function escolherGestante(semente) {
  let n = semente;
  if (typeof semente === "string") {
    n = 0;
    for (const char of semente) n = (n * 31 + char.charCodeAt(0)) >>> 0;
  }
  return gestantes[n % gestantes.length];
}

/** Gestante dentro de uma moldura em arco (o formato dos cartões originais). */
export function GestanteArco({ semente, imagem, className = "", sizes = "128px", eager = false }) {
  const src = imagem ?? escolherGestante(semente);
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-arco)] bg-gradient-to-b from-rosa-100 to-rosa-50 shadow-cartao ring-4 ring-superficie ${className}`}
    >
      <Image
        src={src}
        alt=""
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

/**
 * Faixa com todas as gestantes passando devagar. Pausa ao passar o mouse ou
 * tocar, e vira uma faixa rolável para quem pede "menos movimento".
 */
export function DesfileGestantes() {
  return (
    <div aria-hidden="true" className="-mx-4 overflow-hidden motion-reduce:overflow-x-auto">
      {/* Margem em cada item (e não gap/padding) para -50% cair exatamente na 2ª cópia. */}
      <div className="flex w-max animate-desfile py-2 hover:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none">
        {[...gestantes, ...gestantes].map((src, index) => (
          <GestanteArco key={index} imagem={src} className="mr-3 h-44 w-24 shrink-0" sizes="96px" />
        ))}
      </div>
    </div>
  );
}
