import React from 'react';
import { StatusTarefa } from '@/backend/types/tarefa';

export function StatusTarefaBadge({ status }: { status: StatusTarefa }) {
  const config = {
    pendente: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500', label: 'Pendente' },
    em_progresso: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500', label: 'Em Progresso' },
    concluida: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500', label: 'Concluída' }
  };
  const { color, label } = config[status];
  return <span className={'px-2 py-1 text-xs font-medium rounded-full ' + color}>{label}</span>;
}
