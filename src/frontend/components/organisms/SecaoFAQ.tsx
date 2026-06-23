'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const perguntas = [
  {
    id: 1,
    pergunta: "Como funciona o período de teste?",
    resposta: "Você tem 14 dias completos para explorar todas as funcionalidades de Flui sem nenhuma restrição. Sem cartão de crédito necessário.",
  },
  {
    id: 2,
    pergunta: "Posso usar Flui com minha equipe?",
    resposta: "Sim! Flui foi feito para escalar de um usuário individual para equipes de qualquer tamanho. Convide seus colegas e trabalhem juntos.",
  },
  {
    id: 3,
    pergunta: "Meus dados estão seguros?",
    resposta: "Absolutamente. Usamos criptografia de ponta a ponta e conformidade com LGPD. Seus dados são sua propriedade.",
  },
  {
    id: 4,
    pergunta: "Posso cancelar a qualquer momento?",
    resposta: "Sim, sem perguntas feitas. Você pode cancelar sua assinatura a qualquer momento, sem multas ou compromissos ocultos.",
  },
  {
    id: 5,
    pergunta: "Vocês oferecem suporte?",
    resposta: "Sim! Oferecemos suporte por e-mail 24/7 e documentação completa. Planos premium incluem chat ao vivo.",
  },
  {
    id: 6,
    pergunta: "Como posso integrar Flui com outras ferramentas?",
    resposta: "Flui oferece integração nativa com as principais ferramentas de produtividade. Mais integrações estão vindo em breve.",
  },
];

export function SecaoFAQ() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Perguntas Frequentes
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Tudo que você precisa saber sobre Flui.
          </p>
        </div>

        <div className="space-y-3">
          {perguntas.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <button
                onClick={() => setAberto(aberto === item.id ? null : item.id)}
                className="w-full px-6 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.pergunta}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-600 transition-transform dark:text-zinc-400 ${
                      aberto === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              {aberto === item.id && (
                <div className="border-t border-zinc-200 px-6 py-4 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  {item.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
