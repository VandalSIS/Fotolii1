"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export function Faq({ dict }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.home.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="container-page py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            <span className="h-px w-8 bg-brand-400" />
            FAQ
          </span>
          <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            {dict.home.faqTitle}
          </h2>
          <p className="mt-5 max-w-md text-ink-700/85">
            Răspunsuri la cele mai frecvente întrebări. Nu găsești ce cauți? Scrie-ne — răspundem rapid.
          </p>
        </div>
        <ul className="space-y-3">
          {dict.home.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-brand-400/50 bg-white"
                    : "border-ink-900/10 bg-white/60 hover:bg-white/85"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-lg text-ink-900">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-base ${
                      isOpen ? "bg-brand-500 text-cream-50" : "bg-ink-900/5 text-ink-700"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-ink-700/90">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
