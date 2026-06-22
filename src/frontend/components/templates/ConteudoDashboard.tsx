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
      </main>
    </div>
  );
}
