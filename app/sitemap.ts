import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { locales, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const lastModified = new Date();

  const staticPaths = ["", "/produse", "/despre", "/contact"];
  const productPaths = products.map((p) => `/produse/${p.slug}`);
  const allPaths = [...staticPaths, ...productPaths];

  return allPaths.map((path) => ({
    url: `${base}/${locales[0]}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/produse/") ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l === "ro" ? "ro-MD" : "ru-MD", `${base}/${l}${path}`]),
      ),
    },
  }));
}
