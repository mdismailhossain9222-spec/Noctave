import React, { useState } from 'react';
import { site } from '../content/site';
import { ArrowUp, CheckCircle2, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#010101] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <span className="font-garamond text-3xl sm:text-4xl tracking-[0.25em] font-normal text-white uppercase block">
              {site.brand}
            </span>
            <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase">
              Haute Parfumerie Nocturne · {site.city}
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              We extract only during moonlit hours, formulating compositions that unfold across nocturnal silence. Each extrait is macerated in obsidian glass.
            </p>
          </div>

          {/* Table of Chapters (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase block">
              The Architecture
            </span>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider text-neutral-400">
              {site.nav.map((item, idx) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-neutral-600">0{idx + 1}</span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Atelier Dispatch Subscription (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#E8B978] uppercase block">
              Private Allocation Dispatch
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive confidential notices when new maceration batches and limited harvest flacons are unlocked.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-white/[0.04] border border-[#E8B978]/40 flex items-center gap-2 text-xs font-mono text-[#E8B978]">
                <CheckCircle2 className="w-4 h-4 text-[#E8B978]" />
                <span>You are registered for private allocations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#E8B978]/60 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#E8B978] text-black hover:bg-white transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Minimal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p className="text-neutral-400">{site.footer.copyright}</p>

          <div className="flex items-center space-x-6">
            {site.footer.links.map((link) => (
              <button
                key={link}
                onClick={() => alert(`Noctavé ${link} document is archived in the Paris Atelier.`)}
                className="hover:text-white transition-colors uppercase text-[11px] tracking-widest"
              >
                {link}
              </button>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-[#E8B978] transition-colors uppercase text-[11px] tracking-widest group"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
