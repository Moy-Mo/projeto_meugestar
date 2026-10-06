import Link from "next/link";

const variants = {
  primary: "bg-rosa-600 text-white hover:bg-rosa-700 active:bg-rosa-800",
  secondary:
    "bg-superficie text-rosa-700 border-2 border-rosa-300 hover:bg-rosa-50 active:bg-rosa-100",
  ghost: "text-rosa-700 hover:bg-rosa-50 active:bg-rosa-100",
  danger: "bg-alerta-600 text-white hover:bg-alerta-700",
};

const sizes = {
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-lg",
};

/**
 * Botão padrão. Com `href` vira link; `external` abre em nova aba.
 * Altura mínima de 48px (área de toque confortável no celular).
 */
export default function Button({
  href,
  external = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
