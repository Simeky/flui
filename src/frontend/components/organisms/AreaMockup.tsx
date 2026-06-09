import { Monitor } from "lucide-react";

export function AreaMockup() {
  return (
    <section
      id="demonstracao"
      className="px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Veja o Flui em ação
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Uma prévia do que você terá ao usar o sistema.
          </p>
        </div>

        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-12 dark:border-zinc-700 dark:bg-zinc-900/50 sm:min-h-[400px]">
          <div className="text-center">
            <Monitor className="mx-auto mb-4 h-16 w-16 text-zinc-400" />
            <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
              Demonstração em breve
            </p>
            <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
              O mockup interativo do sistema será exibido aqui.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
