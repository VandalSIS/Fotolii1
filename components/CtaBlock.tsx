"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function CtaBlock({ locale, dict }: Props) {
  return (
    <section className="container-page py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden rounded-[2rem] bg-espresso px-8 py-16 text-cream-50 shadow-2xl shadow-ink-900/30 ring-1 ring-brand-400/10 sm:px-16 sm:py-24"
      >
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-400/15 blur-3xl" aria-hidden />
        <div className="absolute inset-0 -z-10 opacity-[0.04]" aria-hidden style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #f9f1e1 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />
        <div className="relative max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-300">
            <span className="h-px w-8 bg-brand-400" />
            {siteConfig.name}
          </span>
          <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {dict.home.ctaBlockTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-cream-50/75">{dict.home.ctaBlockDesc}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className="btn-gold">
              {dict.home.ctaContact}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a href={siteConfig.phoneHref} className="btn-on-dark">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
