import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { locales, defaultLocale, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const lastModified = new Date();

  const staticPages: { path: string; freq: "daily" | "weekly" | "monthly"; prio: number }[] = [
    { path: "", freq: "daily", prio: 1.0 },
    { path: "/produse", freq: "weekly", prio: 0.9 },
    { path: "/despre", freq: "monthly", prio: 0.6 },
    { path: "/contact", freq: "monthly", prio: 0.7 },
  ];

  const productPages = products.map((p) => ({
    path: `/produse/${p.slug}`,
    freq: "weekly" as const,
    prio: 0.8,
  }));

  const allPages = [...staticPages, ...productPages];

  return allPages.map(({ path, freq, prio }) => ({
    url: `${base}/${defaultLocale}${path}`,
    lastModified,
    changeFrequency: freq,
    priority: prio,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l === "ro" ? "ro-MD" : "ru-MD", `${base}/${l}${path}`]),
        ),
        "x-default": `${base}/${defaultLocale}${path}`,
      },
    },
  }));
}
