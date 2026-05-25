"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { staggerContainer } from "./AnimatedSection";
import type { Product } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

interface Props {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
  showFilter?: boolean;
}

export function ProductGrid({ products, locale, dict, showFilter = true }: Props) {
  const [filter, setFilter] = useState<"all" | "massage" | "barber">("all");

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  const tabs = [
    { id: "all" as const, label: dict.products.all },
    { id: "massage" as const, label: dict.products.massage },
    { id: "barber" as const, label: dict.products.barber },
  ];

  return (
    <div>
      {showFilter && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === t.id ? "text-cream-50" : "text-ink-700 hover:text-ink-900"
              }`}
            >
              {filter === t.id && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-ink-900 shadow-lg shadow-ink-900/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              locale={locale}
              dict={dict}
              priority={i < 3}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
