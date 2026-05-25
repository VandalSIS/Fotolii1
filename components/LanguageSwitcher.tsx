"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, type Locale } from "@/lib/site";

interface Props {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const parts = pathname.split("/");
    parts[1] = next;
    const newPath = parts.join("/") || `/${next}`;
    startTransition(() => router.push(newPath));
  };

  return (
    <div
      className="flex items-center rounded-full border border-cream-300 bg-white/70 p-0.5 text-xs font-medium backdrop-blur"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          disabled={isPending}
          aria-current={l === locale}
          className={`rounded-full px-3 py-1.5 uppercase tracking-wide transition ${
            l === locale
              ? "bg-ink-800 text-cream-50"
              : "text-ink-600 hover:text-ink-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
