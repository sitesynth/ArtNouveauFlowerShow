import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import img1 from '../../imports/image.png';
import img2 from '../../imports/image-1.png';
import img3 from '../../imports/image-2.png';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT = "'Inter', sans-serif";
const GOLD = '#8a7b34';

/* ─── Art Nouveau SVG corner flourish ──────────────────────────────── */
function ArtNouveauCorner({
  className = '',
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      {/* Outer straight arms */}
      <line x1="4" y1="4" x2="60" y2="4"  stroke={GOLD} strokeWidth="0.55" opacity="0.45"/>
      <line x1="4" y1="4" x2="4"  y2="60" stroke={GOLD} strokeWidth="0.55" opacity="0.45"/>
      {/* Main whiplash vine */}
      <path
        d="M4 4 C4 32 14 22 26 38 C34 49 16 66 4 72"
        stroke={GOLD} strokeWidth="0.85" fill="none" opacity="0.5"
      />
      {/* Secondary tendril */}
      <path
        d="M4 4 C26 4 42 10 46 28 C50 40 38 44 28 40"
        stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.35"
      />
      {/* Leaf cluster near top-right arm */}
      <path d="M26 10 Q32 4 36 10 Q30 16 26 10Z"  fill={GOLD} opacity="0.22"/>
      <path d="M44 10 Q50 4 54 10 Q48 16 44 10Z"  fill={GOLD} opacity="0.15"/>
      {/* Leaf along left arm */}
      <path d="M4 28 Q-2 34 4 38 Q10 34 4 28Z"    fill={GOLD} opacity="0.2"/>
      {/* Tiny blossom at corner */}
      <circle cx="4"  cy="4"  r="1.8" fill={GOLD} opacity="0.65"/>
      <circle cx="4"  cy="4"  r="4.5" stroke={GOLD} strokeWidth="0.4" fill="none" opacity="0.25"/>
      {/* Blossom on vine inflection */}
      <circle cx="26" cy="38" r="2"   fill={GOLD} opacity="0.38"/>
      <circle cx="24" cy="36" r="1"   fill={GOLD} opacity="0.2"/>
      <circle cx="28" cy="36" r="1"   fill={GOLD} opacity="0.2"/>
      <circle cx="26" cy="34" r="1"   fill={GOLD} opacity="0.2"/>
      {/* Long end dot */}
      <circle cx="4"  cy="72" r="1.5" fill={GOLD} opacity="0.3"/>
      <circle cx="60" cy="4"  r="1.5" fill={GOLD} opacity="0.3"/>
    </svg>
  );
}

/* ─── Botanical horizontal divider ────────────────────────────────── */
function BotanicalDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center gem */}
      <path d="M280 3 L285 14 L280 25 L275 14Z" fill={GOLD} opacity="0.55"/>
      {/* Lines */}
      <line x1="0"   y1="14" x2="267" y2="14" stroke={GOLD} strokeWidth="0.5" opacity="0.3"/>
      <line x1="293" y1="14" x2="560" y2="14" stroke={GOLD} strokeWidth="0.5" opacity="0.3"/>
      {/* Left sprigs */}
      <path d="M240 14 Q242 7  248 10" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <path d="M240 14 Q242 21 248 18" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <path d="M210 14 Q212 8  216 11" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.3"/>
      <path d="M210 14 Q212 20 216 17" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.3"/>
      {/* Right sprigs (mirror) */}
      <path d="M320 14 Q318 7  312 10" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <path d="M320 14 Q318 21 312 18" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <path d="M350 14 Q348 8  344 11" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.3"/>
      <path d="M350 14 Q348 20 344 17" stroke={GOLD} strokeWidth="0.55" fill="none" opacity="0.3"/>
      {/* Accent diamonds */}
      <path d="M180 12.5 L182 14 L180 15.5 L178 14Z" fill={GOLD} opacity="0.28"/>
      <path d="M378 12.5 L380 14 L378 15.5 L376 14Z" fill={GOLD} opacity="0.28"/>
      <path d="M100 12.5 L102 14 L100 15.5 L98  14Z" fill={GOLD} opacity="0.18"/>
      <path d="M458 12.5 L460 14 L458 15.5 L456 14Z" fill={GOLD} opacity="0.18"/>
    </svg>
  );
}

/* ─── Vertical side ornament (for panel left/right) ───────────────── */
function SideVine({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 18 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <line x1="9" y1="0" x2="9" y2="200" stroke={GOLD} strokeWidth="0.5" opacity="0.3"/>
      <path d="M9 40  Q2  44 5  50  Q12 46 9  40Z"  fill={GOLD} opacity="0.22"/>
      <path d="M9 80  Q16 84 13 90  Q6  86 9  80Z"  fill={GOLD} opacity="0.22"/>
      <path d="M9 120 Q2 124 5 130 Q12 126 9 120Z" fill={GOLD} opacity="0.22"/>
      <path d="M9 160 Q16 164 13 170 Q6 166 9 160Z" fill={GOLD} opacity="0.22"/>
      <circle cx="9" cy="0"   r="1.5" fill={GOLD} opacity="0.45"/>
      <circle cx="9" cy="100" r="1.8" fill={GOLD} opacity="0.35"/>
      <circle cx="9" cy="200" r="1.5" fill={GOLD} opacity="0.45"/>
    </svg>
  );
}

/* ─── Main section ─────────────────────────────────────────────────── */
export function ArtNouveauSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['8%',  '-8%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['10%', '-6%']);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative bg-[#1b160a] py-28 md:py-40 overflow-hidden">

      {/* Faint grid texture — very Art Nouveau */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,   ${GOLD}18 0, ${GOLD}18 0.5px, transparent 0.5px, transparent 88px),
            repeating-linear-gradient(90deg,  ${GOLD}18 0, ${GOLD}18 0.5px, transparent 0.5px, transparent 88px)
          `,
        }}
      />

      {/* Edge radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 50% 50%, transparent 45%, #1b160a 100%)',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center gap-5 justify-center mb-6">
            <div className="h-px flex-1 max-w-[80px] bg-[#8a7b34]/25" />
            <p
              style={{ fontFamily: BODY_FONT }}
              className="text-[#8a7b34] text-[9px] tracking-[0.55em] uppercase"
            >
              Botanical Heritage
            </p>
            <div className="h-px flex-1 max-w-[80px] bg-[#8a7b34]/25" />
          </div>
          <h2
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 'clamp(36px, 5.5vw, 74px)',
              fontWeight: 300,
              lineHeight: 0.97,
              letterSpacing: '0.04em',
            }}
            className="text-[#d4c68c]"
          >
            The Art of the<br />
            <em className="text-[#8a7b34]">Living Form</em>
          </h2>
          <BotanicalDivider className="w-full max-w-[480px] mx-auto mt-8" />
        </motion.div>

        {/* ── Triptych ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.55fr_1fr] gap-3 md:gap-5 items-center">

          {/* Panel 1 */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: y1 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Corners */}
              <ArtNouveauCorner className="absolute top-2 left-2  w-11 h-11 z-20 pointer-events-none" />
              <ArtNouveauCorner className="absolute top-2 right-2 w-11 h-11 z-20 pointer-events-none" flipX />
              {/* Side vines */}
              <SideVine className="absolute left-2.5 top-12 bottom-0 w-4 h-[calc(100%-3.5rem)] z-10 pointer-events-none" />
              <SideVine className="absolute right-2.5 top-12 bottom-0 w-4 h-[calc(100%-3.5rem)] z-10 pointer-events-none" flip />

              <img
                src={img1}
                alt="Art Nouveau botanical illustration"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  filter: 'sepia(55%) saturate(0.65) brightness(0.48) contrast(1.12)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, #1b160a 0%, transparent 22%, transparent 68%, #1b160a 100%)',
                }}
              />
              <div className="absolute inset-0 border border-[#8a7b34]/14 pointer-events-none" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ fontFamily: DISPLAY_FONT }}
              className="text-[#d4c68c]/22 text-sm italic text-center mt-4 tracking-wide"
            >
              I. La Flore Ornementale
            </motion.p>
          </motion.div>

          {/* Panel 2 — centre, tallest */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: y2 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden group"
              style={{ aspectRatio: '9/14' }}
            >
              {/* All four corners */}
              <ArtNouveauCorner className="absolute top-3 left-3  w-14 h-14 z-20 pointer-events-none" />
              <ArtNouveauCorner className="absolute top-3 right-3 w-14 h-14 z-20 pointer-events-none" flipX />
              <ArtNouveauCorner className="absolute bottom-3 left-3  w-14 h-14 z-20 pointer-events-none" flipY />
              <ArtNouveauCorner className="absolute bottom-3 right-3 w-14 h-14 z-20 pointer-events-none" flipX flipY />

              <img
                src={img2}
                alt="Art Nouveau floral design"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  filter: 'sepia(40%) saturate(0.72) brightness(0.44) contrast(1.18)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, #1b160a 0%, transparent 18%, transparent 78%, #1b160a 100%)',
                }}
              />

              {/* Centred text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
                <BotanicalDivider className="w-44 mb-5" />
                <p
                  style={{ fontFamily: DISPLAY_FONT }}
                  className="text-[#d4c68c]/75 text-[clamp(22px,2.8vw,34px)] font-light italic text-center leading-tight"
                >
                  Nature as<br />living art
                </p>
                <p
                  style={{ fontFamily: BODY_FONT }}
                  className="text-[#8a7b34]/55 text-[8px] tracking-[0.5em] uppercase mt-4"
                >
                  Belle Époque · Paris
                </p>
                <BotanicalDivider className="w-44 mt-5" />
              </div>

              <div className="absolute inset-0 border border-[#8a7b34]/20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Panel 3 */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: y3 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4' }}
            >
              <ArtNouveauCorner className="absolute top-2 left-2  w-11 h-11 z-20 pointer-events-none" />
              <ArtNouveauCorner className="absolute top-2 right-2 w-11 h-11 z-20 pointer-events-none" flipX />
              <SideVine className="absolute left-2.5  top-12 w-4 h-[calc(100%-3.5rem)] z-10 pointer-events-none" />
              <SideVine className="absolute right-2.5 top-12 w-4 h-[calc(100%-3.5rem)] z-10 pointer-events-none" flip />

              <img
                src={img3}
                alt="Art Nouveau ornamental botanical"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{
                  filter: 'sepia(55%) saturate(0.65) brightness(0.48) contrast(1.12)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, #1b160a 0%, transparent 22%, transparent 68%, #1b160a 100%)',
                }}
              />
              <div className="absolute inset-0 border border-[#8a7b34]/14 pointer-events-none" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ fontFamily: DISPLAY_FONT }}
              className="text-[#d4c68c]/22 text-sm italic text-center mt-4 tracking-wide"
            >
              III. Les Jardins Secrets
            </motion.p>
          </motion.div>
        </div>

        {/* ── Bottom flourish ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-24 origin-center"
        >
          <BotanicalDivider className="w-full max-w-lg mx-auto" />
        </motion.div>

        {/* ── Small caption row ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{ fontFamily: BODY_FONT }}
          className="text-[#d4c68c]/18 text-[9px] tracking-[0.35em] uppercase text-center mt-5"
        >
          Alphonse Mucha · Art Nouveau · 1898 – 1910
        </motion.p>
      </div>
    </section>
  );
}