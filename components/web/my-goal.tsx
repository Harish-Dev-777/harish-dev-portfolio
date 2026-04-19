"use client";

import React from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";

export const MyGoal = () => {
  return (
    <motion.section
      className="relative z-50 min-h-screen w-full flex flex-col justify-center pl-16 pr-6 md:pl-[12vw] md:pr-12 lg:pl-[15vw] lg:pr-24 py-24 bg-background overflow-hidden selection:bg-orange-200"
    >
      <div className="max-w-7xl">
        {/* Section Label */}
        <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/40 mb-12">
          My Goal
        </p>

        {/* Cinematic Large Statement */}
        <div className="max-w-6xl">
          <RevealText
            text="I create modern websites that help businesses grow and stand out. Focused on performance and conversions, I build fast, premium experiences that drive real results."
            highlightedWords={[
              "modern", 
              "websites", 
              "performance", 
              "conversions", 
              "premium", 
              "experiences", 
              "real", 
              "results"
            ]}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight font-roboto-condensed text-foreground"
          />
        </div>
      </div>
    </motion.section>
  );
};
