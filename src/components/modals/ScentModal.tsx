import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { site } from '../../content/site';
import { X, ShoppingBag, Sparkles, ShieldCheck, Flame, Droplets, Clock } from 'lucide-react';

export const ScentModal: React.FC = () => {
  const { selectedPerfume, setSelectedPerfume, addToCart } = useShop();

  if (!selectedPerfume) return null;

  // Find architecture details for top/heart/base
  const arch = site.architecture.find((a) => a.no === selectedPerfume.no);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPerfume(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-4xl bg-[#0A0A0F] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPerfume(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 text-neutral-400 hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Column: Flacon Photography */}
            <div className="md:col-span-5 bg-black/50 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative">
              <div className="flex items-center justify-between text-xs font-mono text-[#E8B978]">
                <span>FORMULATION N° {selectedPerfume.no}</span>
                <span className="text-neutral-400">{selectedPerfume.size}</span>
              </div>

              <div className="my-6 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black">
                <img
                  src={selectedPerfume.image}
                  alt={selectedPerfume.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="space-y-2 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="w-3 h-3 text-[#E8B978]" />
                    <span>Concentration</span>
                  </span>
                  <span className="text-white">{selectedPerfume.concentration || '32% Extrait'}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#E8B978]" />
                    <span>Longevity</span>
                  </span>
                  <span className="text-white">{selectedPerfume.longevity || '14+ Hours'}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-[#E8B978]" />
                    <span>Sillage</span>
                  </span>
                  <span className="text-white">{selectedPerfume.sillage || 'Intoxicating'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial & Olfactive Architecture */}
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase block">
                    Extrait de Parfum
                  </span>
                  <h3 className="font-garamond italic text-3xl sm:text-4xl text-white mt-1">
                    {selectedPerfume.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#E8B978] mt-1">
                    {selectedPerfume.notes}
                  </p>
                </div>

                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  {selectedPerfume.description || selectedPerfume.tagline}
                </p>

                {/* Accords Pills */}
                {selectedPerfume.accords && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedPerfume.accords.map((accord) => (
                      <span
                        key={accord}
                        className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-wider text-neutral-300"
                      >
                        {accord}
                      </span>
                    ))}
                  </div>
                )}

                {/* Pyramid Breakdown */}
                {arch && (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                      Architectural Note Stages
                    </span>
                    <div className="space-y-2.5 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-baseline justify-between">
                        <span className="text-[#E8B978] text-[10px] uppercase w-20">Top</span>
                        <span className="text-neutral-200 font-garamond italic text-sm flex-1 text-right">
                          {arch.top}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-baseline justify-between">
                        <span className="text-[#E8B978] text-[10px] uppercase w-20">Heart</span>
                        <span className="text-neutral-200 font-garamond italic text-sm flex-1 text-right">
                          {arch.heart}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-baseline justify-between">
                        <span className="text-[#E8B978] text-[10px] uppercase w-20">Base</span>
                        <span className="text-neutral-200 font-garamond italic text-sm flex-1 text-right">
                          {arch.base}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Application Ritual Guide */}
                <div className="pt-3 border-t border-white/10 flex items-start gap-3 text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-[#E8B978] shrink-0 mt-0.5" />
                  <p className="font-light leading-relaxed">
                    Unfiltered natural macerate. Dispense sparingly to inner wrist pulses and collar hollows after twilight.
                  </p>
                </div>
              </div>

              {/* Purchase CTA Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    addToCart({
                      name: selectedPerfume.name,
                      size: selectedPerfume.size,
                      price: selectedPerfume.price,
                      image: selectedPerfume.image,
                    });
                    setSelectedPerfume(null);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#E8B978] hover:bg-white text-black font-mono text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire {selectedPerfume.size} · {selectedPerfume.price}</span>
                </button>

                <button
                  onClick={() => {
                    addToCart({
                      name: `${selectedPerfume.name} (Sample)`,
                      size: '3ml Extrait Vial',
                      price: '$18',
                      image: selectedPerfume.image,
                      isSample: true,
                    });
                    setSelectedPerfume(null);
                  }}
                  className="py-3.5 px-5 rounded-full bg-white/[0.05] hover:bg-white/10 text-neutral-200 font-mono text-xs uppercase tracking-widest border border-white/15 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E8B978]" />
                  <span>Sample · $18</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
