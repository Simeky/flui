import { ModeloAutenticacao } from "@/frontend/components/templates/ModeloAutenticacao";
import { FormularioCadastro } from "@/frontend/components/organisms/FormularioCadastro";

export default function PaginaCadastro() {
  return (
    <ModeloAutenticacao
      titulo="Criar conta"
      subtitulo="Preencha os dados para começar a usar o Flui"
      linkAlternativo={{
        texto: "Já tem uma conta?",
        href: "/login",
        rotuloLink: "Entrar",
      }}
    >
      <FormularioCadastro />
    </ModeloAutenticacao>
  );
}
