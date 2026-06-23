import { QuadroTarefas } from '@/frontend/components/organisms/QuadroTarefas';
import { Cabecalho } from '@/frontend/components/organisms/Cabecalho';

export default function PaginaTarefas() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Cabecalho />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Quadro de Tarefas</h1>
        <QuadroTarefas />
      </main>
    </div>
  );
}
