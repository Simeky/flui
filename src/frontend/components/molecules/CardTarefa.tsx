import {
  CalendarDays,
  CheckCircle2,
  X,
} from 'lucide-react';
import Link from 'next/link';

import { Tarefa } from '@/backend/types/tarefa';

import { BarraProgresso } from '../atoms/BarraProgresso';
import { PrioridadeTarefaBadge } from '../atoms/PrioridadeTarefaBadge';
import { StatusTarefaBadge } from '../atoms/StatusTarefaBadge';

interface CardTarefaProps {
  tarefa: Tarefa;
  draggable?: boolean;
  onDragStart?: React.DragEventHandler<HTMLAnchorElement>;
  onDragEnd?: React.DragEventHandler<HTMLAnchorElement>;
  onRemoverDoQuadro?: (e: React.MouseEvent) => void;
}

export function CardTarefa({ tarefa, draggable, onDragStart, onDragEnd, onRemoverDoQuadro }: CardTarefaProps) {
  const totalSubtarefas = tarefa.subtarefas?.length || 0;
  const subtarefasConcluidas = tarefa.subtarefas?.filter(s => s.concluida).length || 0;
  const progresso = totalSubtarefas > 0 ? (subtarefasConcluidas / totalSubtarefas) * 100 : (tarefa.status === 'concluida' ? 100 : 0);

  return (
    <Link
      href={'/tarefas/' + tarefa.id}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="block relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-md transition-shadow"
    >
      {onRemoverDoQuadro && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemoverDoQuadro(e);
          }}
          className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 transition-colors bg-white dark:bg-zinc-900 rounded-full p-1"
          title="Remover do quadro"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="flex justify-between items-start mb-3 pr-6">
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
      
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2.5">
        
        <div className="flex items-center justify-between">
          <StatusTarefaBadge status={tarefa.status} />
          
          {totalSubtarefas > 0 && (
            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> 
              <span>{subtarefasConcluidas}/{totalSubtarefas}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 text-xs pt-0.5">
          
          {tarefa.dataVencimento && (
            <div className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
              <CalendarDays className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
              <span>Vencimento: {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <CalendarDays className="w-3.5 h-3.5 shrink-0 opacity-60" />
            <span>Criada em {tarefa.criadoEm.toLocaleDateString('pt-BR')}</span>
          </div>

        </div>

      </div>
    </Link>
  );
}