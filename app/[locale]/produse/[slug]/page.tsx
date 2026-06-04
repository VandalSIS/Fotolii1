import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { CreditCalculator } from "@/components/CreditCalculator";
import { OrderModal } from "@/components/OrderModal";
import { Reviews } from "@/components/Reviews";
import { formatPrice, getProduct, getRelatedProducts, products } from "@/lib/products";
import { getDictionary } from "@/lib/i18n";
import { siteConfig, locales, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const dict = getDictionary(locale);
  const category =
    product.category === "massage"
      ? locale === "ru"
        ? "Массажное кресло"
        : "Fotoliu de masaj"
      : locale === "ru"
      ? "Кресло для барбершопа"
      : "Scaun barber";
  const cityTag = locale === "ru" ? "Кишинёв" : "Chișinău";
  const priceTag = product.price ? formatPrice(product.price, locale) : dict.products.askPrice;
  const title = `${product.name} — ${category} ${cityTag} · ${priceTag}`;
  const usp =
    locale === "ru"
      ? "Бесплатная доставка по Молдове, гарантия 3 года, рассрочка EasyCredit до 46 месяцев."
      : "Livrare gratuită în Moldova, garanție 3 ani, rate EasyCredit până la 46 luni.";
  const description = `${product.shortDescription[locale]} ${usp}`;
  const productUrl = `${siteConfig.domain}/${locale}/produse/${product.slug}`;
  const productImage = `${siteConfig.domain}${product.image}`;
  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
      languages: {
        "ro-MD": `${siteConfig.domain}/ro/produse/${product.slug}`,
        "ru-MD": `${siteConfig.domain}/ru/produse/${product.slug}`,
        "x-default": `${siteConfig.domain}/ro/produse/${product.slug}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: productUrl,
      images: [
        {
          url: productImage,
          width: 1024,
          height: 1280,
          alt: `${product.name} — ${category} ${cityTag}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [productImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const dict = getDictionary(locale);
  const related = getRelatedProducts(slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription[locale],
    brand: { "@type": "Brand", name: product.brand },
    image: `${siteConfig.domain}${product.image}`,
    sku: product.slug,
    category: product.category === "massage" ? "Massage Chair" : "Salon Furniture",
    offers: product.price
      ? {
          "@type": "Offer",
          priceCurrency: siteConfig.currency,
          price: product.price,
          availability: product.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: `${siteConfig.domain}/${locale}/produse/${product.slug}`,
          seller: { "@type": "Organization", name: siteConfig.name },
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${siteConfig.domain}/${locale}` },
      { "@type": "ListItem", position: 2, name: dict.nav.products, item: `${siteConfig.domain}/${locale}/produse` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.domain}/${locale}/produse/${product.slug}` },
    ],
  };

  return (
    <div className="container-page py-12 md:py-16">
      <nav className="mb-6 text-sm text-ink-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href={`/${locale}`} className="hover:text-brand-700">{dict.nav.home}</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/${locale}/produse`} className="hover:text-brand-700">{dict.nav.products}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-ink-800">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery src={product.image} alt={`${product.name} — ${product.shortDescription[locale]}`} />

        <AnimatedSection as="div">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <AvailabilityBadge available={product.available} dict={dict} size="md" />
            {product.recommended && (
              <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm shadow-brand-900/20">
                ★ {dict.products.recommended}
              </span>
            )}
          </div>
          <h1 className="font-display text-balance text-5xl font-normal leading-[1.02] tracking-tight text-ink-900 sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-700/85">
            {product.shortDescription[locale]}
          </p>

          <div className="mt-7 flex items-baseline gap-3">
            <span className="font-display text-4xl font-normal tracking-tight text-brand-700">
              {formatPrice(product.price, locale)}
            </span>
          </div>

          {product.price !== null && (
            <div className="mt-6">
              <CreditCalculator price={product.price} locale={locale} dict={dict} />
            </div>
          )}

          <ul className="mt-6 grid gap-2 text-sm text-ink-700">
            <li className="flex items-center gap-2"><Check /> {dict.product.delivery}</li>
            <li className="flex items-center gap-2"><Check /> {dict.product.warranty}</li>
            <li className="flex items-center gap-2"><Check /> {dict.product.consultation}</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <OrderModal
              productName={product.name}
              productPrice={product.price !== null ? formatPrice(product.price, locale) : undefined}
              disabled={!product.available}
              dict={dict}
              buttonClassName="btn-primary"
            />
            <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.05 24l1.7-6.2A11.95 11.95 0 010 12C0 5.4 5.4 0 12 0s12 5.4 12 12-5.4 12-12 12c-2 0-3.9-.5-5.6-1.4L.05 24z"/></svg>
              {dict.product.whatsappOrder}
            </a>
            <Link href={`/${locale}/contact`} className="btn-ghost text-sm">
              {dict.product.askDemo}
            </Link>
          </div>

          {product.features[locale].length > 0 && (
            <section className="mt-12">
              <h2 className="mb-5 font-display text-2xl font-normal tracking-tight text-ink-900">{dict.product.features}</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.features[locale].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.specs[locale].length > 0 && (
            <section className="mt-12">
              <h2 className="mb-5 font-display text-2xl font-normal tracking-tight text-ink-900">{dict.product.specs}</h2>
              <dl className="grid gap-2 rounded-2xl border border-ink-900/10 bg-white/70 p-6 text-sm backdrop-blur-sm">
                {product.specs[locale].map((s) => (
                  <div key={s} className="text-ink-700">
                    {s}
                  </div>
                ))}
              </dl>
            </section>
          )}
        </AnimatedSection>
      </div>

      <section className="mt-24">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-normal tracking-tight text-ink-900 sm:text-4xl">
            {dict.product.reviewsTitle}
          </h2>
          <a href={siteConfig.email ? `mailto:${siteConfig.email}` : "#"} className="btn-secondary text-sm">
            {dict.product.reviewsLeave}
          </a>
        </div>
        <Reviews locale={locale} />
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-10 font-display text-3xl font-normal tracking-tight text-ink-900 sm:text-4xl">
            {dict.product.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}

      <Script
        id="ld-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}

function Check() {
  return (
    <svg className="h-4 w-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
