import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT    = "'Inter', sans-serif";
const GOLD         = '#8a7b34';

function BotanicalRule({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0"   y1="8" x2="135" y2="8" stroke={GOLD} strokeWidth="0.5" opacity="0.3"/>
      <line x1="165" y1="8" x2="300" y2="8" stroke={GOLD} strokeWidth="0.5" opacity="0.3"/>
      <path d="M150 2 L154 8 L150 14 L146 8Z" fill={GOLD} opacity="0.5"/>
      <path d="M137 7 Q140 3 143 7" stroke={GOLD} strokeWidth="0.5" fill="none" opacity="0.35"/>
      <path d="M157 7 Q160 3 163 7" stroke={GOLD} strokeWidth="0.5" fill="none" opacity="0.35"/>
    </svg>
  );
}

export function CartDrawer() {
  const { items, removeItem, updateQty, total, itemCount, isOpen, closeCart, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      clearCart();
      closeCart();
      setOrdered(false);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#1b160a]/70 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[420px] bg-[#1b160a] flex flex-col border-l border-[#d4c68c]/6"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-8 pb-6 border-b border-[#d4c68c]/6">
              <div>
                <p
                  style={{ fontFamily: BODY_FONT }}
                  className="text-[#8a7b34] text-[9px] tracking-[0.5em] uppercase mb-1"
                >
                  Votre Sélection
                </p>
                <h2
                  style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(22px,2.5vw,28px)', fontWeight: 300, letterSpacing: '0.06em' }}
                  className="text-[#d4c68c]"
                >
                  Panier
                  {itemCount > 0 && (
                    <span className="text-[#8a7b34] ml-2 text-lg">({itemCount})</span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 border border-[#d4c68c]/12 flex items-center justify-center text-[#d4c68c]/40 hover:text-[#d4c68c] hover:border-[#d4c68c]/30 transition-all duration-300"
                aria-label="Fermer"
              >
                <X size={15} strokeWidth={1.2} />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-0">
              <AnimatePresence initial={false}>
                {items.length === 0 && !ordered ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-52 gap-5"
                  >
                    <ShoppingBag size={28} strokeWidth={0.8} className="text-[#d4c68c]/15" />
                    <p
                      style={{ fontFamily: DISPLAY_FONT }}
                      className="text-[#d4c68c]/25 text-lg italic"
                    >
                      Votre panier est vide
                    </p>
                    <BotanicalRule className="w-32" />
                  </motion.div>
                ) : ordered ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-52 gap-5"
                  >
                    <BotanicalRule className="w-32" />
                    <p
                      style={{ fontFamily: DISPLAY_FONT }}
                      className="text-[#d4c68c]/70 text-xl italic text-center"
                    >
                      Merci pour votre confiance.
                    </p>
                    <p
                      style={{ fontFamily: BODY_FONT }}
                      className="text-[#d4c68c]/30 text-xs tracking-[0.2em] text-center"
                    >
                      Nous vous contacterons sous 24h.
                    </p>
                    <BotanicalRule className="w-32" />
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-4 py-5 border-b border-[#d4c68c]/5"
                    >
                      {/* Image */}
                      <div className="relative w-16 h-20 shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          style={{ filter: 'sepia(20%) brightness(0.7)' }}
                        />
                        <div className="absolute inset-0 border border-[#8a7b34]/12" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <p
                            style={{ fontFamily: BODY_FONT }}
                            className="text-[#8a7b34]/60 text-[9px] tracking-[0.3em] uppercase mb-0.5"
                          >
                            {item.subtitle}
                          </p>
                          <p
                            style={{ fontFamily: DISPLAY_FONT, letterSpacing: '0.04em' }}
                            className="text-[#d4c68c] text-base font-light"
                          >
                            {item.name}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty controls */}
                          <div className="flex items-center border border-[#d4c68c]/10">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#d4c68c]/40 hover:text-[#d4c68c] transition-colors duration-200"
                            >
                              <Minus size={11} strokeWidth={1.5} />
                            </button>
                            <span
                              style={{ fontFamily: BODY_FONT }}
                              className="w-7 text-center text-[#d4c68c]/70 text-xs"
                            >
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#d4c68c]/40 hover:text-[#d4c68c] transition-colors duration-200"
                            >
                              <Plus size={11} strokeWidth={1.5} />
                            </button>
                          </div>

                          <p
                            style={{ fontFamily: BODY_FONT }}
                            className="text-[#d4c68c]/60 text-sm"
                          >
                            €{(item.price * item.qty).toFixed(0)}
                          </p>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#d4c68c]/20 hover:text-[#d4c68c]/60 transition-colors duration-200"
                            aria-label="Supprimer"
                          >
                            <Trash2 size={13} strokeWidth={1.2} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && !ordered && (
              <div className="px-7 pt-5 pb-8 border-t border-[#d4c68c]/6">
                <BotanicalRule className="w-full mb-5" />

                {/* Subtotal */}
                <div className="flex justify-between items-baseline mb-2">
                  <span
                    style={{ fontFamily: BODY_FONT }}
                    className="text-[#d4c68c]/40 text-[10px] tracking-[0.25em] uppercase"
                  >
                    Sous-total
                  </span>
                  <span
                    style={{ fontFamily: DISPLAY_FONT, fontSize: '20px', fontWeight: 300 }}
                    className="text-[#d4c68c]"
                  >
                    €{total.toFixed(0)}
                  </span>
                </div>

                <p
                  style={{ fontFamily: BODY_FONT }}
                  className="text-[#d4c68c]/22 text-[10px] tracking-[0.15em] mb-7"
                >
                  Livraison calculée à l'étape suivante · Bruxelles & environs
                </p>

                {/* Order button */}
                <button
                  onClick={handleOrder}
                  style={{ fontFamily: BODY_FONT }}
                  className="w-full bg-[#8a7b34] text-[#1b160a] text-[10px] tracking-[0.4em] uppercase font-medium py-4 hover:bg-[#d4c68c] transition-colors duration-400"
                >
                  Commander
                </button>

                <button
                  onClick={closeCart}
                  style={{ fontFamily: BODY_FONT }}
                  className="w-full mt-3 text-[#d4c68c]/30 text-[10px] tracking-[0.3em] uppercase hover:text-[#d4c68c]/60 transition-colors duration-300 py-2"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}