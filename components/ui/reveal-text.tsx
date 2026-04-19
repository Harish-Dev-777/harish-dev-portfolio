"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  highlightedWords?: string[];
  highlightClassName?: string;
}

export const RevealText = ({ 
  text, 
  className, 
  highlightedWords = [], 
  highlightClassName = "text-orange-500" 
}: RevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const isHighlighted = highlightedWords.some(h => word.toLowerCase().includes(h.toLowerCase()));
        
        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            isHighlighted={isHighlighted}
            highlightClassName={highlightClassName}
          >
            {word}
          </Word>
        );
      })}
    </div>
  );
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
  highlightClassName?: string;
}

const Word = ({ children, progress, range, isHighlighted, highlightClassName }: WordProps) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  return (
    <span className="relative mr-[0.25em] mb-[0.1em]">
      {/* Background/Base text layer */}
      <span className={cn("absolute opacity-[0.08] select-none", isHighlighted && highlightClassName)}>
        {children}
      </span>
      {/* Animated layer */}
      <motion.span 
        style={{ opacity }} 
        className={cn(isHighlighted && highlightClassName)}
      >
        {children}
      </motion.span>
    </span>
  );
};
