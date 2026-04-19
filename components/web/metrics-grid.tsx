"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const METRICS = [
  {
    value: "100%",
    label: "Client Satisfaction",
    description: "Built on trust and radical transparency.",
  },
  {
    value: "ROI",
    label: "Focused Design",
    description: "Conversion-driven strategies that scale.",
  },
  {
    value: "On-Time",
    label: "Delivery Guaranteed",
    description: "No delays, no excuses, just results.",
  },
  {
    value: "Global",
    label: "Client Reach",
    description: "Serving across diverse regions and industries.",
  },
];

const TextReveal = ({
  text,
  className,
  delay = 0,
  trigger = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}) => {
  const words = text.split(" ");
  return (
    <motion.div className={`flex flex-wrap gap-x-[0.2em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={trigger ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export const MetricsGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full h-screen bg-background border-t border-foreground/5 overflow-hidden flex flex-col">
      {METRICS.map((metric, i) => (
        <div
          key={metric.label}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex-1 w-full px-8 md:px-24 lg:px-32 flex items-center justify-between group overflow-hidden cursor-pointer border-b border-foreground/5 last:border-b-0"
        >
          {/* Background Orange Wipe from Left */}
          <motion.div
            className="absolute inset-0 bg-[#FF4D00] z-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="flex items-baseline space-x-6 md:space-x-12 relative z-10 pointer-events-none">
            <TextReveal
              text={metric.value}
              className={`text-6xl md:text-8xl lg:text-[10vw] font-black font-cabinet tracking-tighter transition-colors duration-500 delay-75 ${hoveredIndex === i ? "text-black" : "text-foreground"}`}
              delay={i * 0.1}
            />
            <TextReveal
              text={metric.label}
              className={`text-xl md:text-4xl lg:text-[3vw] font-bold font-cabinet tracking-tight transition-colors duration-500 delay-75 ${hoveredIndex === i ? "text-black" : "text-foreground/80"}`}
              delay={i * 0.1 + 0.2}
            />
          </div>

          <div className="hidden md:block max-w-[400px] text-right relative z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              {hoveredIndex === i && (
                <motion.div
                  key={`desc-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-black"
                >
                  <TextReveal
                    text={metric.description}
                    trigger={hoveredIndex === i}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </section>
  );
};
