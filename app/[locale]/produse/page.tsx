import type { Metadata } from "next";
import Script from "next/script";
import { ProductGrid } from "@/components/ProductGrid";
import { AnimatedSection } from "@/components/AnimatedSection";
import { products } from "@/lib/products";
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
    title: dict.products.title,
    description: dict.products.subtitle,
    alternates: {
      canonical: `/${locale}/produse`,
      languages: { "ro-MD": "/ro/produse", "ru-MD": "/ru/produse" },
    },
    openGraph: {
      title: dict.products.title,
      description: dict.products.subtitle,
      url: `${siteConfig.domain}/${locale}/produse`,
    },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${siteConfig.domain}/${locale}/produse/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <div className="container-page py-12 md:py-16">
      <AnimatedSection className="mb-12 max-w-3xl">
        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-8 bg-brand-400" />
          {siteConfig.name}
        </span>
        <h1 className="font-display text-balance text-5xl font-normal leading-[1.02] tracking-tight text-ink-900 sm:text-6xl">
          {dict.products.title}
        </h1>
        <p className="mt-5 text-pretty text-lg text-ink-700/85">
          {dict.products.subtitle}
        </p>
      </AnimatedSection>

      <ProductGrid products={products} locale={locale} dict={dict} />

      <Script
        id="ld-itemlist"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </div>
  );
}
