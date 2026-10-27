import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  as = 'h2',
  delay = 0,
  stagger = 0.04,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 36,
      rotateZ: shouldReduceMotion ? 0 : 2,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 1.1,
        ease: EASE,
      },
    },
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={`inline-flex flex-wrap gap-x-[0.3em] overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
