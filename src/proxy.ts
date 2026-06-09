import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NOME_COOKIE_SESSAO } from "@/backend/constants/autenticacao";

const rotasProtegidas = ["/dashboard"];
const rotasAutenticacao = ["/login", "/register"];

export function proxy(requisicao: NextRequest) {
  const { pathname } = requisicao.nextUrl;
  const token = requisicao.cookies.get(NOME_COOKIE_SESSAO)?.value;
  const autenticado = Boolean(token);

  const ehRotaProtegida = rotasProtegidas.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`),
  );

  const ehRotaAutenticacao = rotasAutenticacao.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`),
  );

  if (ehRotaProtegida && !autenticado) {
    return NextResponse.redirect(new URL("/login", requisicao.url));
  }

  if (ehRotaAutenticacao && autenticado) {
    return NextResponse.redirect(new URL("/dashboard", requisicao.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
