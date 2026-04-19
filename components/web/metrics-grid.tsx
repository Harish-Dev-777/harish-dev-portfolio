"use client";

import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
  {
    value: "100%",
    label: "Client Satisfaction",
    description: "Built on trust and radical transparency."
  },
  {
    value: "ROI",
    label: "Focused Design",
    description: "Conversion-driven strategies that scale."
  },
  {
    value: "On-Time",
    label: "Delivery Guaranteed",
    description: "No delays, no excuses, just results."
  },
  {
    value: "Global",
    label: "Client Reach",
    description: "Serving across diverse regions and industries."
  }
];

export const MetricsGrid = () => {
  return (
    <section className="w-full bg-background px-8 md:px-24 lg:px-32 py-24 border-t border-foreground/5 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
        {METRICS.map((metric, i) => (
          <motion.div 
            key={metric.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4 group"
          >
            {/* Metric Value */}
            <div className="text-6xl md:text-7xl lg:text-8xl font-black font-cabinet tracking-tighter text-foreground selection:bg-orange-200">
              {metric.value}
            </div>
            
            {/* Label & Description */}
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl font-bold font-roboto-condensed text-foreground tracking-tight">
                {metric.label}
              </h3>
              <p className="text-sm text-foreground/40 font-medium tracking-tight">
                {metric.description}
              </p>
            </div>

            {/* Accent Line */}
            <div className="w-12 h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
