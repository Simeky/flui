import Link from 'next/link';
import { Tarefa } from '@/backend/types/tarefa';
import { StatusTarefaBadge } from '../atoms/StatusTarefaBadge';
import { PrioridadeTarefaBadge } from '../atoms/PrioridadeTarefaBadge';
import { BarraProgresso } from '../atoms/BarraProgresso';
import { CalendarDays, CheckCircle2 } from 'lucide-react';

interface CardTarefaProps {
  tarefa: Tarefa;
  draggable?: boolean;
  onDragStart?: React.DragEventHandler<HTMLAnchorElement>;
  onDragEnd?: React.DragEventHandler<HTMLAnchorElement>;
}

export function CardTarefa({ tarefa, draggable, onDragStart, onDragEnd }: CardTarefaProps) {
  const totalSubtarefas = tarefa.subtarefas?.length || 0;
  const subtarefasConcluidas = tarefa.subtarefas?.filter(s => s.concluida).length || 0;
  const progresso = totalSubtarefas > 0 ? (subtarefasConcluidas / totalSubtarefas) * 100 : (tarefa.status === 'concluida' ? 100 : 0);

  return (
    <Link
      href={'/tarefas/' + tarefa.id}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-1">{tarefa.titulo}</h3>
        <div className="flex gap-2 shrink-0 ml-2">
          <PrioridadeTarefaBadge prioridade={tarefa.prioridade} />
        </div>
      </div>
      
      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">{tarefa.descricao || 'Sem descrição'}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
          <span>Progresso</span>
          <span>{Math.round(progresso)}%</span>
        </div>
        <BarraProgresso progresso={progresso} />
      </div>
      
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <StatusTarefaBadge status={tarefa.status} />
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Criada em {tarefa.criadoEm.toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {totalSubtarefas > 0 && (
            <div className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {subtarefasConcluidas}/{totalSubtarefas}</div>
          )}
          {tarefa.dataVencimento && (
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Vencimento:</span>
              <span>{new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
