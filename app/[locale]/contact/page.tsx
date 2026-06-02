import type { Metadata } from "next";
import Script from "next/script";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BookTestForm } from "@/components/BookTestForm";
import { getDictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return {
    title: dict.bookTest.title,
    description: dict.bookTest.lead,
    alternates: {
      canonical: `${siteConfig.domain}/${locale}/contact`,
      languages: {
        "ro-MD": `${siteConfig.domain}/ro/contact`,
        "ru-MD": `${siteConfig.domain}/ru/contact`,
        "x-default": `${siteConfig.domain}/ro/contact`,
      },
    },
    openGraph: {
      title: dict.bookTest.title,
      description: dict.bookTest.lead,
      url: `${siteConfig.domain}/${locale}/contact`,
      images: [{ url: `${siteConfig.domain}/og-image.png`, width: 1200, height: 630, alt: dict.bookTest.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.bookTest.title,
      description: dict.bookTest.lead,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="container-page py-12 md:py-20">
      <AnimatedSection className="mb-12 max-w-3xl">
        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-8 bg-brand-400" />
          {siteConfig.name}
        </span>
        <h1 className="font-display text-balance text-5xl font-normal leading-[1.02] tracking-tight text-ink-900 sm:text-6xl">
          {dict.bookTest.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-700/85">
          {dict.bookTest.lead}
        </p>
      </AnimatedSection>

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <AnimatedSection as="div">
          <div className="rounded-3xl border border-ink-900/10 bg-white/80 p-6 shadow-sm shadow-ink-900/5 backdrop-blur-sm sm:p-8">
            <BookTestForm dict={dict} />
          </div>
        </AnimatedSection>

        <AnimatedSection as="div" className="space-y-6">
          <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur-sm">
            <h3 className="font-display text-xl text-ink-900">{dict.contact.ourPhone}</h3>
            <a
              href={siteConfig.phoneHref}
              className="mt-2 block font-display text-2xl text-brand-700 transition hover:text-brand-800"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-700 transition hover:text-emerald-800"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.05 24l1.7-6.2A11.95 11.95 0 010 12C0 5.4 5.4 0 12 0s12 5.4 12 12-5.4 12-12 12c-2 0-3.9-.5-5.6-1.4L.05 24z" /></svg>
              WhatsApp
            </a>
          </div>

          <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur-sm">
            <h3 className="font-display text-xl text-ink-900">{dict.contact.ourEmail}</h3>
            <a href={`mailto:${siteConfig.email}`} className="mt-2 block text-base text-ink-700 transition hover:text-brand-700">
              {siteConfig.email}
            </a>
          </div>

          <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur-sm">
            <h3 className="font-display text-xl text-ink-900">{dict.contact.ourAddress}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {siteConfig.address.street}<br />
              {siteConfig.address.locality}, {siteConfig.address.postalCode}<br />
              Moldova
            </p>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition hover:text-brand-800"
            >
              {locale === "ru" ? "Google Maps" : "Google Maps"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {(siteConfig.social.facebook || siteConfig.social.instagram) && (
            <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur-sm">
              <h3 className="font-display text-xl text-ink-900">{dict.contact.ourSocial}</h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink-700 transition hover:text-brand-700"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.5-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" /></svg>
                    Facebook
                  </a>
                )}
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ink-700 transition hover:text-brand-700"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c2.7 0 3 .01 4.04.06 1.04.05 1.76.22 2.38.47.64.25 1.18.58 1.72 1.12.54.54.87 1.08 1.12 1.72.25.62.42 1.34.47 2.38.05 1.04.06 1.34.06 4.04s-.01 3-.06 4.04c-.05 1.04-.22 1.76-.47 2.38a4.6 4.6 0 0 1-1.12 1.72 4.6 4.6 0 0 1-1.72 1.12c-.62.25-1.34.42-2.38.47-1.04.05-1.34.06-4.04.06s-3-.01-4.04-.06c-1.04-.05-1.76-.22-2.38-.47a4.6 4.6 0 0 1-1.72-1.12 4.6 4.6 0 0 1-1.12-1.72c-.25-.62-.42-1.34-.47-2.38C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.04c.05-1.04.22-1.76.47-2.38.25-.64.58-1.18 1.12-1.72.54-.54 1.08-.87 1.72-1.12.62-.25 1.34-.42 2.38-.47C9 2.21 9.3 2.2 12 2.2Zm0 1.8c-2.66 0-2.97.01-4.01.06-.9.04-1.39.2-1.72.33-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.29.82-.33 1.72-.05 1.04-.06 1.35-.06 4.01s.01 2.97.06 4.01c.04.9.2 1.39.33 1.72.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.82.29 1.72.33 1.04.05 1.35.06 4.01.06s2.97-.01 4.01-.06c.9-.04 1.39-.2 1.72-.33.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.29-.82.33-1.72.05-1.04.06-1.35.06-4.01s-.01-2.97-.06-4.01c-.04-.9-.2-1.39-.33-1.72a2.9 2.9 0 0 0-.69-1.06 2.9 2.9 0 0 0-1.06-.69c-.33-.13-.82-.29-1.72-.33-1.04-.05-1.35-.06-4.01-.06Zm0 3.35a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.8a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm6.4-3.77a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z" /></svg>
                    {siteConfig.social.instagramHandle}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-brand-400/40 bg-gradient-to-br from-brand-50 to-cream-100 p-6">
            <h3 className="font-display text-xl text-ink-900">
              {locale === "ru" ? "Преимущества теста" : "Avantajele testului"}
            </h3>
            <ul className="mt-3 space-y-2">
              {dict.bookTest.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>

      <Script
        id="ld-breadcrumb-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.domain}/${locale}` },
              { "@type": "ListItem", position: 2, name: dict.bookTest.title, item: `${siteConfig.domain}/${locale}/contact` },
            ],
          }),
        }}
      />
    </section>
  );
}
