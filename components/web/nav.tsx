"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileToggle } from './mobile-toggle';
import { Logo } from '@/components/ui/logo';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const LINKS = [
  { label: 'About me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[120] flex w-full max-w-screen-2xl mx-auto items-center justify-between px-8 py-6 md:px-12 transition-all duration-300",
        scrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-foreground/5 shadow-sm" 
          : "bg-transparent py-8"
      )}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="z-[121] cursor-pointer"
        onClick={(e) => handleNavClick(e, '#hero')}
      >
        <Logo isWhite={isDark} className="text-4xl" />
      </motion.div>

      {/* Desktop Nav */}
      <div className="hidden items-center space-x-8 md:flex">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-orange-500 uppercase"
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <MobileToggle isOpen={isOpen} setIsOpen={setIsOpen} />

      </motion.nav>

      {/* Fullscreen Mobile Menu - Moved outside transform context */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
              opacity: 0 
            }}
            animate={{ 
              clipPath: 'circle(150% at calc(100% - 40px) 40px)',
              opacity: 1 
            }}
            exit={{ 
              clipPath: 'circle(0% at calc(100% - 40px) 40px)',
              opacity: 0 
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] 
            }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.2,
                  }
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  }
                }
              }}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col items-center space-y-4 px-6"
            >
              {LINKS.map((link, linkIndex) => {
                const isActive = typeof window !== 'undefined' && window.location.hash === link.href;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    variants={{
                      hidden: { opacity: 0 },
                      show: { 
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.03,
                        }
                      },
                      exit: {
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }
                    }}
                    className={`text-5xl md:text-7xl font-black tracking-tighter uppercase font-roboto-condensed flex overflow-hidden translate-x-0 transition-opacity duration-300 text-foreground ${
                      isActive ? "opacity-30" : "hover:translate-x-4"
                    }`}
                  >
                    {link.label.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${link.label}-${charIndex}`}
                        variants={{
                          hidden: { y: "100%", opacity: 0 },
                          show: { 
                            y: 0, 
                            opacity: 1, 
                            transition: {
                              type: "spring",
                              stiffness: 80,
                              damping: 15,
                              mass: 1
                            }
                          },
                          exit: {
                            y: "-100%",
                            opacity: 0,
                            transition: { duration: 0.3 }
                          }
                        }}
                        style={{ display: "inline-block", willChange: "transform, opacity" }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
