import { BarraNavegacao } from "@/frontend/components/organisms/BarraNavegacao";
import { SecaoHero } from "@/frontend/components/organisms/SecaoHero";
import { AreaMockup } from "@/frontend/components/organisms/AreaMockup";
import { Rodape } from "@/frontend/components/organisms/Rodape";
import { SecaoRecursos } from "@/frontend/components/organisms/SecaoRecursos";

export function ModeloLanding() {
  return (
    <>
      <BarraNavegacao />
      <main>
        <SecaoHero />
        <SecaoRecursos />
        <AreaMockup />
      </main>
      <Rodape />
    </>
  );
}
