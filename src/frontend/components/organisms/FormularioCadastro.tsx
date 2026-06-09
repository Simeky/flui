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
  esquemaCadastro,
  type DadosCadastro,
} from "@/frontend/schemas/esquemasAutenticacao";
import {
  cadastrarComEmail,
  entrarComGoogle,
  entrarComGithub,
  traduzirErroFirebase,
} from "@/backend/services/servicoAutenticacao";

export function FormularioCadastro() {
  const router = useRouter();
  const [erroGeral, setErroGeral] = useState("");
  const [carregandoOAuth, setCarregandoOAuth] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DadosCadastro>({
    resolver: yupResolver(esquemaCadastro),
  });

  async function aoEnviar(dados: DadosCadastro) {
    setErroGeral("");
    try {
      await cadastrarComEmail(dados.nome, dados.email, dados.senha);
      router.push(
        "/login?mensagem=Verifique seu e-mail para ativar a conta.",
      );
    } catch (erro) {
      if (erro instanceof FirebaseError) {
        setErroGeral(traduzirErroFirebase(erro.code));
      } else {
        setErroGeral("Ocorreu um erro ao cadastrar. Tente novamente.");
      }
    }
  }

  async function aoCadastrarOAuth(metodo: "google" | "github") {
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
        setErroGeral("Ocorreu um erro ao cadastrar. Tente novamente.");
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
          rotulo="Nome"
          type="text"
          placeholder="Seu nome completo"
          obrigatorio
          erro={errors.nome?.message}
          {...register("nome")}
        />
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
        <CampoFormulario
          rotulo="Confirmar senha"
          type="password"
          placeholder="••••••••"
          obrigatorio
          erro={errors.confirmarSenha?.message}
          {...register("confirmarSenha")}
        />

        {erroGeral && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {erroGeral}
          </p>
        )}

        <Botao type="submit" className="w-full" disabled={desabilitado}>
          {isSubmitting ? "Cadastrando..." : "Criar conta"}
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
          onClick={() => aoCadastrarOAuth("google")}
        />
        <BotaoOAuth
          provedor="github"
          carregando={desabilitado}
          onClick={() => aoCadastrarOAuth("github")}
        />
      </div>
    </div>
  );
}
