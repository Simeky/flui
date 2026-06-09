"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { Botao } from "@/frontend/components/atoms/Botao";
import {
  criarManipuladorRolagem,
  extrairIdAncora,
} from "@/frontend/utils/rolagemSuave";

const linksNavegacao = [
  { href: "#recursos", rotulo: "Recursos" },
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#demonstracao", rotulo: "Demonstração" },
];

export function BarraNavegacao() {
  const [menuAberto, setMenuAberto] = useState(false);

  function aoClicarLinkAncora(href: string) {
    const id = extrairIdAncora(href);
    if (!id) return undefined;

    return (evento: React.MouseEvent<HTMLAnchorElement>) => {
      criarManipuladorRolagem(id)(evento);
      setMenuAberto(false);
    };
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Flui
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {linksNavegacao.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={aoClicarLinkAncora(link.href)}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
              >
                {link.rotulo}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-indigo-400"
            aria-label="Entrar"
          >
            <LogIn className="h-4 w-4" />
            Entrar
          </Link>
          <Link href="/register">
            <Botao tamanho="sm">Começar</Botao>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuAberto && (
        <div className="border-t border-zinc-200 px-4 py-4 md:hidden dark:border-zinc-800">
          <ul className="flex flex-col gap-4">
            {linksNavegacao.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={aoClicarLinkAncora(link.href)}
                  className="block text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {link.rotulo}
                </a>
              </li>
            ))}
            <li className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setMenuAberto(false)}
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
              <Link href="/register" onClick={() => setMenuAberto(false)}>
                <Botao className="w-full">Começar</Botao>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
