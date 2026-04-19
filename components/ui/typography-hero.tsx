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
  const [hoveredHeading, setHoveredHeading] = useState<1 | 2 | null>(null);
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
      mouseX.set(xPercent * 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  const inverseSpringX = useTransform(springX, (val) => -val);

  const isDark = theme === "dark";

  // ── Transparent Stroke Overlay Logic ──
  // Reveals the image through the letters using color: transparent + stroke.
  const strokeColorH1 = isDark ? "#fff" : "#000";
  const strokeColorH2 = "#f97316";

  const hoverTextStyleH2: React.CSSProperties = {
    color: "transparent",
    WebkitTextStroke: `1px ${strokeColorH2}`,
    opacity: 0.6,
  };

  const hoverTextStyleH1: React.CSSProperties = {
    color: "transparent",
    WebkitTextStroke: `1px ${strokeColorH1}`,
    opacity: 0.6,
  };

  // Mask logic remains to synchronize with the person silhouette
  const maskStyle: React.CSSProperties = {
    maskImage: `url('${imageSrc}')`,
    maskSize: "auto 90vh",
    maskPosition: "center 40px",
    maskRepeat: "no-repeat",
    WebkitMaskImage: `url('${imageSrc}')`,
    WebkitMaskSize: "auto 90vh",
    WebkitMaskPosition: "center 40px",
    WebkitMaskRepeat: "no-repeat",
  };

  if (!mounted) return null;

  return (
    <div className="sticky top-0 z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground font-roboto-condensed selection:bg-orange-200">
      {/* 
        This wrapper applies the scroll-based Recession Transform 
        to all hero content for a smoother parallax feel.
      */}
      <motion.div className="relative flex-grow w-full hidden md:flex flex-col pt-24 pb-12">
        {/* TOP GREETING */}
        <div className="absolute top-[12%] md:top-[13%] w-full flex justify-center z-50 pointer-events-none">
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
            Hi👋, my name is <span className="text-orange-500">Harish</span> and
            I'm a <span className="text-orange-500">freelancer</span>.
          </motion.div>
        </div>

        {/*
          ─── LAYER 1 (Z-10): SOLID TEXT ───
          Stays static (no mouse parallax).
        */}
        <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center pointer-events-none select-none">
          <div className="flex flex-col items-center">
            <motion.h1
              onMouseEnter={() => setHoveredHeading(1)}
              onMouseLeave={() => setHoveredHeading(null)}
              initial={{ x: "-80vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                opacity: { duration: 0.8, delay: 0.2 },
              }}
              className="text-[12vw] leading-[0.8] font-black tracking-[-0.05em] font-roboto-condensed select-none text-foreground pointer-events-auto cursor-default"
            >
              {heading1}
            </motion.h1>

            <motion.h1
              onMouseEnter={() => setHoveredHeading(2)}
              onMouseLeave={() => setHoveredHeading(null)}
              initial={{ x: "80vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                x: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                opacity: { duration: 0.8, delay: 0.2 },
              }}
              className="text-[12vw] leading-[0.8] font-black tracking-[-0.05em] font-roboto-condensed select-none text-orange-500 pointer-events-auto cursor-default"
            >
              {heading2}
            </motion.h1>
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

        {/*
          ─── LAYER 3 (Z-30): THE "HOVER" OVERLAY LAYER ───
          REFINED: Using Transparent Fill + WebkitTextStroke for "Ghost" cutout feel.
        */}
        <motion.div
          style={{ x: springX }}
          animate={{ opacity: hoveredHeading !== null ? 1 : 0 }}
          transition={{ opacity: { duration: 0.4, ease: "easeInOut" } }}
          className="absolute inset-0 z-30 pointer-events-none select-none"
        >
          <div
            style={maskStyle}
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
          >
            {/* 
               The text inside the masked layer must move inversely to 
               the parent springX to remain visually static, 
               allowing the mask to "slide" over it correctly.
             */}
            <motion.div
              style={{ x: inverseSpringX }}
              className="flex flex-col items-center"
            >
              <h1
                style={{
                  ...hoverTextStyleH1,
                  opacity: hoveredHeading === 1 ? 0.9 : 0,
                }}
                className="text-[12vw] leading-[0.8] font-black tracking-[-0.05em] font-roboto-condensed transition-opacity duration-300"
              >
                {heading1}
              </h1>
              <h1
                style={{
                  ...hoverTextStyleH2,
                  opacity: hoveredHeading === 2 ? 0.9 : 0,
                }}
                className="text-[12vw] leading-[0.8] font-black tracking-[-0.05em] font-roboto-condensed transition-opacity duration-300"
              >
                {heading2}
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA & UI ELEMENTS */}
        <div className="absolute bottom-12 z-[60] flex w-80 md:w-[500px] left-1/2 -translate-x-1/2 justify-center px-4 gap-4 md:gap-6">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              flex:
                hoveredCTA === "left" ? 1.2 : hoveredCTA === "right" ? 0.8 : 1,
            }}
            transition={{ flex: { duration: 0.4, ease: "easeOut" } }}
            onMouseEnter={() => setHoveredCTA("left")}
            onMouseLeave={() => setHoveredCTA(null)}
            className="bg-orange-500 text-white py-3.5 text-sm md:text-base font-bold font-roboto-condensed hover:bg-orange-600 transition-all duration-300 text-center rounded-sm border border-orange-500 shadow-lg shadow-orange-500/20 flex items-center justify-center whitespace-nowrap overflow-hidden"
          >
            <span className="truncate px-4">{leftButton}</span>
          </motion.a>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              flex:
                hoveredCTA === "right" ? 1.2 : hoveredCTA === "left" ? 0.8 : 1,
            }}
            transition={{ flex: { duration: 0.4, ease: "easeOut" } }}
            onMouseEnter={() => setHoveredCTA("right")}
            onMouseLeave={() => setHoveredCTA(null)}
            className="bg-transparent text-foreground py-3.5 text-sm md:text-base font-bold font-roboto-condensed hover:bg-orange-500/10 transition-colors duration-300 text-center border border-orange-500 rounded-sm flex items-center justify-center whitespace-nowrap overflow-hidden"
          >
            <span className="truncate px-4">{rightButton}</span>
          </motion.a>
        </div>

        {/* Info & Socials */}
        <div className="absolute bottom-[22%] w-full max-w-7xl px-8 md:px-12 z-[60] flex items-center justify-between pointer-events-none">
          <div className="text-lg md:text-xl lg:text-2xl text-foreground font-lighter tracking-tight font-roboto-condensed pointer-events-auto">
            {location}
          </div>
        </div>

        <div className="absolute bottom-12 left-8 md:left-16 z-[60] pointer-events-auto">
          <SocialLinks />
        </div>
      </motion.div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col h-screen w-full px-6 pt-16 pb-0 bg-background overflow-hidden relative">
        <div className="flex flex-col items-center pt-8 pb-2">
          <p className="text-sm font-medium text-foreground tracking-wide text-center">
            Hi👋, my name is <span className="text-orange-500">Harish</span> and
            I'm a <span className="text-orange-500">freelancer</span>.
          </p>
          <h1 className="text-[14vw] leading-[1] font-black tracking-tighter font-roboto-condensed text-foreground whitespace-nowrap">
            {heading1}
          </h1>
          <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter font-roboto-condensed text-orange-500 whitespace-nowrap">
            {heading2}
          </h1>

          <div className="text-sm text-foreground/70 font-light tracking-tight mt-6 text-center uppercase tracking-[0.2em]">
            {location}
          </div>

          {/* MOBILE CTAs */}
          <div className="flex flex-col w-full gap-3 mt-4">
            <a
              href="#"
              className="w-full bg-orange-500 text-white py-4 text-base font-bold font-roboto-condensed text-center rounded-sm shadow-lg shadow-orange-500/20"
            >
              {leftButton}
            </a>
            <a
              href="#"
              className="w-full bg-transparent text-foreground py-4 text-base font-bold font-roboto-condensed text-center border border-orange-500 rounded-sm"
            >
              {rightButton}
            </a>
          </div>
        </div>

        <div className="relative w-full h-[45vh] flex flex-col items-center justify-end">
          <img
            src={imageSrc}
            className="h-full w-auto object-contain object-bottom filter grayscale contrast-[1.1]"
          />

          {/* MOBILE SOCIAL ICONS (Bottom-Left Vertical) */}
          <div className="absolute left-2 bottom-12 z-50">
            <SocialLinks
              vertical={true}
              className="gap-1.5 px-0 py-0 scale-90 origin-bottom-left"
            />
          </div>

          {/* MOBILE SOCIAL ICONS (Bottom-Left Vertical) */}
          <div className="absolute left-2 bottom-12 z-50">
            <SocialLinks
              vertical={true}
              className="gap-1.5 px-0 py-0 scale-90 origin-bottom-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
