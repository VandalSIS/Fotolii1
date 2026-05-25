import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ClientStagger } from "@/components/ClientStagger";
import { CtaBlock } from "@/components/CtaBlock";
import { getRecommended } from "@/lib/products";
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
    title: dict.about.title,
    description: dict.about.lead,
    alternates: {
      canonical: `/${locale}/despre`,
      languages: { "ro-MD": "/ro/despre", "ru-MD": "/ru/despre" },
    },
    openGraph: {
      title: dict.about.title,
      description: dict.about.lead,
      url: `${siteConfig.domain}/${locale}/despre`,
    },
  };
}

const deliveryIcons = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h13l5 5v6h-2a3 3 0 1 1-6 0H10a3 3 0 1 1-6 0H3V7Z" /></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>,
];

const warrantyIcons = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" /></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></svg>,
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const featured = getRecommended()[0];

  return (
    <>
      <section className="container-page py-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection as="div">
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
              <span className="h-px w-8 bg-brand-400" />
              {siteConfig.name}
            </span>
            <h1 className="font-display text-balance text-5xl font-normal leading-[1.02] tracking-tight text-ink-900 sm:text-6xl">
              {dict.about.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-700/85">
              {dict.about.lead}
            </p>
            <div className="mt-8 space-y-5 text-ink-700">
              <p>{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
              <p>{dict.about.p3}</p>
            </div>
          </AnimatedSection>

          {featured && (
            <AnimatedSection
              as="div"
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-cream-100 to-cream-200 shadow-xl shadow-brand-900/10"
            >
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={88}
                className="object-cover"
                priority
              />
            </AnimatedSection>
          )}
        </div>
      </section>

      <section id="livrare" className="container-page py-20 md:py-24 scroll-mt-24">
        <AnimatedSection className="mb-10 max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            <span className="h-px w-8 bg-brand-400" />
            {dict.delivery.title}
          </span>
          <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            {dict.delivery.lead}
          </h2>
        </AnimatedSection>

        <ClientStagger className="grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10 md:grid-cols-2">
          {dict.delivery.sections.map((s, i) => (
            <article key={i} className="group bg-cream-50 p-7 transition hover:bg-white">
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl border border-brand-400/30 bg-brand-50 text-brand-700 transition group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-cream-50">
                {deliveryIcons[i % deliveryIcons.length]}
              </div>
              <h3 className="font-display text-xl text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/85">{s.desc}</p>
            </article>
          ))}
        </ClientStagger>
      </section>

      <section id="garantie" className="container-page py-20 md:py-24 scroll-mt-24">
        <AnimatedSection className="mb-10 max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            <span className="h-px w-8 bg-brand-400" />
            {dict.warranty.title}
          </span>
          <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
            {dict.warranty.lead}
          </h2>
        </AnimatedSection>

        <ClientStagger className="grid gap-px overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-900/10 md:grid-cols-2">
          {dict.warranty.sections.map((s, i) => (
            <article key={i} className="group bg-cream-50 p-7 transition hover:bg-white">
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl border border-brand-400/30 bg-brand-50 text-brand-700 transition group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-cream-50">
                {warrantyIcons[i % warrantyIcons.length]}
              </div>
              <h3 className="font-display text-xl text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/85">{s.desc}</p>
            </article>
          ))}
        </ClientStagger>
      </section>

      <CtaBlock locale={locale} dict={dict} />
    </>
  );
}
