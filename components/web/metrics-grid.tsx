"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";

const METRICS = [
  {
    label: "3D",
    description: "I search the internet for visual references and then combine them to create my own work.",
  },
  {
    label: "VISUAL",
    description: "Crafting aesthetics that communicate your brand's core identity effectively.",
  },
  {
    label: "MOTION",
    description: "Adding life and fluidity to static designs through thoughtful animations.",
  },
  {
    label: "PRODUCT",
    description: "Building intuitive interfaces that prioritize user experience and function.",
  },
];

export const MetricsGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full h-screen bg-background flex flex-col justify-center overflow-hidden border-t border-foreground/5 relative">
      {/* Section Label - Moved higher up */}
      <div className="absolute top-12 left-0 pl-16 pr-6 md:pl-[12vw] lg:pl-[15vw] z-50">
         <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/40">
          What I Do
        </p>
      </div>

      <div className="w-full h-[80vh] md:h-[85vh] flex flex-col justify-center mt-8">
        {METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className="relative w-full pl-16 pr-6 md:pl-[12vw] md:pr-16 lg:pl-[15vw] lg:pr-24 flex items-center justify-between group flex-1 border-b border-foreground/5 last:border-b-0"
          >
            {/* Stage 1: Horizontal Orange Line appears full width immediately */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#FF4D00] z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            />

            {/* Stage 2: Vertical Orange Block Expansion from Center */}
            <motion.div
              className="absolute inset-0 bg-[#FF4D00] z-0 origin-center"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: hoveredIndex === i ? 1 : 0 }}
              transition={{ 
                duration: 0.4, 
                delay: hoveredIndex === i ? 0.1 : 0, 
                ease: [0.76, 0, 0.24, 1] 
              }}
            />

            <div className="flex items-center justify-between w-full relative z-10 pointer-events-none h-full">
              {/* Word Column (Hover Trigger) */}
              <div 
                className="relative inline-flex items-center pointer-events-auto cursor-pointer h-full"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <RevealText
                  text={metric.label}
                  className={`text-[12vw] md:text-[14vw] lg:text-[18vh] font-black font-cabinet tracking-tight leading-none uppercase transition-colors duration-500 delay-100 ${
                    hoveredIndex === i ? "text-black" : "text-foreground"
                  }`}
                />
              </div>

              {/* Description Column */}
              <div className="hidden md:flex flex-1 justify-end relative z-10 pl-8 pointer-events-none">
                <AnimatePresence mode="wait">
                  {hoveredIndex === i && (
                    <motion.div
                      key={`desc-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                      className="text-black font-medium text-sm lg:text-base font-sans max-w-[350px] text-left"
                    >
                      {metric.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
