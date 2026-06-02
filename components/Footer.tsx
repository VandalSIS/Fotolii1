import Link from "next/link";
import Image from "next/image";
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
          <div className="flex items-center">
            <Image
              src="/logo-v2.png"
              alt={siteConfig.name}
              width={135}
              height={101}
              className="h-20 w-auto"
            />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-50/70">
            {dict.footer.tagline}
          </p>
          {(siteConfig.social.facebook || siteConfig.social.instagram) && (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cream-50/70 transition hover:text-brand-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.5-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" />
                  </svg>
                  Facebook
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cream-50/70 transition hover:text-brand-300"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.2c2.7 0 3 .01 4.04.06 1.04.05 1.76.22 2.38.47.64.25 1.18.58 1.72 1.12.54.54.87 1.08 1.12 1.72.25.62.42 1.34.47 2.38.05 1.04.06 1.34.06 4.04s-.01 3-.06 4.04c-.05 1.04-.22 1.76-.47 2.38a4.6 4.6 0 0 1-1.12 1.72 4.6 4.6 0 0 1-1.72 1.12c-.62.25-1.34.42-2.38.47-1.04.05-1.34.06-4.04.06s-3-.01-4.04-.06c-1.04-.05-1.76-.22-2.38-.47a4.6 4.6 0 0 1-1.72-1.12 4.6 4.6 0 0 1-1.12-1.72c-.25-.62-.42-1.34-.47-2.38C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.04c.05-1.04.22-1.76.47-2.38.25-.64.58-1.18 1.12-1.72.54-.54 1.08-.87 1.72-1.12.62-.25 1.34-.42 2.38-.47C9 2.21 9.3 2.2 12 2.2Zm0 1.8c-2.66 0-2.97.01-4.01.06-.9.04-1.39.2-1.72.33-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.29.82-.33 1.72-.05 1.04-.06 1.35-.06 4.01s.01 2.97.06 4.01c.04.9.2 1.39.33 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.82.29 1.72.33 1.04.05 1.35.06 4.01.06s2.97-.01 4.01-.06c.9-.04 1.39-.2 1.72-.33.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.29-.82.33-1.72.05-1.04.06-1.35.06-4.01s-.01-2.97-.06-4.01c-.04-.9-.2-1.39-.33-1.72a2.9 2.9 0 0 0-.69-1.06 2.9 2.9 0 0 0-1.06-.69c-.33-.13-.82-.29-1.72-.33-1.04-.05-1.35-.06-4.01-.06Zm0 3.35a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.8a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm6.4-3.77a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" />
                  </svg>
                  {siteConfig.social.instagramHandle}
                </a>
              )}
            </div>
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
            <li>
              {siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.postalCode}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10 py-6 text-center text-xs text-cream-50/50">
        © {year} {siteConfig.legalName}. {dict.footer.rights}
      </div>
    </footer>
  );
}
