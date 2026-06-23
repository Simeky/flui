'use client';
import { useState } from 'react';

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
  GripHorizontal,
  LayoutDashboard,
  Plus,
} from 'lucide-react';

export function AreaMockup() {
  const [abaAtiva, setAbaAtiva] = useState<'dashboard' | 'calendario' | 'kanban'>('kanban');

  // Estado centralizado das tarefas
  const [tarefasFalsas, setTarefasFalsas] = useState([
    { id: 1, titulo: 'Preparação para reunião', status: 'pendente', prioridade: 'Baixa', data: 12 },
    { id: 2, titulo: 'Revisar propostas', status: 'em_progresso', prioridade: 'Média', data: 15 },
    { id: 3, titulo: 'Analisar dados', status: 'concluida', prioridade: 'Alta', data: 10 },
  ]);

  // Estados para o Drag and Drop
  const [draggedTarefaId, setDraggedTarefaId] = useState<number | null>(null);
  const [statusDropAtivo, setStatusDropAtivo] = useState<string | null>(null);

  // Manipuladores de Drag and Drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTarefaId(id);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDragEnter = (status: string) => setStatusDropAtivo(status);
  const handleDragLeave = () => setStatusDropAtivo(null);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    setStatusDropAtivo(null);
    const id = Number(e.dataTransfer.getData('text/plain')) || draggedTarefaId;
    if (!id) return;

    setTarefasFalsas(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    setDraggedTarefaId(null);
  };

  const qtdPendente = tarefasFalsas.filter(t => t.status === 'pendente').length;
  const qtdEmProgresso = tarefasFalsas.filter(t => t.status === 'em_progresso').length;
  const qtdConcluida = tarefasFalsas.filter(t => t.status === 'concluida').length;
  const totalTarefas = tarefasFalsas.length;

  // Matemática do Gráfico de Rosca (Donut Chart)
  const pctPendente = (qtdPendente / totalTarefas) * 100 || 0;
  const pctEmProgresso = (qtdEmProgresso / totalTarefas) * 100 || 0;
  
  const graficoRoscaBackground = `conic-gradient(
    #f59e0b 0% ${pctPendente}%, 
    #3b82f6 ${pctPendente}% ${pctPendente + pctEmProgresso}%, 
    #10b981 ${pctPendente + pctEmProgresso}% 100%
  )`;

  // Matemática do Gráfico de Barras
  const qtdBaixa = tarefasFalsas.filter(t => t.prioridade === 'Baixa').length;
  const qtdMedia = tarefasFalsas.filter(t => t.prioridade === 'Média').length;
  const qtdAlta = tarefasFalsas.filter(t => t.prioridade === 'Alta').length;
  const maiorQuantidade = Math.max(qtdBaixa, qtdMedia, qtdAlta, 1); // Evita divisão por zero

  return (
    <section id="demonstracao" className="px-4 py-16 sm:px-6 sm:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Veja uma prévia do Flui em ação
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Navegue pelo menu abaixo e <strong className="text-indigo-600 dark:text-indigo-400">arraste as tarefas</strong> para testar a interface!
          </p>
        </div>

        {/* MOLDURA DO NAVEGADOR */}
        <div className="relative mx-auto max-w-5xl rounded-xl border border-zinc-200/80 bg-white shadow-2xl shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden flex flex-col h-162.5 sm:h-150">
          
          {/* Barra Superior do Navegador */}
          <div className="flex shrink-0 items-center border-b border-zinc-200/80 bg-zinc-100/50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex gap-2 w-1/3">
              <div className="h-3 w-3 rounded-full bg-rose-400"></div>
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="flex w-1/3 items-center justify-center rounded-md bg-white/50 px-3 py-1 text-[11px] text-zinc-500 shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-950/50 dark:ring-zinc-800">
              flui-delta.vercel.app
            </div>
            <div className="w-1/3"></div>
          </div>

          {/* CABEÇALHO DO SISTEMA */}
          <header className="shrink-0 border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900 flex items-center justify-between">
            <div className="text-lg font-bold text-indigo-600 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" /> Flui
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              <button onClick={() => setAbaAtiva('dashboard')} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${abaAtiva === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400'}`}>
                <LayoutDashboard className="w-4 h-4"/> Dashboard
              </button>
              <button onClick={() => setAbaAtiva('calendario')} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${abaAtiva === 'calendario' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400'}`}>
                <Calendar className="w-4 h-4"/> Calendário
              </button>
              <button onClick={() => setAbaAtiva('kanban')} className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${abaAtiva === 'kanban' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400'}`}>
                <LayoutDashboard className="w-4 h-4"/> Kanban
              </button>
            </nav>
            <div className="flex items-center gap-3 pl-6 sm:border-l border-zinc-200 dark:border-zinc-700">
               <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs dark:bg-indigo-900/40 dark:text-indigo-400">US</div>
            </div>
          </header>

          {/* ÁREA DE CONTEÚDO */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-950">
            
            {/* ABA: KANBAN COM DRAG & DROP */}
            {abaAtiva === 'kanban' && (
              <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Quadro de Tarefas</h2>
                  <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2 cursor-default">
                    <Plus className="w-4 h-4"/> Tarefa
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'pendente', titulo: 'A Fazer' },
                    { id: 'em_progresso', titulo: 'Fazendo' },
                    { id: 'concluida', titulo: 'Concluídas' }
                  ].map(coluna => (
                    <div 
                      key={coluna.id} 
                      className={`rounded-xl border-2 transition-colors min-h-64 p-3 ${statusDropAtivo === coluna.id ? 'border-indigo-500 bg-indigo-50 dark:bg-zinc-800/80' : 'border-transparent bg-zinc-100 dark:bg-zinc-800/50'}`}
                      onDragOver={handleDragOver}
                      onDragEnter={() => handleDragEnter(coluna.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, coluna.id)}
                    >
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 flex justify-between items-center px-1 pointer-events-none">
                        {coluna.titulo}
                        <span className="bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs py-0.5 px-2 rounded-full">
                          {tarefasFalsas.filter(t => t.status === coluna.id).length}
                        </span>
                      </h3>
                      <div className="space-y-3">
                        {tarefasFalsas.filter(t => t.status === coluna.id).map(tarefa => (
                          <div 
                            key={tarefa.id} 
                            draggable
                            onDragStart={(e) => handleDragStart(e, tarefa.id)}
                            onDragEnd={() => setDraggedTarefaId(null)}
                            className={`group relative cursor-move rounded-xl border bg-white p-3 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:bg-zinc-900 ${draggedTarefaId === tarefa.id ? 'opacity-50 border-indigo-500' : 'border-zinc-200 dark:border-zinc-700'}`}
                          >
                            <GripHorizontal className="absolute right-3 top-3 h-4 w-4 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600 pointer-events-none" />
                            <p className={`text-sm font-semibold mb-3 pr-6 pointer-events-none ${tarefa.status === 'concluida' ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-white'}`}>{tarefa.titulo}</p>
                            <div className="flex gap-2 pointer-events-none">
                               {tarefa.status === 'em_progresso' && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full dark:bg-indigo-500/20 dark:text-indigo-300">Em Progresso</span>}
                               <span className={`text-[10px] px-2 py-0.5 rounded-full ${tarefa.prioridade === 'Alta' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'}`}>{tarefa.prioridade}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA: DASHBOARD DINÂMICO */}
            {abaAtiva === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Ativas (A Fazer/Fazendo)</p>
                      <span className="text-zinc-900 dark:text-white flex items-center gap-1 text-xs font-medium"><Clock className="w-3 h-3 text-blue-500"/> Em andamento</span>
                    </div>
                    <p className="text-3xl font-semibold text-zinc-900 dark:text-white">{qtdPendente + qtdEmProgresso}</p>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Concluídas</p>
                      <span className="text-zinc-900 dark:text-white flex items-center gap-1 text-xs font-medium"><CheckCircle2 className="w-3 h-3 text-emerald-500"/> Entregas</span>
                    </div>
                    <p className="text-3xl font-semibold text-zinc-900 dark:text-white">{qtdConcluida}</p>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Tarefas Vencidas</p>
                      <span className="text-zinc-900 dark:text-white flex items-center gap-1 text-xs font-medium"><AlertCircle className="w-3 h-3 text-red-500"/> Atrasos</span>
                    </div>
                    <p className="text-3xl font-semibold text-red-500">0</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Gráfico de Rosca Dinâmico */}
                  <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm flex flex-col h-64">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Distribuição de Status</h3>
                    <p className="text-xs text-zinc-500 mb-auto">Visão geral do progresso.</p>
                    <div 
                      className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mt-4 transition-all duration-700"
                      style={{ background: graficoRoscaBackground }}
                    >
                      {/* Círculo interno para dar o efeito de rosca */}
                      <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-zinc-500">Tarefas: {totalTarefas}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gráfico de Barras Dinâmico */}
                  <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm flex flex-col h-64">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Volume por Prioridade</h3>
                    <p className="text-xs text-zinc-500 mb-auto">Quantidade dividida por urgência.</p>
                    <div className="flex items-end gap-6 h-28 border-b border-zinc-200 dark:border-zinc-800 px-6 mt-4">
                       <div className="w-full bg-blue-500 rounded-t-sm transition-all duration-500" style={{ height: `${(qtdBaixa / maiorQuantidade) * 100}%` }}></div>
                       <div className="w-full bg-blue-500 rounded-t-sm transition-all duration-500" style={{ height: `${(qtdMedia / maiorQuantidade) * 100}%` }}></div>
                       <div className="w-full bg-blue-500 rounded-t-sm transition-all duration-500" style={{ height: `${(qtdAlta / maiorQuantidade) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-500 mt-2 px-6">
                      <span>Baixa ({qtdBaixa})</span>
                      <span>Média ({qtdMedia})</span>
                      <span>Alta ({qtdAlta})</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ABA: CALENDÁRIO */}
            {abaAtiva === 'calendario' && (
              <div className="h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Calendário de Tarefas</h2>
                    <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 cursor-default">
                      <ChevronLeft className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">Junho 2026</span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase text-zinc-500 mb-2">
                    <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 flex-1">
                    {Array.from({length: 14}).map((_, i) => {
                      const temTarefa = tarefasFalsas.some(t => t.data === i + 1);
                      return (
                        <div key={i} className={`rounded-2xl border p-2 text-left flex flex-col transition-colors ${temTarefa ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60' : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950'}`}>
                          <span className={`text-sm font-semibold ${temTarefa ? 'text-indigo-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>{i + 1}</span>
                          {temTarefa && (
                            <span className="mt-auto bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full inline-block text-center truncate">1 tarefa</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      <div className="absolute left-1/2 top-[40%] z-0 h-125 w-200 -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px] dark:bg-indigo-600/10 pointer-events-none"></div>
    </section>
  );
}