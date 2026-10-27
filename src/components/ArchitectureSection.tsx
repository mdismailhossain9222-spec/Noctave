import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site, ArchitectureItem } from '../content/site';
import { SplitText } from './motion/SplitText';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export const ArchitectureSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { addToCart, setSelectedPerfume } = useShop();

  const handleOpenItem = (item: ArchitectureItem) => {
    // Find matching collection item to inspect if needed
    const found = site.collection.find((c) => c.no === item.no);
    if (found) {
      setSelectedPerfume(found);
    }
  };

  return (
    <section id="architecture" className="relative py-28 md:py-36 bg-[#010101] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#E8B978]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-14 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#E8B978] uppercase">
                Chapter III
              </span>
              <div className="w-8 h-[1px] bg-[#E8B978]/40" />
              <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                Olfactory Architecture & Pyramids
              </span>
            </div>

            <SplitText
              text="The Structure of Noir"
              as="h2"
              className="font-garamond text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide"
            />
          </div>

          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-sm">
            Top notes dissipate in 20 minutes. Heart notes bloom for 4 hours. Base resins anchor for 14+ hours.
          </p>
        </div>

        {/* Horizontal Accordion (Desktop & Tablet) */}
        <div className="mt-12 hidden md:flex h-[560px] lg:h-[620px] w-full gap-3 overflow-hidden">
          {site.architecture.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.no}
                layout
                onClick={() => setActiveIndex(index)}
                transition={{ duration: 0.7, ease: EASE }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-500 ${
                  isActive
                    ? 'flex-[3.5] lg:flex-[4] border-[#E8B978]/70 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
                    : 'w-[72px] lg:w-[84px] border-white/10 hover:border-white/30 bg-[#0A0A0F]/60'
                }`}
              >
                {/* Background Image (Always loaded, dark overlay) */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isActive ? 'scale-100 filter brightness-60' : 'scale-110 filter brightness-30 grayscale'
                    }`}
                  />
                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Collapsed State: Vertical Name + Number */}
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between items-center py-8 z-10 select-none"
                  >
                    <span className="font-mono text-xs text-[#E8B978] tracking-widest">
                      N° {item.no}
                    </span>

                    <div className="writing-vertical -rotate-180 flex items-center justify-center my-auto">
                      <span className="font-garamond italic text-xl tracking-[0.2em] text-neutral-300 uppercase whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>

                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  </motion.div>
                )}

                {/* Active State Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute inset-0 z-20 p-8 sm:p-10 flex flex-col justify-between"
                    >
                      {/* Top Header inside card */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E8B978]/40 text-xs font-mono text-[#E8B978] tracking-widest">
                            FORMULA N° {item.no}
                          </span>
                          <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase hidden lg:inline">
                            {item.character}
                          </span>
                        </div>

                        <span className="text-xs font-mono text-[#E8B978] tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          {item.macerationWeeks} WEEKS MACERATED
                        </span>
                      </div>

                      {/* Bottom Info: Fragrance Name and Pyramid Breakdown */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-garamond italic text-4xl lg:text-5xl text-white font-light">
                            {item.name}
                          </h3>
                          <p className="text-xs font-mono text-[#E8B978] tracking-widest uppercase mt-1">
                            {item.concentration || '32% Extrait Concentration'}
                          </p>
                        </div>

                        {/* Pyramid Accord Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                          {/* Top */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#E8B978] uppercase tracking-widest">
                              <span className="w-1 h-1 rounded-full bg-[#E8B978]" />
                              <span>Top Notes (0-30m)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-200 font-garamond italic">
                              {item.top}
                            </p>
                          </div>

                          {/* Heart */}
                          <div className="space-y-1 border-x border-white/10 px-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#E8B978] uppercase tracking-widest">
                              <span className="w-1 h-1 rounded-full bg-[#E8B978]" />
                              <span>Heart (2-6h)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-200 font-garamond italic">
                              {item.heart}
                            </p>
                          </div>

                          {/* Base */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#E8B978] uppercase tracking-widest">
                              <span className="w-1 h-1 rounded-full bg-[#E8B978]" />
                              <span>Base (6-16h)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-200 font-garamond italic">
                              {item.base}
                            </p>
                          </div>
                        </div>

                        {/* Actions in expanded card */}
                        <div className="flex items-center gap-4 pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenItem(item);
                            }}
                            className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-medium hover:bg-[#E8B978] transition-colors flex items-center gap-2"
                          >
                            <span>Inspect Formula</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const colItem = site.collection.find((c) => c.no === item.no);
                              if (colItem) {
                                addToCart({
                                  name: colItem.name,
                                  size: colItem.size,
                                  price: colItem.price,
                                  image: colItem.image,
                                });
                              }
                            }}
                            className="px-5 py-2.5 rounded-full bg-black/60 hover:bg-[#E8B978]/20 border border-white/20 hover:border-[#E8B978] text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 backdrop-blur-md"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#E8B978]" />
                            <span>Acquire</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Accordion View (Stacked) */}
        <div className="mt-8 space-y-4 md:hidden">
          {site.architecture.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.no}
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isActive ? 'border-[#E8B978] bg-[#0A0A0F]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <div className="p-5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#E8B978]">N° {item.no}</span>
                    <h3 className="font-garamond italic text-2xl text-white">{item.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {isActive ? '−' : '+'}
                  </span>
                </div>

                {isActive && (
                  <div className="p-5 pt-0 space-y-4 border-t border-white/10">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-3">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-mono text-[#E8B978] uppercase text-[10px] block">
                          Top Notes
                        </span>
                        <p className="font-garamond italic text-base text-neutral-200">{item.top}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[#E8B978] uppercase text-[10px] block">
                          Heart Notes
                        </span>
                        <p className="font-garamond italic text-base text-neutral-200">{item.heart}</p>
                      </div>
                      <div>
                        <span className="font-mono text-[#E8B978] uppercase text-[10px] block">
                          Base Notes
                        </span>
                        <p className="font-garamond italic text-base text-neutral-200">{item.base}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenItem(item);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-widest text-center"
                      >
                        Inspect Formula
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
