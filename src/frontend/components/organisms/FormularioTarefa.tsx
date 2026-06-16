'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAutenticacao } from '@/frontend/hooks/useAutenticacao';
import { Tarefa, StatusTarefa, PrioridadeTarefa, Subtarefa, Comentario } from '@/backend/types/tarefa';
import { buscarTarefaPorId, criarTarefa, atualizarTarefa, excluirTarefa } from '@/backend/services/servicoTarefas';
import { ArrowLeft, Plus, Trash2, Check, X } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export function FormularioTarefa({ id }: { id: string }) {
  const { usuario } = useAutenticacao();
  const router = useRouter();
  const isNova = id === 'nova';
  
  const [carregando, setCarregando] = useState(!isNova);
  const [salvando, setSalvando] = useState(false);
  
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<StatusTarefa>('pendente');
  const [prioridade, setPrioridade] = useState<PrioridadeTarefa>('media');
  const [dataVencimento, setDataVencimento] = useState('');
  
  const [subtarefas, setSubtarefas] = useState<Subtarefa[]>([]);
  const [novaSubtarefa, setNovaSubtarefa] = useState('');
  
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState('');

  useEffect(() => {
    if (!isNova) {
      buscarTarefaPorId(id).then(t => {
        if (t) {
          setTitulo(t.titulo);
          setDescricao(t.descricao || '');
          setStatus(t.status);
          setPrioridade(t.prioridade);
          if (t.dataVencimento) {
            setDataVencimento(t.dataVencimento.toISOString().split('T')[0]);
          }
          setSubtarefas(t.subtarefas || []);
          setComentarios(t.comentarios || []);
        }
        setCarregando(false);
      });
    }
  }, [id, isNova]);

  const mostrarToast = (titulo: string, icon: 'success' | 'error') => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      title: titulo,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;
    
    setSalvando(true);
    try {
      const dados = {
        usuarioId: usuario.uid,
        titulo,
        descricao,
        status,
        prioridade,
        dataVencimento: dataVencimento ? new Date(dataVencimento) : undefined,
        subtarefas,
        comentarios,
      };

      if (isNova) {
        await criarTarefa(dados);
        mostrarToast('Tarefa criada com sucesso!', 'success');
        router.push('/tarefas');
      } else {
        await atualizarTarefa(id, dados);
        mostrarToast('Tarefa atualizada com sucesso!', 'success');
        router.push('/tarefas');
      }
    } catch (error) {
      mostrarToast('Erro ao salvar tarefa', 'error');
    } finally {
      setSalvando(false);
    }
  };

  const deletar = async () => {
    if (isNova) return;
    
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await excluirTarefa(id);
        mostrarToast('Tarefa excluída!', 'success');
        router.push('/tarefas');
      } catch (error) {
        mostrarToast('Erro ao excluir tarefa', 'error');
      }
    }
  };
  const adicionarSubtarefa = () => {
    if (!novaSubtarefa.trim()) return;
    setSubtarefas([...subtarefas, { id: Date.now().toString(), titulo: novaSubtarefa, concluida: false }]);
    setNovaSubtarefa('');
  };

  const alternarSubtarefa = (subId: string) => {
    setSubtarefas(subtarefas.map(s => s.id === subId ? { ...s, concluida: !s.concluida } : s));
  };

  const removerSubtarefa = (subId: string) => {
    setSubtarefas(subtarefas.filter(s => s.id !== subId));
  };

  const adicionarComentario = () => {
    if (!novoComentario.trim()) return;
    setComentarios([...comentarios, { id: Date.now().toString(), texto: novoComentario, criadoEm: new Date() }]);
    setNovoComentario('');
  };

  if (carregando) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/tarefas" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        {!isNova && (
          <button type="button" onClick={deletar} className="text-red-500 hover:text-red-600 flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Excluir
          </button>
        )}
      </div>

      <form onSubmit={salvar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Título</label>
          <input required type="text" value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Descrição</label>
          <textarea rows={3} value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as StatusTarefa)} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option value="pendente">Pendente</option>
              <option value="em_progresso">Em Progresso</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Prioridade</label>
            <select value={prioridade} onChange={e => setPrioridade(e.target.value as PrioridadeTarefa)} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Data de Vencimento</label>
            <input type="date" value={dataVencimento} onChange={e => setDataVencimento(e.target.value)} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">Subtarefas</h3>
          <div className="space-y-3 mb-4">
            {subtarefas.map(sub => (
              <div key={sub.id} className="flex items-center gap-3">
                <input type="checkbox" checked={sub.concluida} onChange={() => alternarSubtarefa(sub.id)} className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600" />
                <span className={sub.concluida ? 'flex-1 line-through text-zinc-400' : 'flex-1 text-zinc-700 dark:text-zinc-300'}>{sub.titulo}</span>
                <button type="button" onClick={() => removerSubtarefa(sub.id)} className="text-zinc-400 hover:text-red-500"><X className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={novaSubtarefa} onChange={e => setNovaSubtarefa(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), adicionarSubtarefa())} placeholder="Nova subtarefa..." className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            <button type="button" onClick={adicionarSubtarefa} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center gap-2"><Plus className="w-5 h-5" /> Adicionar</button>
          </div>
        </div>

        {!isNova && (
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">Log de Trabalho / Comentários</h3>
            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
              {comentarios.map(c => (
                <div key={c.id} className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.texto}</p>
                  <span className="text-xs text-zinc-500 mt-2 block">{new Date(c.criadoEm).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={novoComentario} onChange={e => setNovoComentario(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), adicionarComentario())} placeholder="Adicionar comentário..." className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              <button type="button" onClick={adicionarComentario} className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center gap-2"><Plus className="w-5 h-5" /> Comentar</button>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button type="submit" disabled={salvando} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2">
            {salvando && <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>}
            {isNova ? 'Criar Tarefa' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
