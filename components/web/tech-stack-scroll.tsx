"use client";

import { useRef, useState } from "react";
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
import { cn } from "@/lib/utils";

interface ParallaxTextProps {
    children: string[];
    baseVelocity: number;
    isHovered: boolean;
}

function ParallaxText({ children, baseVelocity = 100, isHovered }: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        // Stop movement if hovered
        if (isHovered) return;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    const repeated = Array(8).fill(children).flat();

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap h-full items-center">
            <motion.div className="flex whitespace-nowrap flex-nowrap items-center gap-8 md:gap-12" style={{ x }}>
                {repeated.map((text, i) => (
                    <div key={i} className="flex items-center gap-8 md:gap-12">
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                            {text}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function TechStackScroll() {
    const [isHovered, setIsHovered] = useState(false);
    
    const stacks = [
        "HTML", "CSS", "JavaScript", "TypeScript", 
        "Tailwind CSS", "GSAP", "Framer", "React JS", 
        "Next JS", "Java", "Node JS", "Express JS", 
        "My SQL", "PostgreSQL", "Convex"
    ];

    return (
        <section 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative w-full h-[7vh] overflow-hidden select-none font-roboto-condensed flex items-center transition-colors duration-500",
                /* Light Mode: Black BG, White Text | Dark Mode: White BG, Black Text */
                "bg-black text-white dark:bg-white dark:text-black"
            )}
        >
            <ParallaxText baseVelocity={-0.6} isHovered={isHovered}>
                {stacks}
            </ParallaxText>
        </section>
    );
}
