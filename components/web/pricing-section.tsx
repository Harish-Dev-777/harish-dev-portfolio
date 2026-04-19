"use client";

import { CreativePricing, type PricingTier } from "@/components/ui/creative-pricing";
import { Circle, Star } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

const pricingTiers: PricingTier[] = [
    {
        name: "Standard Plan",
        icon: <Circle className="w-6 h-6 fill-current" />,
        price: "₹3,999",
        description: "Perfect for small businesses & startups",
        color: "green",
        features: [
            "1–3 Pages Website",
            "Mobile Responsive",
            "SEO Setup",
            "Contact Form",
            "1 Year Free Hosting & Domain",
        ],
    },
    {
        name: "Premium Plan",
        icon: <Star className="w-6 h-6 fill-current" />,
        price: "₹6,999",
        description: "For brands that want to stand out",
        color: "blue",
        features: [
            "6–8 Pages Website",
            "Advanced UI/UX",
            "Booking System",
            "Admin Dashboard",
            "Priority Support",
            "1 Year Free Hosting & Domain",
        ],
        popular: true,
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="min-h-screen md:h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background py-10 md:py-0">
            <CreativePricing 
                tag="Simple Pricing"
                title={
                    <RevealText 
                        text="Simple Pricing. Powerful Results." 
                        highlightedWords={["Powerful"]} 
                        className="text-inherit font-inherit max-w-[280px] md:max-w-none justify-center"
                    />
                }
                description="Invest in an online presence that works as hard as you do."
                tiers={pricingTiers}
            />
        </section>
    );
}
