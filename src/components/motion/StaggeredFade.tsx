import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface StaggeredFadeProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
}

export const StaggeredFade: React.FC<StaggeredFadeProps> = ({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.07,
  duration = 0.6,
  as = 'h1',
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  // Split by words first so words never break mid-word. Each word is wrapped
  // in a whitespace-nowrap span; characters animate individually inside it.
  const words = text.split(' ');

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      className={`inline-flex flex-wrap overflow-hidden ${className}`}
    >
      {words.map((word, wordIndex) => {
        const previousChars = words.slice(0, wordIndex).join(' ').length;

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => {
              const overallIndex = previousChars + charIndex;
              return (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration,
                    ease: EASE,
                    delay: delay + overallIndex * stagger,
                  }}
                  className={`inline-block ${charClassName}`}
                >
                  {char}
                </motion.span>
              );
            })}
            <span className="inline-block">&nbsp;</span>
          </span>
        );
      })}
    </Component>
  );
};