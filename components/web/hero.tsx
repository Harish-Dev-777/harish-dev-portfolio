'use client';

import React from 'react';
import { TypographyHero } from '@/components/ui/typography-hero';
import { Nav } from '@/components/web/nav';

const Hero = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-orange-200 text-black">
      <Nav logoText="Harish." />
      <TypographyHero
        greeting="Hi👋, my name is Harish and I'm a freelancer."
        heading1="WEB DEVELOPER"
        heading2="& FREELANCER"
        imageSrc="/black-hero.png"
        location="based in Chennai, Tamil Nadu."
        leftButton="Start your project"
        rightButton="View My work"
      />
    </div>
  );
};

export default Hero;