import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

const DISPLAY_FONT = "'Cormorant Garamond', Georgia, serif";
const BODY_FONT    = "'Inter', sans-serif";
const GOLD         = '#8a7b34';

/* ─── Product catalogue ─────────────────────────────────────────── */
interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  tag?: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'noir-sauvage',
    name: 'Noir Sauvage',
    subtitle: 'Bouquet de Pivoines',
    category: 'bouquets',
    price: 85,
    unit: 'pièce',
    description: 'Compositions en pivoine profonde, fumée et feuillage sombre. Cueillie le matin même.',
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1623183073884-84163e7b857d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkYXJrJTIwcGVvbnklMjBib3VxdWV0JTIwZWRpdG9yaWFsJTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NTAzNTk4MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'carte-blanche',
    name: 'Carte Blanche',
    subtitle: 'Roses Blanches',
    category: 'compositions',
    price: 120,
    unit: 'pièce',
    description: 'Roses blanches immaculées en arrangement monochrome, éditorial et intemporel.',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1518281518837-b381e0511676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2VzJTIwbWluaW1hbCUyMGRhcmslMjBkcmFtYXRpYyUyMGFycmFuZ2VtZW50fGVufDF8fHx8MTc3NTAzNTk4MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'brume-soir',
    name: 'Brume du Soir',
    subtitle: 'Bouquet Sauvage',
    category: 'bouquets',
    price: 65,
    unit: 'pièce',
    description: 'Fleurs des champs récoltées à la main, composition organique et non-domestiquée.',
    image: 'https://images.unsplash.com/photo-1532348259011-8b1bd3018081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkZmxvd2VyJTIwYm91cXVldCUyMGVkaXRvcmlhbCUyMG1vb2R5JTIwZGFya3xlbnwxfHx8fDE3NzUwMzU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'orchidee-noire',
    name: "L'Orchidée",
    subtitle: 'Tige Longue',
    category: 'tiges',
    price: 45,
    unit: 'tige',
    description: 'Orchidée en tige longue, moody et minimaliste — pour ceux qui savent.',
    image: 'https://images.unsplash.com/photo-1671640165735-7aedc79f6170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwb3JjaGlkJTIwc2luZ2xlJTIwc3RlbSUyMGZpbmUlMjBhcnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzUwMzU5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ranunculus-or',
    name: "Ranunculus d'Or",
    subtitle: 'Composition Belle Époque',
    category: 'compositions',
    price: 95,
    unit: 'pièce',
    description: 'Renoncules et anémones en mélange doré, évocateur des ateliers parisiens.',
    tag: 'Nouveau',
    image: 'https://images.unsplash.com/photo-1742930236570-94a76a77b808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmVtb25lJTIwcmFudW5jdWx1cyUyMGx1eHVyeSUyMGJvdXF1ZXQlMjBkYXJrJTIwc3R1ZGlvfGVufDF8fHx8MTc3NTAzNTk4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'tulipes-nuit',
    name: 'Tulipes de Nuit',
    subtitle: 'Botte de Saison',
    category: 'tiges',
    price: 48,
    unit: 'botte',
    description: 'Tulipes aux teintes profondes, récoltées avant l\'aube. Disponible en saison.',
    image: 'https://images.unsplash.com/photo-1619986878303-1063f69c57a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxpcCUyMGRhcmslMjBtb29keSUyMGNsb3NlJTIwdXAlMjBlZGl0b3JpYWwlMjBmbG93ZXJ8ZW58MXx8fHwxNzc1MDM1OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'abonnement-saison',
    name: 'Abonnement Saison',
    subtitle: 'Livraison Hebdomadaire',
    category: 'abonnements',
    price: 175,
    unit: 'mois',
    description: 'Une présence vivante dans votre espace — renouvelée chaque semaine selon la saison.',
    tag: 'Populaire',
    image: 'https://images.unsplash.com/photo-1675633273863-5a4c9341222d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZsb3dlciUyMHN1YnNjcmlwdGlvbiUyMGJveCUyMG1pbmltYWwlMjBsdXh1cnl8ZW58MXx8fHwxNzc1MDM1OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'rose-ecarlate',
    name: 'Rose Écarlate',
    subtitle: 'Roses de Jardin',
    category: 'bouquets',
    price: 75,
    unit: 'pièce',
    description: 'Roses de jardin en teintes profondes. Composition dramatique, livrée à Bruxelles.',
    image: 'https://images.unsplash.com/photo-1470690096659-6f59b9b39fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjByb3NlJTIwZGVlcCUyMHJlZCUyMGRyYW1hdGljJTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NTAzNTk4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const CATEGORIES = [
  { id: 'all',         label: 'Tout' },
  { id: 'bouquets',    label: 'Bouquets' },
  { id: 'compositions',label: 'Compositions' },
  { id: 'tiges',       label: 'Tiges' },
  { id: 'abonnements', label: 'Abonnements' },
];

/* ─── Art Nouveau tag ornament ─────────────────────────────────── */
function TagOrnament() {
  return (
    <svg viewBox="0 0 6 6" className="w-1.5 h-1.5" fill={GOLD}>
      <path d="M3 0 L6 3 L3 6 L0 3Z" />
    </svg>
  );
}

/* ─── Product card ──────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();

  const handleAdd = useCallback(() => {
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      unit: product.unit,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }, [product, addItem]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: '4/5' }}
      >
        {/* Tag */}
        {product.tag && (
          <div
            className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-[#1b160a]/80 backdrop-blur-sm"
            style={{ fontFamily: BODY_FONT }}
          >
            <TagOrnament />
            <span className="text-[#8a7b34] text-[8px] tracking-[0.35em] uppercase">
              {product.tag}
            </span>
          </div>
        )}

        {/* Image */}
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Dark gradient base */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(1,8,2,0.7) 0%, rgba(1,8,2,0.1) 45%, transparent 100%)',
          }}
        />

        {/* Hover overlay with Add button */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 flex flex-col justify-end p-5 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(1,8,2,0.88) 0%, rgba(1,8,2,0.3) 55%, transparent 100%)',
          }}
        >
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/55 text-[10px] leading-relaxed mb-4 line-clamp-2"
          >
            {product.description}
          </p>

          <motion.button
            animate={{
              y: hovered ? 0 : 12,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleAdd}
            className="pointer-events-auto flex items-center justify-between w-full bg-[#8a7b34] text-[#1b160a] px-4 py-3 hover:bg-[#d4c68c] transition-colors duration-300 group/btn"
            style={{ fontFamily: BODY_FONT }}
          >
            <span className="text-[9px] tracking-[0.35em] uppercase font-medium">
              {added ? 'Ajouté ✓' : 'Ajouter au panier'}
            </span>
            <Plus size={13} strokeWidth={2} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* Border frame */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 border border-[#8a7b34]/25 pointer-events-none"
        />
      </div>

      {/* Text info */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#8a7b34]/55 text-[9px] tracking-[0.35em] uppercase mb-1"
          >
            {product.subtitle}
          </p>
          <h3
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: 'clamp(17px, 1.8vw, 22px)',
              fontWeight: 300,
              letterSpacing: '0.04em',
            }}
            className="text-[#d4c68c] group-hover:text-[#8a7b34] transition-colors duration-400"
          >
            {product.name}
          </h3>
        </div>
        <div className="shrink-0 text-right pt-0.5">
          <p
            style={{ fontFamily: DISPLAY_FONT, fontSize: '18px', fontWeight: 300 }}
            className="text-[#d4c68c]/70"
          >
            €{product.price}
          </p>
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/28 text-[9px] tracking-[0.2em]"
          >
            / {product.unit}
          </p>
        </div>
      </div>

      {/* Underline on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 h-px bg-[#8a7b34]/35 origin-left"
      />
    </motion.div>
  );
}

/* ─── Section header ornament ───────────────────────────────────── */
function ShopDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 460 22" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0"   y1="11" x2="200" y2="11" stroke={GOLD} strokeWidth="0.5" opacity="0.22"/>
      <line x1="260" y1="11" x2="460" y2="11" stroke={GOLD} strokeWidth="0.5" opacity="0.22"/>
      <path d="M218 3 L222 11 L218 19 L214 11Z" fill={GOLD} opacity="0.45"/>
      <path d="M230 3 L234 11 L230 19 L226 11Z" fill={GOLD} opacity="0.3"/>
      <path d="M242 3 L246 11 L242 19 L238 11Z" fill={GOLD} opacity="0.45"/>
      <circle cx="204" cy="11" r="1.5" fill={GOLD} opacity="0.3"/>
      <circle cx="256" cy="11" r="1.5" fill={GOLD} opacity="0.3"/>
    </svg>
  );
}

/* ─── Main section ──────────────────────────────────────────────── */
export function ShopSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });

  const filtered =
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="boutique" className="relative bg-[#1b160a] py-28 md:py-36 overflow-hidden">

      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, ${GOLD} 0, ${GOLD} 0.5px, transparent 0.5px, transparent 96px),
            repeating-linear-gradient(90deg, ${GOLD} 0, ${GOLD} 0.5px, transparent 0.5px, transparent 96px)
          `,
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-14 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{ fontFamily: BODY_FONT }}
                className="text-[#8a7b34] text-[9px] tracking-[0.55em] uppercase mb-4"
              >
                La Boutique · Bruxelles
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 'clamp(40px, 5.5vw, 72px)',
                  fontWeight: 300,
                  lineHeight: 0.96,
                  letterSpacing: '0.03em',
                }}
                className="text-[#d4c68c]"
              >
                Commander<br />
                <em className="text-[#8a7b34]">en ligne.</em>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="flex flex-col gap-1 md:text-right"
            >
              <p style={{ fontFamily: BODY_FONT }} className="text-[#d4c68c]/35 text-xs leading-relaxed max-w-xs">
                Livraison à Bruxelles & environs · Mar–Sam
              </p>
              <a
                href="#contact"
                style={{ fontFamily: BODY_FONT }}
                className="flex items-center gap-2 md:justify-end text-[#8a7b34]/60 text-[10px] tracking-[0.3em] uppercase hover:text-[#8a7b34] transition-colors duration-300 group"
              >
                Commande sur mesure
                <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 origin-left"
          >
            <ShopDivider className="w-full max-w-lg" />
          </motion.div>
        </div>

        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex items-center gap-1 mb-12 overflow-x-auto pb-1 scrollbar-hide"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{ fontFamily: BODY_FONT }}
              className={`relative px-4 py-2 text-[10px] tracking-[0.35em] uppercase whitespace-nowrap transition-colors duration-300 ${
                activeCategory === cat.id
                  ? 'text-[#8a7b34]'
                  : 'text-[#d4c68c]/35 hover:text-[#d4c68c]/65'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-4 right-4 h-px bg-[#8a7b34]"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}

          {/* Separator */}
          <div className="flex-1 h-px bg-[#d4c68c]/6 ml-2" />
        </motion.div>

        {/* ── Product grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-y-14"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-[#d4c68c]/5"
        >
          <p
            style={{ fontFamily: BODY_FONT }}
            className="text-[#d4c68c]/22 text-[10px] tracking-[0.2em]"
          >
            Tous les bouquets sont composés à la commande · Fleurs de saison · Belgique
          </p>
          <a
            href="#contact"
            style={{ fontFamily: BODY_FONT }}
            className="flex items-center gap-3 text-[#d4c68c]/35 text-[10px] tracking-[0.3em] uppercase hover:text-[#8a7b34] transition-colors duration-300 group"
          >
            <div className="w-8 h-px bg-[#8a7b34]/40 group-hover:w-12 transition-all duration-400" />
            Demande personnalisée
          </a>
        </motion.div>
      </div>
    </section>
  );
}