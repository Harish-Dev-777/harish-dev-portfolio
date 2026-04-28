"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { RevealText } from "@/components/ui/reveal-text";

// ─── Arrow Button ───
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
    aria-label={direction === "left" ? "Previous project" : "Next project"}
    className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/40 flex items-center justify-center overflow-hidden cursor-pointer z-10"
  >
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

// ─── Project Card with 3D coverflow transitions ───
const ProjectCard = ({
  project,
  index,
  x,
  step,
  cardWidth,
  containerWidth,
}: {
  project: (typeof projects)[0];
  index: number;
  x: ReturnType<typeof useMotionValue<number>>;
  step: number;
  cardWidth: number;
  containerWidth: number;
}) => {
  const screenCenter = containerWidth / 2;
  const cardCenter = useTransform(
    x,
    (v) => v + index * step + cardWidth / 2
  );
  const offsetFromCenter = useTransform(cardCenter, (c) => c - screenCenter);

  // Original coverflow transforms
  const scale = useTransform(offsetFromCenter, [-step, 0, step], [0.85, 1, 0.85]);
  const opacity = useTransform(offsetFromCenter, [-step * 1.5, 0, step * 1.5], [0.7, 1, 0.7]);
  const rotateY = useTransform(offsetFromCenter, [-step, 0, step], [25, 0, -25]);
  const zIndex = useTransform(offsetFromCenter, (o) =>
    Math.abs(o) < step / 2 ? 10 : 1
  );

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className="shrink-0 flex flex-col group"
      style={{ width: `${cardWidth}px`, zIndex }}
      onClick={(e) => {
        if (Math.abs(x.getVelocity()) > 20) e.preventDefault();
      }}
    >
      <motion.div
        style={{ scale, opacity, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full aspect-square md:aspect-[4/5] border-2 border-white rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform-gpu"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
          <div className="bg-white px-3 py-2 border-2 border-black inline-block -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-[10px] md:text-sm font-black text-black font-oswald uppercase tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Go Live Arrow */}
        <div className="absolute top-4 right-4 z-20">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={3} />
          </div>
        </div>
      </motion.div>

      <motion.p
        style={{ opacity }}
        className="mt-4 text-center text-white/60 text-[10px] md:text-xs font-medium tracking-wider uppercase line-clamp-1 pointer-events-none"
      >
        {project.description}
      </motion.p>
    </motion.a>
  );
};

// ─── Infinite Carousel ───
export const Projects = () => {
  const GAP = 24;
  const total = projects.length;

  // 35× repeated array. The "safe zone" is the middle copy: indices [17*total … 18*total-1]
  const REPS = 35;
  const repeated = Array.from({ length: REPS }, () => projects).flat();
  const SAFE_LO = total * 17;
  const SAFE_HI = total * 18 - 1;

  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const indexRef = useRef(SAFE_LO);
  const [activeIndex, setActiveIndex] = useState(0);
  const animating = useRef(false);

  // Pointer state
  const pointerDown = useRef(false);
  const pointerLastX = useRef(0);
  const velocityBuffer = useRef<number[]>([]);

  // ─── Measure ───
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.offsetWidth;
    setContainerWidth(cw);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const v = mobile ? 1 : 4;
    let w = mobile ? cw * 0.75 : (cw - GAP * (v - 1)) / v;
    if (w > 480) w = 480;
    setCardWidth(w);
  }, []);

  useEffect(() => {
    measure();
    const id = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = cardWidth + GAP;

  // Where x needs to be so card `idx` is centered
  const xForIndex = useCallback(
    (idx: number) => (containerWidth - cardWidth) / 2 - idx * step,
    [containerWidth, cardWidth, step]
  );

  // Set initial position once measured
  useEffect(() => {
    if (cardWidth > 0 && containerWidth > 0) {
      x.set(xForIndex(indexRef.current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth, containerWidth]);

  /**
   * The core fix: silently teleport x when the index wraps.
   *
   * When index needs to wrap (e.g. from SAFE_LO-1 back to SAFE_HI),
   * the visual card position is identical because the arrays repeat.
   * We shift x by exactly `shiftedCards * step` so the container
   * doesn't visually move at all — then animate to the new target.
   */
  const goTo = useCallback(
    (idx: number, immediate = false) => {
      if (animating.current && !immediate) return;
      animating.current = true;

      // Update immediate index tracking
      indexRef.current = idx;
      // Handle JS modulo negative correctly
      setActiveIndex(((idx % total) + total) % total);

      const target = xForIndex(idx);

      if (immediate) {
        x.set(target);
        animating.current = false;
        return;
      }

      animate(x, target, {
        type: "spring",
        stiffness: 220,
        damping: 30,
        mass: 0.8,
        onComplete: () => {
          animating.current = false;

          // SAFE SILENT NORMALIZATION AT REST
          // This eliminates any 'flying back' Framer Motion race conditions.
          let finalIdx = indexRef.current;
          let shift = 0;
          
          while (finalIdx < SAFE_LO) {
            finalIdx += total;
            shift += total;
          }
          while (finalIdx > SAFE_HI) {
            finalIdx -= total;
            shift -= total;
          }

          // If we wrapped out of bounds, secretly teleport while the slider is resting
          if (shift !== 0) {
            indexRef.current = finalIdx;
            x.set(xForIndex(finalIdx));
          }
        },
      });
    },
    [SAFE_LO, SAFE_HI, total, xForIndex, x]
  );

  const slide = useCallback(
    (dir: number) => goTo(indexRef.current + dir),
    [goTo]
  );

  // Snap to nearest card from current physical x
  const snapToNearest = useCallback(() => {
    const currentX = x.get();
    const rawIdx = Math.round(
      ((containerWidth - cardWidth) / 2 - currentX) / step
    );
    goTo(rawIdx);
  }, [containerWidth, cardWidth, step, x, goTo]);

  // ─── Desktop: horizontal mouse wheel / trackpad ───
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let pending: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      const isH = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isShift = e.shiftKey && Math.abs(e.deltaY) > 0;
      if (!isH && !isShift) return;

      e.preventDefault();
      animating.current = false; // allow override
      x.set(x.get() - (isH ? e.deltaX : e.deltaY));

      if (pending) clearTimeout(pending);
      pending = setTimeout(() => snapToNearest(), 100);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (pending) clearTimeout(pending);
    };
  }, [snapToNearest, x]);

  // ─── Pointer / Touch drag ───
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const clientX = (e: PointerEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientX : (e as PointerEvent).clientX;

    const onStart = (e: PointerEvent | TouchEvent) => {
      pointerDown.current = true;
      pointerLastX.current = clientX(e);
      velocityBuffer.current = [];
      animating.current = false;
    };

    const onMove = (e: PointerEvent | TouchEvent) => {
      if (!pointerDown.current) return;
      const cx = clientX(e);
      const dx = cx - pointerLastX.current;
      pointerLastX.current = cx;

      velocityBuffer.current.push(dx);
      if (velocityBuffer.current.length > 6) velocityBuffer.current.shift();

      x.set(x.get() + dx);
      if ("touches" in e && e.cancelable) e.preventDefault();
    };

    const onEnd = () => {
      if (!pointerDown.current) return;
      pointerDown.current = false;

      const vx = velocityBuffer.current.length
        ? velocityBuffer.current.reduce((a, b) => a + b, 0) /
          velocityBuffer.current.length
        : 0;

      // Project with momentum then snap
      const projected = x.get() + vx * 8;
      const rawIdx = Math.round(
        ((containerWidth - cardWidth) / 2 - projected) / step
      );
      goTo(rawIdx);
    };

    // Pointer events (mouse + stylus)
    el.addEventListener("pointerdown", onStart as EventListener, {
      passive: true,
    });
    window.addEventListener("pointermove", onMove as EventListener, {
      passive: true,
    });
    window.addEventListener("pointerup", onEnd);

    // Touch events (iOS reliability)
    el.addEventListener("touchstart", onStart as EventListener, {
      passive: true,
    });
    el.addEventListener("touchmove", onMove as EventListener, {
      passive: false,
    });
    el.addEventListener("touchend", onEnd);

    return () => {
      el.removeEventListener("pointerdown", onStart as EventListener);
      window.removeEventListener("pointermove", onMove as EventListener);
      window.removeEventListener("pointerup", onEnd);
      el.removeEventListener("touchstart", onStart as EventListener);
      el.removeEventListener("touchmove", onMove as EventListener);
      el.removeEventListener("touchend", onEnd);
    };
  }, [containerWidth, cardWidth, step, goTo, x]);

  return (
    <section
      id="selected-projects"
      className="relative w-full min-h-screen bg-[#111111] flex flex-col justify-center py-24 select-none overflow-hidden"
    >
      {/* Header */}
      <div className="pl-14 pr-6 md:pl-[10vw] md:pr-12 lg:pl-[12vw] lg:pr-24 mb-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/40 mb-3">
              My Work
            </p>
            <RevealText
              text="Selected Works"
              highlightedWords={["Works"]}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white font-oswald leading-none"
            />
          </div>
          <div className="hidden md:flex gap-4">
            <ArrowButton direction="left" onClick={() => slide(-1)} />
            <ArrowButton direction="right" onClick={() => slide(1)} />
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          cursor: "grab",
          WebkitMaskImage: isMobile
            ? "none"
            : "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage: isMobile
            ? "none"
            : "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Carousel Track */}

        <motion.div
          className="flex items-center pt-4 pb-10"
          style={{ x, gap: `${GAP}px` }}
        >
          {cardWidth > 0 &&
            repeated.map((project, i) => (
              <ProjectCard
                key={`${project.id}-${i}`}
                project={project}
                index={i}
                x={x}
                step={step}
                cardWidth={cardWidth}
                containerWidth={containerWidth}
              />
            ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center gap-6">
        {/* Pagination dots */}
        <div className="flex gap-3 items-center">
          {projects.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === activeIndex ? 32 : 8,
                backgroundColor:
                  i === activeIndex ? "#F97316" : "rgba(255,255,255,0.25)",
                scale: i === activeIndex ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-2 rounded-full cursor-pointer"
              onClick={() => {
                const diff = i - activeIndex;
                goTo(indexRef.current + diff);
              }}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden gap-4">
          <ArrowButton direction="left" onClick={() => slide(-1)} />
          <ArrowButton direction="right" onClick={() => slide(1)} />
        </div>
      </div>
    </section>
  );
};
