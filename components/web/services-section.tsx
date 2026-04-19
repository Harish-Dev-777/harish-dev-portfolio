"use client";

import FlowingMenu from "@/components/ui/flowing-menu";
import { RevealText } from "@/components/ui/reveal-text";

export function ServicesSection() {
    const demoItems = [
        { 
            link: '#', 
            text: 'Website Development', 
            image: '/services/website-development.png' 
        },
        { 
            link: '#', 
            text: 'SEO Optimization', 
            image: '/services/seo.png' 
        },
        { 
            link: '#', 
            text: 'Web App Development', 
            image: '/services/web-app.png' 
        },
        { 
            link: '#', 
            text: 'Website Maintenance', 
            image: '/services/web-maintenece.png' 
        }
    ];

    return (
        <section id="services" className="relative w-full h-[100dvh] md:h-screen bg-background flex flex-col pt-24 md:pt-20 pb-24 md:pb-0 overflow-hidden">
            <div className="pl-16 pr-6 md:pl-[12vw] md:pr-12 lg:pl-[15vw] lg:pr-24 mb-10 shrink-0">
                {/* Section Label */}
                <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-foreground/40 mb-4">
                    What I Can Do For You
                </p>
                <RevealText 
                    text="From idea to deployment, I handle everything."
                    className="text-3xl md:text-5xl font-black font-cabinet text-foreground tracking-tighter"
                    highlightedWords={["I", "handle", "everything"]}
                />
            </div>

            <div className="flex-1 w-full relative border-b border-foreground/10 min-h-0">
                <FlowingMenu 
                    items={demoItems} 
                    speed={12}
                    textColor="currentColor"
                    bgColor="transparent"
                    marqueeBgColor="#f97316" // orange-500
                    marqueeTextColor="#ffffff"
                    borderColor="rgba(var(--foreground-rgb), 0.1)"
                />
            </div>
        </section>
    );
}
