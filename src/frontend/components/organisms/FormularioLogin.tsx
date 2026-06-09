"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { Botao } from "@/frontend/components/atoms/Botao";
import { CampoFormulario } from "@/frontend/components/molecules/CampoFormulario";
import { BotaoOAuth } from "@/frontend/components/molecules/BotaoOAuth";
import {
  esquemaLogin,
  type DadosLogin,
} from "@/frontend/schemas/esquemasAutenticacao";
import {
  entrarComEmail,
  entrarComGoogle,
  entrarComGithub,
  traduzirErroFirebase,
} from "@/backend/services/servicoAutenticacao";

export function FormularioLogin() {
  const router = useRouter();
  const [erroGeral, setErroGeral] = useState("");
  const [carregandoOAuth, setCarregandoOAuth] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DadosLogin>({
    resolver: yupResolver(esquemaLogin),
  });

  async function aoEnviar(dados: DadosLogin) {
    setErroGeral("");
    try {
      await entrarComEmail(dados.email, dados.senha);
      router.push("/dashboard");
    } catch (erro) {
      if (erro instanceof FirebaseError) {
        setErroGeral(traduzirErroFirebase(erro.code));
      } else {
        setErroGeral("Ocorreu um erro ao entrar. Tente novamente.");
      }
    }
  }

  async function aoEntrarOAuth(
    metodo: "google" | "github",
  ) {
    setErroGeral("");
    setCarregandoOAuth(true);
    try {
      if (metodo === "google") {
        await entrarComGoogle();
      } else {
        await entrarComGithub();
      }
      router.push("/dashboard");
    } catch (erro) {
      if (erro instanceof FirebaseError) {
        setErroGeral(traduzirErroFirebase(erro.code));
      } else {
        setErroGeral("Ocorreu um erro ao entrar. Tente novamente.");
      }
    } finally {
      setCarregandoOAuth(false);
    }
  }

  const desabilitado = isSubmitting || carregandoOAuth;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(aoEnviar)} className="space-y-4">
        <CampoFormulario
          rotulo="E-mail"
          type="email"
          placeholder="seu@email.com"
          obrigatorio
          erro={errors.email?.message}
          {...register("email")}
        />
        <CampoFormulario
          rotulo="Senha"
          type="password"
          placeholder="••••••••"
          obrigatorio
          erro={errors.senha?.message}
          {...register("senha")}
        />

        {erroGeral && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {erroGeral}
          </p>
        )}

        <Botao type="submit" className="w-full" disabled={desabilitado}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Botao>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900">
            ou continue com
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <BotaoOAuth
          provedor="google"
          carregando={desabilitado}
          onClick={() => aoEntrarOAuth("google")}
        />
        <BotaoOAuth
          provedor="github"
          carregando={desabilitado}
          onClick={() => aoEntrarOAuth("github")}
        />
      </div>
    </div>
  );
}
