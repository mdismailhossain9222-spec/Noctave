import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { site, PerfumeItem } from '../content/site';
import { SplitText } from './motion/SplitText';
import { ClipImage } from './motion/ClipImage';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Sparkles } from 'lucide-react';

export const CollectionSection: React.FC = () => {
  const { setSelectedPerfume, addToCart } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="collection" className="relative py-28 md:py-36 bg-[#010101] overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E8B978]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            {/* Chapter marker "I" */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#E8B978] uppercase">
                Chapter I
              </span>
              <div className="w-8 h-[1px] bg-[#E8B978]/40" />
              <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                The Permanent Collection
              </span>
            </div>

            <SplitText
              text="Extraits de Parfum"
              as="h2"
              className="font-garamond text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide"
            />
          </div>

          {/* Right Controls & Info */}
          <div className="flex items-center justify-between md:justify-end gap-6">
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest hidden lg:block max-w-xs text-right">
              Crafted in small batch runs of 400 flacons per distillation.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  canScrollLeft
                    ? 'border-white/20 text-white hover:border-[#E8B978] hover:text-[#E8B978] bg-white/[0.03]'
                    : 'border-white/5 text-neutral-600 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border transition-all duration-300 ${
                  canScrollRight
                    ? 'border-white/20 text-white hover:border-[#E8B978] hover:text-[#E8B978] bg-white/[0.03]'
                    : 'border-white/5 text-neutral-600 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Snap Cards Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 focus:outline-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {site.collection.map((item, idx) => (
            <motion.div
              key={item.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="snap-start flex-none w-[82vw] sm:w-[360px] md:w-[400px] group relative rounded-2xl bg-[#0A0A0F]/80 border border-white/10 hover:border-[#E8B978]/60 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(232,185,120,0.15)]"
            >
              {/* Card Top: Number, Size, Price */}
              <div className="p-8 pb-0 flex items-center justify-between text-neutral-400 font-mono text-xs uppercase tracking-widest">
                <span className="text-[#E8B978] font-mono font-medium">N° {item.no}</span>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400">{item.size}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white font-medium">{item.price}</span>
                </div>
              </div>

              {/* Product Image Centered with 3:4 Aspect */}
              <div className="px-8 py-6 relative flex flex-col items-center justify-center">
                <div className="w-full relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40 border border-white/5 group-hover:border-white/20 transition-all duration-500">
                  <ClipImage
                    src={item.image}
                    alt={item.name}
                    aspectRatio="aspect-[3/4]"
                    hoverEffect={true}
                    className="w-full h-full"
                  />
                  
                  {/* Subtle hover inspect button */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => setSelectedPerfume(item as PerfumeItem)}
                      className="px-4 py-2.5 rounded-full bg-white text-black text-xs font-mono tracking-wider uppercase font-medium hover:bg-[#E8B978] transition-colors flex items-center gap-2 shadow-xl"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Essence</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Bottom: Name in Garamond Italic text-3xl, Notes in small caps */}
              <div className="p-8 pt-0 flex flex-col space-y-3">
                <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
                  <h3 className="font-garamond italic text-3xl sm:text-4xl text-white group-hover:text-[#E8B978] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
                    Extrait
                  </span>
                </div>

                {/* Notes in small caps / tracking */}
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8B978] font-normal">
                  {item.notes}
                </p>

                <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed pt-1">
                  {item.tagline}
                </p>

                {/* Card Action footer */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      addToCart({
                        name: item.name,
                        size: item.size,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="flex-1 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-[#E8B978] text-white hover:text-black border border-white/10 hover:border-[#E8B978] font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Acquire Flacon</span>
                  </button>

                  <button
                    onClick={() => setSelectedPerfume(item as PerfumeItem)}
                    title="View notes pyramid and details"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/10 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E8B978]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discovery Set Banner in Collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12 rounded-2xl liquid-glass border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase">
              The Nocturnal Flight · 5 × 3ml
            </span>
            <h4 className="font-garamond italic text-2xl text-white">
              Undecided? Experience the complete discovery coffret.
            </h4>
            <p className="text-xs text-neutral-400 font-light max-w-xl">
              Includes all five extraits in travel atomizers, accompanied by olfactory test strips and a $65 credit voucher redeemable against any 50ml flacon.
            </p>
          </div>

          <button
            onClick={() =>
              addToCart({
                name: 'Discovery Set (5 × 3ml)',
                size: '5 × 3ml',
                price: '$65',
                image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop',
                isSample: true,
              })
            }
            className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-medium hover:bg-[#E8B978] transition-colors whitespace-nowrap shadow-lg"
          >
            Claim Coffret · $65
          </button>
        </motion.div>
      </div>
    </section>
  );
};
