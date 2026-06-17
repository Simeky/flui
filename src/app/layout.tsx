import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ProvedorAutenticacao } from "@/frontend/contexts/ContextoAutenticacao";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flui — Gestor de Tarefas",
  description:
    "Organize suas tarefas com simplicidade. Flui é o gestor de tarefas moderno para você.",
};

export default function LayoutRaiz({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ProvedorAutenticacao>{children}</ProvedorAutenticacao>

        <div {...{ vw: '' }} className="enabled fixed bottom-4 right-4 z-50" aria-hidden="true">
          <div {...{ 'vw-access-button': '' }} className="active" />
          <div {...{ 'vw-plugin-wrapper': '' }} />
        </div>

        <Script
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
