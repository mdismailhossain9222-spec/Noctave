import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useShop();
  const [waxSealComplimentary, setWaxSealComplimentary] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (orderComplete) {
      setTimeout(() => setOrderComplete(false), 300);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Slide-over Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-md bg-[#0A0A0F] border-l border-white/15 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-[#E8B978]" />
                <span className="font-garamond italic text-2xl text-white">Your Ritual Bag</span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Order Confirmed View */}
            {orderComplete ? (
              <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#E8B978]/20 border border-[#E8B978] flex items-center justify-center text-[#E8B978]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-garamond italic text-3xl text-white">
                  Acquisition Received
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-xs">
                  Your flacons are being hand-poured and wax-sealed in our Paris atelier. An archival dispatch certificate has been transmitted.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-[#E8B978] text-black font-mono text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                      <Sparkles className="w-8 h-8 text-neutral-600 mx-auto" />
                      <p className="font-garamond italic text-xl text-neutral-400">
                        Your ritual bag is empty.
                      </p>
                      <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                        Explore the permanent collection flacons or discovery coffret.
                      </p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex gap-4 items-center"
                      >
                        <div className="w-16 h-20 rounded-lg overflow-hidden bg-black/60 shrink-0 border border-white/10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-garamond italic text-lg text-white truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-[11px] font-mono text-neutral-400">{item.size}</p>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 border border-white/15 rounded-lg px-2 py-0.5 bg-black/40">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-neutral-400 hover:text-white"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono text-white px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-neutral-400 hover:text-white"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-mono text-xs text-[#E8B978] font-medium">
                              ${item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Packaging Option */}
                  {cart.length > 0 && (
                    <div
                      onClick={() => setWaxSealComplimentary(!waxSealComplimentary)}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer hover:border-[#E8B978]/40 transition-colors flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-garamond italic text-white block">
                          Midnight Obsidian Wax Seal
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 block">
                          Complimentary velvet wrap & hand-stamped seal
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          waxSealComplimentary
                            ? 'bg-[#E8B978] border-[#E8B978] text-black'
                            : 'border-white/30'
                        }`}
                      >
                        {waxSealComplimentary && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer / Summary */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between text-neutral-400">
                        <span>Courier & Insured Delivery</span>
                        <span className="text-white">Complimentary</span>
                      </div>
                      <div className="flex justify-between text-base text-white pt-2 border-t border-white/10">
                        <span className="font-garamond italic text-lg">Total Acquisition</span>
                        <span className="text-[#E8B978] font-mono font-bold">${cartTotal}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-4 rounded-full bg-[#E8B978] hover:bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,185,120,0.3)] disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <span>Sealing Acquisition...</span>
                      ) : (
                        <>
                          <span>Proceed to Secret Checkout</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E8B978]" />
                      <span>Encrypted Dispatch · Direct from Paris</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
