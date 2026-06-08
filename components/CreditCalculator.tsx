"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice, monthlyInstallment, totalToPay } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

interface Props {
  price: number;
  locale: Locale;
  dict: Dictionary;
}

const ZERO_STEP = siteConfig.credit.zeroInterestStep;

export function CreditCalculator({ price, locale, dict }: Props) {
  const [months, setMonths] = useState<number>(siteConfig.credit.defaultMonths);

  const { monthly, total, overpay, isZero } = useMemo(() => {
    const m = monthlyInstallment(price, months);
    const t = totalToPay(price, months);
    const tier = siteConfig.credit.tiers.find((tier) => months >= tier.from && months <= tier.to);
    return {
      monthly: m,
      total: t,
      overpay: t !== null ? Math.max(0, t - price) : null,
      isZero: tier ? tier.rate === 0 && tier.commission === 0 : false,
    };
  }, [price, months]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-gradient-to-br from-cream-100 to-cream-50 p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9h18M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
          </svg>
          {dict.product.creditTitle}
        </span>
        <a
          href={siteConfig.credit.providerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500 transition hover:text-brand-700"
        >
          {dict.product.creditPoweredBy}
        </a>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {siteConfig.credit.steps.map((s) => {
          const isZeroOption = s === ZERO_STEP;
          const isActive = months === s;
          if (isZeroOption) {
            return (
              <button
                key={s}
                type="button"
                onClick={() => setMonths(s)}
                aria-pressed={isActive}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/40 ring-2 ring-emerald-400/40"
                    : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <span className="absolute -top-2 -right-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wider text-white shadow-sm shadow-emerald-500/30">
                  0%
                </span>
                {s} {dict.product.creditMonths}
              </button>
            );
          }
          return (
            <button
              key={s}
              type="button"
              onClick={() => setMonths(s)}
              aria-pressed={isActive}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-ink-900 text-cream-50 shadow-sm shadow-ink-900/30"
                  : "bg-white/80 text-ink-700 ring-1 ring-ink-900/10 hover:bg-white"
              }`}
            >
              {s} {dict.product.creditMonths}
            </button>
          );
        })}
      </div>

      <motion.div
        key={months}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4"
      >
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-display text-4xl font-normal tracking-tight text-ink-900">
            {monthly !== null ? formatPrice(monthly, locale) : "—"}
          </span>
          <span className="text-sm text-ink-600">/ {dict.product.creditMonthly}</span>
          {isZero && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-500/30">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {dict.product.creditZeroBadge}
            </span>
          )}
        </div>

        {total !== null && overpay !== null && (
          <dl
            className={`mt-4 grid grid-cols-2 gap-3 rounded-xl p-3 text-xs ring-1 ${
              isZero
                ? "border border-emerald-200/50 bg-emerald-50/70 ring-emerald-200/60"
                : "border border-ink-900/10 bg-white/60 ring-ink-900/5"
            }`}
          >
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-wider text-ink-500">
                {dict.product.creditTotal}
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-ink-900">{formatPrice(total, locale)}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-wider text-ink-500">
                {dict.product.creditOverpay}
              </dt>
              <dd className={`mt-0.5 text-sm font-semibold ${isZero ? "text-emerald-700" : "text-ink-900"}`}>
                {isZero ? dict.product.creditZeroNote : overpay > 0 ? `+ ${formatPrice(overpay, locale)}` : "—"}
              </dd>
            </div>
          </dl>
        )}
      </motion.div>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-500">{dict.product.creditNote}</p>
    </div>
  );
}
