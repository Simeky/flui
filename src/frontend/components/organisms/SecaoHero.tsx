import Link from 'next/link';

import { Botao } from '@/frontend/components/atoms/Botao';
import {
  BotaoRolagemSuave,
} from '@/frontend/components/molecules/BotaoRolagemSuave';

export function SecaoHero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/30 dark:via-zinc-950 dark:to-violet-950/30" />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
          Gestor de Tarefas Inteligente
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
          Organize seu fluxo com{" "}
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Flui
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Gerencie tarefas, visualize progresso e mantenha sua produtividade em
          alta. Simples, rápido e feito para você.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/register">
            <Botao tamanho="lg">Comece gratuitamente</Botao>
          </Link>
          <BotaoRolagemSuave destino="demonstracao" variante="contorno" tamanho="lg">
            Ver demonstração
          </BotaoRolagemSuave>
        </div>
      </div>
    </section>
  );
}
