"use client";

import React from 'react';

interface MobileToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileToggle = ({ isOpen, setIsOpen }: MobileToggleProps) => {
  return (
    <div className="z-50 md:hidden flex items-center justify-center text-foreground">
      <label className={`hamburger ${isOpen ? 'active' : ''}`}>
        <input 
          type="checkbox" 
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)} 
        />
        <svg viewBox="0 0 32 32" className="w-12 h-12">
          <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>
    </div>
  );
};
