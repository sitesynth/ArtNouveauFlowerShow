import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import { Logo } from './Logo';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT    = "'Inter', sans-serif";

export function Navigation() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { itemCount, openCart }   = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Boutique',    href: '#boutique'     },
    { label: 'Atelier',     href: '#atelier'      },
    { label: 'Services',    href: '#services'     },
    { label: 'Contact',     href: '#contact'      },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 md:px-12 py-5 transition-all duration-700 ${
        scrolled
          ? 'bg-[#1b160a]/90 backdrop-blur-xl border-b border-[#d4c68c]/12'
          : 'bg-transparent backdrop-blur-none border-b border-transparent'
      }`}
    >
      {/* Centred container with max-width so it never touches the corners */}
      <div className="w-full max-w-7xl flex items-center justify-between">

        {/* Logo + name — left */}
        <a href="#" className="hidden md:flex items-center gap-3 group">
          <Logo size={32} color="#8a7b34" className="group-hover:opacity-80 transition-opacity duration-500" />
          <span
            style={{ fontFamily: DISPLAY_FONT }}
            className="text-[#d4c68c] text-sm font-light tracking-[0.35em] pr-[0.35em] group-hover:text-[#8a7b34] transition-colors duration-500"
          >
            Sören Van Laer
          </span>
        </a>

        {/* Desktop links — centre */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#d4c68c]/55 text-[10px] tracking-[0.25em] uppercase font-light hover:text-[#d4c68c] transition-colors duration-400"
              style={{ fontFamily: BODY_FONT }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Cart — right of the centred block */}
        <div className="hidden md:flex items-center ml-12">
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 border border-[#8a7b34]/30 text-[#8a7b34] px-4 py-2 hover:bg-[#8a7b34]/10 hover:border-[#8a7b34] transition-all duration-400"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag size={14} strokeWidth={1.4} />
            <span style={{ fontFamily: BODY_FONT }} className="text-[10px] tracking-[0.2em] uppercase">
              Panier
            </span>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute -top-2 -right-2 bg-[#8a7b34] text-[#1b160a] rounded-full flex items-center justify-center"
                  style={{ fontFamily: BODY_FONT, fontSize: '9px', fontWeight: 600, minWidth: '18px', height: '18px' }}
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Hamburger — left */}
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-[#d4c68c]"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-[#d4c68c]"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-[#d4c68c]"
            />
          </button>

          {/* Logo — centre */}
          <a
            href="#"
            style={{ fontFamily: DISPLAY_FONT }}
            className="text-[#d4c68c] text-xl font-light tracking-[0.4em] pr-[0.4em] hover:text-[#8a7b34] transition-colors duration-500"
          >
            Sören Van Laer
          </a>

          {/* Mobile cart icon — right */}
          <button
            onClick={openCart}
            className="relative text-[#d4c68c]/60 hover:text-[#8a7b34] transition-colors duration-300"
            aria-label="Panier"
          >
            <ShoppingBag size={18} strokeWidth={1.3} />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key="badge-mobile"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute -top-1.5 -right-1.5 bg-[#8a7b34] text-[#1b160a] rounded-full flex items-center justify-center"
                  style={{ fontFamily: BODY_FONT, fontSize: '8px', fontWeight: 700, minWidth: '15px', height: '15px' }}
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu — full slide down */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: '0%' }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 right-0 bg-[#1b160a]/97 backdrop-blur-xl border-b border-[#d4c68c]/10 flex flex-col items-center gap-9 py-14 md:hidden pointer-events-auto"
            >
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: DISPLAY_FONT }}
                  className="text-[#d4c68c]/70 text-2xl tracking-[0.3em] uppercase font-light hover:text-[#d4c68c] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}