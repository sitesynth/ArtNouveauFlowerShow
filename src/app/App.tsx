import '../styles/fonts.css';
import { CartProvider }       from './components/CartContext';
import { CartDrawer }         from './components/CartDrawer';
import { IntroOverlay }       from './components/IntroOverlay';
import { Navigation }         from './components/Navigation';
import { HeroSection }        from './components/HeroSection';
import { MarqueeSection }     from './components/MarqueeSection';
import { CollectionSection }  from './components/CollectionSection';
import { ShopSection }        from './components/ShopSection';
import { ArtNouveauSection }  from './components/ArtNouveauSection';
import { ManifestoSection }   from './components/ManifestoSection';
import { ServicesSection }    from './components/ServicesSection';
import { EditorialSection }   from './components/EditorialSection';
import { ContactSection }     from './components/ContactSection';
import { RecordBouquetPage }  from './components/RecordBouquetPage';

// Dev-only: open /?record=1 to export bouquet-mobile.webm
const isRecordMode = new URLSearchParams(window.location.search).get('record') === '1';

export default function App() {
  if (isRecordMode) return <RecordBouquetPage />;

  return (
    <CartProvider>
      <div className="bg-[#1b160a] overflow-x-hidden" style={{ cursor: 'default' }}>
        <IntroOverlay />
        <Navigation />
        <CartDrawer />

        <HeroSection />
        <MarqueeSection />
        <CollectionSection />
        <ShopSection />
        <ArtNouveauSection />
        <ManifestoSection />
        <ServicesSection />
        <EditorialSection />
        <ContactSection />
      </div>
    </CartProvider>
  );
}
