"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  platform: "linkedin" | "github" | "instagram" | "whatsapp" | "gmail";
  href: string;
  label: string;
}

const SocialLink = ({ platform, href, label }: SocialLinkProps) => {
  const getBrandColors = () => {
    switch (platform) {
      case "linkedin":
        return "bg-[#0274b3]";
      case "github":
        return "bg-[#24262a]";
      case "instagram":
        return "bg-linear-to-tr from-[#405de6] via-[#c135b4] to-[#fd1f1f]";
      case "whatsapp":
        return "bg-[#25D366]";
      case "gmail":
        return "bg-[#EA4335]";
      default:
        return "bg-foreground";
    }
  };

  return (
    <li className="relative group flex items-center justify-center">
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full bg-background border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:text-white dark:hover:text-white text-[#FF4D00] group-hover:border-transparent"
      >
        {/* Fill Layer */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full z-0",
            getBrandColors()
          )} 
        />
        
        {/* Icon */}
        <div className="relative z-10">
          {platform === "linkedin" && (
            <svg viewBox="0 0 16 16" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" fill="currentColor">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          )}
          {platform === "github" && (
            <svg viewBox="0 0 16 16" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          )}
          {platform === "instagram" && (
            <svg viewBox="0 0 16 16" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" fill="currentColor">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          )}
          {platform === "whatsapp" && (
            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
          {platform === "gmail" && (
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" fill="currentColor">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" />
            </svg>
          )}
        </div>
      </a>

      {/* Tooltip */}
      <div 
        className={cn(
          "absolute pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 text-white text-[14px] py-1.5 px-2.5 rounded-[5px] z-20 whitespace-nowrap left-1/2 -translate-x-1/2",
          "bottom-[30px] group-hover:bottom-[55px]", 
          getBrandColors()
        )}
      >
        {label}
      </div>
    </li>
  );
};

export const SocialLinks = ({ className, vertical = false }: { className?: string; vertical?: boolean }) => {
  return (
    <ul className={cn(
      "flex gap-3 px-2 py-2",
      vertical ? "flex-col" : "flex-row",
      className
    )}>
      <SocialLink
        platform="linkedin"
        href="https://www.linkedin.com/in/harishdev777"
        label="LinkedIn"
      />
      <SocialLink
        platform="github"
        href="https://github.com/Harish-Dev-777"
        label="GitHub"
      />
      <SocialLink
        platform="instagram"
        href="https://www.instagram.com/_harish.143/"
        label="Instagram"
      />
      <SocialLink
        platform="whatsapp"
        href="https://wa.me/919025946625"
        label="WhatsApp"
      />
      <SocialLink
        platform="gmail"
        href="mailto:harishmkdev@gmail.com"
        label="Gmail"
      />
    </ul>
  );
};
