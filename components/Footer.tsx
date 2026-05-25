import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-espresso text-cream-50">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 font-display text-lg font-semibold text-ink-900 shadow-md shadow-brand-500/20">
              M
            </span>
            <span className="font-display text-xl text-cream-50">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-50/70">
            {dict.footer.tagline}
          </p>
          {siteConfig.social.facebook && (
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-cream-50/70 transition hover:text-brand-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.5-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" />
              </svg>
              Facebook
            </a>
          )}
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-300">
            {dict.footer.quickLinks}
          </h3>
          <ul className="space-y-2.5 text-sm text-cream-50/70">
            <li><Link className="transition hover:text-brand-300" href={`/${locale}/produse`}>{dict.nav.products}</Link></li>
            <li><Link className="transition hover:text-brand-300" href={`/${locale}/despre`}>{dict.nav.about}</Link></li>
            <li><Link className="transition hover:text-brand-300" href={`/${locale}/despre#livrare`}>{dict.nav.delivery}</Link></li>
            <li><Link className="transition hover:text-brand-300" href={`/${locale}/despre#garantie`}>{dict.nav.warranty}</Link></li>
            <li><Link className="transition hover:text-brand-300" href={`/${locale}/contact`}>{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-300">
            {dict.footer.contactUs}
          </h3>
          <ul className="space-y-2.5 text-sm text-cream-50/70">
            <li><a className="transition hover:text-brand-300" href={siteConfig.phoneHref}>{siteConfig.phone}</a></li>
            <li><a className="transition hover:text-brand-300" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li>{siteConfig.address.street}, {siteConfig.address.locality}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10 py-6 text-center text-xs text-cream-50/50">
        © {year} {siteConfig.legalName}. {dict.footer.rights}
      </div>
    </footer>
  );
}
