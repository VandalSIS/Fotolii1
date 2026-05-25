"use client";

import { motion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { staggerContainer, staggerItem } from "./AnimatedSection";

interface Props {
  children: ReactNode;
  className?: string;
}

export function ClientStagger({ children, className }: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
