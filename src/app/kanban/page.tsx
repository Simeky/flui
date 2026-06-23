import { QuadroTarefas } from '@/frontend/components/organisms/QuadroTarefas';
import { QuadroTarefasMockup } from '@/frontend/components/organisms/QuadroTarefasMockup';
import { Cabecalho } from '@/frontend/components/organisms/Cabecalho';

export default function PaginaTarefas() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Cabecalho />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Quadro de Tarefas</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Organize suas tarefas em um quadro Kanban intuitivo</p>
        </div>
        <QuadroTarefasMockup />
      </main>
    </div>
  );
}
