"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export function Process({ dict }: Props) {
  return (
    <section className="container-page py-24">
      <div className="mb-14 max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-8 bg-brand-400" />
          {dict.home.processTitle}
        </span>
        <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
          {dict.home.processSubtitle}
        </h2>
      </div>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative grid gap-px overflow-hidden rounded-[2rem] border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dict.home.process.map((step) => (
          <motion.li
            key={step.num}
            variants={staggerItem}
            className="group relative flex flex-col bg-cream-50 p-7 transition hover:bg-white"
          >
            <span className="font-display text-5xl font-normal text-brand-500/70 transition group-hover:text-brand-600">
              {step.num}
            </span>
            <h3 className="mt-5 font-display text-xl text-ink-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700/85">{step.desc}</p>
            <span className="mt-6 h-px w-12 bg-brand-400 transition-all duration-500 group-hover:w-full" />
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
