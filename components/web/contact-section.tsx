"use client";

import React, { useState } from "react";
import { ArrowRight, Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { z } from "zod/v4";
import { RevealText } from "@/components/ui/reveal-text";

// ─── Validation Schema ────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Please enter a valid email address"),
  company: z.string().max(100).optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  phone: z
    .string()
    .min(7, "Phone number too short")
    .max(20, "Phone number too long")
    .regex(/^[+\d\s()-]+$/, "Invalid phone number format"),
  details: z.string().max(2000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Constants ─────────────────────────────────────────────────────
const BUDGET_OPTIONS = [
  "₹2k-3k",
  "₹3k-5k",
  "₹5k-10k",
  "₹10k-15k",
  "₹15k-20k",
  ">₹20k",
];

const SERVICES = [
  "Website Development",
  "SEO Optimization",
  "Web App Development",
  "Website Maintenance",
];

const sanitize = (input: string) => {
  return input.replace(/<[^>]*>?/gm, "").trim();
};

export const ContactSection = () => {
  const [budget, setBudget] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Convex mutation
  const sendMessage = useMutation(api.messages.send);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});

    // Sanitize data
    const sanitizedData = {
      name: sanitize(formData.name),
      company: sanitize(formData.company) || undefined,
      service: sanitize(formData.service),
      budget: budget || undefined,
      email: sanitize(formData.email),
      phone: sanitize(formData.phone),
      details: sanitize(formData.details) || undefined,
    };

    // Validate with Zod
    const result = contactSchema.safeParse(sanitizedData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Convex (stores in DB + triggers email)
      await sendMessage({
        name: result.data.name,
        email: result.data.email,
        company: result.data.company,
        service: result.data.service,
        budget: result.data.budget,
        phone: result.data.phone,
        details: result.data.details,
      });

      // Reset Form State
      setFormData({
        name: "",
        company: "",
        service: "",
        email: "",
        phone: "",
        details: "",
      });
      setBudget(null);

      // Show success popup
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        "Something went wrong. Please try again or reach out directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Small helper for inline error
  const FieldError = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return (
      <motion.span
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1 text-red-500 text-xs font-medium ml-2 align-baseline"
      >
        <AlertCircle className="w-3 h-3" />
        {errors[field]}
      </motion.span>
    );
  };

  return (
    <>
      <section
        id="contact"
        className="w-full min-h-screen bg-background flex items-center py-20 pl-24 pr-6 md:pl-[12vw] md:pr-12 lg:pl-[15vw] lg:pr-24"
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-16 md:mb-24 flex flex-col items-start gap-1">
            {/* Desktop & Tablet: 2 Lines */}
            <div className="hidden md:flex flex-col items-start gap-1">
              <RevealText
                text="Let's build"
                highlightedWords={["build"]}
                className="text-5xl md:text-7xl lg:text-8xl font-oswald font-black uppercase tracking-tighter leading-[0.9] text-foreground"
              />
              <RevealText
                text="something amazing!"
                highlightedWords={["amazing"]}
                className="text-5xl md:text-7xl lg:text-8xl font-oswald font-black uppercase tracking-tighter leading-[0.9] text-foreground"
              />
            </div>

            {/* Mobile: 3 Lines */}
            <div className="flex md:hidden flex-col items-start gap-1">
              <RevealText
                text="Let's build"
                highlightedWords={["build"]}
                className="text-4xl font-oswald font-black uppercase tracking-tighter leading-[0.9] text-foreground"
              />
              <RevealText
                text="something"
                className="text-4xl font-oswald font-black uppercase tracking-tighter leading-[0.9] text-foreground"
              />
              <RevealText
                text="amazing!"
                highlightedWords={["amazing"]}
                className="text-4xl font-oswald font-black uppercase tracking-tighter leading-[0.9] text-foreground"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Form Text */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[2.2] md:leading-[2] font-poppins font-light text-foreground/80">
              <span>My name is </span>
              <input
                id="contact-name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="your name"
                required
                className={cn(
                  "bg-transparent border-b px-2 py-1 mx-1 text-foreground placeholder:text-foreground/30 focus:outline-none transition-colors w-[220px] md:w-[350px]",
                  errors.name
                    ? "border-red-500"
                    : "border-foreground/20 focus:border-foreground"
                )}
              />
              <FieldError field="name" />
              <span> and I represent </span>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="company"
                className="bg-transparent border-b border-foreground/20 px-2 py-1 mx-1 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors w-[250px] md:w-[400px]"
              />
              <span className="text-sm md:text-base text-foreground/40 align-baseline ml-1">
                (optional)
              </span>
              <span>. I'm interested in </span>

              <div className="inline-block relative">
                {/* Custom Select Trigger */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={cn(
                    "bg-transparent border-b px-2 pr-8 py-1 mx-1 focus:outline-none transition-colors w-[220px] md:w-[300px] cursor-pointer relative flex items-center",
                    errors.service
                      ? "border-red-500"
                      : "border-foreground/20 focus:border-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "block truncate",
                      formData.service
                        ? "text-foreground"
                        : "text-foreground/30"
                    )}
                  >
                    {formData.service || "service"}
                  </span>
                  {/* Custom arrow */}
                  <div
                    className="absolute right-2 top-1/2 opacity-50 transition-transform duration-300 pointer-events-none"
                    style={{
                      transform: isDropdownOpen
                        ? "translateY(-50%) rotate(180deg)"
                        : "translateY(-50%) rotate(0deg)",
                    }}
                  >
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <FieldError field="service" />

                {/* Hidden input for native required validation */}
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  required
                  className="opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-4 h-4 pointer-events-none"
                  tabIndex={-1}
                  readOnly
                />

                {/* Custom Select Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      {/* Invisible overlay to close on clicking outside */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1 mt-2 w-[220px] md:w-[300px] bg-background border border-foreground/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col font-poppins text-base md:text-lg"
                      >
                        {SERVICES.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, service }));
                              setIsDropdownOpen(false);
                              if (errors.service) {
                                setErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.service;
                                  return next;
                                });
                              }
                            }}
                            className={cn(
                              "w-full text-left px-4 py-3 md:py-4 hover:bg-foreground/5 text-foreground/80 hover:text-foreground transition-colors border-b border-foreground/5 last:border-b-0 outline-none focus:bg-foreground/5",
                              formData.service === service &&
                                "bg-foreground/5 text-foreground font-medium"
                            )}
                          >
                            {service}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <span>. My project budget is </span>

              <div className="inline-flex flex-wrap items-center gap-2 mx-2 align-middle">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBudget(opt)}
                    className={cn(
                      "px-4 md:px-5 py-1.5 md:py-2 rounded-full border text-sm md:text-base transition-all duration-300 font-normal",
                      budget === opt
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 text-foreground/50 hover:border-foreground/50 hover:text-foreground bg-transparent"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <span>. Please contact me at </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email"
                required
                className={cn(
                  "bg-transparent border-b px-2 py-1 mx-1 text-foreground placeholder:text-foreground/30 focus:outline-none transition-colors w-[250px] md:w-[380px]",
                  errors.email
                    ? "border-red-500"
                    : "border-foreground/20 focus:border-foreground"
                )}
              />
              <FieldError field="email" />
              <span> and my mobile number is </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="phone"
                required
                className={cn(
                  "bg-transparent border-b px-2 py-1 mx-1 text-foreground placeholder:text-foreground/30 focus:outline-none transition-colors w-[220px] md:w-[300px]",
                  errors.phone
                    ? "border-red-500"
                    : "border-foreground/20 focus:border-foreground"
                )}
              />
              <FieldError field="phone" />
              <span>. Optionally, I'm sharing more details: </span>
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="details"
                className="bg-transparent border-b border-foreground/20 px-2 py-1 mx-1 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors w-[280px] md:w-[450px]"
              />
              <span>.</span>
            </div>

            {/* Submit Error */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-6 flex items-center gap-2 text-red-500 font-roboto-condensed text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="mt-16 sm:mt-24">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={cn(
                  "group flex items-center gap-4 rounded-full pl-8 pr-2 py-2 shadow-lg dark:shadow-orange-500/10 transition-all duration-500",
                  isSubmitting
                    ? "bg-orange-500 text-white cursor-wait"
                    : "bg-foreground text-background hover:bg-foreground/90 hover:shadow-xl dark:hover:shadow-orange-500/20"
                )}
              >
                <span className="font-roboto-condensed font-bold tracking-wider uppercase text-sm">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isSubmitting ? "sending" : "ready"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="inline-block"
                    >
                      {isSubmitting ? "Transmitting..." : "Send request"}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden transition-colors duration-500",
                    isSubmitting
                      ? "bg-white/20 text-white"
                      : "bg-background text-foreground"
                  )}
                >
                  {isSubmitting ? (
                    <motion.div
                      key="loader"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full z-10"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full relative">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 relative z-10" />
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 10, y: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -10, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-foreground text-background border border-background/20 p-10 md:p-16 max-w-2xl w-full text-center relative overflow-hidden"
            >
              {/* Decorative background blur */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />

              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-6 right-6 text-background/50 hover:text-background transition-colors focus:outline-none z-10"
              >
                <X className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="w-24 h-24 bg-background text-foreground rounded-full flex items-center justify-center mx-auto mb-8 relative z-10"
              >
                <Check className="w-12 h-12" />
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black font-oswald tracking-tight mb-6 relative z-10"
              >
                GOT IT.
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-background/70 font-roboto-condensed text-xl md:text-2xl tracking-[0.1em] uppercase relative z-10 max-w-lg mx-auto"
              >
                Your transmission has been received. I'll drop into your inbox
                shortly.
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsSubmitted(false)}
                className="mt-12 bg-transparent border border-background/20 text-background hover:bg-background hover:text-foreground font-bold uppercase tracking-[0.2em] font-roboto-condensed px-10 py-4 transition-all duration-300 relative z-10 text-sm"
              >
                Close Link
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
