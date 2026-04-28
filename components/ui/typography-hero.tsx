"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { SocialLinks } from "./social-links";

export const TypographyHero = ({
  greeting = "Hi👋, my name is Harish and I'm a freelancer.",
  heading1 = "WEB DEVELOPER",
  heading2 = "& FREELANCER",
  imageSrc = "/hero.png",
  location = "based in Chennai, Tamil Nadu.",
  leftButton = "Start your project",
  rightButton = "View My work",
}: {
  greeting?: string;
  heading1?: string;
  heading2?: string;
  imageSrc?: string;
  location?: string;
  leftButton?: string;
  rightButton?: string;
}) => {
  const [hoveredCTA, setHoveredCTA] = useState<"left" | "right" | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Mouse parallax (X axis) ──
  // Only applied to the image (Layer 2) as requested.
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPercent = e.clientX / window.innerWidth - 0.5;
      mouseX.set(xPercent * 250);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const inverseSpringX = useTransform(springX, (val) => -val);

  const isDark = theme === "dark";

  if (!mounted) return null;

  return (
    <div className="sticky top-0 z-10 flex h-screen w-full flex-col overflow-hidden bg-background text-foreground font-roboto-condensed selection:bg-orange-200">
      {/* 
        This wrapper applies the scroll-based Recession Transform 
        to all hero content for a smoother parallax feel.
      */}
      <motion.div className="relative flex-grow w-full hidden md:flex flex-col pt-24 pb-12">
        {/* TOP GREETING */}
        <div className="absolute top-[15%] md:top-[16%] w-full flex justify-center z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.0,
              delay: 2.2,
              type: "spring",
              bounce: 0.4,
            }}
            className="text-lg md:text-2xl lg:text-3xl text-foreground font-medium tracking-tight font-roboto-condensed pointer-events-auto"
          >
            Hi
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", transformOrigin: "bottom right" }}
            >
              👋
            </motion.span>
            , my name is <span className="text-orange-500">Harish</span> and
            I'm a <span className="text-orange-500">Freelancer</span>.
          </motion.div>
        </div>

        {/*
          ─── LAYER 1 (Z-10): SOLID TEXT ───
          Stays static (no mouse parallax).
        */}
        <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center pointer-events-none select-none">
          <div className="flex flex-col items-center translate-y-[12%]">
            <motion.h1
              initial={{ x: "-80vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                opacity: { duration: 0.8, delay: 0.2 },
              }}
              className="text-[12vw] leading-[0.8] m-0 font-black tracking-[-0.05em] font-oswald select-none text-foreground pointer-events-auto cursor-default"
            >
              {heading1}
            </motion.h1>

            <motion.h1
              initial={{ x: "80vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                opacity: { duration: 0.8, delay: 0.2 },
              }}
              className="text-[12vw] leading-[0.8] m-0 font-black tracking-[-0.05em] font-oswald select-none text-orange-500 pointer-events-auto cursor-default"
            >
              {heading2}
            </motion.h1>

            {/* Desktop Location Placement - Aligned with start of Heading 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-22 translate-x-[9vw] text-lg md:text-xl lg:text-2xl text-foreground font-lighter tracking-tight font-roboto-condensed pointer-events-auto self-start"
            >
              {location}
            </motion.div>
          </div>
        </div>

        {/*
          ─── LAYER 2 (Z-20): IMAGE ───
          Includes dynamic cursor parallax.
        */}
        <div className="absolute inset-0 z-20 flex w-full justify-center pointer-events-none items-end">
          <motion.div
            style={{ x: springX }}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 40 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative h-[65vh] md:h-[80vh] lg:h-[90vh] w-auto flex justify-center"
          >
            <img
              src={imageSrc}
              alt="Hero Portrait"
              className="h-full w-auto object-contain object-bottom filter contrast-[1.1] grayscale"
            />
            <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-background via-background/80 to-transparent" />
          </motion.div>
        </div>



        {/* CTA & UI ELEMENTS */}
        <div className="absolute bottom-12 z-[60] flex w-80 md:w-[500px] left-[47%] -translate-x-1/2 justify-center px-4 gap-4 md:gap-6">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              flex:
                hoveredCTA === "left" ? 1.4 : hoveredCTA === "right" ? 0.6 : 1,
            }}
            transition={{ 
              flex: { 
                type: "spring", 
                stiffness: 150, 
                damping: 20,
                mass: 0.8
              },
              opacity: { duration: 0.5, delay: 2 }
            }}
            onMouseEnter={() => setHoveredCTA("left")}
            onMouseLeave={() => setHoveredCTA(null)}
            className="bg-orange-500 text-white py-3.5 text-sm md:text-base font-bold font-roboto-condensed hover:bg-orange-600 text-center rounded-sm border border-orange-500 shadow-lg shadow-orange-500/20 flex items-center justify-center whitespace-nowrap overflow-hidden cursor-pointer"
          >
            <span className="truncate px-4">{leftButton}</span>
          </motion.a>
          <motion.button
            onClick={() => {
              const element = document.getElementById("selected-projects");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              flex:
                hoveredCTA === "right" ? 1.4 : hoveredCTA === "left" ? 0.6 : 1,
            }}
            transition={{ 
              flex: { 
                type: "spring", 
                stiffness: 150, 
                damping: 20,
                mass: 0.8
              },
              opacity: { duration: 0.5, delay: 2 }
            }}
            onMouseEnter={() => setHoveredCTA("right")}
            onMouseLeave={() => setHoveredCTA(null)}
            className="bg-transparent text-foreground py-3.5 text-sm md:text-base font-bold font-roboto-condensed hover:bg-orange-500/10 text-center border border-orange-500 rounded-sm flex items-center justify-center whitespace-nowrap overflow-hidden cursor-pointer"
          >
            <span className="truncate px-4">{rightButton}</span>
          </motion.button>
        </div>

      </motion.div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col h-full w-full px-6 pt-24 pb-0 bg-background overflow-hidden relative">
        <div className="flex flex-col items-center pt-8 pb-0 z-10 w-full">
          <p className="text-xs md:text-sm font-medium text-foreground tracking-wide text-center">
            Hi
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", transformOrigin: "bottom right" }}
            >
              👋
            </motion.span>
            , my name is <span className="text-orange-500">Harish</span> and
            I'm a <span className="text-orange-500">freelancer</span>.
          </p>
          <h1 className="text-[12vw] leading-[1] font-black tracking-tighter font-oswald text-foreground whitespace-nowrap">
            {heading1}
          </h1>
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter font-oswald text-orange-500 whitespace-nowrap">
            {heading2}
          </h1>

          <div className="text-[10px] sm:text-xs text-foreground/70 font-light mt-3 text-center uppercase tracking-[0.2em]">
            {location}
          </div>

          {/* MOBILE CTAs */}
          <div className="flex flex-col w-full gap-2 mt-6">
            <a
              href="#contact"
              className="w-full bg-orange-500 text-white py-2.5 text-xs sm:text-sm font-bold font-roboto-condensed text-center rounded-sm shadow-lg shadow-orange-500/20"
            >
              {leftButton}
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("selected-projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full bg-transparent text-foreground py-2.5 text-xs sm:text-sm font-bold font-roboto-condensed text-center border border-orange-500 rounded-sm"
            >
              {rightButton}
            </button>
          </div>
        </div>

        <div className="relative w-full flex-1 min-h-0 flex flex-col items-center justify-end mt-4">
          <img
            src={imageSrc}
            className="h-full w-auto object-contain object-bottom filter grayscale contrast-[1.1] relative bottom-0 -translate-x-4"
            alt="Hero Portrait Mobile"
          />
        </div>
      </div>
    </div>
  );
};
