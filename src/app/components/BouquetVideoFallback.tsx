const isMobile = window.innerWidth < 768;

export function BouquetVideoFallback({ className = '' }: { className?: string }) {
  const src = isMobile ? '/bouquet-mobile.webm' : '/bouquet-desktop.webm';

  return (
    <div
      className={`${className} [filter:blur(1px)_brightness(1.15)] md:[filter:blur(1.2px)_brightness(1.18)]`}
      style={{
        touchAction: 'none',
        pointerEvents: 'none',
        position: 'relative',
        maskImage: 'radial-gradient(ellipse 80% 75% at 55% 60%, black 45%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 55% 60%, black 45%, transparent 85%)',
      }}
    >
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '65% center', display: 'block' }}
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
