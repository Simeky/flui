"use client";

import { Botao, type BotaoProps } from "@/frontend/components/atoms/Botao";
import { rolarParaElemento } from "@/frontend/utils/rolagemSuave";

interface BotaoRolagemSuaveProps extends Omit<BotaoProps, "onClick"> {
  destino: string;
}

export function BotaoRolagemSuave({
  destino,
  ...props
}: BotaoRolagemSuaveProps) {
  return (
    <Botao
      type="button"
      {...props}
      onClick={() => rolarParaElemento(destino)}
    />
  );
}
