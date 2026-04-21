"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";

export const BrandPositioning = () => {
  return (
    <motion.section
      className="relative z-50 min-h-screen w-full flex flex-col justify-center pl-16 pr-6 md:pl-[12vw] md:pr-12 lg:pl-[15vw] lg:pr-24 py-24 bg-background overflow-hidden selection:bg-orange-200 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-7xl">
        {/* Section Label */}
        <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/40 mb-12">
          Brand Positioning
        </p>

        {/* Cinematic Large Title */}
        <RevealText
          text="Built for Brands That Refuse to Look Ordinary"
          highlightedWords={["Brands", "Ordinary"]}
          className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.9] tracking-tighter font-oswald text-foreground mb-16"
        />

        {/* Detailed Positioning Content */}
        <div className="max-w-4xl">
          <RevealText
            text="From early-stage startups to growing digital products, I partner with teams that care about design, performance, and real results - not just aesthetics."
            className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight font-roboto-condensed text-foreground/80"
          />
        </div>
      </div>
    </motion.section>
  );
};
