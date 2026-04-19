'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/logo';

type Phase = 'waiting' | 'animating' | 'done';

const IntroTransition = () => {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const startAnim = setTimeout(() => {
      setPhase('animating');
    }, 1000);

    // Hide logo well before panels finish their sweep
    const hideLogoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 1600);

    const finishTimer = setTimeout(() => {
      setPhase('done');
    }, 3000);

    return () => {
      clearTimeout(startAnim);
      clearTimeout(hideLogoTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  if (phase === 'done') return null;

  const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];
  const panelTransition = { duration: 1.8, ease };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* PHASE 1: Solid full-screen black — zero diagonal lines */}
      <AnimatePresence>
        {phase === 'waiting' && (
          <motion.div
            key="solid"
            className="absolute inset-0 bg-[#0a0a0a]"
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
          />
        )}
      </AnimatePresence>

      {/* PHASE 2: Two triangular panels slide to corners */}
      <AnimatePresence>
        {phase === 'animating' && (
          <>
            <motion.div
              key="panel-tl"
              className="absolute bg-[#0a0a0a]"
              style={{
                inset: '-10%',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              }}
              initial={{ x: 0, y: 0 }}
              animate={{ x: '-110%', y: '-110%' }}
              transition={panelTransition}
            />

            <motion.div
              key="panel-br"
              className="absolute bg-[#0a0a0a]"
              style={{
                inset: '-10%',
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              }}
              initial={{ x: 0, y: 0 }}
              animate={{ x: '110%', y: '110%' }}
              transition={panelTransition}
            />
          </>
        )}
      </AnimatePresence>

      {/* Persistent Logo in bottom right corner - Hides exactly when showLogo becomes false */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            key="intro-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-16 right-16 z-[10000]"
          >
            <Logo isWhite className="text-8xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroTransition;
