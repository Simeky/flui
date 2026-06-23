'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Contrast,
  Hand,
  Minus,
  Moon,
  Plus,
  Sun,
  Type,
  Zap,
} from 'lucide-react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    vw?: string;
    'vw-access-button'?: string;
    'vw-plugin-wrapper'?: string;
  }
}

export function PainelAcessibilidade() {
  const [tamanhoFonte, setTamanhoFonte] = useState(100);
  const [altoContraste, setAltoContraste] = useState(false);
  const [reduzirAnimacoes, setReduzirAnimacoes] = useState(false);
  const [modoDislexia, setModoDislexia] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [vlibrasAtivo, setVlibrasAtivo] = useState(false);
  const [vlibrasRenderizado, setVlibrasRenderizado] = useState(false);

  const [aberto, setAberto] = useState(false);
  const [posicao, setPosicao] = useState({ x: 16, y: 80 });
  const [arrastando, setArrastando] = useState(false);
  const [offsetArrasto, setOffsetArrasto] = useState({ x: 0, y: 0 });
  const [movedDuringDrag, setMovedDuringDrag] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem('acessibilidade');
    if (salvo) {
      const prefs = JSON.parse(salvo);
      setTamanhoFonte(prefs.tamanhoFonte || 100);
      setAltoContraste(prefs.altoContraste || false);
      setReduzirAnimacoes(prefs.reduzirAnimacoes || false);
      setModoDislexia(prefs.modoDislexia || false);
      setModoEscuro(prefs.modoEscuro || false);
      setPosicao(prefs.posicao || { x: 16, y: 80 });
      
      if (prefs.vlibrasAtivo) {
        setVlibrasAtivo(true);
        setVlibrasRenderizado(true);
      }
    }
  }, []);

  useEffect(() => {
    if (vlibrasRenderizado && !document.getElementById('vlibras-script')) {
      const script = document.createElement('script');
      script.id = 'vlibras-script';
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.VLibras && !window.vlibrasInit) {
          // @ts-ignore
          window.vlibrasInit = true; 
          // @ts-ignore
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };
      document.body.appendChild(script);
    }
  }, [vlibrasRenderizado]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${tamanhoFonte}%`;

    if (altoContraste) document.documentElement.classList.add('alto-contraste');
    else document.documentElement.classList.remove('alto-contraste');

    if (reduzirAnimacoes) document.documentElement.classList.add('reduzir-animacoes');
    else document.documentElement.classList.remove('reduzir-animacoes');

    if (modoDislexia) document.documentElement.classList.add('modo-dislexia');
    else document.documentElement.classList.remove('modo-dislexia');

    if (modoEscuro) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    if (vlibrasAtivo) {
      setVlibrasRenderizado(true); 
      document.documentElement.classList.add('vlibras-ativo');
    } else {
      document.documentElement.classList.remove('vlibras-ativo');
    }

    const salvo = localStorage.getItem('acessibilidade');
    const prefsAtuais = salvo ? JSON.parse(salvo) : {};
    localStorage.setItem('acessibilidade', JSON.stringify({
      ...prefsAtuais,
      tamanhoFonte,
      altoContraste,
      reduzirAnimacoes,
      modoDislexia,
      modoEscuro,
      vlibrasAtivo,
    }));
  }, [tamanhoFonte, altoContraste, reduzirAnimacoes, modoDislexia, modoEscuro, vlibrasAtivo]);

  const aumentarFonte = () => setTamanhoFonte((prev) => Math.min(prev + 10, 150));
  const diminuirFonte = () => setTamanhoFonte((prev) => Math.max(prev - 10, 80));

  const handleMouseDown = (e: React.MouseEvent) => {
    setArrastando(true);
    setOffsetArrasto({
      x: e.clientX - posicao.x,
      y: e.clientY - posicao.y,
    });
    setMovedDuringDrag(false);
  };

  useEffect(() => {
    if (!arrastando) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - offsetArrasto.x;
      const newY = e.clientY - offsetArrasto.y;
      
      if (!movedDuringDrag) {
        const dx = Math.abs(newX - posicao.x);
        const dy = Math.abs(newY - posicao.y);
        if (dx > 3 || dy > 3) setMovedDuringDrag(true);
      }

      setPosicao({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setArrastando(false);
      const salvo = localStorage.getItem('acessibilidade');
      const prefsAtuais = salvo ? JSON.parse(salvo) : {};
      localStorage.setItem('acessibilidade', JSON.stringify({
        ...prefsAtuais,
        posicao,
      }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [arrastando, offsetArrasto, movedDuringDrag, posicao]);

  const resetarPreferencias = () => {
    setTamanhoFonte(100);
    setAltoContraste(false);
    setReduzirAnimacoes(false);
    setModoDislexia(false);
    setModoEscuro(false);
    setVlibrasAtivo(false);
    setPosicao({ x: 16, y: 80 });
    localStorage.removeItem('acessibilidade');
  };

  return (
    <>
      {vlibrasRenderizado && (
          <div vw="true" className="enabled">
            <div vw-access-button="true" className="active"></div>
            <div vw-plugin-wrapper="true">
              <div className="vw-plugin-top-wrapper"></div>
            </div>
          </div>
      )}

      <style jsx global>{`
        :root.alto-contraste:not(.dark) body,
        :root.alto-contraste:not(.dark) body * {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #000000 !important;
        }

        :root.alto-contraste:not(.dark) input,
        :root.alto-contraste:not(.dark) select,
        :root.alto-contraste:not(.dark) textarea,
        :root.alto-contraste:not(.dark) button {
          border: 2px solid #000000 !important;
          background-color: #ffffff !important;
        }

        :root.alto-contraste:not(.dark) button[role="switch"] span {
          background-color: #000000 !important;
        }

        :root.alto-contraste:not(.dark) svg {
          color: #000000 !important;
        }

        :root.dark.alto-contraste body,
        :root.dark.alto-contraste body * {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #ffffff !important;
        }

        :root.dark.alto-contraste input,
        :root.dark.alto-contraste select,
        :root.dark.alto-contraste textarea,
        :root.dark.alto-contraste button {
          border: 2px solid #ffffff !important;
          background-color: #000000 !important;
        }

        :root.dark.alto-contraste button[role="switch"] span {
          background-color: #ffffff !important;
        }

        :root.dark.alto-contraste svg {
          color: #ffffff !important;
        }

        :root.reduzir-animacoes * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        :root.modo-dislexia, :root.modo-dislexia * {
          font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif !important;
          letter-spacing: 0.12em !important;
        }
        
        :root:not(.vlibras-ativo) [vw] {
          display: none !important;
        }
      `}</style>

      <div style={{ left: `${posicao.x}px`, top: `${posicao.y}px` }} className="fixed z-40">
        {aberto && (
          <div
            className="mb-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-lg space-y-3 w-72 cursor-move"
            onMouseDown={handleMouseDown}
          >
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-white select-none">Acessibilidade</h3>

            {/* Tamanho de Fonte */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> Tamanho da Fonte
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={diminuirFonte}
                  disabled={tamanhoFonte <= 80}
                  className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Diminuir tamanho da fonte"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white w-12 text-center">
                  {tamanhoFonte}%
                </span>
                <button
                  onClick={aumentarFonte}
                  disabled={tamanhoFonte >= 150}
                  className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Aumentar tamanho da fonte"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Contrast className="w-3.5 h-3.5" /> Alto Contraste
              </label>
              <button
                onClick={() => setAltoContraste(!altoContraste)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  altoContraste ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
                role="switch"
                aria-checked={altoContraste}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${altoContraste ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Reduzir Animações */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Reduzir Animações
              </label>
              <button
                onClick={() => setReduzirAnimacoes(!reduzirAnimacoes)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  reduzirAnimacoes ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
                role="switch"
                aria-checked={reduzirAnimacoes}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${reduzirAnimacoes ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Modo Dislexia */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> Fonte Dislexia
              </label>
              <button
                onClick={() => setModoDislexia(!modoDislexia)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  modoDislexia ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
                role="switch"
                aria-checked={modoDislexia}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${modoDislexia ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Modo Claro/Escuro */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                {modoEscuro ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                Modo Escuro
              </label>
              <button
                onClick={() => setModoEscuro(!modoEscuro)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  modoEscuro ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
                role="switch"
                aria-checked={modoEscuro}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${modoEscuro ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* VLibras */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Hand className="w-3.5 h-3.5" /> VLibras
              </label>
              <button
                onClick={() => setVlibrasAtivo(!vlibrasAtivo)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  vlibrasAtivo ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
                role="switch"
                aria-checked={vlibrasAtivo}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${vlibrasAtivo ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Resetar */}
            <button
              onClick={resetarPreferencias}
              className="w-full px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors mt-2"
            >
              Resetar Preferências
            </button>
          </div>
        )}

        <button
          onMouseDown={handleMouseDown}
          onClick={() => {
            if (movedDuringDrag) {
              setMovedDuringDrag(false);
              return;
            }
            setAberto(!aberto);
          }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg transition-all"
          aria-expanded={aberto}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </button>
      </div>
    </>
  );
}