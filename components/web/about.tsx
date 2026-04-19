"use client";

import React from "react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";

export const About = () => {
    return (
        <motion.section
            id="about"
            className="relative z-50 min-h-screen w-full flex flex-col justify-center pl-16 pr-6 md:pl-[12vw] md:pr-12 lg:pl-[15vw] lg:pr-24 py-24 bg-background overflow-hidden selection:bg-orange-200"
        >
            <div className="max-w-7xl">
                {/* Section Label */}
                <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/40 mb-12">
                    Who I Am
                </p>

                {/* Cinematic Large Statement */}
                <div className="max-w-6xl">
                    <RevealText
                        text="I’m a passionate web developer focused on building modern, high-performance web applications. I enjoy turning ideas into real, scalable products using technologies like React, Next.js, and Convex."
                        highlightedWords={[
                            "passionate",
                            "modern",
                            "high-performance",
                            "scalable",
                            "React",
                            "Next.js",
                            "Convex"
                        ]}
                        className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight font-roboto-condensed text-foreground"
                    />
                </div>
            </div>
        </motion.section>
    );
};
