import { useState } from 'react';
import { motion } from 'motion/react';
import { PetalCanvas } from './PetalCanvas';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT = "'Inter', sans-serif";

const FOOTER_LINKS = [
  { label: 'Collecties', href: '#collections' },
  { label: 'Boetiek',    href: '#boutique'    },
  { label: 'Atelier',    href: '#atelier'     },
  { label: 'Diensten',   href: '#services'    },
  { label: 'Contact',    href: '#contact'     },
  { label: 'Instagram',  href: '#'            },
];

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="relative bg-[#221408] overflow-hidden">
      {/* CTA block */}
      <div className="relative border-t border-[#d4c68c]/6 px-6 md:px-16 py-28 md:py-40 flex flex-col items-center text-center overflow-hidden">
        {/* Petal canvas */}
        <PetalCanvas className="absolute inset-0 w-full h-full opacity-40" count={35} />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(139,158,114,0.05) 0%, transparent 70%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#8a7b34] text-[10px] tracking-[0.45em] uppercase mb-8"
          >
            Begin Uw Verhaal
          </p>

          <h2
            className="text-[#d4c68c] font-light mb-6 max-w-3xl"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 'clamp(44px, 7vw, 96px)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '0.03em',
            }}
          >
            Laten we iets<br />
            <em className="text-[#8a7b34]">buitengewoons creëren.</em>
          </h2>

          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/35 text-sm max-w-md mb-10 leading-relaxed"
          >
            Vertel ons over uw gelegenheid, uw visie, uw gevoel — wij vinden de bloemen die dat tot leven wekken.
          </p>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row gap-10 mb-14 text-center">
            {[
              { label: 'Adres', value: 'Boomstraat 61\n2880 Bornem' },
              { label: 'Telefoon', value: '+32 (0) 476 51 75 13' },
              { label: 'E-mail', value: 'info@sorenvanlaer.com' },
              { label: 'Open', value: 'Wo – Za\n9:30 – 18:00' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span style={{ fontFamily: BODY_FONT }} className="text-[#8a7b34] text-[9px] tracking-[0.35em] uppercase">
                  {label}
                </span>
                <span style={{ fontFamily: DISPLAY_FONT }} className="text-[#d4c68c]/55 text-sm leading-relaxed whitespace-pre-line">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Email form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 w-full max-w-md"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Uw e-mailadres"
                  className="w-full bg-transparent border border-[#d4c68c]/15 text-[#d4c68c] placeholder-[#d4c68c]/25 px-5 py-4 outline-none text-sm transition-all duration-400 focus:border-[#d4c68c]/40"
                  style={{ fontFamily: BODY_FONT }}
                  required
                />
                {/* Animated bottom line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-[#8a7b34]"
                  animate={{ width: focused ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <button
                type="submit"
                style={{ fontFamily: BODY_FONT }}
                className="bg-[#8a7b34] text-[#1b160a] text-[10px] tracking-[0.3em] uppercase font-medium px-8 py-4 hover:bg-[#d4c68c] transition-colors duration-400 whitespace-nowrap"
              >
                Verzenden
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="w-6 h-px bg-[#8a7b34]" />
              <p
                style={{ fontFamily: DISPLAY_FONT }}
                className="text-[#d4c68c]/60 text-lg italic"
              >
                Dank u. We nemen binnenkort contact met u op.
              </p>
              <div className="w-6 h-px bg-[#8a7b34]" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-[#d4c68c]/6 px-6 md:px-12 py-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <a
            href="#"
            style={{ fontFamily: DISPLAY_FONT }}
            className="text-[#d4c68c]/60 text-lg tracking-[0.4em] font-light hover:text-[#d4c68c] transition-colors duration-400 pr-[0.4em]"
          >
            SÖREN VAN LAER
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontFamily: BODY_FONT }}
                className="text-[#d4c68c]/30 text-[10px] tracking-[0.25em] uppercase hover:text-[#d4c68c]/70 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/18 text-[10px] tracking-[0.15em]"
          >
            © 2026 Sören Van Laer
          </p>
        </div>
      </div>
    </footer>
  );
}