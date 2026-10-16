import { Great_Vibes, Nunito } from "next/font/google";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import BottomNav from "@/components/layout/BottomNav";
import ContadorAcessos from "@/components/layout/ContadorAcessos";
import { fontSizeScript } from "@/components/layout/FontSizeControl";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

// Caligrafia parecida com o "Gestar" da logo — só para a marca, nunca para textos de leitura.
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
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
  themeColor: "#fdf2ee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${greatVibes.variable} h-full antialiased`} suppressHydrationWarning>
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
        <main id="conteudo" className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 lg:max-w-6xl lg:px-8 lg:py-8">
          {children}
        </main>
        <AppFooter />
        <BottomNav />
        <ContadorAcessos />
      </body>
    </html>
  );
}
