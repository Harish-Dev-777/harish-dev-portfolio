"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";

export const MusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasTriedAutoRef = useRef(false);

    const fadeAudio = useCallback((targetVolume: number, duration: number = 2000) => {
        if (!audioRef.current) return;

        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
        }

        const audio = audioRef.current;
        const startVolume = audio.volume;
        const steps = 40;
        const interval = duration / steps;
        const volumeStep = (targetVolume - startVolume) / steps;

        let currentStep = 0;
        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            const newVolume = Math.max(0, Math.min(1, startVolume + volumeStep * currentStep));
            audio.volume = newVolume;

            if (currentStep >= steps) {
                if (fadeIntervalRef.current) {
                    clearInterval(fadeIntervalRef.current);
                }
                if (targetVolume === 0) {
                    audio.pause();
                }
            }
        }, interval);
    }, []);

    useEffect(() => {
        setIsMounted(true);

        // Create audio element
        const audio = new Audio("/music/Struct.mpeg");
        audio.loop = true;
        audio.volume = 0;
        audio.preload = "auto";
        audioRef.current = audio;

        const events = ["click", "touchstart", "mousedown", "keydown"];

        const removeListeners = () => {
            events.forEach((evt) =>
                document.removeEventListener(evt, autoPlayOnInteraction, true)
            );
        };

        // This handler runs on the FIRST user interaction
        const autoPlayOnInteraction = () => {
            if (hasTriedAutoRef.current) return;
            hasTriedAutoRef.current = true;

            if (audioRef.current && !isPlayingRef.current) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    isPlayingRef.current = true;
                    fadeAudio(0.20, 3000);
                }).catch(() => {
                    hasTriedAutoRef.current = false;
                });
            }

            if (hasTriedAutoRef.current) {
                removeListeners();
            }
        };

        // 1) Try immediate autoplay first (works on localhost & trusted sites)
        audio.play().then(() => {
            hasTriedAutoRef.current = true;
            isPlayingRef.current = true;
            setIsPlaying(true);
            fadeAudio(0.20, 3000);
        }).catch(() => {
            // 2) Autoplay blocked — register interaction listeners as fallback
            events.forEach((evt) =>
                document.addEventListener(evt, autoPlayOnInteraction, { capture: true, passive: true })
            );
        });

        return () => {
            removeListeners();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }
        };
    }, [fadeAudio]);

    // Keep a ref in sync with isPlaying state so the event handler can read it
    const isPlayingRef = useRef(false);
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            // Fade out
            fadeAudio(0);
            setIsPlaying(false);
        } else {
            // Fade in
            audioRef.current.play().then(() => {
                fadeAudio(0.20);
                setIsPlaying(true);
            }).catch(() => {});
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
