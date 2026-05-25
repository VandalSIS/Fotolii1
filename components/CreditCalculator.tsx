"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatPrice, monthlyInstallment } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

interface Props {
  price: number;
  locale: Locale;
  dict: Dictionary;
}

const STEPS = [3, 6, 9, 12];

export function CreditCalculator({ price, locale, dict }: Props) {
  const [months, setMonths] = useState<number>(siteConfig.credit.defaultMonths);
  const monthly = monthlyInstallment(price, months);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-gradient-to-br from-cream-100 to-cream-50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9h18M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
          {dict.product.creditTitle}
        </span>
        <span className="text-[11px] text-ink-500">{dict.product.creditMonths}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {STEPS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setMonths(s)}
            className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              months === s
                ? "bg-ink-900 text-cream-50 shadow-sm shadow-ink-900/30"
                : "bg-white/80 text-ink-700 ring-1 ring-ink-900/10 hover:bg-white"
            }`}
            aria-pressed={months === s}
          >
            {s}
          </button>
        ))}
      </div>

      <motion.div
        key={months}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4 flex items-baseline gap-2"
      >
        <span className="font-display text-3xl font-normal tracking-tight text-ink-900">
          {monthly !== null ? formatPrice(monthly, locale) : "—"}
        </span>
        <span className="text-sm text-ink-600">/ {dict.product.creditMonthly}</span>
      </motion.div>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-500">{dict.product.creditNote}</p>
    </div>
  );
}
