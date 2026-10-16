import { getPerfilAtual } from "@/lib/dal";
import AbasCaderneta from "@/components/caderneta/AbasCaderneta";

export default async function CadernetaLayout({ children }) {
  const perfil = await getPerfilAtual();
  return (
    <div className="lg:mx-auto lg:max-w-4xl">
      {perfil?.papel === "gestante" && <AbasCaderneta />}
      {children}
    </div>
  );
}
