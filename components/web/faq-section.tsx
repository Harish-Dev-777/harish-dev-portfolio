"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

import { RevealText } from "@/components/ui/reveal-text";

const FAQS = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most websites are completed within 2-5 days, depending on the complexity and features required.",
  },
  {
    question: "Is the pricing negotiable?",
    answer:
      "Yes, pricing can vary based on your specific requirements. I offer flexible solutions to fit different budgets while maintaining quality.",
  },
  {
    question: "Do you offer support after the project is completed?",
    answer:
      "Yes, I provide ongoing support and maintenance to keep your website updated, secure, and running smoothly.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Absolutely. Every website is fully responsive and optimized for mobile, tablet, and desktop devices.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes, I can revamp and modernize your current website to improve design, performance, and user experience.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Just your basic idea or requirement. I’ll guide you through the process and handle everything from design to deployment.",
  },
  {
    question: "Do you build custom designs or use templates?",
    answer:
      "I focus on custom-designed websites tailored to your brand, not generic templates.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer:
      "Yes, I follow SEO best practices like proper structure, fast loading speed, and optimized content to help your website rank better.",
  },
  {
    question: "Can you integrate features like booking systems or payment gateways?",
    answer:
      "Absolutely. I can integrate custom features like booking systems, payment gateways, contact forms, and more based on your needs.",
  },
  {
    question: "What happens if I need changes after delivery?",
    answer:
      "Minor changes are supported after delivery. For larger updates, I offer flexible revision and maintenance options.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 md:py-32 bg-background flex justify-center pl-20 pr-6 md:pl-[12vw] md:pr-12 lg:pl-[15vw] lg:pr-24 border-t border-foreground/10">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        {/* Sticky Header Column */}
        <div className="w-full md:w-1/3 md:sticky md:top-32">
          <RevealText 
            text="Got Questions?" 
            className="text-orange-500 font-roboto-condensed font-bold uppercase tracking-[0.2em] text-sm mb-4" 
          />
          <div className="w-min md:w-[6ch]">
            <RevealText
              text="Frequently Asked Questions"
              highlightedWords={["Asked"]}
              className="text-4xl md:text-5xl lg:text-6xl font-black font-oswald text-foreground uppercase leading-[0.9] tracking-tighter"
            />
          </div>
          <p className="mt-6 text-foreground/60 font-poppins text-sm md:text-base leading-relaxed max-w-sm">
            Everything you need to know about my process, pricing, and how we can collaborate.
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full md:w-2/3 flex flex-col">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={cn(
                  "border-b border-foreground/20 overflow-hidden transition-colors duration-300",
                  isOpen ? "bg-foreground/[0.03]" : "hover:bg-foreground/[0.02]"
                )}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 md:py-8 pl-4 pr-2 flex justify-between items-center text-left focus:outline-none focus-visible:bg-foreground/5 group"
                >
                  <span 
                    className={cn(
                      "font-oswald font-bold text-lg md:text-2xl pr-8 transition-colors duration-300",
                      isOpen ? "text-orange-500" : "text-foreground group-hover:text-foreground/80"
                    )}
                  >
                    {faq.question}
                  </span>
                  
                  <div 
                    className={cn(
                      "flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      isOpen 
                        ? "border-orange-500 bg-orange-500 text-white" 
                        : "border-foreground/30 text-foreground group-hover:border-foreground"
                    )}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isOpen ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="pb-8 pt-2 pl-4 pr-12 md:pr-20 text-foreground/70 font-poppins text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
