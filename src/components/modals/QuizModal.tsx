import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { site, PerfumeItem } from '../../content/site';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    perfumeMatchIndex: number;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'The Atmospheric Hour',
    subtitle: 'At what point in the night does your sense of presence peak?',
    options: [
      {
        label: 'The Midnight Stillness (00:00)',
        description: 'Deep, silent hours surrounded by ancient books and leather.',
        perfumeMatchIndex: 0, // Noir Oud
      },
      {
        label: 'The Amber Twilight (20:00)',
        description: 'Warm candlelight, sweet resins, and intimate conversation.',
        perfumeMatchIndex: 1, // Midnight Amber
      },
      {
        label: 'The Cold Hearth (03:00)',
        description: 'Smoldering hearth fires, cold birch smoke, and sacred quiet.',
        perfumeMatchIndex: 2, // Velvet Smoke
      },
      {
        label: 'The Velvet Dawn (05:00)',
        description: 'Second-skin warmth, heavy silk, and quiet powdery iris.',
        perfumeMatchIndex: 3, // Sable Musk
      },
    ],
  },
  {
    id: 2,
    title: 'The Olfactory Archetype',
    subtitle: 'Which tactile texture resonates most closely with your skin?',
    options: [
      {
        label: 'Aged Calfskin & Dark Resins',
        description: 'Heavy, aristocratic, unapologetic depth.',
        perfumeMatchIndex: 0, // Noir Oud
      },
      {
        label: 'Smoked Honey & Madagascar Vanilla',
        description: 'Enveloping, golden, resinous gourmand.',
        perfumeMatchIndex: 1, // Midnight Amber
      },
      {
        label: 'Crushed Cade & Smoldering Birch',
        description: 'Austere, architectural, smoky woods.',
        perfumeMatchIndex: 2, // Velvet Smoke
      },
      {
        label: 'Sacred Frankincense & Yemeni Myrrh',
        description: 'Monastic, divine, transcendent resins.',
        perfumeMatchIndex: 4, // Incense Noir
      },
    ],
  },
  {
    id: 3,
    title: 'The Desired Impression',
    subtitle: 'What trail should you leave in a dark room after departing?',
    options: [
      {
        label: 'An Indelible Sovereign Shadow',
        description: 'People will remember the room was commanded by scent.',
        perfumeMatchIndex: 0, // Noir Oud
      },
      {
        label: 'A Warm Luminous Embrace',
        description: 'People will draw closer to breathe the air around you.',
        perfumeMatchIndex: 1, // Midnight Amber
      },
      {
        label: 'A Whispered Silk Sensation',
        description: 'A skin-close magnetic allure that only few get to experience.',
        perfumeMatchIndex: 3, // Sable Musk
      },
      {
        label: 'A Sacred Monument of Smoke',
        description: 'An ethereal ceremonial trail reminiscent of ancient cathedrals.',
        perfumeMatchIndex: 4, // Incense Noir
      },
    ],
  },
];

export const QuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, setSelectedPerfume, addToCart } = useShop();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [resultPerfume, setResultPerfume] = useState<PerfumeItem | null>(null);

  if (!isQuizOpen) return null;

  const handleSelectOption = (perfumeIndex: number) => {
    const updated = [...scores, perfumeIndex];
    setScores(updated);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Calculate majority or last selected
      const counts: Record<number, number> = {};
      updated.forEach((idx) => {
        counts[idx] = (counts[idx] || 0) + 1;
      });

      let bestIdx = updated[updated.length - 1];
      let maxCount = 0;
      Object.entries(counts).forEach(([idxStr, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestIdx = Number(idxStr);
        }
      });

      const matched = site.collection[bestIdx % site.collection.length];
      setResultPerfume(matched as PerfumeItem);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIdx(0);
    setScores([]);
    setResultPerfume(null);
  };

  const handleClose = () => {
    setIsQuizOpen(false);
    setTimeout(handleReset, 300);
  };

  const q = QUESTIONS[currentQuestionIdx];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-2xl bg-[#0A0A0F] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!resultPerfume ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Scent Match Diagnostic
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    Step {currentQuestionIdx + 1} of {QUESTIONS.length}
                  </span>
                </div>
                <h3 className="font-garamond italic text-3xl sm:text-4xl text-white">
                  {q.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">{q.subtitle}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.perfumeMatchIndex)}
                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#E8B978] hover:bg-[#E8B978]/5 transition-all duration-300 group flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <span className="font-garamond italic text-lg text-white group-hover:text-[#E8B978] transition-colors block">
                        {option.label}
                      </span>
                      <p className="text-xs text-neutral-400 font-light">{option.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-[#E8B978] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 text-center sm:text-left">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase block">
                  Your Signature Noir Match
                </span>
                <h3 className="font-garamond italic text-3xl sm:text-4xl text-white mt-1">
                  {resultPerfume.name}
                </h3>
                <p className="text-xs font-mono text-[#E8B978] tracking-widest uppercase mt-1">
                  {resultPerfume.notes}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={resultPerfume.image}
                    alt={resultPerfume.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {resultPerfume.description || resultPerfume.tagline}
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>Formula Number:</span>
                      <span className="text-white">N° {resultPerfume.no}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Size / Price:</span>
                      <span className="text-[#E8B978]">
                        {resultPerfume.size} · {resultPerfume.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        addToCart({
                          name: resultPerfume.name,
                          size: resultPerfume.size,
                          price: resultPerfume.price,
                          image: resultPerfume.image,
                        });
                        handleClose();
                      }}
                      className="flex-1 py-3 px-4 rounded-full bg-[#E8B978] hover:bg-white text-black font-mono text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Acquire Flacon</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPerfume(resultPerfume);
                        handleClose();
                      }}
                      className="py-3 px-4 rounded-full bg-white/[0.05] hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest border border-white/15 transition-colors"
                    >
                      Inspect Details
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs font-mono text-neutral-500 hover:text-neutral-300 flex items-center justify-center sm:justify-start gap-1.5 pt-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retake Scent Diagnostic</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
