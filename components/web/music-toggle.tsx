"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";

export const MusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        audioRef.current = new Audio("/music/Struct.mpeg");
        audioRef.current.loop = true;
        audioRef.current.volume = 0;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const fadeAudio = (targetVolume: number, duration: number = 2000) => {
        if (!audioRef.current) return;
        
        const audio = audioRef.current;
        const startVolume = audio.volume;
        const steps = 40;
        const interval = duration / steps;
        const volumeStep = (targetVolume - startVolume) / steps;
        
        let currentStep = 0;
        const fade = setInterval(() => {
            currentStep++;
            const newVolume = Math.max(0, Math.min(1, startVolume + volumeStep * currentStep));
            audio.volume = newVolume;
            
            if (currentStep >= steps) {
                clearInterval(fade);
                if (targetVolume === 0) {
                    audio.pause();
                }
            }
        }, interval);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            // Fade out
            fadeAudio(0);
            setIsPlaying(false);
        } else {
            // Fade in
            audioRef.current.play();
            fadeAudio(0.4); // Moderate volume
            setIsPlaying(true);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="relative group">
            <motion.button
                onClick={togglePlay}
                className="relative flex items-center justify-center w-12 h-12 rounded-full border border-orange-500/30 bg-white dark:bg-zinc-950 transition-colors hover:border-orange-500 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isPlaying ? "on" : "off"}
                            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                            transition={{ duration: 0.2 }}
                            className="text-orange-500"
                        >
                            <div className="relative flex items-center justify-center">
                                <Music className="w-5 h-5" />
                                {!isPlaying && (
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: "120%" }}
                                        className="absolute h-[1.5px] bg-orange-500 rotate-[45deg] origin-center shadow-sm"
                                        style={{ top: "50%", left: "-10%" }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Indicator Glow */}
                    {isPlaying && (
                        <motion.div 
                            className="absolute -inset-2 rounded-full border border-orange-500/20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}
                </div>
            </motion.button>
        </div>
    );
};
