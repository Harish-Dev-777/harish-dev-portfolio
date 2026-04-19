"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { RevealText } from "@/components/ui/reveal-text";

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
    className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 flex items-center justify-center overflow-hidden cursor-pointer"
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
      {direction === "left" ? (
        <ArrowLeft size={18} strokeWidth={3} />
      ) : (
        <ArrowRight size={18} strokeWidth={3} />
      )}
    </span>
  </motion.button>
);

/* ─── Infinite Carousel ─── */
export const Projects = () => {
  const GAP = 24;
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [activeLogicalIndex, setActiveLogicalIndex] = useState(0);
  const isAnimating = useRef(false);

  const total = projects.length;
  // Triple the array for infinite scroll
  const tripled = [...projects, ...projects, ...projects];

  const [isMobile, setIsMobile] = useState(false);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const parentW =
      containerRef.current.parentElement?.offsetWidth || window.innerWidth;
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const v = mobile ? 1 : 4;
    setVisibleCards(v);

    // Mobile card is 75% of parent width, Desktop follows grid
    const w = mobile ? parentW * 0.75 : (parentW - GAP * (v - 1)) / v;
    setCardWidth(w);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Initial position: center the middle set's first card
  useEffect(() => {
    if (cardWidth > 0) {
      const oneSetWidth = total * (cardWidth + GAP);
      const centerOffset = window.innerWidth < 768 ? (window.innerWidth - cardWidth) / 2 : 0;
      x.set(-oneSetWidth + centerOffset);
    }
  }, [cardWidth, total, x]);

  // Handle mouse wheel scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const currentX = x.get();
        const newX = currentX - e.deltaX - e.deltaY;
        x.set(newX);

        const oneSetWidth = total * (cardWidth + GAP);
        const centerOffset = window.innerWidth < 768 ? (window.innerWidth - cardWidth) / 2 : 0;
        
        // Boundaries with offset
        if (newX <= -(oneSetWidth * 2) + centerOffset) x.set(newX + oneSetWidth);
        if (newX >= -oneSetWidth + (cardWidth + GAP) + centerOffset) x.set(newX - oneSetWidth);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [cardWidth, total, x]);

  const slide = useCallback(
    (dir: number) => {
      if (isAnimating.current || cardWidth === 0) return;
      isAnimating.current = true;

      const step = (cardWidth + GAP) * dir;
      const targetX = x.get() - step;

      setActiveLogicalIndex((prev) => (prev + dir + total) % total);

      animate(x, targetX, {
        type: "spring",
        stiffness: 220,
        damping: 30,
        mass: 1,
        onComplete: () => {
          const oneSetWidth = total * (cardWidth + GAP);
          const centerOffset = window.innerWidth < 768 ? (window.innerWidth - cardWidth) / 2 : 0;
          const current = x.get();

          if (current <= -(oneSetWidth * 2) + centerOffset) {
            x.set(current + oneSetWidth);
          }
          if (current >= -oneSetWidth + (cardWidth + GAP) + centerOffset) {
            x.set(current - oneSetWidth);
          }

          isAnimating.current = false;
        },
      });
    },
    [cardWidth, total, x],
  );

  // Drag constraints to prevent excessive scrolling beyond loops
  const dragConstraints = {
    left: -(total * 2 * (cardWidth + GAP)),
    right: 0,
  };

  return (
    <section
      id="selected-projects"
      className="relative w-full min-h-screen bg-[#111111] flex flex-col justify-center py-24 select-none overflow-hidden"
    >
      <div className="pl-14 pr-6 md:pl-[10vw] md:pr-12 lg:pl-[12vw] lg:pr-24">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/40 mb-3">
              My Work
            </p>
            <RevealText
              text="Selected Works"
              highlightedWords={["Works"]}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white font-cabinet leading-none"
            />
          </div>

          <div className="hidden md:flex gap-4">
            <ArrowButton direction="left" onClick={() => slide(-1)} />
            <ArrowButton direction="right" onClick={() => slide(1)} />
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative">
          <div
            ref={containerRef}
            className="overflow-hidden mx-auto"
            style={{
              width: isMobile && cardWidth > 0 ? "100%" : "100%",
              // @ts-ignore
              WebkitMaskImage: isMobile ? "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" : "none",
              maskImage: isMobile ? "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" : "none",
            }}
          >
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={dragConstraints}
              onDragEnd={(e, info) => {
                const threshold = 50;
                if (info.offset.x < -threshold) slide(1);
                else if (info.offset.x > threshold) slide(-1);
                else {
                    const oneSetWidth = total * (cardWidth + GAP);
                    const currentOff = Math.abs(x.get()) - oneSetWidth;
                    const nearestIdx = Math.round(currentOff / (cardWidth + GAP));
                    
                    // Centering logic for mobile
                    const centerOffset = isMobile ? (window.innerWidth - cardWidth) / 2 : 0;
                    const targetX = -(oneSetWidth + nearestIdx * (cardWidth + GAP)) + centerOffset;
                    
                    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
                }
              }}
              className="flex items-center cursor-grab active:cursor-grabbing"
              style={{ x, gap: `${GAP}px` }}
            >
              {tripled.map((project, i) => (
                <a
                  key={`${project.id}-${i}`}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative shrink-0 flex flex-col group cursor-pointer"
                  style={{
                    width: `${cardWidth}px`,
                  }}
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full aspect-square md:aspect-[4/5] bg-card border-2 border-white rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-shadow duration-300"
                  >
                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      draggable={false}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                    {/* Text Label Sticker Style */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white px-3 py-2 border-2 border-black inline-block -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-[10px] md:text-sm font-black text-black font-cabinet uppercase tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Subtle description below card */}
                  <div className="mt-4 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <p className="text-white/60 text-[10px] font-medium font-roboto-condensed tracking-wider uppercase line-clamp-1">
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
            <div className="flex gap-3 items-center">
              {projects.map((_, i) => {
                const isActive = i === activeLogicalIndex;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      width: isActive ? 32 : 8,
                      backgroundColor: isActive
                        ? "#F97316"
                        : "rgba(255,255,255,0.2)",
                      scale: isActive ? 1.2 : 1,
                    }}
                    className="h-2 rounded-full cursor-pointer"
                    onClick={() => {
                      // Optional: jump to specific card
                    }}
                  />
                );
              })}
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
