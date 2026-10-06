import { Nunito } from "next/font/google";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import { fontSizeScript } from "@/components/layout/FontSizeControl";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Meu Gestar — Pré-natal e Acompanhamento",
    template: "%s | Meu Gestar",
  },
  description:
    "Informações confiáveis e em linguagem simples sobre a gestação, o pré-natal, o parto e o bebê. Não substitui a consulta com a equipe de saúde.",
  applicationName: "Meu Gestar",
};

export const viewport = {
  themeColor: "#c42d63",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fontSizeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-full bg-rosa-600 px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <AppHeader />
        <main id="conteudo" className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
          {children}
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
