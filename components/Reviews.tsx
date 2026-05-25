"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";
import { reviewsSeed, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

interface Props {
  locale: Locale;
  dict: Dictionary;
  variant?: "card" | "marquee";
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="text-brand-500">
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews({ locale, dict, variant = "card" }: Props) {
  if (variant === "marquee") {
    const items = [...reviewsSeed, ...reviewsSeed];
    return (
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream-50 to-transparent" />
        <div className="flex gap-6 [animation:marquee_60s_linear_infinite]">
          {items.map((r, i) => (
            <ReviewCard key={`${r.name.ro}-${i}`} review={r} locale={locale} marquee />
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {reviewsSeed.map((r, i) => (
        <motion.div key={i} variants={staggerItem}>
          <ReviewCard review={r} locale={locale} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function ReviewCard({
  review,
  locale,
  marquee = false,
}: {
  review: (typeof reviewsSeed)[number];
  locale: Locale;
  marquee?: boolean;
}) {
  const initials = review.name[locale].split(" ").map((p) => p[0]).join("").toUpperCase();
  return (
    <article
      className={`flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white/80 p-7 shadow-sm shadow-ink-900/5 backdrop-blur-sm ${
        marquee ? "w-[360px] shrink-0 sm:w-[420px]" : ""
      }`}
    >
      <Stars count={review.rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">&ldquo;{review.text[locale]}&rdquo;</p>
      <footer className="mt-5 flex items-center gap-3 border-t border-ink-900/8 pt-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-200 to-brand-400 text-sm font-semibold text-ink-900">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-900">{review.name[locale]}</p>
          <p className="text-xs text-ink-500">{review.city[locale]}</p>
        </div>
      </footer>
    </article>
  );
}
