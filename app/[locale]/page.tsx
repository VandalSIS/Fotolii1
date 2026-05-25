import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { CtaBlock } from "@/components/CtaBlock";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getRecommended, products } from "@/lib/products";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const recommended = getRecommended();
  const heroProduct = recommended[0] ?? products[0];

  const massageSample = products.find((p) => p.category === "massage")!;
  const barberSample = products.find((p) => p.category === "barber")!;

  return (
    <>
      <Hero
        locale={locale}
        dict={dict}
        heroImage={heroProduct.image}
        heroImageAlt={`${heroProduct.name} — ${heroProduct.shortDescription[locale]}`}
      />

      <Stats dict={dict} />

      <Benefits dict={dict} />

      <Process dict={dict} />

      <section className="container-page py-24">
        <AnimatedSection className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
              <span className="h-px w-8 bg-brand-400" />
              {dict.home.featuredTitle}
            </span>
            <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              {dict.home.featuredSubtitle}
            </h2>
          </div>
          <Link href={`/${locale}/produse`} className="btn-secondary">
            {dict.products.title}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((p, i) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} priority={i < 2} />
          ))}
        </AnimatedSection>
      </section>

      <section className="container-page py-24">
        <AnimatedSection className="mb-12">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            <span className="h-px w-8 bg-brand-400" />
            {dict.home.categoriesTitle}
          </span>
          <h2 className="font-display text-balance text-4xl font-normal leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Două lumi, o singură pasiune.
          </h2>
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { slug: "massage", label: dict.home.categoryMassage, product: massageSample },
            { slug: "barber", label: dict.home.categoryBarber, product: barberSample },
          ].map((c, i) => (
            <Link
              key={c.slug}
              href={`/${locale}/produse?cat=${c.slug}`}
              className="group relative block aspect-[16/11] overflow-hidden rounded-[2rem] border border-ink-900/10 bg-gradient-to-br from-cream-100 to-cream-200 shadow-xl shadow-ink-900/10"
            >
              <Image
                src={c.product.image}
                alt={c.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                priority={i === 0}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" aria-hidden />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl font-normal tracking-tight text-cream-50 sm:text-4xl">{c.label}</h3>
                <p className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-300 transition group-hover:gap-3">
                  {dict.products.viewDetails}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials locale={locale} dict={dict} />

      <Faq dict={dict} />

      <CtaBlock locale={locale} dict={dict} />
    </>
  );
}
