import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyContact } from "@/components/StickyContact";
import { getDictionary } from "@/lib/i18n";
import { siteConfig, locales, type Locale } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#f9f1e1",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) return {};
  const loc = locale as Locale;
  const description = siteConfig.description[loc];
  const title =
    loc === "ru"
      ? `${siteConfig.name} — Массажные кресла Leercon в Кишинёве`
      : `${siteConfig.name} — Fotolii de masaj Leercon Chișinău`;

  return {
    metadataBase: new URL(siteConfig.domain),
    title: {
      default: title,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    keywords:
      loc === "ru"
        ? [
            "массажное кресло",
            "массажные кресла Кишинёв",
            "Leercon Молдова",
            "кресло барбер",
            "мебель для барбершопа",
            "Zero Gravity кресло",
            "4D массажное кресло",
          ]
        : [
            "fotoliu de masaj",
            "fotolii de masaj Chișinău",
            "Leercon Moldova",
            "scaun barber",
            "mobilier barber",
            "fotoliu masaj 4D",
            "Zero Gravity",
          ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: { telephone: true, email: true, address: true },
    alternates: {
      canonical: `${siteConfig.domain}/${loc}`,
      languages: {
        "ro-MD": `${siteConfig.domain}/ro`,
        "ru-MD": `${siteConfig.domain}/ru`,
        "x-default": `${siteConfig.domain}/ro`,
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "ru" ? "ru_MD" : "ro_MD",
      alternateLocale: loc === "ru" ? "ro_MD" : "ru_MD",
      url: `${siteConfig.domain}/${loc}`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: `${siteConfig.domain}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.domain}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
    manifest: "/manifest.webmanifest",
    ...(siteConfig.googleVerification
      ? { verification: { google: siteConfig.googleVerification } }
      : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  const loc = locale as Locale;
  const dict = getDictionary(loc);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.domain}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description[loc],
    url: `${siteConfig.domain}/${loc}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.domain}/og-image.png`,
    logo: `${siteConfig.domain}/logo.png`,
    priceRange: "$$",
    currenciesAccepted: "MDL",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.0245,
      longitude: 28.8322,
    },
    areaServed: { "@type": "Country", name: "Moldova" },
    sameAs: [siteConfig.social.facebook].filter(Boolean),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.domain}/#website`,
    name: siteConfig.name,
    url: siteConfig.domain,
    inLanguage: [
      { "@type": "Language", name: "Romanian", alternateName: "ro" },
      { "@type": "Language", name: "Russian", alternateName: "ru" },
    ],
    publisher: { "@id": `${siteConfig.domain}/#localbusiness` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.domain}/${loc}/produse?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={loc === "ru" ? "ru-MD" : "ro-MD"} className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-cream-50 text-ink-900 antialiased">
        <Navbar locale={loc} dict={dict} />
        <main className="pt-16">{children}</main>
        <Footer locale={loc} dict={dict} />
        <StickyContact />
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
