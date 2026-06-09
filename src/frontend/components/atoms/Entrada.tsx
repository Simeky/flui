import { type InputHTMLAttributes, forwardRef } from "react";

interface EntradaProps extends InputHTMLAttributes<HTMLInputElement> {
  erro?: string;
}

export const Entrada = forwardRef<HTMLInputElement, EntradaProps>(
  function Entrada({ erro, className = "", ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          erro
            ? "border-red-500 focus:ring-red-500"
            : "border-zinc-300 dark:border-zinc-700"
        } ${className}`}
        {...props}
      />
    );
  },
);
