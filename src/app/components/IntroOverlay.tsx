import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PetalCanvas } from './PetalCanvas';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1b160a] flex flex-col items-center justify-center overflow-hidden"
          exit={{
            y: '-100%',
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <PetalCanvas className="absolute inset-0 w-full h-full" count={45} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-px bg-[#8a7b34]"
            />
            <motion.h1
              style={{ fontFamily: DISPLAY_FONT }}
              initial={{ opacity: 0, letterSpacing: '0.25em' }}
              animate={{ opacity: 1, letterSpacing: '0.65em' }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#d4c68c] text-2xl md:text-4xl font-light tracking-[0.3em] pr-[0.3em]"
            >
              SÖREN VAN LAER
            </motion.h1>
            <motion.p
              style={{ fontFamily: DISPLAY_FONT }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: 'easeOut' }}
              className="text-[#d4c68c] text-xs tracking-[0.35em] uppercase font-light"
            >
              Bloematelier
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-px bg-[#8a7b34]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}