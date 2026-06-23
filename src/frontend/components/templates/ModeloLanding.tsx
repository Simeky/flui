import {
  Clock,
  Target,
  Users,
  Zap,
} from 'lucide-react';

import { AreaMockup } from '@/frontend/components/organisms/AreaMockup';
import { BarraNavegacao } from '@/frontend/components/organisms/BarraNavegacao';
import { Rodape } from '@/frontend/components/organisms/Rodape';
import { SecaoHero } from '@/frontend/components/organisms/SecaoHero';
import { SecaoRecursos } from '@/frontend/components/organisms/SecaoRecursos';

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
       
      </main>
      <Rodape />
    </div>
  );
}
