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
  const totalLength = text.length;
  let charGlobalIndex = 0;

  return (
    <div ref={containerRef} className={cn("relative flex flex-wrap", className)}>
      {words.map((word, i) => {
        const isHighlighted = highlightedWords.some(h => 
          word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").includes(h.toLowerCase())
        );
        
        const wordChars = word.split("");
        
        return (
          <span key={i} className="flex flex-nowrap mr-[0.25rem] mb-[0.1em]">
            {wordChars.map((char, j) => {
              const start = charGlobalIndex / totalLength;
              const end = (charGlobalIndex + 1) / totalLength;
              charGlobalIndex++;

              return (
                <Char 
                  key={j} 
                  progress={scrollYProgress} 
                  range={[start, end]}
                  isHighlighted={isHighlighted}
                  highlightClassName={highlightClassName}
                >
                  {char}
                </Char>
              );
            })}
            {/* Account for the space between words in the global timing */}
            {i < words.length - 1 && <span className="hidden">{charGlobalIndex++}</span>}
          </span>
        );
      })}
    </div>
  );
};

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlighted?: boolean;
  highlightClassName?: string;
}

const Char = ({ children, progress, range, isHighlighted, highlightClassName }: CharProps) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  return (
    <span className="relative inline-block whitespace-pre">
      {/* Background layer */}
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
