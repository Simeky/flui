'use client';
import {
  CheckSquare,
  LayoutDashboard,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PainelConta } from './PainelConta';

export function Cabecalho() {
  const pathname = usePathname();
  
  const navLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return isActive 
      ? "text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1"
      : "text-zinc-600 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 font-medium flex items-center gap-1";
  };

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <CheckSquare className="w-6 h-6" /> Flui
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className={navLinkClass('/dashboard')}>
            <LayoutDashboard className="w-4 h-4"/> Dashboard
          </Link>
          <Link href="/calendario" className={navLinkClass('/calendario')}>
            <Calendar className="w-4 h-4"/> Calendário
          </Link>
          <Link href="/tarefas" className={navLinkClass('/tarefas')}>
            <CheckSquare className="w-4 h-4"/> Tarefas
          </Link>
          <div className="pl-6 border-l border-zinc-200 dark:border-zinc-700 flex items-center">
            <PainelConta />
          </div>
        </nav>
      </div>
    </header>
  );
}
