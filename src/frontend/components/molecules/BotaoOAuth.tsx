import { FaGithub, FaGoogle } from "react-icons/fa";
import { Botao } from "@/frontend/components/atoms/Botao";

interface BotaoOAuthProps {
  provedor: "google" | "github";
  carregando?: boolean;
  onClick: () => void;
}

const configProvedores = {
  google: {
    rotulo: "Continuar com Google",
    icone: <FaGoogle className="h-5 w-5 text-[#4285F4]" aria-hidden="true" />,
  },
  github: {
    rotulo: "Continuar com GitHub",
    icone: <FaGithub className="h-5 w-5" aria-hidden="true" />,
  },
};

export function BotaoOAuth({ provedor, carregando, onClick }: BotaoOAuthProps) {
  const config = configProvedores[provedor];

  return (
    <Botao
      type="button"
      variante="contorno"
      className="w-full gap-2 border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
      disabled={carregando}
      onClick={onClick}
    >
      {config.icone}
      {config.rotulo}
    </Botao>
  );
}
