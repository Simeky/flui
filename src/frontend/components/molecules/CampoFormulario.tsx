import { type InputHTMLAttributes } from "react";
import { Entrada } from "@/frontend/components/atoms/Entrada";
import { Rotulo } from "@/frontend/components/atoms/Rotulo";

interface CampoFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
  rotulo: string;
  erro?: string;
  obrigatorio?: boolean;
}

export function CampoFormulario({
  rotulo,
  erro,
  obrigatorio = false,
  id,
  ...props
}: CampoFormularioProps) {
  const campoId = id ?? props.name;

  return (
    <div>
      <Rotulo htmlFor={campoId} obrigatorio={obrigatorio}>
        {rotulo}
      </Rotulo>
      <Entrada id={campoId} erro={erro} {...props} />
      {erro && <p className="mt-1 text-xs text-red-500">{erro}</p>}
    </div>
  );
}
