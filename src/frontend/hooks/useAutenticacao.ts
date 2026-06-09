import { useContextoAutenticacao } from "@/frontend/contexts/ContextoAutenticacao";

export function useAutenticacao() {
  return useContextoAutenticacao();
}
