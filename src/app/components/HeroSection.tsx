import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BouquetHero } from './BouquetHero';
import { Logo } from './Logo';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const ZASLIA_FONT  = "'Zaslia', 'Cormorant Garamond', Georgia, serif";
const GOLD         = '#8a7b34';
const BRAND        = 'SÖREN VAN LAER';

/* ─── Letter-by-letter entrance ──────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 1.3 },
  },
};
const letterVariants = {
  hidden:   { opacity: 0, y: 64, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 1.1, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Art Nouveau corner bracket (SVG) ──────────────────────────── */
function HeroCorner({
  className = '', flipX = false, flipY = false,
}: { className?: string; flipX?: boolean; flipY?: boolean }) {
  return (
    <svg
      viewBox="0 0 110 110" className={className}
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      <line x1="5" y1="5" x2="72" y2="5"  stroke={GOLD} strokeWidth="0.6" opacity="0.38"/>
      <line x1="5" y1="5" x2="5"  y2="72" stroke={GOLD} strokeWidth="0.6" opacity="0.38"/>
      <path d="M5 5 C5 38 18 28 30 46 C40 58 20 76 5 82"
        stroke={GOLD} strokeWidth="0.9" fill="none" opacity="0.42"/>
      <path d="M5 5 C32 5 52 13 54 34 C56 46 44 52 32 46"
        stroke={GOLD} strokeWidth="0.65" fill="none" opacity="0.3"/>
      <path d="M28 11 Q35 4  40 11 Q33 18 28 11Z" fill={GOLD} opacity="0.20"/>
      <path d="M50 11 Q57 4  61 11 Q54 17 50 11Z" fill={GOLD} opacity="0.14"/>
      <path d="M5 30 Q-2 36 5 41 Q11 36 5 30Z"   fill={GOLD} opacity="0.18"/>
      <path d="M5 56 Q-2 62 5 67 Q11 62 5 56Z"   fill={GOLD} opacity="0.14"/>
      <circle cx="5"  cy="5"  r="2"   fill={GOLD} opacity="0.60"/>
      <circle cx="5"  cy="5"  r="5.5" stroke={GOLD} strokeWidth="0.4" fill="none" opacity="0.22"/>
      <circle cx="30" cy="46" r="2.2" fill={GOLD} opacity="0.32"/>
      <circle cx="27" cy="43" r="1.2" fill={GOLD} opacity="0.18"/>
      <circle cx="33" cy="43" r="1.2" fill={GOLD} opacity="0.18"/>
      <circle cx="30" cy="40" r="1.2" fill={GOLD} opacity="0.18"/>
      <circle cx="5"  cy="82" r="1.6" fill={GOLD} opacity="0.28"/>
      <circle cx="72" cy="5"  r="1.6" fill={GOLD} opacity="0.28"/>
    </svg>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%',  '28%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1,   0]);
  const bouquetY       = useTransform(scrollYProgress, [0, 1], ['0%',  '18%']);

  return (
      <section
        ref={ref}
        className="relative w-full h-screen min-h-[700px] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 110% 90% at 62% 48%, #3a3420 0%, #27210f 48%, #1b160a 100%)' }}
        id="home"
      >
      {/* ── 3-D Bouquet (right half, parallax) ── */}
      <motion.div
        style={{ y: bouquetY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <BouquetHero className="w-full h-full" />
      </motion.div>

      {/* ── Gradient shield — protects left-side text readability ── */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 58% 64% at 36% 52%, rgba(20,14,8,0.62) 0%, rgba(20,14,8,0.24) 54%, rgba(20,14,8,0.04) 100%)',
        }}
      />
      {/* Bottom fade to page bg */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[11] h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #1b160a, transparent)' }}
      />
      {/* Soft ambient glow top-left */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 56% 46%, rgba(138,123,52,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Art Nouveau corner ornaments ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, delay: 1.2 }}
        className="absolute inset-0 z-[12] pointer-events-none"
      >
        <HeroCorner className="absolute top-5 left-5  w-[72px] h-[72px] md:w-[100px] md:h-[100px]" />
        <HeroCorner className="absolute top-5 right-5 w-[72px] h-[72px] md:w-[100px] md:h-[100px]" flipX />
        <HeroCorner className="absolute bottom-5 left-5  w-[72px] h-[72px] md:w-[100px] md:h-[100px]" flipY />
        <HeroCorner className="absolute bottom-5 right-5 w-[72px] h-[72px] md:w-[100px] md:h-[100px]" flipX flipY />
      </motion.div>

      {/* ── Main text content — left side on desktop, centred on mobile ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 z-20 flex items-center justify-center px-8"
      >
        <div className="flex flex-col items-center text-center max-w-lg">

          {/* Logo mark above title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <Logo size={64} color="#8a7b34" />
          </motion.div>

          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-14 md:w-20 h-px bg-[#8a7b34] mb-7 origin-center"
          />

          {/* Brand title — single element to preserve font kerning */}
          <motion.h1
            initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#d4c68c] whitespace-nowrap"
            style={{
              fontFamily: ZASLIA_FONT,
              fontSize: 'clamp(42px, 8.5vw, 140px)',
              fontWeight: 'normal',
              lineHeight: 1,
              letterSpacing: 'normal',
              fontFeatureSettings: '"liga" 1, "calt" 1, "dlig" 1, "kern" 1',
              fontVariantLigatures: 'common-ligatures discretionary-ligatures contextual',
            }}
          >
            {BRAND}
          </motion.h1>

          {/* Thin divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-64 md:w-80 h-px bg-[#d4c68c]/12 my-6 origin-center"
          />

          {/* Sub-title */}
          <motion.p
            variants={fadeUp} custom={2.0}
            initial="hidden" animate="visible"
            style={{ fontFamily: DISPLAY_FONT }}
            className="text-[#d4c68c]/90 text-base md:text-xl tracking-[0.42em] uppercase font-light pr-[0.42em]"
          >
            Atelier Floral · Bornem
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp} custom={2.2}
            initial="hidden" animate="visible"
            style={{ fontFamily: DISPLAY_FONT }}
            className="text-[#d4c68c]/75 text-sm md:text-base tracking-[0.18em] mt-2.5 max-w-sm"
          >
            Where nature becomes language
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp} custom={2.4}
            initial="hidden" animate="visible"
            className="flex gap-3 mt-9"
          >
            <a
              href="#boutique"
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="group relative overflow-hidden bg-[#8a7b34] text-[#181005] text-[10px] tracking-[0.3em] uppercase font-medium px-7 py-3.5 hover:bg-[#d9cb92] transition-all duration-500"
            >
              Boutique
            </a>
            <a
              href="#collections"
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="group relative overflow-hidden border border-[#d4c68c]/20 text-[#d4c68c] text-[10px] tracking-[0.3em] uppercase font-light px-7 py-3.5 hover:border-[#d4c68c]/55 hover:bg-[#d4c68c]/5 transition-all duration-500"
            >
              Explorer
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span
          className="text-[#d4c68c]/28 text-[9px] tracking-[0.38em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#8a7b34]/55 to-transparent"
        />
      </motion.div>
    </section>
  );
}
