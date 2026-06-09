import Link from "next/link";

const linksRodape = {
  produto: [
    { rotulo: "Recursos", href: "#recursos" },
    { rotulo: "Demonstração", href: "#demonstracao" },
    { rotulo: "Preços", href: "#" },
  ],
  empresa: [
    { rotulo: "Sobre", href: "#sobre" },
    { rotulo: "Contato", href: "#" },
    { rotulo: "Blog", href: "#" },
  ],
  legal: [
    { rotulo: "Privacidade", href: "#" },
    { rotulo: "Termos de uso", href: "#" },
  ],
};

export function Rodape() {
  return (
    <footer
      id="sobre"
      className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Flui
            </Link>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              O gestor de tarefas que simplifica sua rotina e potencializa sua
              produtividade.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Produto
            </h3>
            <ul className="space-y-2">
              {linksRodape.produto.map((link) => (
                <li key={link.rotulo}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                  >
                    {link.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Empresa
            </h3>
            <ul className="space-y-2">
              {linksRodape.empresa.map((link) => (
                <li key={link.rotulo}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                  >
                    {link.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Legal
            </h3>
            <ul className="space-y-2">
              {linksRodape.legal.map((link) => (
                <li key={link.rotulo}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                  >
                    {link.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          © {new Date().getFullYear()} Flui. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
