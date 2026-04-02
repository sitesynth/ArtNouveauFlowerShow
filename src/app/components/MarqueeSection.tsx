import { motion } from 'motion/react';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";

const MARQUEE_ITEMS = [
  'HAUTE FLEUR',
  '·',
  'SÖREN VAN LAER',
  '·',
  'BLOOM',
  '·',
  'CEREMONIES',
  '·',
  'BESPOKE',
  '·',
  'LIVING ART',
  '·',
  'HAUTE FLEUR',
  '·',
  'SÖREN VAN LAER',
  '·',
  'BLOOM',
  '·',
  'CEREMONIES',
  '·',
  'BESPOKE',
  '·',
  'LIVING ART',
  '·',
];

export function MarqueeSection() {
  return (
    <div className="relative bg-[#1b160a] border-y border-[#d4c68c]/6 py-6 overflow-hidden">
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1b160a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1b160a] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            style={{ fontFamily: DISPLAY_FONT }}
            className={`text-lg md:text-xl font-light tracking-[0.3em] shrink-0 ${
              item === '·' ? 'text-[#8a7b34]' : 'text-[#d4c68c]/40'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}