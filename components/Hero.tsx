"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

interface Props {
  locale: Locale;
  dict: Dictionary;
  heroImage: string;
  heroImageAlt: string;
}

export function Hero({ locale, dict, heroImage, heroImageAlt }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-champagne">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden />
      <div
        className="absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-32 top-40 -z-10 h-[440px] w-[440px] rounded-full bg-brand-100/50 blur-3xl"
        aria-hidden
      />

      <div className="container-page grid items-center gap-10 pb-20 pt-12 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-24 lg:py-32">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-ink-900/15 bg-white/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-700 backdrop-blur"
          >
            <span className="h-1 w-6 bg-brand-500" />
            {dict.home.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-balance text-[2.6rem] font-normal leading-[1.02] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
          >
            {dict.home.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-700/90"
          >
            {dict.home.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href={`/${locale}/produse`} className="btn-primary">
              {dict.home.ctaProducts}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href={`/${locale}/contact`} className="btn-secondary">
              {dict.home.ctaContact}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-ink-900/10 bg-gradient-to-br from-cream-100 to-cream-200 shadow-2xl shadow-ink-900/15 ring-1 ring-brand-400/20">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 500px"
              quality={90}
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-ink-900/10 bg-ink-900 px-5 py-4 text-cream-50 shadow-2xl shadow-ink-900/30 sm:block"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-300">Zero Gravity</p>
            <p className="mt-1 text-sm font-semibold">4D · SL · Bluetooth</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="absolute -right-4 -top-4 hidden rounded-2xl border border-ink-900/10 bg-white/90 px-5 py-4 shadow-xl shadow-ink-900/10 backdrop-blur md:block"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-700">Leercon</p>
            <p className="mt-1 text-sm font-semibold text-ink-900">Premium · Garanție</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
