"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "./AnimatedSection";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

const icons = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h13l5 5v6h-2a3 3 0 1 1-6 0H10a3 3 0 1 1-6 0H3V7Z" /></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" /></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></svg>,
];

export function Benefits({ dict }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-cream-50">
      <div className="container-page py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-300">
            <span className="h-px w-8 bg-brand-400" />
            {dict.home.benefitsTitle}
          </span>
          <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Experiență premium, atenție la fiecare detaliu.
          </h2>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {dict.home.benefits.map((b, i) => (
            <motion.li
              key={b.title}
              variants={staggerItem}
              className="group relative border-t border-cream-50/15 pt-6"
            >
              <span className="absolute -top-px left-0 h-px w-12 bg-brand-400 transition-all duration-500 group-hover:w-full" />
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-brand-400/40 bg-brand-400/10 text-brand-300 transition group-hover:bg-brand-400 group-hover:text-ink-900">
                {icons[i % icons.length]}
              </div>
              <h3 className="font-display text-xl font-normal text-cream-50">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-50/70">{b.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
