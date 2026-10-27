import React from 'react';
import { LenisProvider } from './context/LenisContext';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import { CollectionSection } from './components/CollectionSection';
import { HouseSection } from './components/HouseSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { JournalSection } from './components/JournalSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ScentModal } from './components/modals/ScentModal';
import { BookingModal } from './components/modals/BookingModal';
import { JournalModal } from './components/modals/JournalModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { QuizModal } from './components/modals/QuizModal';

export const App: React.FC = () => {
  return (
    <LenisProvider>
      <ShopProvider>
        <div className="min-h-screen bg-[#010101] text-white selection:bg-[#E8B978]/30 selection:text-[#E8B978] antialiased">
          {/* Glass Navbar */}
          <Navbar />

          <main id="main-content">
            {/* 01 Hero Section */}
            <Hero />

            {/* 02 Collection Section (Horizontal Scroll) */}
            <CollectionSection />

            {/* 03 House Section (Editorial Magazine) */}
            <HouseSection />

            {/* 04 Architecture Section (Horizontal Accordion) */}
            <ArchitectureSection />

            {/* 05 Journal Section (2-Column Grid) */}
            <JournalSection />

            {/* 06 CTA Section */}
            <CtaSection />
          </main>

          {/* 06 Footer */}
          <Footer />

          {/* Interactive Modals and Drawers */}
          <ScentModal />
          <BookingModal />
          <JournalModal />
          <CartDrawer />
          <QuizModal />
        </div>
      </ShopProvider>
    </LenisProvider>
  );
};

export default App;
