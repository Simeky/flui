"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  observarAutenticacao,
  sair as sairServico,
} from "@/backend/services/servicoAutenticacao";
import type { Usuario } from "@/backend/types/usuario";

interface ContextoAutenticacaoValor {
  usuario: Usuario | null;
  carregando: boolean;
  sair: () => Promise<void>;
}

export const ContextoAutenticacao = createContext<ContextoAutenticacaoValor>({
  usuario: null,
  carregando: true,
  sair: async () => {},
});

export function ProvedorAutenticacao({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelar = observarAutenticacao((usuarioAtual) => {
      setUsuario(usuarioAtual);
      setCarregando(false);
    });

    return cancelar;
  }, []);

  async function sair() {
    await sairServico();
    setUsuario(null);
  }

  return (
    <ContextoAutenticacao.Provider value={{ usuario, carregando, sair }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
}

export function useContextoAutenticacao() {
  return useContext(ContextoAutenticacao);
}
