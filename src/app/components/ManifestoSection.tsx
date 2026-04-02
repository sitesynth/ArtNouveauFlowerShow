import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';

const DISPLAY_FONT = "'Zaslia', 'Cormorant Garamond', Georgia, serif";
const BODY_FONT = "'Inter', sans-serif";

const MANIFESTO_LINE1 = 'EVERY ARRANGEMENT IS AN ACT'.split(' ');
const MANIFESTO_LINE2 = 'OF DEVOTION TO THE FLEETING.'.split(' ');
const ALL_WORDS = [...MANIFESTO_LINE1, ...MANIFESTO_LINE2];

const BG_IMG = '/BG.png';

export function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      const idx = Math.floor(val * ALL_WORDS.length * 1.35) - 1;
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#221408] py-32 md:py-44 px-6 md:px-16 overflow-hidden"
    >
      {/* Very faint background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_IMG}
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.18]"
          loading="lazy"
        />
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(6,6,8,0.9) 100%)',
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: BODY_FONT }}
          className="text-[#8a7b34] text-[10px] tracking-[0.45em] uppercase mb-16 md:mb-20"
        >
          Our Manifesto
        </motion.p>

        {/* Word-by-word reveal */}
        <div
          style={{ fontFamily: DISPLAY_FONT }}
          className="max-w-5xl"
        >
          {/* Line 1 */}
          <p
            className="flex flex-wrap gap-x-4 gap-y-1 mb-2"
            aria-label={MANIFESTO_LINE1.join(' ')}
          >
            {MANIFESTO_LINE1.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  opacity: activeIndex >= i ? 1 : 0.12,
                  y: activeIndex >= i ? 0 : 8,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(38px, 6vw, 88px)',
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: '#d4c68c',
                }}
              >
                {word}
              </motion.span>
            ))}
          </p>

          {/* Line 2 */}
          <p
            className="flex flex-wrap gap-x-4 gap-y-1"
            aria-label={MANIFESTO_LINE2.join(' ')}
          >
            {MANIFESTO_LINE2.map((word, i) => {
              const gi = i + MANIFESTO_LINE1.length;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{
                    opacity: activeIndex >= gi ? 1 : 0.12,
                    y: activeIndex >= gi ? 0 : 8,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: 'clamp(38px, 6vw, 88px)',
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                    color: i === MANIFESTO_LINE2.length - 1 ? '#8a7b34' : '#d4c68c',
                    fontStyle: i >= 3 ? 'italic' : 'normal',
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 flex items-center gap-8"
        >
          <div className="w-12 h-px bg-[#8a7b34]/50" />
          <p
            style={{ fontFamily: DISPLAY_FONT }}
            className="text-[#d4c68c]/35 text-lg md:text-xl font-light italic"
          >
            — Sören Van Laer, Gent
          </p>
        </motion.div>
      </div>
    </section>
  );
}