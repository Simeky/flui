"use client";

import { useSearchParams } from "next/navigation";

export function MensagemLogin() {
  const parametros = useSearchParams();
  const mensagem = parametros.get("mensagem");

  if (!mensagem) return null;

  return (
    <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/50 dark:text-green-400">
      {mensagem}
    </p>
  );
}
