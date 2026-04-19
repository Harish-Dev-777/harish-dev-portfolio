"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";

/* ─── Single Parallax Row ─── */
interface ParallaxTextProps {
  children: string;
  baseVelocity: number; // positive = left-to-right, negative = right-to-left
}

function ParallaxText({ children, baseVelocity }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Turn scroll velocity into a speed multiplier — lower cap = slower boost
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  // We repeat the text 4x to ensure seamless wrapping
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    // Base movement per frame
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // When scrolling, snap direction to match scroll and speed up
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // Repeat children 4 times per row for a seamless loop
  const repeated = Array(4).fill(children);

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {repeated.map((text, i) => (
          <span key={i} className="block mr-8">
            {text}
            <span className="text-orange-500 mx-4">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ─── */
export const VelocityScroll = () => {
  return (
    <section className="relative w-full min-h-screen bg-background overflow-hidden select-none border-y border-foreground/10 flex flex-col items-center justify-center">
      {/* ~-10deg diagonal — matches the reference image angle */}
      <div className="rotate-[10deg] scale-[1.1] w-full space-y-6">
        {/* Row 1 — drifts LEFT to RIGHT */}
        <div className="text-5xl sm:text-6xl md:text-8xl font-black text-foreground/60 font-cabinet tracking-tighter">
          <ParallaxText baseVelocity={1.5}>
            UI Design · Webflow · Interaction Design · Branding · Next.js · Motion
          </ParallaxText>
        </div>

        {/* Row 2 — drifts RIGHT to LEFT (bold, full contrast) */}
        <div className="text-5xl sm:text-6xl md:text-8xl font-black text-foreground font-cabinet tracking-tighter">
          <ParallaxText baseVelocity={-1.5}>
            Strategy · Development · Figma · React · Creative Direction · UX
          </ParallaxText>
        </div>
      </div>
    </section>
  );
};
