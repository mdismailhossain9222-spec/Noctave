import React from 'react';
import { motion } from 'framer-motion';
import { site } from '../content/site';
import { SplitText } from './motion/SplitText';
import { ClipImage } from './motion/ClipImage';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight, Clock } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const { setSelectedArticle } = useShop();

  return (
    <section id="journal" className="relative py-28 md:py-36 bg-[#010101] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#E8B978]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#E8B978] uppercase">
                Chapter IV
              </span>
              <div className="w-8 h-[1px] bg-[#E8B978]/40" />
              <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                {site.journal.volume}
              </span>
            </div>

            <SplitText
              text="The Nocturnal Gazette"
              as="h2"
              className="font-garamond text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide"
            />
          </div>

          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-sm">
            Dispatches from the atelier, raw ingredient expeditions, and essays on olfactory memory.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {site.journal.entries.map((entry, index) => {
            const isImageTop = entry.layout === 'image-top';
            const isTextTop = entry.layout === 'text-top';
            const isFeature = entry.layout === 'feature';
            const isSplit = entry.layout === 'split';

            // Feature layout: span 2 cols on md
            if (isFeature) {
              return (
                <motion.article
                  key={entry.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.9, delay: index * 0.1 }}
                  onClick={() => setSelectedArticle(entry)}
                  className="md:col-span-2 group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-[#E8B978]/60 bg-[#0A0A0F] transition-all duration-500 shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
                      <ClipImage
                        src={entry.image}
                        alt={entry.title}
                        aspectRatio="h-full w-full"
                        className="w-full h-full"
                        hoverEffect={true}
                      />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-mono tracking-widest text-[#E8B978] uppercase">
                        Featured Essay
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-12 space-y-5">
                      <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-[#E8B978]">
                          <Clock className="w-3.5 h-3.5" />
                          {entry.read}
                        </span>
                        <span>·</span>
                        <span>{entry.date || 'Atelier Dispatch'}</span>
                      </div>

                      <h3 className="font-garamond italic text-3xl sm:text-4xl text-white group-hover:text-[#E8B978] transition-colors duration-300 leading-snug">
                        {entry.title}
                      </h3>

                      <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                        {entry.excerpt}
                      </p>

                      <div className="pt-4 flex items-center gap-2 text-xs font-mono text-[#E8B978] tracking-widest uppercase">
                        <span>Read Full Dispatch</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            }

            // Split layout or standard cards
            return (
              <motion.article
                key={entry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, delay: index * 0.1 }}
                onClick={() => setSelectedArticle(entry)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-[#E8B978]/60 bg-[#0A0A0F] transition-all duration-500 flex flex-col justify-between hover:shadow-[0_10px_35px_-10px_rgba(232,185,120,0.15)]"
              >
                {/* Image Top Layout */}
                {isImageTop && (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                      <ClipImage
                        src={entry.image}
                        alt={entry.title}
                        aspectRatio="aspect-[16/10]"
                        hoverEffect={true}
                      />
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-[#E8B978]">
                          <Clock className="w-3.5 h-3.5" />
                          {entry.read}
                        </span>
                        <span>{entry.date || 'Vol. 01'}</span>
                      </div>

                      <h3 className="font-garamond italic text-2xl sm:text-3xl text-white group-hover:text-[#E8B978] transition-colors duration-300 leading-snug">
                        {entry.title}
                      </h3>

                      <p className="text-neutral-400 text-sm font-light leading-relaxed line-clamp-3">
                        {entry.excerpt}
                      </p>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-[#E8B978] transition-colors">
                        <span className="tracking-widest uppercase">Read Story</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </>
                )}

                {/* Text Top Layout */}
                {isTextTop && (
                  <>
                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-[#E8B978]">
                          <Clock className="w-3.5 h-3.5" />
                          {entry.read}
                        </span>
                        <span>{entry.date || 'Vol. 01'}</span>
                      </div>

                      <h3 className="font-garamond italic text-2xl sm:text-3xl text-white group-hover:text-[#E8B978] transition-colors duration-300 leading-snug">
                        {entry.title}
                      </h3>

                      <p className="text-neutral-400 text-sm font-light leading-relaxed line-clamp-3">
                        {entry.excerpt}
                      </p>
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden border-t border-white/10">
                      <ClipImage
                        src={entry.image}
                        alt={entry.title}
                        aspectRatio="aspect-[16/10]"
                        hoverEffect={true}
                        direction="top"
                      />
                    </div>
                  </>
                )}

                {/* Split layout fallback */}
                {isSplit && (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                      <ClipImage
                        src={entry.image}
                        alt={entry.title}
                        aspectRatio="aspect-[16/10]"
                        hoverEffect={true}
                      />
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-[#E8B978]">
                          <Clock className="w-3.5 h-3.5" />
                          {entry.read}
                        </span>
                        <span>{entry.date || 'Vol. 01'}</span>
                      </div>

                      <h3 className="font-garamond italic text-2xl sm:text-3xl text-white group-hover:text-[#E8B978] transition-colors duration-300 leading-snug">
                        {entry.title}
                      </h3>

                      <p className="text-neutral-400 text-sm font-light leading-relaxed line-clamp-3">
                        {entry.excerpt}
                      </p>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-[#E8B978] transition-colors">
                        <span className="tracking-widest uppercase">Read Story</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
