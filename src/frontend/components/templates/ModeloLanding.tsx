import Link from 'next/link';
import { Zap, Clock, Target, Users } from 'lucide-react';

import { BarraNavegacao } from "@/frontend/components/organisms/BarraNavegacao";
import { SecaoHero } from "@/frontend/components/organisms/SecaoHero";
import { AreaMockup } from "@/frontend/components/organisms/AreaMockup";
import { Rodape } from "@/frontend/components/organisms/Rodape";
import { SecaoRecursos } from "@/frontend/components/organisms/SecaoRecursos";
import { SecaoDepoimentos } from "@/frontend/components/organisms/SecaoDepoimentos";
import { SecaoFAQ } from "@/frontend/components/organisms/SecaoFAQ";
import { Botao } from '@/frontend/components/atoms/Botao';

const beneficios = [
  {
    icone: Zap,
    titulo: "Rápido e Intuitivo",
    descricao: "Interface simples que você aprende em minutos, não em horas.",
  },
  {
    icone: Clock,
    titulo: "Economize Tempo",
    descricao: "Automatize fluxos e ganhe horas produtivas por semana.",
  },
  {
    icone: Target,
    titulo: "Foco Total",
    descricao: "Mantenha-se focado no que importa com menos distrações.",
  },
  {
    icone: Users,
    titulo: "Para Você e Seu Time",
    descricao: "Escala de um usuário para equipes de qualquer tamanho.",
  },
];

export function ModeloLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <BarraNavegacao />
      <main className="flex-1">
        {/* Seção Hero */}
        <SecaoHero />

        {/* Seção de Recursos */}
        <SecaoRecursos />

        {/* Seção de Benefícios */}
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Por que escolher Flui?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Benefícios que transformam sua produtividade.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {beneficios.map((beneficio) => (
                <div
                  key={beneficio.titulo}
                  className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 transition-all hover:border-indigo-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-indigo-700"
                >
                  <beneficio.icone className="mb-4 h-8 w-8 text-violet-600" />
                  <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                    {beneficio.titulo}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {beneficio.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Demonstração */}
        <AreaMockup />

        {/* Seção de Depoimentos */}
        <SecaoDepoimentos />

        {/* Seção de CTA Principal */}
        <section className="relative px-4 py-20 sm:px-6 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/30 dark:via-zinc-950 dark:to-violet-950/30" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              Pronto para começar?
            </div>
            <h2 className="mb-6 text-4xl font-bold text-zinc-900 sm:text-5xl dark:text-zinc-50">
              Junte-se a produtivos que usam Flui
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Sem cartão de crédito. Sem compromisso. Comece agora e veja a diferença em poucas semanas.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Botao tamanho="lg">
                  Começar Gratuitamente
                </Botao>
              </Link>
              <Link href="/login">
                <Botao variante="contorno" tamanho="lg">
                  Já tem conta
                </Botao>
              </Link>
            </div>
            <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
              ✨ Sem cartão de crédito necessário. Acesso completo por 14 dias.
            </p>
          </div>
        </section>
        {/* Seção de FAQ */}
        <SecaoFAQ />
        {/* Seção de Comparação/Stats */}
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  10K+
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Usuários ativos
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-violet-600 dark:text-violet-400">
                  100K+
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Tarefas completadas
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  4.9★
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Avaliação média
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
