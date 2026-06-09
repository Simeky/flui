import { CheckCircle, Kanban, Calendar, BarChart3 } from "lucide-react";

const recursos = [
  {
    icone: Kanban,
    titulo: "Quadro Kanban",
    descricao: "Visualize e organize tarefas em colunas intuitivas.",
  },
  {
    icone: Calendar,
    titulo: "Calendário",
    descricao: "Acompanhe prazos e eventos em uma visão clara.",
  },
  {
    icone: BarChart3,
    titulo: "Dashboard",
    descricao: "Métricas e gráficos para monitorar sua produtividade.",
  },
  {
    icone: CheckCircle,
    titulo: "Tarefas e subtarefas",
    descricao: "Divida projetos em etapas menores e acompanhe o progresso.",
  },
];

export function SecaoRecursos() {
  return (
    <section id="recursos" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Recursos principais
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Tudo que você precisa para gerenciar suas tarefas com eficiência.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recursos.map((recurso) => (
            <article
              key={recurso.titulo}
              className="rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <recurso.icone className="mb-4 h-8 w-8 text-indigo-600" />
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                {recurso.titulo}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {recurso.descricao}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
