"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
}

export function ProductGallery({ src, alt }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-cream-100 to-cream-200 shadow-xl shadow-brand-900/10"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={92}
        className="object-cover"
      />
    </motion.div>
  );
}
