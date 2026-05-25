import { Reviews } from "./Reviews";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function Testimonials({ locale, dict }: Props) {
  return (
    <section className="container-page py-24">
      <div className="mb-12 max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-8 bg-brand-400" />
          Recenzii
        </span>
        <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
          {dict.home.testimonialsTitle}
        </h2>
      </div>
      <Reviews locale={locale} variant="marquee" />
    </section>
  );
}
