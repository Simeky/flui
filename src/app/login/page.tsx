import { Suspense } from "react";
import { ModeloAutenticacao } from "@/frontend/components/templates/ModeloAutenticacao";
import { FormularioLogin } from "@/frontend/components/organisms/FormularioLogin";
import { MensagemLogin } from "@/frontend/components/molecules/MensagemLogin";

export default function PaginaLogin() {
  return (
    <ModeloAutenticacao
      titulo="Entrar"
      subtitulo="Acesse sua conta para continuar"
      linkAlternativo={{
        texto: "Não tem uma conta?",
        href: "/register",
        rotuloLink: "Cadastre-se",
      }}
    >
      <Suspense fallback={null}>
        <MensagemLogin />
      </Suspense>
      <FormularioLogin />
    </ModeloAutenticacao>
  );
}
