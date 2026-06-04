"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerItem } from "./AnimatedSection";
import { AvailabilityBadge } from "./AvailabilityBadge";
import type { Product } from "@/lib/products";
import { formatPrice, monthlyInstallment } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";
import type { StockState } from "@/lib/stock";

interface Props {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
  stockState?: StockState;
}

export function ProductCard({ product, locale, dict, priority = false, stockState }: Props) {
  const state: StockState = stockState ?? (product.available ? "in" : "out");
  return (
    <motion.article
      variants={staggerItem}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-900/8 bg-white/70 shadow-sm shadow-ink-900/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-ink-900/15 hover:bg-white hover:shadow-2xl hover:shadow-ink-900/15"
    >
      <Link
        href={`/${locale}/produse/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200"
        aria-label={product.name}
      >
        <Image
          src={product.image}
          alt={`${product.name} - ${product.shortDescription[locale]}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          {product.recommended && (
            <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-300 ring-1 ring-brand-400/40">
              ★ {dict.products.recommended}
            </span>
          )}
          <AvailabilityBadge state={state} dict={dict} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <header className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight tracking-tight text-ink-900">{product.name}</h3>
          {product.price !== null && (
            <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 ring-1 ring-brand-200/60">
              {formatPrice(product.price, locale)}
            </span>
          )}
        </header>
        {product.price !== null && (
          <p className="mb-2 text-xs text-ink-500">
            {dict.products.from}{" "}
            <span className="font-semibold text-ink-700">
              {formatPrice(monthlyInstallment(product.price, siteConfig.credit.maxMonths), locale)}
            </span>{" "}
            / {dict.product.creditMonthly}
          </p>
        )}
        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-700/80">
          {product.shortDescription[locale]}
        </p>
        <Link
          href={`/${locale}/produse/${product.slug}`}
          className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-900 transition hover:gap-3 hover:text-brand-600"
        >
          {dict.products.viewDetails}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
