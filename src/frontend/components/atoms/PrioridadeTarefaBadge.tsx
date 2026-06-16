import React from 'react';
import { PrioridadeTarefa } from '@/backend/types/tarefa';

export function PrioridadeTarefaBadge({ prioridade }: { prioridade: PrioridadeTarefa }) {
  const config = {
    baixa: { color: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300', label: 'Baixa' },
    media: { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500', label: 'Média' },
    alta: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500', label: 'Alta' }
  };
  const { color, label } = config[prioridade];
  return <span className={'px-2 py-1 text-xs font-medium rounded-md ' + color}>{label}</span>;
}
