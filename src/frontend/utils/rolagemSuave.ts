export function rolarParaElemento(id: string) {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  elemento.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function criarManipuladorRolagem(id: string) {
  return (evento: React.MouseEvent<HTMLAnchorElement>) => {
    evento.preventDefault();
    rolarParaElemento(id);
  };
}

export function extrairIdAncora(href: string): string | null {
  if (!href.startsWith("#")) return null;
  return href.slice(1);
}
