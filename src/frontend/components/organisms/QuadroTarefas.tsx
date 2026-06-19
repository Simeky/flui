'use client';
import React, {
  useEffect,
  useState,
} from 'react';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { buscarTarefasDoUsuario, atualizarTarefa } from '@/backend/services/servicoTarefas';
import {
  StatusTarefa,
  Tarefa,
} from '@/backend/types/tarefa';
import { useAutenticacao } from '@/frontend/hooks/useAutenticacao';

import { CardTarefa } from '../molecules/CardTarefa';

export function QuadroTarefas() {
  const { usuario } = useAutenticacao();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [draggedTarefaId, setDraggedTarefaId] = useState<string | null>(null);
  const [statusDropAtivo, setStatusDropAtivo] = useState<StatusTarefa | null>(null);

  useEffect(() => {
    if (usuario) {
      buscarTarefasDoUsuario(usuario.uid).then(dados => {
        setTarefas(dados);
        setCarregando(false);
      });
    }
  }, [usuario]);

  if (carregando) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;

  const colunas: { status: StatusTarefa; titulo: string }[] = [
    { status: 'pendente', titulo: 'Pendentes' },
    { status: 'em_progresso', titulo: 'Em Progresso' },
    { status: 'concluida', titulo: 'Concluídas' },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>, tarefaId: string) => {
    e.dataTransfer.setData('text/plain', tarefaId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTarefaId(tarefaId);
  };

  const handleDragEnd = () => {
    setDraggedTarefaId(null);
    setStatusDropAtivo(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (_e: React.DragEvent<HTMLDivElement>, status: StatusTarefa) => {
    setStatusDropAtivo(status);
  };

  const handleDragLeave = () => {
    setStatusDropAtivo(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, status: StatusTarefa) => {
    e.preventDefault();
    setStatusDropAtivo(null);

    const tarefaId = e.dataTransfer.getData('text/plain') || draggedTarefaId;
    if (!tarefaId) return;

    const tarefa = tarefas.find((t) => t.id === tarefaId);
    if (!tarefa || tarefa.status === status) return;

    const tarefasAtualizadas = tarefas.map((t) =>
      t.id === tarefaId ? { ...t, status } : t
    );

    setTarefas(tarefasAtualizadas);
    setDraggedTarefaId(null);

    try {
      await atualizarTarefa(tarefaId, { status });
    } catch (erro) {
      setTarefas(tarefas);
      setDraggedTarefaId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Link href="/tarefas/nova" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" /> Nova Tarefa
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {colunas.map((coluna) => (
          <div
            key={coluna.status}
            className={`rounded-xl p-4 min-h-125 border-2 ${statusDropAtivo === coluna.status ? 'border-indigo-500 bg-indigo-50 dark:bg-zinc-700/60' : 'border-transparent bg-zinc-100 dark:bg-zinc-800/50'}`}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, coluna.status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, coluna.status)}
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 px-1 flex justify-between items-center">
              {coluna.titulo}
              <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm py-0.5 px-2.5 rounded-full">
                {tarefas.filter(t => t.status === coluna.status).length}
              </span>
            </h2>
            <div className="flex flex-col gap-3">
              {tarefas.filter(t => t.status === coluna.status).map(tarefa => (
                <CardTarefa
                  key={tarefa.id}
                  tarefa={tarefa}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tarefa.id)}
                  onDragEnd={handleDragEnd}
                />
              ))}
              {tarefas.filter(t => t.status === coluna.status).length === 0 && (
                <div className="text-center py-8 text-sm text-zinc-400 dark:text-zinc-500 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl">
                  Nenhuma tarefa aqui
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
