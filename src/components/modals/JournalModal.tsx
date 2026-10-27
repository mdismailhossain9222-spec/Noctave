import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { X, Clock, Calendar, Bookmark, Share2 } from 'lucide-react';

export const JournalModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle } = useShop();

  if (!selectedArticle) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-3xl bg-[#0A0A0F] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest">
              <span className="text-[#E8B978]">The Nocturnal Gazette</span>
              <span>·</span>
              <span>Vol. 01 / 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Article link copied to clipboard.');
                }}
                className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white border border-white/10 transition-colors"
                title="Share article"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close article"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Article Scroll Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-[#E8B978]">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.read}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedArticle.date || 'October 2025'}
                </span>
                <span>By {selectedArticle.author || 'Aurélien Voss'}</span>
              </div>

              <h1 className="font-garamond italic text-3xl sm:text-5xl text-white font-light leading-tight">
                {selectedArticle.title}
              </h1>

              {selectedArticle.tags && (
                <div className="flex gap-2 pt-1">
                  {selectedArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-wider text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover filter brightness-90"
              />
            </div>

            {/* Excerpt / Lead */}
            <p className="font-garamond italic text-xl sm:text-2xl text-[#E8B978] leading-relaxed border-l-2 border-[#E8B978] pl-6 py-2">
              "{selectedArticle.excerpt}"
            </p>

            {/* Full Story Paragraphs */}
            <div className="space-y-6 text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
              {selectedArticle.fullStory?.map((p, idx) => (
                <p key={idx}>{p}</p>
              )) || (
                <>
                  <p>
                    Every composition in the Noctavé vault begins not with a brief or commercial target, but with an uncompromising study of raw materials under changing atmospheric conditions.
                  </p>
                  <p>
                    When resin compounds are harvested under low nocturnal humidity, the volatile terpene spectrum remains bonded inside the sap. Distilling in copper alembics preserves these subtle harmonic overtones.
                  </p>
                </>
              )}
            </div>

            {/* Footer / Citation */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-[#E8B978]" />
                <span>Archived in Noctavé Codex, Paris</span>
              </span>
              <span>Ref: NOC-JRN-2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
