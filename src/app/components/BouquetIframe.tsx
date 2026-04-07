import { useEffect, useRef } from 'react';

const RENDERER_URL = (import.meta as any).env?.VITE_BOUQUET_URL ?? 'http://localhost:5174';

export function BouquetIframe({ className = '' }: { className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const send = (nx: number, ny: number) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage({ type: 'mouse', nx, ny }, '*');
    };

    const onMove = (e: MouseEvent) => {
      send(
        (e.clientX / window.innerWidth  - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      );
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      send(
        (t.clientX / window.innerWidth  - 0.5) * 2,
        (t.clientY / window.innerHeight - 0.5) * 2,
      );
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        touchAction: 'none',
        pointerEvents: 'none',
        position: 'relative',
        maskImage: 'radial-gradient(ellipse 80% 75% at 55% 60%, black 45%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 55% 60%, black 45%, transparent 85%)',
        filter: 'blur(1px) brightness(1.15)',
      }}
    >
      <iframe
        ref={iframeRef}
        src={RENDERER_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: 'transparent',
          display: 'block',
          pointerEvents: 'none',
        }}
        allow="autoplay"
      />
      {/* Vignette — matches original BouquetHero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 55% 60%, transparent 30%, rgba(14,10,4,0.55) 75%, rgba(14,10,4,0.85) 100%)',
        }}
      />
    </div>
  );
}
