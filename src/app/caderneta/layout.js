import { getUsuario } from "@/lib/dal";
import AbasCaderneta from "@/components/caderneta/AbasCaderneta";

export default async function CadernetaLayout({ children }) {
  const usuario = await getUsuario();
  return (
    <div className="lg:mx-auto lg:max-w-4xl">
      {usuario && <AbasCaderneta />}
      {children}
    </div>
  );
}
