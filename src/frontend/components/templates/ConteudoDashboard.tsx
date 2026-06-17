'use client';
import { Cabecalho } from '@/frontend/components/organisms/Cabecalho';
import { ResumoTarefas } from '@/frontend/components/organisms/ResumoTarefas';
import { QuadroTarefas } from '@/frontend/components/organisms/QuadroTarefas';

export function ConteudoDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Cabecalho />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Visão Geral</h1>

        <div className="grid gap-6">
          <ResumoTarefas />
        </div>

        <section className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Quadro de Tarefas</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Confira suas tarefas organizadas por status e acesse diretamente cada item.</p>
            </div>
          </div>
          <div className="mt-6">
            <QuadroTarefas />
          </div>
        </section>
      </main>
    </div>
  );
}
