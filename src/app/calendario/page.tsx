import { Cabecalho } from '@/frontend/components/organisms/Cabecalho';
import { CalendarioTarefas } from '@/frontend/components/organisms/CalendarioTarefas';

export default function PaginaCalendario() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Cabecalho />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Calendário</h1>
        <CalendarioTarefas />
      </main>
    </div>
  );
}
