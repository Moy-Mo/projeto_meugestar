import Link from "next/link";
import { Heart } from "lucide-react";
import FontSizeControl from "./FontSizeControl";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-borda bg-fundo/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2">
        <Link
          href="/"
          className="flex min-h-12 items-center gap-2 rounded-full pr-2 text-xl font-extrabold text-rosa-700"
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-rosa-600 text-white"
          >
            <Heart className="size-5" fill="currentColor" />
          </span>
          Meu Gestar
        </Link>
        <FontSizeControl />
      </div>
    </header>
  );
}
