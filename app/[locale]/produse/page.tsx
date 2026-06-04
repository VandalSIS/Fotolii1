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
  const pageTitle =
    locale === "ru"
      ? "Массажные кресла Leercon · Модели и цены в Кишинёве"
      : "Fotolii de masaj Leercon · Modele și prețuri Chișinău";
  const pageDescription =
    locale === "ru"
      ? "Все массажные кресла Leercon: модели 4D, Zero Gravity, SL. Цены в Кишинёве, рассрочка EasyCredit до 46 месяцев, бесплатная доставка по Молдове."
      : "Toate fotoliile de masaj Leercon: modele 4D, Zero Gravity, șină SL. Prețuri în Chișinău, rate EasyCredit până la 46 luni, livrare gratuită în Moldova.";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${siteConfig.domain}/${locale}/produse`,
      languages: {
        "ro-MD": `${siteConfig.domain}/ro/produse`,
        "ru-MD": `${siteConfig.domain}/ru/produse`,
        "x-default": `${siteConfig.domain}/ro/produse`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteConfig.domain}/${locale}/produse`,
      images: [{ url: `${siteConfig.domain}/og-image.png`, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
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
      <Script
        id="ld-breadcrumb-products"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.domain}/${locale}` },
              { "@type": "ListItem", position: 2, name: dict.products.title, item: `${siteConfig.domain}/${locale}/produse` },
            ],
          }),
        }}
      />
    </div>
  );
}
