'use client';
import {
  useEffect,
  useState,
} from 'react';

import {
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

import { buscarTarefasDoUsuario } from '@/backend/services/servicoTarefas';
import { Tarefa } from '@/backend/types/tarefa';
import { useAutenticacao } from '@/frontend/hooks/useAutenticacao';
import {
  Badge,
  BarChart,
  Card,
  DonutChart,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
  Title,
} from '@tremor/react';

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
  const totalTarefas = tarefas.length;
  
  const taxaConclusao = totalTarefas > 0 ? Math.round((totalConcluidas / totalTarefas) * 100) : 0;
  
  const hoje = new Date();
  const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
  const concluidasNaSemana = tarefas.filter(t => t.status === 'concluida' && t.criadoEm > umaSemanaAtras).length;
  
  const tarefasVencidas = tarefas.filter(t => t.status !== 'concluida' && t.dataVencimento && t.dataVencimento < hoje).length;

  const chartStatus = [
    { name: 'Pendentes', value: totalPendentes },
    { name: 'Em Progresso', value: totalEmProgresso },
    { name: 'Concluídas', value: totalConcluidas },
  ];

  const chartPrioridade = [
    { name: 'Baixa', Quantidade: tarefas.filter(t => t.prioridade === 'baixa').length },
    { name: 'Média', Quantidade: tarefas.filter(t => t.prioridade === 'media').length },
    { name: 'Alta', Quantidade: tarefas.filter(t => t.prioridade === 'alta').length },
  ];

  const valueFormatterBarra = (number: number) => `: ${number}`;

  const valueFormatterDonut = (number: number) => {
    if (number === totalTarefas) {
      return `Tarefas: ${number}`;
    }
    return `: ${number}`;
  };

  return (
    <div className="space-y-6">
      
      <div className="hidden bg-amber-500 bg-blue-500 bg-emerald-500 bg-red-500 fill-amber-500 fill-blue-500 fill-emerald-500 fill-red-500 stroke-amber-500 stroke-blue-500 stroke-emerald-500 stroke-red-500 text-amber-500 text-blue-500 text-emerald-500 text-red-500"></div>

      <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
        <Card decoration="top" decorationColor="blue" className="ring-0! border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          <Flex alignItems="start">
            <div>
              <Text>Ativas (Pendentes/Fazendo)</Text>
              <Metric>{totalPendentes + totalEmProgresso}</Metric>
            </div>
            <Badge size="xl" color="blue" icon={Clock} className="ring-0! border-0! text-zinc-900! dark:text-white!">Em andamento</Badge>
          </Flex>
          <Flex className="mt-4">
            <Text className="truncate text-sm">{taxaConclusao}% do total geral concluído</Text>
            <Text className="text-sm">{totalConcluidas} / {totalTarefas}</Text>
          </Flex>
          <ProgressBar value={taxaConclusao} color="blue" className="mt-2" />
        </Card>

        <Card decoration="top" decorationColor="emerald" className="ring-0! border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          <Flex alignItems="start">
            <div>
              <Text>Concluídas (7 dias)</Text>
              <Metric>{concluidasNaSemana}</Metric>
            </div>
            <Badge size="xl" color="emerald" icon={CheckCircle2} className="ring-0! border-0! text-zinc-900! dark:text-white!">Entregas</Badge>
          </Flex>
          <Text className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            Volume de tarefas finalizadas recentemente.
          </Text>
        </Card>

        <Card decoration="top" decorationColor="red" className="ring-0! border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          <Flex alignItems="start">
            <div>
              <Text>Tarefas Vencidas</Text>
              <Metric className="text-red-500 dark:text-red-400">{tarefasVencidas}</Metric>
            </div>
            <Badge size="xl" color="red" icon={AlertCircle} className="ring-0! border-0! text-zinc-900! dark:text-white!">Atrasos</Badge>
          </Flex>
          <Text className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            Tarefas que já passaram do prazo de entrega.
          </Text>
        </Card>
      </Grid>

      <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
        <Card className="ring-0! border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          <Title>Distribuição de Status</Title>
          <Text className="mb-4">Visão geral do progresso das suas tarefas.</Text>
          
          <DonutChart
            className="mt-6 h-72"
            data={chartStatus}
            category="value"
            index="name"
            colors={['amber', 'blue', 'emerald']} 
            valueFormatter={valueFormatterDonut} 
          />
        </Card>
        
        <Card className="ring-0! border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          <Title>Volume por Prioridade</Title>
          <Text className="mb-4">Quantidade de tarefas dividida por nível de urgência.</Text>
          
          <BarChart
            className="mt-6 h-72"
            data={chartPrioridade}
            index="name"
            categories={['Quantidade']}
            colors={['blue', 'emerald', 'amber']} 
            valueFormatter={valueFormatterBarra} 
            yAxisWidth={30}
            showLegend={false}
            allowDecimals={false}
          />
        </Card>
      </Grid>
      
    </div>
  );
}