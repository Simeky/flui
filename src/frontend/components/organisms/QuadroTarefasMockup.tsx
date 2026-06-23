'use client';

import { GripVertical, X, Trash2 } from 'lucide-react';

interface TarefaMockup {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  responsavel?: string;
}

const tarefasPorStatus: Record<'pendente' | 'em_progresso' | 'concluida', TarefaMockup[]> = {
  pendente: [
    {
      id: '1',
      titulo: 'Redesenhar landing page',
      descricao: 'Melhorar visual e conversão',
      prioridade: 'alta',
      responsavel: 'Ana',
    },
    {
      id: '2',
      titulo: 'Integrar Firebase',
      descricao: 'Configurar autenticação',
      prioridade: 'alta',
      responsavel: 'Carlos',
    },
    {
      id: '3',
      titulo: 'Criar testes unitários',
      descricao: 'Cobertura de 80%',
      prioridade: 'media',
      responsavel: 'Marina',
    },
  ],
  em_progresso: [
    {
      id: '4',
      titulo: 'Otimizar performance',
      descricao: 'Reduzir tempo de carregamento',
      prioridade: 'media',
      responsavel: 'Alex',
    },
    {
      id: '5',
      titulo: 'Implementar modo escuro',
      descricao: 'Suporte completo a dark mode',
      prioridade: 'baixa',
      responsavel: 'Sofia',
    },
  ],
  concluida: [
    {
      id: '6',
      titulo: 'Setup inicial do projeto',
      descricao: 'Next.js + Tailwind',
      prioridade: 'alta',
      responsavel: 'Dev Team',
    },
    {
      id: '7',
      titulo: 'Configurar ESLint',
      descricao: 'Linting e formatação',
      prioridade: 'media',
      responsavel: 'Dev Team',
    },
  ],
};

const coresPropriedade = {
  alta: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  media: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  baixa: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

function CartaoMockup({ tarefa }: { tarefa: TarefaMockup }) {
  return (
    <div className="group rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 cursor-grab active:cursor-grabbing">
      <div className="mb-3 flex items-start justify-between">
        <GripVertical className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      </div>
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{tarefa.titulo}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{tarefa.descricao}</p>
      <div className="flex items-center justify-between">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${coresPropriedade[tarefa.prioridade]}`}>
          {tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}
        </span>
        {tarefa.responsavel && (
          <span className="inline-block px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            {tarefa.responsavel}
          </span>
        )}
      </div>
    </div>
  );
}

export function QuadroTarefasMockup() {
  const colunas = [
    { id: 'pendente', titulo: 'A Fazer', count: tarefasPorStatus.pendente.length },
    { id: 'em_progresso', titulo: 'Fazendo', count: tarefasPorStatus.em_progresso.length },
    { id: 'concluida', titulo: 'Concluídas', count: tarefasPorStatus.concluida.length },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Quadro Kanban</h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {Object.values(tarefasPorStatus).flat().length} tarefas no total
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {colunas.map((coluna) => (
          <div key={coluna.id} className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/30 overflow-hidden">
            {/* Cabeçalho da coluna */}
            <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
              <h3 className="font-semibold text-zinc-900 dark:text-white">{coluna.titulo}</h3>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {coluna.count}
              </span>
            </div>

            {/* Área de tarefas */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 min-h-96">
              {coluna.id === 'pendente' &&
                tarefasPorStatus.pendente.map((tarefa) => (
                  <CartaoMockup key={tarefa.id} tarefa={tarefa} />
                ))}
              {coluna.id === 'em_progresso' &&
                tarefasPorStatus.em_progresso.map((tarefa) => (
                  <CartaoMockup key={tarefa.id} tarefa={tarefa} />
                ))}
              {coluna.id === 'concluida' &&
                tarefasPorStatus.concluida.map((tarefa) => (
                  <CartaoMockup key={tarefa.id} tarefa={tarefa} />
                ))}
            </div>

            {/* Botão adicionar */}
            <button className="border-t border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-indigo-400">
              + Adicionar tarefa
            </button>
          </div>
        ))}
      </div>

      {/* Dica */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-300">
        💡 <strong>Dica:</strong> Arraste tarefas entre colunas para mudar seus status. Clique nos botões de ação para editar ou remover.
      </div>
    </div>
  );
}
