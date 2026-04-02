import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT = "'Inter', sans-serif";

interface Service {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  detail: string;
}

const SERVICES: Service[] = [
  {
    id: 'atelier',
    number: '01',
    name: 'Atelier',
    tagline: 'Bespoke Creations',
    description: 'Custom compositions designed from first conversation to final bloom.',
    detail: 'Each arrangement is a dialogue between your vision and our craft.',
  },
  {
    id: 'ceremonies',
    number: '02',
    name: 'Ceremonies',
    tagline: 'Weddings & Events',
    description: "Transforming spaces into immersive floral environments for life's most significant moments.",
    detail: 'We design the emotional atmosphere as much as the visual one.',
  },
  {
    id: 'abonnement',
    number: '03',
    name: 'Abonnement',
    tagline: 'Weekly Subscriptions',
    description: 'A living presence in your home or office — refreshed weekly with seasonal selections.',
    detail: "Because beauty shouldn't be an occasion. It should be a habit.",
  },
  {
    id: 'installations',
    number: '04',
    name: 'Installations',
    tagline: 'Art & Architecture',
    description: 'Large-scale floral art installations for galleries, hotels, and architectural spaces.',
    detail: 'Where flowers become sculpture and space becomes story.',
  },
];

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-t border-[#d4c68c]/8 py-8 md:py-10 cursor-default overflow-hidden"
    >
      {/* Hover fill line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-[#8a7b34]"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="flex items-start gap-6 md:gap-10">
        {/* Number */}
        <span
          style={{ fontFamily: BODY_FONT }}
          className="text-[#8a7b34]/40 text-[10px] tracking-[0.3em] mt-1 shrink-0 w-8"
        >
          {service.number}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-[#d4c68c] font-light mb-1"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 'clamp(26px, 3vw, 40px)',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                }}
              >
                {service.name}
              </h3>
              <p
                style={{ fontFamily: BODY_FONT }}
                className="text-[#2C5040]/70 text-[10px] tracking-[0.3em] uppercase"
              >
                {service.tagline}
              </p>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-2 w-7 h-7 border border-[#d4c68c]/15 flex items-center justify-center shrink-0"
            >
              <span className="text-[#d4c68c]/40 text-sm leading-none">+</span>
            </motion.div>
          </div>

          <motion.div
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              <p
                style={{ fontFamily: BODY_FONT }}
                className="text-[#d4c68c]/50 text-sm leading-relaxed mb-2 max-w-lg"
              >
                {service.description}
              </p>
              <p
                style={{ fontFamily: DISPLAY_FONT }}
                className="text-[#d4c68c]/30 text-base italic"
              >
                {service.detail}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  return (
    <section id="services" className="bg-[#1b160a] py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontFamily: BODY_FONT }}
              className="text-[#8a7b34] text-[10px] tracking-[0.45em] uppercase mb-4"
            >
              Our Practice
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#d4c68c] leading-tight"
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: 'clamp(38px, 5vw, 62px)',
                fontWeight: 300,
              }}
            >
              Four ways<br />
              <em>to work with us.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/38 text-sm leading-relaxed self-end max-w-md"
          >
            Each engagement begins with a conversation. We listen to what you can't quite put into words — then find the flowers that speak it for you.
          </motion.p>
        </div>

        {/* Service list */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
          <div className="border-t border-[#d4c68c]/8" />
        </div>
      </div>
    </section>
  );
}