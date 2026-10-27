import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '../content/site';
import { useLenis } from '../context/LenisContext';
import { useShop } from '../context/ShopContext';
import { AudioAmbient } from './AudioAmbient';
import { ShoppingBag, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollTo } = useLenis();
  const { cartCount, setIsCartOpen, setIsQuizOpen, setIsBookingOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionName: string) => {
    setMobileMenuOpen(false);
    const targetId = `#${sectionName.toLowerCase()}`;
    scrollTo(targetId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`transition-all duration-500 rounded-full px-5 py-3 flex items-center justify-between ${
              isScrolled
                ? 'liquid-glass-strong bg-black/60 shadow-2xl backdrop-blur-xl border border-white/10'
                : 'liquid-glass bg-black/25 backdrop-blur-md border border-white/5'
            }`}
          >
            {/* Brand Logo */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="group flex flex-col text-left focus:outline-none"
            >
              <span className="font-garamond text-xl sm:text-2xl tracking-[0.25em] font-normal text-white group-hover:text-[#E8B978] transition-colors duration-300 uppercase">
                {site.brand}
              </span>
              <span className="text-[8px] tracking-[0.35em] text-neutral-400 font-mono uppercase -mt-1 group-hover:text-neutral-300">
                Haute Parfumerie
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {site.nav.map((item, index) => {
                const romanIndex = ['I', 'II', 'III', 'IV'][index] || `0${index + 1}`;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="group relative text-xs font-mono tracking-[0.18em] uppercase text-neutral-300 hover:text-white transition-colors duration-300 py-1"
                  >
                    <span className="text-[10px] text-[#E8B978]/70 mr-1.5 font-mono">{romanIndex}.</span>
                    <span>{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E8B978] transition-all duration-300 group-hover:w-full" />
                  </button>
                );
              })}
            </div>

            {/* Right actions: Atmosphere Sound, Quiz finder, Consultation, Bag */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Ambient Audio Synth */}
              <AudioAmbient />

              {/* Scent Finder Quiz button */}
              <button
                onClick={() => setIsQuizOpen(true)}
                title="Find your signature noir scent"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-neutral-300 hover:text-white bg-white/[0.03] border border-white/10 hover:border-[#E8B978]/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(232,185,120,0.15)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E8B978]" />
                <span>Scent Finder</span>
              </button>

              {/* Private Consultation CTA */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="hidden xl:inline-flex items-center text-xs font-mono tracking-widest uppercase text-[#E8B978] hover:text-[#fff] px-3.5 py-1.5 rounded-full border border-[#E8B978]/30 hover:border-[#E8B978] hover:bg-[#E8B978]/10 transition-all duration-300"
              >
                Private Ritual
              </button>

              {/* Cart / Ritual Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/25 transition-all duration-300"
                aria-label="View ritual bag"
              >
                <ShoppingBag className="w-4 h-4 text-neutral-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#E8B978] text-[9px] font-bold text-black font-mono">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white bg-white/[0.04] border border-white/10"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-28 lg:hidden"
          >
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase">
                  Table of Olfactory Chapters
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                {site.nav.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center justify-between text-left py-2 text-2xl font-garamond italic text-neutral-200 hover:text-[#E8B978] transition-colors border-b border-white/5"
                  >
                    <span>{item}</span>
                    <span className="font-mono text-xs not-italic text-neutral-500">
                      0{index + 1}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-6 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsQuizOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-mono tracking-wider text-white hover:border-[#E8B978]/50"
                >
                  <Sparkles className="w-4 h-4 text-[#E8B978]" />
                  <span>Scent Match Diagnostic</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E8B978] text-black text-sm font-mono tracking-widest uppercase font-medium hover:bg-[#d9a865] transition-colors"
                >
                  <span>Book Private Session</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>{site.city}</span>
              <span>Volume 01 · 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
