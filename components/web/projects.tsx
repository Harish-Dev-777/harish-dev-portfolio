"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

/* ─── Custom Arrow Button ─── */
const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    initial="rest"
    whileHover="hover"
    animate="rest"
    className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/40 flex items-center justify-center overflow-hidden cursor-pointer"
  >
    {/* Fill sweeps from top-right */}
    <motion.div
      variants={{
        rest: { x: "100%", y: "-100%" },
        hover: { x: "0%", y: "0%" },
      }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      className="absolute inset-0 bg-white rounded-full z-0"
    />
    <span className="relative z-10 text-white transition-colors duration-300 group-hover:text-black">
      {direction === "left" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
    </span>
  </motion.button>
);

/* ─── Infinite Carousel ─── */
export const Projects = () => {
  const GAP = 20;
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [activeLogicalIndex, setActiveLogicalIndex] = useState(0);
  const isAnimating = useRef(false);

  const total = projects.length;
  // Triple the array for infinite scroll
  const tripled = [...projects, ...projects, ...projects];

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const isMobile = window.innerWidth < 768;
    const v = isMobile ? 1 : 3;
    setVisibleCards(v);
    
    // User requested no peeking on mobile - card takes 100% of container width
    const multiplier = isMobile ? 1.0 : 1.0; 
    const w = ((containerW * multiplier) - GAP * (v - 1)) / v;
    setCardWidth(w);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Initial position: start of middle set
  useEffect(() => {
    if (cardWidth > 0) {
      const offset = total * (cardWidth + GAP);
      x.set(-offset);
    }
  }, [cardWidth, total, x]);

  const slide = useCallback(
    (dir: number) => {
      if (isAnimating.current || cardWidth === 0) return;
      isAnimating.current = true;

      const step = (cardWidth + GAP) * dir;
      const targetX = x.get() - step;

      // Update logical index for tracking dots
      setActiveLogicalIndex((prev) => (prev + dir + total) % total);

      animate(x, targetX, {
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.8,
        onComplete: () => {
          const oneSetWidth = total * (cardWidth + GAP);
          const current = x.get();

          // Infinite loop boundary resets
          if (current <= -(oneSetWidth * 2)) {
            x.set(current + oneSetWidth);
          }
          if (current >= -oneSetWidth + (cardWidth + GAP)) {
            x.set(current - oneSetWidth);
          }

          isAnimating.current = false;
        },
      });
    },
    [cardWidth, total, x]
  );

  return (
    <section 
      id="selected-projects" 
      className="relative w-full min-h-screen bg-[#111111] flex flex-col justify-center py-24 select-none overflow-hidden"
    >
      {/* Container with left shift */}
      <div className="pl-14 pr-6 md:pl-[10vw] md:pr-12 lg:pl-[12vw] lg:pr-24">
        {/* Header - Arrows move to the right on desktop */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/40 mb-3">
              My Work
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-cabinet leading-none">
              Selected Projects
            </h2>
          </div>

          {/* Arrows in Header for Desktop only */}
          <div className="hidden md:flex gap-4">
            <ArrowButton direction="left" onClick={() => slide(-1)} />
            <ArrowButton direction="right" onClick={() => slide(1)} />
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative">
          {/* Cards Viewport */}
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex items-center"
              style={{ x, gap: `${GAP}px` }}
            >
              {tripled.map((project, i) => (
                <a
                  key={`${project.id}-${i}`}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    width: `${cardWidth}px`,
                    aspectRatio: "4 / 4.8",
                  }}
                >
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                    <h3 className="text-lg md:text-xl font-black text-white font-cabinet tracking-tight leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-xs font-medium leading-relaxed font-roboto-condensed max-w-[90%]">
                      {project.description}
                    </p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls — Centered dots and side arrows (Mobile Only Arrows) */}
          <div className="mt-12 w-full flex flex-col items-center gap-8">
            {/* Centered Pagination Dots */}
            <div className="flex gap-2.5 items-center">
              {projects.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === activeLogicalIndex ? 24 : 8,
                    backgroundColor: i === activeLogicalIndex ? "#F97316" : "rgba(255,255,255,0.2)"
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                />
              ))}
            </div>

            {/* Arrows at bottom for Mobile only */}
            <div className="flex md:hidden gap-4">
              <ArrowButton direction="left" onClick={() => slide(-1)} />
              <ArrowButton direction="right" onClick={() => slide(1)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
