import type { Metadata } from "next";
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
      canonical: `/${locale}/contact`,
      languages: { "ro-MD": "/ro/contact", "ru-MD": "/ru/contact" },
    },
    openGraph: {
      title: dict.bookTest.title,
      description: dict.bookTest.lead,
      url: `${siteConfig.domain}/${locale}/contact`,
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
          </div>

          {siteConfig.social.facebook && (
            <div className="rounded-3xl border border-ink-900/10 bg-white/60 p-6 backdrop-blur-sm">
              <h3 className="font-display text-xl text-ink-900">{dict.contact.ourSocial}</h3>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm text-ink-700 transition hover:text-brand-700"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.5-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12H16l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" /></svg>
                Facebook
              </a>
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
    </section>
  );
}
