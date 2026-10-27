import React from 'react';
import { motion } from 'framer-motion';
import { site } from '../content/site';
import { SplitText } from './motion/SplitText';
import { ClipImage } from './motion/ClipImage';
import { Compass, Feather, Clock } from 'lucide-react';

export const HouseSection: React.FC = () => {
  return (
    <section id="house" className="relative py-28 md:py-36 bg-[#010101] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#E8B978]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-16 border-b border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs tracking-[0.3em] text-[#E8B978] uppercase">
              Chapter II
            </span>
            <div className="w-8 h-[1px] bg-[#E8B978]/40" />
            <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
              The Noctavé House & Atelier
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SplitText
              text="The Philosophy of the Dark"
              as="h2"
              className="font-garamond text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide max-w-2xl"
            />
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest max-w-sm">
              We do not formulate for daylight. Our compositions are built for temperatures below dusk.
            </p>
          </div>
        </div>

        {/* Chapters Editorial Stream */}
        <div className="mt-16 space-y-28 md:space-y-36">
          {site.house.map((chapter) => {
            // Chapter I: Image Left (60%), Text Right (40%)
            if (chapter.imagePosition === 'left') {
              return (
                <div
                  key={chapter.chapter}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Image 60% (7 cols on lg) */}
                  <div className="lg:col-span-7">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ClipImage
                        src={chapter.image}
                        alt={chapter.title}
                        aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                        hoverEffect={true}
                        direction="left"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-neutral-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                        <span className="flex items-center gap-2">
                          <Compass className="w-3 h-3 text-[#E8B978]" />
                          <span>{chapter.location || 'Paris Atelier'}</span>
                        </span>
                        <span className="text-neutral-400">{chapter.year || 'Est. 2021'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text 40% (5 cols on lg) */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1 }}
                    className="lg:col-span-5 flex flex-col justify-center space-y-6"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest text-[#E8B978] uppercase">
                        Section {chapter.chapter}
                      </span>
                      <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                        {chapter.title}
                      </span>
                    </div>

                    <h3 className="font-garamond italic text-3xl sm:text-4xl text-white font-light leading-snug">
                      {chapter.heading}
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                      {chapter.body}
                    </p>

                    {chapter.quote && (
                      <div className="border-l-2 border-[#E8B978] pl-5 py-2 my-2">
                        <p className="font-garamond italic text-xl sm:text-2xl text-[#E8B978] leading-relaxed">
                          "{chapter.quote}"
                        </p>
                      </div>
                    )}

                    {chapter.extraDetails && (
                      <p className="text-xs font-mono text-neutral-500 tracking-wider">
                        {chapter.extraDetails}
                      </p>
                    )}
                  </motion.div>
                </div>
              );
            }

            // Chapter II: Image Right (60%), Text Left (40%)
            if (chapter.imagePosition === 'right') {
              return (
                <div
                  key={chapter.chapter}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Text 40% (5 cols on lg) - comes first on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1 }}
                    className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[10px] font-mono tracking-widest text-[#E8B978] uppercase">
                        Section {chapter.chapter}
                      </span>
                      <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                        {chapter.title}
                      </span>
                    </div>

                    <h3 className="font-garamond italic text-3xl sm:text-4xl text-white font-light leading-snug">
                      {chapter.heading}
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                      {chapter.body}
                    </p>

                    {chapter.quote && (
                      <div className="border-l-2 border-[#E8B978] pl-5 py-2 my-2">
                        <p className="font-garamond italic text-xl sm:text-2xl text-[#E8B978] leading-relaxed">
                          "{chapter.quote}"
                        </p>
                      </div>
                    )}

                    {chapter.extraDetails && (
                      <p className="text-xs font-mono text-neutral-500 tracking-wider">
                        {chapter.extraDetails}
                      </p>
                    )}
                  </motion.div>

                  {/* Image 60% (7 cols on lg) */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ClipImage
                        src={chapter.image}
                        alt={chapter.title}
                        aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                        hoverEffect={true}
                        direction="right"
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-neutral-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                        <span className="flex items-center gap-2">
                          <Compass className="w-3 h-3 text-[#E8B978]" />
                          <span>{chapter.location || 'Assam & Grasse'}</span>
                        </span>
                        <span className="text-neutral-400">{chapter.year || 'Raw Harvest'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Chapter III: Large full-bleed image with signature
            return (
              <div key={chapter.chapter} className="relative rounded-3xl overflow-hidden border border-white/10">
                <div className="relative min-h-[480px] md:min-h-[580px] w-full flex items-end">
                  {/* Full image backdrop */}
                  <div className="absolute inset-0">
                    <ClipImage
                      src={chapter.image}
                      alt={chapter.title}
                      aspectRatio="h-full w-full"
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover filter brightness-75 contrast-110"
                      direction="bottom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />
                  </div>

                  {/* Editorial Content Overlay */}
                  <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-3xl space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded bg-black/50 border border-white/15 text-[10px] font-mono tracking-widest text-[#E8B978] uppercase backdrop-blur-md">
                        Section {chapter.chapter}
                      </span>
                      <span className="text-xs font-mono tracking-widest text-neutral-300 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E8B978]" />
                        {chapter.title}
                      </span>
                    </div>

                    <h3 className="font-garamond italic text-3xl sm:text-5xl text-white font-light leading-tight">
                      {chapter.heading}
                    </h3>

                    <p className="text-neutral-200 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
                      {chapter.body}
                    </p>

                    {chapter.signature && (
                      <div className="pt-4 flex items-center gap-3 text-sm sm:text-base font-garamond italic text-[#E8B978]">
                        <Feather className="w-4 h-4 text-[#E8B978]" />
                        <span className="tracking-wide">{chapter.signature}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
