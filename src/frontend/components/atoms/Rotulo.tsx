import { type LabelHTMLAttributes } from "react";

interface RotuloProps extends LabelHTMLAttributes<HTMLLabelElement> {
  obrigatorio?: boolean;
}

export function Rotulo({
  obrigatorio = false,
  children,
  className = "",
  ...props
}: RotuloProps) {
  return (
    <label
      className={`mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300 ${className}`}
      {...props}
    >
      {children}
      {obrigatorio && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
