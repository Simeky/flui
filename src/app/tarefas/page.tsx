import { Cabecalho } from '@/frontend/components/organisms/Cabecalho';
import {
  FormularioTarefa,
} from '@/frontend/components/organisms/FormularioTarefa';

export default async function PaginaDetalhesTarefa({ }: { searchParams: Promise<{ id: string }> }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Cabecalho />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <FormularioTarefa id={'nova'} />
      </main>
    </div>
  );
}
