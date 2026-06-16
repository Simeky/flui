import React from 'react';
interface BarraProgressoProps { progresso: number; }
export function BarraProgresso({ progresso }: BarraProgressoProps) {
  return (
    <div className="w-full bg-zinc-200 rounded-full h-2.5 dark:bg-zinc-700">
      <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: progresso.toString() + '%' }}></div>
    </div>
  );
}
