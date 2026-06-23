import { Star } from 'lucide-react';

const depoimentos = [
  {
    nome: "Ana Silva",
    cargo: "Gerente de Projetos",
    empresa: "Tech Solutions",
    texto: "Flui transformou a forma como gerencio meus projetos. A interface é tão intuitiva que toda minha equipe a adotou em uma semana.",
    rating: 5,
  },
  {
    nome: "Carlos Pereira",
    cargo: "Freelancer",
    empresa: "Desenvolvimento Web",
    texto: "Como freelancer, precisava de algo simples mas poderoso. Flui oferece exatamente isso. Ganho horas de produtividade todo dia.",
    rating: 5,
  },
  {
    nome: "Marina Costa",
    cargo: "Empreendedora",
    empresa: "Startup Digital",
    texto: "O que me impressionou foi a combinação de funcionalidades avançadas com simplicidade de uso. Recomendo para qualquer um.",
    rating: 5,
  },
];

export function SecaoDepoimentos() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            O que nossos usuários dizem
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Confira os depoimentos de pessoas que transformaram sua produtividade com Flui.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {depoimentos.map((depoimento) => (
            <article
              key={depoimento.nome}
              className="rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(depoimento.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                "{depoimento.texto}"
              </p>
              <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {depoimento.nome}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {depoimento.cargo} • {depoimento.empresa}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
