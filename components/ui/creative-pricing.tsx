"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Simple Pricing. Powerful Results.",
    description = "Choose the plan that's right for your business",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div className="w-full max-w-5xl mx-auto px-5 md:px-4">
            {/* Header */}
            <div className="text-center mb-8 md:mb-8">
                <div className="font-roboto-condensed font-bold uppercase tracking-[0.2em] text-sm text-orange-500 mb-2">
                    {tag}
                </div>
                <div className="relative pb-4 overflow-visible">
                    <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-black font-cabinet text-foreground rotate-[-1deg] tracking-tighter overflow-visible">
                        {title}
                        {/* Stars — visible on all screens */}
                        <div className="absolute -right-10 top-0 text-amber-500 rotate-12 text-3xl md:text-4xl">
                            ✨
                        </div>
                        <div className="absolute -left-7 bottom-0 text-blue-500 -rotate-12 text-3xl md:text-4xl">
                            ⭐️
                        </div>
                    </h2>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-36 h-2 bg-orange-500/20 rotate-[-1deg] rounded-full blur-sm" />
                </div>
                <p className="font-roboto-condensed text-sm md:text-base text-muted-foreground uppercase tracking-wider mt-5 max-w-lg mx-auto leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Cards:
                Mobile  — full-width single column, each card is ~80vh so one appears per view
                Desktop — 2 columns, compact side-by-side
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 w-full max-w-xs md:max-w-2xl mx-auto items-stretch">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group flex flex-col",
                            "transition-all duration-300",
                            /* Mobile: reduced height, one per viewport */
                            "min-h-[52vh] md:min-h-0",
                            index === 0 && "md:rotate-[-1deg]",
                            index === 1 && "md:rotate-[1deg]"
                        )}
                    >
                        {/* Neobrutalist card border/shadow */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-card",
                                "border-2 border-foreground",
                                "rounded-lg shadow-[3px_3px_0px_0px] shadow-foreground transition-all duration-300",
                                "group-hover:shadow-[6px_6px_0px_0px]",
                                "group-hover:translate-x-[-3px]",
                                "group-hover:translate-y-[-3px]"
                            )}
                        />

                        <div className="relative p-6 md:p-5 flex flex-col h-full">
                            {/* Popular badge */}
                            {tier.popular && (
                                <div className="absolute -top-2 -right-2 bg-orange-500 text-white font-handwritten px-3 py-1 rounded-full rotate-12 text-sm border-2 border-foreground z-10">
                                    Most Popular!
                                </div>
                            )}

                            {/* Icon + Name + Description */}
                            <div className="flex items-center gap-3 mb-5 md:mb-4">
                                <div
                                    className={cn(
                                        "w-12 h-12 md:w-10 md:h-10 rounded-full shrink-0",
                                        "flex items-center justify-center",
                                        "border-2 border-foreground",
                                        tier.color === "green" ? "bg-green-500/20 text-green-500" : "bg-blue-500/20 text-blue-500"
                                    )}
                                >
                                    {tier.icon}
                                </div>
                                <div>
                                    <h3 className="font-cabinet font-black text-xl md:text-lg text-foreground leading-tight">
                                        {tier.name}
                                    </h3>
                                    <p className="font-roboto-condensed text-xs md:text-xs text-muted-foreground leading-tight uppercase tracking-wider mt-1 opacity-70">
                                        {tier.description}
                                    </p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-5 md:mb-4 font-cabinet">
                                <span className="text-4xl md:text-3xl font-black text-foreground">
                                    {tier.price}
                                </span>
                                <span className="text-muted-foreground ml-2 font-roboto-condensed font-bold text-xs uppercase tracking-widest opacity-60">
                                    / fixed
                                </span>
                            </div>

                            {/* Features */}
                            <div className="space-y-2.5 md:space-y-2 mb-5 md:mb-4 flex-1">
                                {tier.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <div className="w-5 h-5 md:w-4 md:h-4 rounded-full border-2 border-foreground flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 md:w-2.5 md:h-2.5 text-foreground" strokeWidth={3} />
                                        </div>
                                        <span className="font-roboto-condensed text-[13px] md:text-sm font-medium text-foreground/80">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                             {/* CTA */}
                            <div className="mt-auto">
                                <Button
                                    onClick={() => {
                                        const contactSection = document.getElementById("contact");
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: "smooth" });
                                            // Focus the input after the scroll animation roughly completes
                                            setTimeout(() => {
                                                document.getElementById("contact-name-input")?.focus();
                                            }, 800);
                                        }
                                    }}
                                    className={cn(
                                        "w-full h-12 md:h-10 font-roboto-condensed font-bold uppercase tracking-widest text-sm relative",
                                        "border-2 border-foreground",
                                        "transition-all duration-300",
                                        "shadow-[3px_3px_0px_0px] shadow-foreground",
                                        "hover:shadow-[5px_5px_0px_0px]",
                                        "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                                        tier.popular
                                            ? "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700"
                                            : "bg-background text-foreground hover:bg-muted active:bg-background"
                                    )}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative background pencil elements */}
            <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-40 left-20 text-3xl rotate-12">✎</div>
                <div className="absolute bottom-40 right-20 text-3xl -rotate-12">✏️</div>
            </div>
        </div>
    );
}

export { CreativePricing, type PricingTier }
