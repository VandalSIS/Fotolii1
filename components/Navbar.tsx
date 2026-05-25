"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function Navbar({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links: Array<{
    href: string;
    label: string;
    accent?: boolean;
  }> = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/produse`, label: dict.nav.products },
    { href: `/${locale}/despre`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.bookTest, accent: true },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-900/10 bg-cream-50/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 font-display text-base font-semibold text-ink-900 shadow-md shadow-brand-500/30 ring-1 ring-brand-300/40 transition-transform group-hover:scale-105">
            M
          </span>
          <span className="font-display text-xl tracking-tight text-ink-900">{siteConfig.name}</span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <Link
                href={l.href}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors ${
                  l.accent
                    ? "ml-1.5 bg-ink-900 text-cream-50 hover:bg-ink-800"
                    : isActive(l.href)
                    ? "text-ink-900"
                    : "text-ink-700/85 hover:text-ink-900"
                }`}
              >
                {isActive(l.href) && !l.accent && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink-900/8 ring-1 ring-ink-900/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="hidden text-sm font-medium text-ink-800 transition hover:text-brand-600 xl:inline"
          >
            {siteConfig.phone}
          </a>
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/15 bg-white/60 text-ink-700 transition hover:bg-cream-100 lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ink-900/10 bg-cream-50/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                      l.accent ? "bg-ink-900 text-cream-50" : isActive(l.href) ? "bg-ink-900/8 text-ink-900" : "text-ink-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-ink-900/10 pt-3">
                <a href={siteConfig.phoneHref} className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-700">
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
