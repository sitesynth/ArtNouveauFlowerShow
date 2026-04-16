import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT = "'Inter', sans-serif";

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  description: string;
  image: string;
  accent: string;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'nuit',
    name: 'La Nuit',
    subtitle: 'De Nachtcollectie',
    tag: '01',
    description: 'Dramatische composities in diep bordeauxrood, obsidiaan en middernachtsbloei.',
    image: 'https://images.unsplash.com/photo-1725784055171-1888e4d61980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29keSUyMHBlb255JTIwZmxvd2VyJTIwY2xvc2UlMjB1cCUyMGRhcmslMjBhdG1vc3BoZXJpY3xlbnwxfHx8fDE3NzUwMzQ1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    accent: '#3a2411',
  },
  {
    id: 'aube',
    name: "L'Aube",
    subtitle: 'De Dageraadicollectie',
    tag: '02',
    description: 'Zachte, lichtende schikkingen die het eerste ochtendlicht vangen.',
    image: 'https://images.unsplash.com/photo-1666865997281-8d4af466b5bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmbG9yYWwlMjBhcnJhbmdlbWVudCUyMGVkaXRvcmlhbCUyMGZhc2hpb24lMjBib3VxdWV0fGVufDF8fHx8MTc3NTAzNDUzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    accent: '#8a7b34',
  },
  {
    id: 'jardin',
    name: 'Le Jardin Sauvage',
    subtitle: 'De Wilde Tuin',
    tag: '03',
    description: 'Ontembare, organische schoonheid — bloemen zoals ze bedoeld zijn.',
    image: 'https://images.unsplash.com/photo-1652540248126-371d37b428f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBvcmNoaWQlMjBkYXJrJTIwYmFja2dyb3VuZCUyMG1hY3JvJTIwZHJhbWF0aWMlMjBsaWdodHxlbnwxfHx8fDE3NzUwMzQ1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    accent: '#4a4921',
  },
];

interface CardProps {
  collection: Collection;
  index: number;
}

function CollectionCard({ collection, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 320, damping: 28 });
  const springRotY = useSpring(rotY, { stiffness: 320, damping: 28 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotX.set(-dy * 10);
    rotY.set(dx * 10);
  }, [rotX, rotY]);

  const handleMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    setHovered(false);
  }, [rotX, rotY]);

  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.0,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex-1 min-w-0"
      style={{ perspective: 900 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden cursor-pointer group"
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: 'preserve-3d',
          height: 'clamp(400px, 60vh, 620px)',
        }}
      >
        {/* Bloom reveal animation on entry */}
        <motion.div
          className="absolute inset-0 bg-[#1b160a] z-20 origin-center"
          initial={{ clipPath: 'circle(120% at 50% 50%)' }}
          animate={isInView ? { clipPath: 'circle(0% at 50% 50%)' } : {}}
          transition={{
            duration: 1.4,
            delay: index * 0.18 + 0.3,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${collection.accent}88 0%, rgba(2,12,4,0.55) 45%, rgba(2,12,4,0.1) 100%)`,
          }}
        />

        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
          }}
        />

        {/* Tag */}
        <div
          className="absolute top-5 right-5 z-10"
          style={{ fontFamily: BODY_FONT }}
        >
          <span className="text-[#d4c68c]/30 text-[10px] tracking-[0.3em]">
            {collection.tag}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[#d4c68c]/45 text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: BODY_FONT }}
            >
              {collection.subtitle}
            </p>
            <h3
              className="text-[#d4c68c] font-light mb-3"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                letterSpacing: '0.05em',
              }}
            >
              {collection.name}
            </h3>

            <motion.div
              animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p
                className="text-[#d4c68c]/60 text-xs leading-relaxed mb-4"
                style={{ fontFamily: BODY_FONT }}
              >
                {collection.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-[#8a7b34]" />
                <span
                  className="text-[#8a7b34] text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: BODY_FONT }}
                >
                  Ontdekken
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Animate each word out of a clip-path mask — luxury typographic reveal
function MaskReveal({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} style={{ overflow: 'hidden', display: 'inline-block', ...style }} className={className}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CollectionSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  return (
    <section id="collections" className="bg-[#221408] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="flex items-end justify-between mb-16">
          <div>
            {/* Label — slim fade up */}
            <div style={{ overflow: 'hidden' }} className="mb-4">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: BODY_FONT }}
                className="text-[#8a7b34] text-[10px] tracking-[0.4em] uppercase"
              >
                De Collecties
              </motion.p>
            </div>

            {/* Headline — word-by-word mask reveal */}
            <h2
              className="text-[#d4c68c] font-light"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: 'clamp(38px, 5vw, 68px)',
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              {/* Line 1 — "Three worlds," */}
              <span style={{ display: 'block' }}>
                {'Drie werelden,'.split(' ').map((word, i) => (
                  <MaskReveal key={word} delay={0.15 + i * 0.1} style={{ marginRight: '0.25em' }}>
                    <span>{word}</span>
                  </MaskReveal>
                ))}
              </span>
              {/* Line 2 — "one atelier." */}
              <span style={{ display: 'block' }}>
                <em>
                  {'één atelier.'.split(' ').map((word, i) => (
                    <MaskReveal key={word} delay={0.35 + i * 0.12} style={{ marginRight: '0.25em' }}>
                      <span>{word}</span>
                    </MaskReveal>
                  ))}
                </em>
              </span>
            </h2>
          </div>

          {/* Decorative line — draws in from right */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block w-32 h-px bg-[#d4c68c]/15 origin-right"
          />
        </div>

        {/* Cards grid */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.id} collection={col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}