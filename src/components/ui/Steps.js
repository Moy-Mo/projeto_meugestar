/**
 * Passos numerados, um embaixo do outro (ex.: "Descobri que estou grávida").
 * `steps`: [{ title, content }]
 */
export default function Steps({ steps }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rosa-600 text-lg font-extrabold text-white"
          >
            {index + 1}
          </span>
          <div className="min-w-0 flex-1 rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
            <p className="font-bold">
              <span className="sr-only">Passo {index + 1}: </span>
              {step.title}
            </p>
            {step.content && <div className="mt-2">{step.content}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
