import Link from "next/link";

interface ModeloAutenticacaoProps {
  titulo: string;
  subtitulo: string;
  children: React.ReactNode;
  linkAlternativo?: {
    texto: string;
    href: string;
    rotuloLink: string;
  };
}

export function ModeloAutenticacao({
  titulo,
  subtitulo,
  children,
  linkAlternativo,
}: ModeloAutenticacaoProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Flui
        </Link>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {titulo}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {subtitulo}
          </p>
        </div>

        {children}

        {linkAlternativo && (
          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {linkAlternativo.texto}{" "}
            <Link
              href={linkAlternativo.href}
              className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              {linkAlternativo.rotuloLink}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
