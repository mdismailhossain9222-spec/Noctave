import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { X, MapPin, CheckCircle, ArrowRight, User, Mail, Phone } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLocation, setSelectedLocation] = useState('Paris VIII — 14 Rue du Faubourg');
  const [selectedFocus, setSelectedFocus] = useState('Smoky Resins & Vintage Oud');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-04-18',
    time: '20:30 (Twilight Session)',
    notes: '',
  });
  const [bookingRef] = useState(() => `NOC-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isBookingOpen) return null;

  const handleNext = () => {
    if (step === 3) {
      if (!formData.name || !formData.email) {
        alert('Please provide your name and email for the salon guest list.');
        return;
      }
      setStep(4);
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setTimeout(() => setStep(1), 300);
  };

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

          {/* Header */}
          <div className="border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B978] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase">
                Private Consultation Ritual
              </span>
            </div>
            <h3 className="font-garamond italic text-3xl sm:text-4xl text-white">
              {step === 4 ? 'Your Nocturne Invitation' : 'Reserve an Olfactory Session'}
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-1">
              {step === 4
                ? 'Your private salon appointment has been recorded in the atelier ledger.'
                : 'A 60-minute one-on-one session with our senior nose. No commitment, just pure nocturnal inquiry.'}
            </p>
          </div>

          {/* Step 1: Location */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                01. Select Atelier Location
              </span>
              <div className="space-y-3">
                {[
                  {
                    name: 'Paris VIII — 14 Rue du Faubourg',
                    desc: 'Historic limestone cellar salon. Low tungsten candlelight, private carboy tastings.',
                  },
                  {
                    name: 'Kyoto Vault — Gion District',
                    desc: 'Hinoki wood chamber overlooking illuminated rock garden. Kyara incense blending.',
                  },
                  {
                    name: 'Virtual Atelier Box (Global Courier)',
                    desc: 'Five bespoke raw essences couriered to your residence prior to encrypted video salon.',
                  },
                ].map((loc) => (
                  <div
                    key={loc.name}
                    onClick={() => setSelectedLocation(loc.name)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      selectedLocation === loc.name
                        ? 'border-[#E8B978] bg-[#E8B978]/10 shadow-[0_0_20px_rgba(232,185,120,0.15)]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-garamond italic text-lg text-white">{loc.name}</span>
                      <MapPin
                        className={`w-4 h-4 ${
                          selectedLocation === loc.name ? 'text-[#E8B978]' : 'text-neutral-500'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-neutral-400 font-light mt-1">{loc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Scent Profile */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                02. Olfactory Preference Focus
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Smoky Resins & Vintage Oud', sub: 'Assam oud, birch tar, smoldering cade' },
                  { title: 'Midnight Amber & Vanilla Balsam', sub: 'Benzoin, labdanum, dark Bourbon smoke' },
                  { title: 'Velvety Musk & Florentine Iris', sub: 'Orris root concrete, white cashmeran' },
                  { title: 'Sacred Incense & Taif Rose', sub: 'Green Hojari frankincense, Yemeni myrrh' },
                ].map((focus) => (
                  <div
                    key={focus.title}
                    onClick={() => setSelectedFocus(focus.title)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                      selectedFocus === focus.title
                        ? 'border-[#E8B978] bg-[#E8B978]/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                    }`}
                  >
                    <span className="font-garamond italic text-base text-white block">
                      {focus.title}
                    </span>
                    <p className="text-[11px] text-neutral-400 font-light mt-1">{focus.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Guest Details */}
          {step === 3 && (
            <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                03. Guest Details & Date
              </span>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adrienne Moreau"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#E8B978]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="client@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#E8B978]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      Phone (for SMS confirmation)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="+33 6 00 00 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#E8B978]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      Requested Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E8B978]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E8B978]"
                    >
                      <option>18:00 (Dusk Opening)</option>
                      <option>19:30 (Nocturne Flight)</option>
                      <option>21:00 (Midnight Resonance)</option>
                      <option>22:30 (Private Obsidian Tasting)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmed Voucher Card */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl liquid-glass border border-[#E8B978]/40 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                      Reservation Reference
                    </span>
                    <span className="text-base font-mono text-[#E8B978] tracking-widest font-bold">
                      {bookingRef}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E8B978]/20 border border-[#E8B978]/40 text-[#E8B978] text-[10px] font-mono tracking-widest uppercase">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Guest:</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Salon:</span>
                    <span className="text-white">{selectedLocation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-400">Olfactory Focus:</span>
                    <span className="text-[#E8B978]">{selectedFocus}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Schedule:</span>
                    <span className="text-white">
                      {formData.date} at {formData.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle className="w-4 h-4 text-[#E8B978]" />
                <span>Confirmation letter and cipher dispatched to {formData.email}.</span>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            {step > 1 && step < 4 ? (
              <button
                onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-full bg-[#E8B978] hover:bg-white text-black font-mono text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
              >
                <span>{step === 3 ? 'Finalize Invitation' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-full bg-[#E8B978] text-black font-mono text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
              >
                Close & Return
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
