'use client';
import React, { useEffect, useState } from 'react';
import { useAutenticacao } from '@/frontend/hooks/useAutenticacao';
import { buscarTarefasDoUsuario } from '@/backend/services/servicoTarefas';
import { Tarefa } from '@/backend/types/tarefa';
import { Card, Metric, Text, Title, BarChart, DonutChart, Grid, Col } from '@tremor/react';

export function ResumoTarefas() {
  const { usuario } = useAutenticacao();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (usuario) {
      buscarTarefasDoUsuario(usuario.uid).then(t => {
        setTarefas(t);
        setCarregando(false);
      });
    }
  }, [usuario]);

  if (carregando) return <div className="animate-pulse h-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full"></div>;

  const totalPendentes = tarefas.filter(t => t.status === 'pendente').length;
  const totalEmProgresso = tarefas.filter(t => t.status === 'em_progresso').length;
  const totalConcluidas = tarefas.filter(t => t.status === 'concluida').length;
  
  const hoje = new Date();
  const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
  const concluidasNaSemana = tarefas.filter(t => t.status === 'concluida' && t.criadoEm > umaSemanaAtras).length; // simplificando usando criadoEm
  
  const tarefasVencidas = tarefas.filter(t => t.status !== 'concluida' && t.dataVencimento && t.dataVencimento < hoje).length;

  const chartStatus = [
    { name: 'Pendentes', value: totalPendentes },
    { name: 'Em Progresso', value: totalEmProgresso },
    { name: 'Concluídas', value: totalConcluidas },
  ];

  const chartPrioridade = [
    { name: 'Baixa', Tarefas: tarefas.filter(t => t.prioridade === 'baixa').length },
    { name: 'Média', Tarefas: tarefas.filter(t => t.prioridade === 'media').length },
    { name: 'Alta', Tarefas: tarefas.filter(t => t.prioridade === 'alta').length },
  ];

  return (
    <div className="space-y-6">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <Text>Tarefas Pendentes/Em Progresso</Text>
          <Metric>{totalPendentes + totalEmProgresso}</Metric>
        </Card>
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <Text>Concluídas (7 dias)</Text>
          <Metric>{concluidasNaSemana}</Metric>
        </Card>
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <Text>Tarefas Vencidas</Text>
          <Metric className="text-red-500">{tarefasVencidas}</Metric>
        </Card>
      </Grid>

      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <Title>Status das Tarefas</Title>
          <DonutChart
            className="mt-6"
            data={chartStatus}
            category="value"
            index="name"
            colors={['yellow', 'blue', 'green']}
          />
        </Card>
        <Card className="dark:bg-zinc-900 dark:border-zinc-800">
          <Title>Prioridade</Title>
          <BarChart
            className="mt-6"
            data={chartPrioridade}
            index="name"
            categories={['Tarefas']}
            colors={['indigo']}
          />
        </Card>
      </Grid>
    </div>
  );
}
