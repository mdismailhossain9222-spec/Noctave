import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface ClipImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  hoverEffect?: boolean;
}

export const ClipImage: React.FC<ClipImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  aspectRatio = 'aspect-[3/4]',
  direction = 'bottom',
  hoverEffect = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  // Directional clip-paths
  const initialClip = {
    bottom: 'inset(0% 0% 100% 0%)',
    top: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[direction];

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className} bg-[#0A0A0F]`}>
      {/* Background skeleton/glow while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900/60 animate-pulse flex items-center justify-center">
          <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Noctavé</span>
        </div>
      )}

      <motion.div
        className="w-full h-full relative"
        initial={{
          clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : initialClip,
        }}
        whileInView={{
          clipPath: 'inset(0% 0% 0% 0%)',
        }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 1.4,
          ease: EASE,
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
            hoverEffect ? 'hover:scale-105' : ''
          } ${imageClassName}`}
          initial={{ scale: shouldReduceMotion ? 1 : 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 1.6,
            ease: EASE,
          }}
        />

        {/* Subtle dark vignette overlay to preserve the noir aesthetic */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </motion.div>
    </div>
  );
};
