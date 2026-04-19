"use client";

import React from "react";
import { SocialLinks } from "@/components/ui/social-links";
import { motion } from "framer-motion";

export const ScrollSocials = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      className="fixed left-4 md:left-10 bottom-8 md:bottom-12 z-[120]"
    >
      <SocialLinks vertical={true} className="p-0 gap-2 md:gap-4 scale-90 md:scale-100 origin-bottom-left" />
    </motion.div>
  );
};
