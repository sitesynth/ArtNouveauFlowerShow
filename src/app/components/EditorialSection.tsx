import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT = "'Inter', sans-serif";

const EDITORIAL_IMG =
  'https://images.unsplash.com/photo-1634114737779-8e6168a24119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwYm91cXVldCUyMHdoaXRlJTIwcm9zZXMlMjBjaW5lbWF0aWMlMjBmb2d8ZW58MXx8fHwxNzc1MDM0NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080';
const TULIP_IMG =
  'https://images.unsplash.com/photo-1708870655564-2434e296e9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjB0dWxpcCUyMGZsb3dlciUyMGZpbmUlMjBhcnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzUwMzQ1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function EditorialSection() {
  const mainRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: mainScroll } = useScroll({
    target: mainRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: sideScroll } = useScroll({
    target: sideRef,
    offset: ['start end', 'end start'],
  });

  const mainY = useTransform(mainScroll, [0, 1], ['-12%', '12%']);
  const sideY = useTransform(sideScroll, [0, 1], ['-8%', '8%']);

  return (
    <section className="bg-[#1b160a] overflow-hidden" id="atelier">
      {/* Full-bleed hero image with parallax */}
      <div ref={mainRef} className="relative overflow-hidden" style={{ height: 'clamp(500px, 80vh, 900px)' }}>
        <motion.img
          src={EDITORIAL_IMG}
          alt="Luxury floral editorial"
          className="absolute w-full object-cover object-center"
          style={{
            y: mainY,
            top: '-12%',
            height: '124%',
          }}
          loading="lazy"
        />

        {/* Dramatic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(24,16,5,0.84) 0%, rgba(34,20,8,0.5) 40%, rgba(34,20,8,0.12) 70%, rgba(24,16,5,0.55) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(27,22,10,1) 0%, rgba(27,22,10,0) 40%)',
          }}
        />

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 max-w-lg"
        >
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#8a7b34] text-[10px] tracking-[0.45em] uppercase mb-6"
          >
            The Atelier
          </p>
          <h2
            className="text-[#d4c68c] font-light mb-6"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 'clamp(48px, 7vw, 100px)',
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: '0.03em',
            }}
          >
            A WORLD<br />
            <em className="text-[#d4c68c]/70">IN BLOOM.</em>
          </h2>
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/58 text-sm leading-relaxed max-w-xs"
          >
            Ceremony florals that dissolve the line between art and nature — designed to be felt before they are seen.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex items-center gap-4 origin-left"
          >
            <div className="w-10 h-px bg-[#8a7b34]" />
            <a
              href="#contact"
              style={{ fontFamily: BODY_FONT }}
              className="text-[#8a7b34] text-[10px] tracking-[0.35em] uppercase hover:text-[#d4c68c] transition-colors duration-400"
            >
              Begin Your Journey
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Two-column editorial feature */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: dark tulip image */}
        <div
          ref={sideRef}
          className="relative overflow-hidden"
          style={{ height: 'clamp(360px, 55vh, 680px)' }}
        >
          <motion.img
            src={TULIP_IMG}
            alt="Dark fine art tulip"
            className="absolute w-full object-cover object-center"
            style={{
              y: sideY,
              top: '-8%',
              height: '116%',
            }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(34,20,8,0.34) 0%, rgba(24,16,5,0.76) 100%)',
            }}
          />
          <div className="absolute bottom-8 left-8">
            <p
              style={{ fontFamily: DISPLAY_FONT }}
              className="text-[#d4c68c]/50 text-base italic"
            >
              "Flowers are the earth's way of laughing."
            </p>
          </div>
        </div>

        {/* Right: dark content block */}
        <div className="bg-[#221408] flex flex-col justify-center p-10 md:p-16 border-l border-[#8a7b34]/12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{ fontFamily: BODY_FONT }}
              className="text-[#8a7b34] text-[10px] tracking-[0.45em] uppercase mb-8"
            >
              Our Philosophy
            </p>
            <h3
              className="text-[#d4c68c] font-light mb-7"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: 'clamp(30px, 3.5vw, 50px)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '0.03em',
              }}
            >
              We believe beauty<br />
              <em>is a practice,</em><br />
              not an event.
            </h3>
            <p
              style={{ fontFamily: BODY_FONT }}
              className="text-[#d4c68c]/52 text-sm leading-relaxed mb-10 max-w-sm"
            >
              At Sören Van Laer, we don't just arrange flowers. We curate living moments — organic, transient, and deeply intentional. Every bloom is chosen for what it says, not just how it looks.
            </p>
            <div className="flex flex-col gap-4">
              {[
                'Seasonal & locally sourced',
                'Hand-delivered in Bornem & surroundings',
                'Custom consultation included',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-4 h-px bg-[#8a7b34]/50" />
                  <span
                    style={{ fontFamily: BODY_FONT }}
                    className="text-[#d4c68c]/58 text-xs tracking-[0.15em]"
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
