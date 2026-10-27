import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StaggeredFade({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className="inline-block w-full">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => {
            const previousChars = words.slice(0, wordIndex).join(" ").length;
            const overallIndex = previousChars + charIndex;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + overallIndex * 0.04 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
}