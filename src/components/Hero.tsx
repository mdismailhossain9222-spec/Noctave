import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import StaggeredFade from "./StaggeredFade";

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = ["Collection", "House", "Architecture", "Journal"];

  return (
    <section className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-[#010101] flex flex-col items-center justify-center">
      <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover object-center z-0" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4" />
      <div className="absolute top-0 w-full h-[150px] bg-gradient-to-b from-black/60 to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-black/60 to-transparent z-0 pointer-events-none" />

      <nav className="absolute top-0 w-full z-20 px-6 py-6 flex items-center justify-between">
        <button className="md:hidden text-white/80 hover:text-white z-50 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="absolute left-1/2 -translate-x-1/6 md:static md:translate-x-0 md:flex-1 flex items-center justify-center md:justify-start">
          <a href="/" className="text-white uppercase font-light text-lg md:text-xl tracking-[0.25em] md:tracking-[0.3em]">Noctavé</a>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center gap-10">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-white uppercase text-xs tracking-[0.2em] transition-colors duration-300">{link}</a>
          ))}
        </div>
        <div className="hidden md:block flex-1"></div>
      </nav>

      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="fixed top-20 left-4 right-4 z-50 md:hidden bg-black/80 backdrop-blur-xl rounded-2xl py-8 flex flex-col items-center gap-6 border border-white/10">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white/90 uppercase text-sm tracking-[0.25em]">{link}</a>
          ))}
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 w-full max-w-5xl mx-auto mt-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-10">
          <span className="liquid-glass rounded-full px-5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/80">Haute Parfumerie · MMXXVI</span>
        </motion.div>

        <h1 className="font-garamond text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal text-white leading-[1.05] tracking-tight mb-8 w-full flex flex-col items-center drop-shadow-2xl">
          <span className="block w-full mb-2"><StaggeredFade text="WITNESS THE" delay={0.4} /></span>
          <span className="block w-full italic text-white/95"><StaggeredFade text="HIDDEN NOIR" delay={0.9} /></span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.0 }} className="text-white/80 font-light leading-relaxed max-w-xs sm:max-w-lg mb-12 text-sm sm:text-base md:text-lg tracking-wide drop-shadow-lg">
          An olfactory odyssey through resin, oud, and midnight bloom,<br className="hidden sm:block" /> captured by sense and memory.
        </motion.p>

        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.3 }} className="liquid-glass rounded-full px-8 sm:px-12 py-4 flex items-center gap-3 text-white uppercase tracking-[0.18em] sm:tracking-[0.2em] text-xs sm:text-sm hover:text-white group drop-shadow-lg">
          Begin the Ritual <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}