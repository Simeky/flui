'use client';
import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import {
  LogOut,
  Trash2,
  User,
  UserCircle,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  excluirConta,
  obterProvedorPrincipal,
  traduzirErroFirebase,
} from '@/backend/services/servicoAutenticacao';
import { Botao } from '@/frontend/components/atoms/Botao';
import { Entrada } from '@/frontend/components/atoms/Entrada';
import { Rotulo } from '@/frontend/components/atoms/Rotulo';
import { useAutenticacao } from '@/frontend/hooks/useAutenticacao';

export function PainelConta() {
  const router = useRouter();
  const { usuario, carregando, sair } = useAutenticacao();
  const [modalContaAberto, setModalContaAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [senha, setSenha] = useState('');
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState('');

  async function aoSair() {
    await sair();
    router.push('/login');
  }

  async function aoExcluirConta() {
    setErro('');
    setProcessando(true);
    try {
      await excluirConta(exigeSenha ? senha : undefined);
      setModalExcluirAberto(false);
      setModalContaAberto(false);
      router.push('/?mensagem=Conta excluída com sucesso.');
    } catch (erroCapturado) {
      if (erroCapturado instanceof FirebaseError) {
        setErro(traduzirErroFirebase(erroCapturado.code));
      } else if (erroCapturado instanceof Error) {
        setErro(erroCapturado.message);
      } else {
        setErro('Não foi possível excluir a conta. Tente novamente.');
      }
    } finally {
      setProcessando(false);
    }
  }

  if (carregando || !usuario) {
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        <User className="h-5 w-5 text-zinc-500" />
      </button>
    );
  }

  const exigeSenha = obterProvedorPrincipal() === 'email';

  return (
    <>
      <button 
        onClick={() => setModalContaAberto(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 overflow-hidden transition-colors"
      >
        {usuario.fotoUrl ? (
          <Image src={usuario.fotoUrl} alt={usuario.nome || 'Conta'} width={36} height={36} className="h-full w-full object-cover" unoptimized />
        ) : (
          <User className="h-5 w-5" />
        )}
      </button>

      {modalContaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 relative" role="dialog">
            <button onClick={() => setModalContaAberto(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 flex items-center gap-4 mt-2">
              {usuario.fotoUrl ? (
                <Image src={usuario.fotoUrl} alt={usuario.nome || 'Foto'} width={64} height={64} className="h-16 w-16 rounded-full object-cover" unoptimized />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                  <UserCircle className="h-10 w-10 text-indigo-600" />
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Minha conta</h2>
                <p className="text-sm text-zinc-500">Informações do seu perfil</p>
              </div>
            </div>

            <dl className="space-y-4 mb-6">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Nome</dt>
                <dd className="mt-1 text-zinc-900 dark:text-zinc-100">{usuario.nome || 'Não informado'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">E-mail</dt>
                <dd className="mt-1 text-zinc-900 dark:text-zinc-100">{usuario.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Status</dt>
                <dd className="mt-1">
                  <span className={usuario.emailVerificado ? "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400" : "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"}>
                    {usuario.emailVerificado ? 'E-mail verificado' : 'Pendente'}
                  </span>
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3 mb-6">
              <Botao variante="contorno" onClick={aoSair} className="flex-1">
                <LogOut className="mr-2 h-4 w-4" /> Sair da conta
              </Botao>
            </div>

            <div className="pt-4 border-t border-red-100 dark:border-red-900/30">
              <button className="w-full text-sm flex items-center justify-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 py-2 transition-colors" onClick={() => { setErro(''); setSenha(''); setModalExcluirAberto(true); }}>
                <Trash2 className="h-4 w-4" /> Excluir conta permanentemente
              </button>
            </div>
          </div>
        </div>
      )}

      {modalExcluirAberto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900" role="dialog">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 className="h-5 w-5" /> Excluir conta?
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Esta ação é irreversível. Todos os seus dados, tarefas e informações serão apagados.
              <br/><br/>
              {exigeSenha ? 'Digite sua senha para confirmar a exclusão.' : 'Confirme a exclusão. Pode ser necessário reautenticar.'}
            </p>

            {exigeSenha && (
              <div className="mt-4">
                <Rotulo htmlFor="senha-exclusao" obrigatorio>Senha atual</Rotulo>
                <Entrada id="senha-exclusao" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" erro={erro || undefined} />
              </div>
            )}

            {!exigeSenha && erro && <p className="mt-4 text-sm text-red-500">{erro}</p>}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Botao variante="contorno" disabled={processando} onClick={() => setModalExcluirAberto(false)}>Cancelar</Botao>
              <Botao className="bg-red-600 hover:bg-red-700 focus:ring-red-500" disabled={processando || (exigeSenha && !senha)} onClick={aoExcluirConta}>
                {processando ? 'Excluindo...' : 'Confirmar exclusão'}
              </Botao>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
