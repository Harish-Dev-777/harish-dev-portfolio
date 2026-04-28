"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/harishdev777" },
  { label: "Instagram", href: "https://www.instagram.com/_harish.143/" },
  { label: "WhatsApp",  href: "https://wa.me/919025946625" },
  { label: "GitHub",    href: "https://github.com/Harish-Dev-777" },
];

const NAV_LINKS = [
  { label: "Home",       href: "#hero" },
  { label: "About me",  href: "#about" },
  { label: "Services",  href: "#services" },
  { label: "Projects",  href: "#selected-projects" },
  { label: "Pricing",   href: "#pricing" },
  { label: "Contact",   href: "#contact" },
];

// ─── Reusable animated link row (exact metrics-grid pattern) ─────────────────

type HoverLinkProps = {
  label: string;
  hoverLabel?: string;
  href: string;
  isExternal?: boolean;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  /** sm text size for the right-column contact values */
  small?: boolean;
};

const HoverLink = ({
  label,
  hoverLabel,
  href,
  isExternal,
  isHovered,
  onEnter,
  onLeave,
  small = false,
}: HoverLinkProps) => (
  <div
    className="relative w-full"
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    {/* Stage 1 – thin horizontal orange line (instant) */}
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#FF4D00] z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    />

    {/* Stage 2 – vertical block expansion from centre */}
    <motion.div
      className="absolute inset-0 bg-[#FF4D00] z-0 origin-center pointer-events-none"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: isHovered ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: isHovered ? 0.1 : 0,
        ease: [0.76, 0, 0.24, 1],
      }}
    />

    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`
        relative z-10 flex items-center py-1 pr-3 cursor-pointer
        font-roboto-condensed font-black tracking-tight uppercase leading-none
        transition-colors duration-300
        ${isHovered ? "text-black" : "text-white"}
        ${small
          ? "text-sm md:text-lg font-bold lowercase tracking-normal font-poppins"
          : "text-3xl md:text-4xl lg:text-[2.6rem]"}
      `}
    >
      {/* Orange triangle bullet - only show if not small */}
      {!small && (
        <span className="mr-3 shrink-0 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#FF4D00]" />
      )}
      
      {/* Animated Text Swap */}
      <span className="relative flex items-center h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={isHovered && hoverLabel ? "hover" : "base"}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="block"
          >
            {isHovered && hoverLabel ? hoverLabel.toLowerCase() : label.toLowerCase()}
          </motion.span>
        </AnimatePresence>
      </span>
    </a>
  </div>
);

// ─── Footer ──────────────────────────────────────────────────────────────────

export const Footer = () => {
  /**
   * Encode each hovered item as a string "col-index" so each column
   * manages its own independent hover state (same idea as metrics-grid's
   * single hoveredIndex, but across 3 independent lists).
   */
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <footer
      className="relative w-full bg-black text-white overflow-hidden"
    >
      {/* ── Top separator ── */}
      <div className="w-full h-px bg-white/10" />

      <div className="max-w-[1400px] mx-auto pl-24 pr-6 md:pl-[12vw] lg:pl-[15vw] md:pr-16 lg:pr-24 py-8 md:py-10">

        {/* CONNECT label */}
        <p className="mb-6 text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase font-roboto-condensed">
          C o n n e c t
        </p>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">

          {/* ── LEFT : Socials ── */}
          <div className="flex flex-col">
            {SOCIAL_LINKS.map((item) => {
              const key = `left-${item.label}`;
              return (
                <HoverLink
                  key={key}
                  label={item.label}
                  href={item.href}
                  isExternal
                  isHovered={hovered === key}
                  onEnter={() => setHovered(key)}
                  onLeave={() => setHovered(null)}
                />
              );
            })}
          </div>

          {/* ── MIDDLE : Nav links ── */}
          <div className="flex flex-col">
            {NAV_LINKS.map((item) => {
              const key = `mid-${item.label}`;
              return (
                <HoverLink
                  key={key}
                  label={item.label}
                  href={item.href}
                  isHovered={hovered === key}
                  onEnter={() => setHovered(key)}
                  onLeave={() => setHovered(null)}
                />
              );
            })}
          </div>

          {/* ── RIGHT : Contact info ── */}
          <div className="flex flex-col gap-4 justify-start font-roboto-condensed">

            {/* Email */}
            <div>
              <p className="text-[10px] font-medium text-white/40 lowercase tracking-widest mb-1">
                email
              </p>
              <HoverLink
                label="harishmkdev@gmail.com"
                hoverLabel="100% i will read all the mail"
                href="mailto:harishmkdev@gmail.com"
                isExternal
                small
                isHovered={hovered === "contact-email"}
                onEnter={() => setHovered("contact-email")}
                onLeave={() => setHovered(null)}
              />
            </div>

            {/* Phone */}
            <div>
              <p className="text-[10px] font-medium text-white/40 lowercase tracking-widest mb-1">
                phone
              </p>
              <HoverLink
                label="+91 9025946625"
                hoverLabel="90 % change i will pick up the calls"
                href="tel:+919025946625"
                isExternal
                small
                isHovered={hovered === "contact-phone"}
                onEnter={() => setHovered("contact-phone")}
                onLeave={() => setHovered(null)}
              />
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row mt-8 pt-6 border-t border-white/10  justify-between items-center font-roboto-condensed -translate-x-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            © 2026 Harish Portfolio
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            India / Chennai
          </p>
        </div>

      </div>
    </footer>
  );
};
