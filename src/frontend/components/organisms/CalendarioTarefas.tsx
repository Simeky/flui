'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { buscarTarefasDoUsuario } from '@/backend/services/servicoTarefas';
import { Tarefa } from '@/backend/types/tarefa';
import { useAutenticacao } from '@/frontend/hooks/useAutenticacao';

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CalendarioTarefas() {
  const { usuario } = useAutenticacao();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [dataSelecionada, setDataSelecionada] = useState(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()));

  useEffect(() => {
    if (usuario) {
      buscarTarefasDoUsuario(usuario.uid).then((dados) => {
        setTarefas(dados);
        setCarregando(false);
      });
    }
  }, [usuario]);

  const tarefasPorData = useMemo(() => {
    return tarefas.reduce<Record<string, Tarefa[]>>((acumulador, tarefa) => {
      const key = tarefa.criadoEm.toISOString().slice(0, 10);
      acumulador[key] = acumulador[key] ? [...acumulador[key], tarefa] : [tarefa];
      return acumulador;
    }, {});
  }, [tarefas]);

  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();
  const diaInicial = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const dias: Array<number | null> = [
    ...Array.from({ length: diaInicial }, () => null),
    ...Array.from({ length: totalDias }, (_, index) => index + 1),
  ];

  const mudarMes = (offset: number) => {
    const novoMes = new Date(ano, mes + offset, 1);
    setMesAtual(novoMes);
    setDataSelecionada(new Date(novoMes.getFullYear(), novoMes.getMonth(), 1));
  };

  const diaSelecionadoKey = dataSelecionada.toISOString().slice(0, 10);
  const tarefasDoDia = tarefasPorData[diaSelecionadoKey] || [];
  const labelMes = mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Calendário de Tarefas</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Veja as tarefas criadas por dia e clique para abrir o detalhe.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 py-2">
          <button
            type="button"
            onClick={() => mudarMes(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">{labelMes}</span>
          <button
            type="button"
            onClick={() => mudarMes(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            aria-label="Próximo mês"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {carregando ? (
        <div className="mt-6 h-72 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
              {diasSemana.map((dia) => (
                <div key={dia} className="py-2">{dia}</div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {dias.map((dia, index) => {
                if (dia === null) {
                  return <div key={`empty-${index}`} className="h-20 rounded-3xl bg-zinc-50 dark:bg-zinc-950" />;
                }

                const dataAtualDia = new Date(ano, mes, dia);
                const dataKey = dataAtualDia.toISOString().slice(0, 10);
                const quantidade = tarefasPorData[dataKey]?.length || 0;
                const estaSelecionado = dataSelecionada.toISOString().slice(0, 10) === dataKey;

                return (
                  <button
                    key={dataKey}
                    type="button"
                    onClick={() => setDataSelecionada(dataAtualDia)}
                    className={
                      `group flex h-20 flex-col justify-between rounded-3xl border p-3 text-left transition ${
                        estaSelecionado ? 'border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm dark:bg-indigo-950/60 dark:text-white' : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700'
                      }`
                    }
                  >
                    <span className="text-sm font-semibold">{dia}</span>
                    {quantidade > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-indigo-600 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
                        {quantidade} tarefa{quantidade > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">Sem tarefa</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
              <CalendarDays className="w-4 h-4" />
              <span>{dataSelecionada.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="space-y-3">
              {tarefasDoDia.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Nenhuma tarefa foi criada neste dia.</p>
              ) : (
                tarefasDoDia.map((tarefa) => (
                  <Link
                    key={tarefa.id}
                    href={`/tarefas/${tarefa.id}`}
                    className="block rounded-3xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-900 transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-indigo-500"
                  >
                    <div className="font-semibold">{tarefa.titulo}</div>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{tarefa.descricao || 'Sem descrição'}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">{tarefa.status.replace('_', ' ')}</span>
                      <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">Prioridade: {tarefa.prioridade}</span>
                      <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">Criada em {tarefa.criadoEm.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
