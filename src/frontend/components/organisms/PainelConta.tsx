"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { LogOut, Trash2, UserCircle } from "lucide-react";
import { Botao } from "@/frontend/components/atoms/Botao";
import { Entrada } from "@/frontend/components/atoms/Entrada";
import { Rotulo } from "@/frontend/components/atoms/Rotulo";
import { useAutenticacao } from "@/frontend/hooks/useAutenticacao";
import {
  excluirConta,
  obterProvedorPrincipal,
  traduzirErroFirebase,
} from "@/backend/services/servicoAutenticacao";

export function PainelConta() {
  const router = useRouter();
  const { usuario, carregando, sair } = useAutenticacao();
  const [modalAberto, setModalAberto] = useState(false);
  const [senha, setSenha] = useState("");
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");

  async function aoSair() {
    await sair();
    router.push("/login");
  }

  async function aoExcluirConta() {
    setErro("");
    setProcessando(true);

    try {
      await excluirConta(exigeSenha ? senha : undefined);
      setModalAberto(false);
      router.push("/?mensagem=Conta excluída com sucesso.");
    } catch (erroCapturado) {
      if (erroCapturado instanceof FirebaseError) {
        setErro(traduzirErroFirebase(erroCapturado.code));
      } else if (erroCapturado instanceof Error) {
        setErro(erroCapturado.message);
      } else {
        setErro("Não foi possível excluir a conta. Tente novamente.");
      }
    } finally {
      setProcessando(false);
    }
  }

  if (carregando) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-zinc-500">Carregando conta...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-zinc-500">Usuário não autenticado.</p>
      </div>
    );
  }

  const exigeSenha = obterProvedorPrincipal() === "email";

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <p className="text-sm font-medium text-indigo-600">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Em construção...
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Enquanto preparamos as funcionalidades, você já pode gerenciar sua
            conta abaixo.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-4">
            {usuario.fotoUrl ? (
              <Image
                src={usuario.fotoUrl}
                alt={usuario.nome || "Foto do usuário"}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                <UserCircle className="h-10 w-10 text-indigo-600" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Minha conta
              </h2>
              <p className="text-sm text-zinc-500">
                Informações do seu perfil no Flui
              </p>
            </div>
          </div>

          <dl className="space-y-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Nome
              </dt>
              <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                {usuario.nome || "Não informado"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                E-mail
              </dt>
              <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                {usuario.email}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                E-mail verificado
              </dt>
              <dd className="mt-1">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    usuario.emailVerificado
                      ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                  }`}
                >
                  {usuario.emailVerificado ? "Verificado" : "Pendente"}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Botao variante="contorno" onClick={aoSair}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Botao>
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/50 dark:bg-red-950/20">
          <h3 className="font-semibold text-red-700 dark:text-red-400">
            Zona de perigo
          </h3>
          <p className="mt-2 text-sm text-red-600/80 dark:text-red-400/80">
            Ao excluir sua conta, todos os dados associados serão removidos
            permanentemente. Esta ação não pode ser desfeita.
          </p>
          <Botao
            className="mt-4 bg-red-600 hover:bg-red-700 focus:ring-red-500"
            onClick={() => {
              setErro("");
              setSenha("");
              setModalAberto(true);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir conta
          </Botao>
        </section>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-excluir-conta"
          >
            <h2
              id="titulo-excluir-conta"
              className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Excluir conta permanentemente?
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {exigeSenha
                ? "Digite sua senha para confirmar a exclusão da conta."
                : "Confirme a exclusão. Pode ser necessário reautenticar com seu provedor de login."}
            </p>

            {exigeSenha && (
              <div className="mt-4">
                <Rotulo htmlFor="senha-exclusao" obrigatorio>
                  Senha
                </Rotulo>
                <Entrada
                  id="senha-exclusao"
                  type="password"
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  placeholder="••••••••"
                  erro={erro || undefined}
                />
              </div>
            )}

            {!exigeSenha && erro && (
              <p className="mt-4 text-sm text-red-500">{erro}</p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Botao
                variante="contorno"
                disabled={processando}
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </Botao>
              <Botao
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                disabled={processando || (exigeSenha && !senha)}
                onClick={aoExcluirConta}
              >
                {processando ? "Excluindo..." : "Confirmar exclusão"}
              </Botao>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
