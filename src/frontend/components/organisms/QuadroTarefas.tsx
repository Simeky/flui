'use client';
import React, {
  useEffect,
  useState,
} from 'react';

import { X } from 'lucide-react';

import {
  atualizarTarefa,
  buscarTarefasDoUsuario,
} from '@/backend/services/servicoTarefas';
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

  const [modalSelecaoAberto, setModalSelecaoAberto] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroPrioridade, setFiltroPrioridade] = useState('');

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
    { status: 'pendente', titulo: 'A Fazer' },
    { status: 'em_progresso', titulo: 'Fazendo' },
    { status: 'concluida', titulo: 'Concluídas' },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>, tarefaId: string) => {
    e.dataTransfer.setData('text/plain', tarefaId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTarefaId(tarefaId);
  };
  const handleDragEnd = () => { setDraggedTarefaId(null); setStatusDropAtivo(null); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = (_e: React.DragEvent<HTMLDivElement>, status: StatusTarefa) => setStatusDropAtivo(status);
  const handleDragLeave = () => setStatusDropAtivo(null);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, status: StatusTarefa) => {
    e.preventDefault();
    setStatusDropAtivo(null);
    const tarefaId = e.dataTransfer.getData('text/plain') || draggedTarefaId;
    if (!tarefaId) return;

    const tarefa = tarefas.find((t) => t.id === tarefaId);
    if (!tarefa || tarefa.status === status) return;

    setTarefas(tarefas.map((t) => t.id === tarefaId ? { ...t, status } : t));
    setDraggedTarefaId(null);

    try { await atualizarTarefa(tarefaId, { status }); } 
    catch (erro) { setTarefas(tarefas); setDraggedTarefaId(null); }
  };

  const handleRemoverDoQuadro = async (tarefaId: string) => {
    setTarefas(prev => prev.map(t => t.id === tarefaId ? { ...t, ocultoNoKanban: true } as Tarefa : t));
    try { await atualizarTarefa(tarefaId, { ocultoNoKanban: true } as any); } 
    catch (e) { console.error("Erro ao remover do quadro", e); }
  };

  const handleAdicionarAoQuadro = async (tarefaId: string) => {
    setTarefas(prev => prev.map(t => t.id === tarefaId ? { ...t, ocultoNoKanban: false } as Tarefa : t));
    try { await atualizarTarefa(tarefaId, { ocultoNoKanban: false } as any); } 
    catch (e) { console.error("Erro ao adicionar ao quadro", e); }
  };

  const tarefasNoQuadro = tarefas.filter(t => !(t as any).ocultoNoKanban);
  const tarefasForaDoQuadro = tarefas.filter(t => (t as any).ocultoNoKanban);

  const tarefasFiltradasModal = tarefasForaDoQuadro.filter(t => {
    const passaStatus = filtroStatus === '' || t.status === filtroStatus;
    const passaPrioridade = filtroPrioridade === '' || t.prioridade === filtroPrioridade;
    return passaStatus && passaPrioridade;
  });

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setModalSelecaoAberto(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
        >
          Tarefas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {colunas.map((coluna) => {
          const tarefasDaColuna = tarefasNoQuadro.filter(t => t.status === coluna.status);
          
          return (
            <div
              key={coluna.status}
              className={`rounded-xl p-4 min-h-[12rem] border-2 transition-colors ${statusDropAtivo === coluna.status ? 'border-indigo-500 bg-indigo-50 dark:bg-zinc-700/60' : 'border-transparent bg-zinc-100 dark:bg-zinc-800/50'}`}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, coluna.status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, coluna.status)}
            >
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 px-1 flex justify-between items-center">
                {coluna.titulo}
                <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm py-0.5 px-2.5 rounded-full">
                  {tarefasDaColuna.length}
                </span>
              </h2>
              <div className="flex flex-col gap-3">
                {tarefasDaColuna.map(tarefa => (
                  <CardTarefa
                    key={tarefa.id}
                    tarefa={tarefa}
                    draggable
                    onDragStart={(e) => handleDragStart(e, tarefa.id)}
                    onDragEnd={handleDragEnd}
                    onRemoverDoQuadro={() => handleRemoverDoQuadro(tarefa.id)}
                  />
                ))}
                {tarefasDaColuna.length === 0 && (
                  <div className="text-center py-8 text-sm text-zinc-400 dark:text-zinc-500 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl">
                    Nenhuma tarefa aqui
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {modalSelecaoAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Adicionar ao Quadro</h2>
              <button onClick={() => setModalSelecaoAberto(false)} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              <select 
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Todos os Status</option>
                <option value="pendente">A Fazer</option>
                <option value="em_progresso">Fazendo</option>
                <option value="concluida">Concluídas</option>
              </select>
              <select 
                value={filtroPrioridade}
                onChange={(e) => setFiltroPrioridade(e.target.value)}
                className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">Todas as Prioridades</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {tarefasFiltradasModal.length === 0 ? (
                <p className="text-center text-sm text-zinc-500 py-4">Nenhuma tarefa encontrada.</p>
              ) : (
                tarefasFiltradasModal.map(tarefa => (
                  <div key={tarefa.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">{tarefa.titulo}</p>
                      <div className="flex gap-2 mt-1">
                         <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">{tarefa.status.replace('_', ' ')}</span>
                         <span className="text-xs text-zinc-500 dark:text-zinc-400">• Prioridade {tarefa.prioridade}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAdicionarAoQuadro(tarefa.id)}
                      className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      Adicionar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}