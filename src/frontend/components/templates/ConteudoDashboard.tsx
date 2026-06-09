"use client";

import Link from "next/link";
import { PainelConta } from "@/frontend/components/organisms/PainelConta";

export function ConteudoDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            Flui
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <PainelConta />
      </main>
    </div>
  );
}
