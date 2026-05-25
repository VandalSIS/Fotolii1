"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";

export function StickyContact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
        >
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="group flex items-center gap-3 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M.05 24l1.7-6.2A11.95 11.95 0 010 12C0 5.4 5.4 0 12 0s12 5.4 12 12-5.4 12-12 12c-2 0-3.9-.5-5.6-1.4L.05 24zm6.6-3.8l.4.2c1.5.9 3.2 1.4 5 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3l.3.4-1 3.6 3.85-1.1zM17.5 14c-.2-.4-.7-.4-.9-.4l-.7-.1c-.2 0-.5 0-.8.4l-.9 1c-.1.1-.2.1-.4 0a8 8 0 01-2.3-1.4 9 9 0 01-1.6-2c-.2-.3 0-.5.1-.6.1-.1.2-.2.4-.4.1-.1.2-.2.3-.4.1-.1.1-.3 0-.4 0-.1-.7-1.7-1-2.3-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.6s1.1 3.2 1.3 3.4c.2.2 2.3 3.5 5.5 4.7 1.9.8 2.7.9 3.6.8.6 0 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4l-.4-.2z" />
            </svg>
            <span className="hidden pr-1 sm:inline">WhatsApp</span>
          </a>
          <a
            href={siteConfig.phoneHref}
            aria-label="Call"
            className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-cream-50 shadow-xl shadow-ink-900/30 transition hover:bg-ink-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
