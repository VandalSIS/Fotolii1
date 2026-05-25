"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export function Stats({ dict }: Props) {
  return (
    <section className="container-page py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10 lg:grid-cols-4"
      >
        {dict.home.stats.map((s, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="bg-cream-50 px-6 py-8 text-center sm:py-10"
          >
            <p className="font-display text-4xl font-normal tracking-tight text-brand-700 sm:text-5xl">{s.value}</p>
            <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-ink-600">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
