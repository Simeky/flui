import { type ButtonHTMLAttributes } from "react";

export interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "contorno";
  tamanho?: "sm" | "md" | "lg";
}

const variantes = {
  primario:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secundario:
    "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500",
  contorno:
    "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 focus:ring-indigo-500",
};

const tamanhos = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Botao({
  variante = "primario",
  tamanho = "md",
  className = "",
  children,
  ...props
}: BotaoProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantes[variante]} ${tamanhos[tamanho]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
