import { CircleCheck, Heart, Info, TriangleAlert } from "lucide-react";

const variants = {
  // Aviso rosa acolhedor (ex.: "o ideal é a 1ª consulta até a 12ª semana").
  info: { box: "bg-rosa-50 border-rosa-200", icon: Heart, iconColor: "text-rosa-600" },
  // Atenção, sem urgência (ex.: "não se automedique").
  warning: { box: "bg-aviso-50 border-aviso-200 text-aviso-800", icon: Info, iconColor: "text-aviso-800" },
  // Urgência (ex.: sinais de alerta).
  danger: { box: "bg-alerta-50 border-alerta-200", icon: TriangleAlert, iconColor: "text-alerta-600" },
  success: { box: "bg-sucesso-50 border-sucesso-200", icon: CircleCheck, iconColor: "text-sucesso-700" },
};

/** Caixa de destaque. `role="alert"` só para conteúdo urgente que aparece dinamicamente. */
export default function Callout({ variant = "info", title, icon, children, className = "", ...props }) {
  const { box, icon: DefaultIcon, iconColor } = variants[variant];
  const Icon = icon ?? DefaultIcon;

  return (
    <div className={`flex gap-3 rounded-cartao border-2 p-4 ${box} ${className}`} {...props}>
      <Icon aria-hidden="true" className={`mt-0.5 size-6 shrink-0 ${iconColor}`} />
      <div className="min-w-0 flex-1">
        {title && <p className="font-bold">{title}</p>}
        <div className={title ? "mt-1" : ""}>{children}</div>
      </div>
    </div>
  );
}
