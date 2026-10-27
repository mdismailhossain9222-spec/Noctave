import React from 'react';
import { motion } from 'framer-motion';
import { site } from '../content/site';
import { useLenis } from '../context/LenisContext';
import { useShop } from '../context/ShopContext';
import { SplitText } from './motion/SplitText';
import { Calendar, ShoppingBag, Sparkles } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

export const CtaSection: React.FC = () => {
  const { scrollTo } = useLenis();
  const { setIsBookingOpen, setIsQuizOpen } = useShop();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#010101] py-24 sm:py-32">
      {/* Reused Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={site.hero.poster}
          className="w-full h-full object-cover object-center filter brightness-50 contrast-125"
        >
          <source src={site.hero.videoUrl} type="video/mp4" />
          <img src={site.hero.poster} alt="Noctavé Background" className="w-full h-full object-cover" />
        </video>

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-black/70 to-[#010101]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,185,120,0.08)_0%,rgba(1,1,1,0.85)_100%)]" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#E8B978]/30 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8B978]" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#E8B978] uppercase">
            Private Olfactory Consultations
          </span>
        </motion.div>

        {/* Title */}
        <SplitText
          text={site.cta.title}
          as="h2"
          className="font-garamond italic text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-tight text-center justify-center"
        />

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed text-center"
        >
          {site.cta.subtext}
        </motion.p>

        {/* 2 Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Primary: Book a Session */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#E8B978] text-black font-mono text-xs uppercase tracking-[0.22em] font-medium hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(232,185,120,0.35)] flex items-center justify-center gap-3"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>{site.cta.primary}</span>
          </button>

          {/* Secondary: Shop the Collection */}
          <button
            onClick={() => scrollTo('#collection', { offset: -40 })}
            className="w-full sm:w-auto px-8 py-4 rounded-full liquid-glass hover:bg-white/10 text-white font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-white/20 hover:border-white/50 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8B978]" />
            <span>{site.cta.secondary}</span>
          </button>
        </motion.div>

        {/* Interactive Scent Quiz Prompt */}
        <div className="mt-8">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="text-xs font-mono text-neutral-400 hover:text-[#E8B978] tracking-widest uppercase transition-colors underline underline-offset-4 decoration-neutral-700 hover:decoration-[#E8B978]"
          >
            Or take our 60-second Scent Diagnostic Quiz →
          </button>
        </div>
      </div>
    </section>
  );
};
