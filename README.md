# MasajGO — site oficial

Site multilingv (RO + RU) pentru **MasajGO** — distribuitor de fotolii de masaj Leercon și mobilier profesional pentru saloane barber în Chișinău, Republica Moldova.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 3**
- **Framer Motion** — animații
- **next/image** cu AVIF + WebP — imagini optimizate automat
- **i18n** custom (RO + RU) via route segments `[locale]`
- Hosting: **Vercel**

## Rulare locală

```bash
npm install
npm run dev
```

Site la `http://localhost:3000` (redirect automat către `/ro` sau `/ru` în funcție de browser).

## Build

```bash
npm run build
npm run start
```

## Structură

```
app/
  [locale]/              # /ro și /ru
    layout.tsx           # navbar, footer, JSON-LD LocalBusiness
    page.tsx             # home
    produse/page.tsx     # listă produse cu filtre
    produse/[slug]/page.tsx  # pagină produs cu JSON-LD Product + BreadcrumbList
    despre/page.tsx
    contact/page.tsx
    opengraph-image.tsx  # OG image generat dinamic
    not-found.tsx
  llms.txt/route.ts      # llms.txt pentru AI bots
  manifest.ts            # PWA manifest
  robots.ts              # robots.txt cu reguli pentru GPTBot, ClaudeBot etc.
  sitemap.ts             # sitemap.xml cu hreflang
components/              # Navbar, Footer, ProductCard, Hero, etc.
lib/
  site.ts                # config domeniu, telefon, email, adresă
  i18n.ts                # dicționare RO + RU
  products.ts            # 13 produse cu descrieri RO + RU
middleware.ts            # redirect / → /ro sau /ru (cu cookie)
public/
  products/              # poze produse (PNG, optimizate auto de Next/Image)
  favicon.svg
```

## SEO inclus

- ✅ Metadata per pagină (title, description, keywords) în RO + RU
- ✅ OpenGraph + Twitter cards
- ✅ OG image dinamic per locale (Edge generated)
- ✅ JSON-LD: `LocalBusiness`, `Product`, `BreadcrumbList`, `ItemList`
- ✅ `sitemap.xml` dinamic cu `hreflang` (ro-MD, ru-MD)
- ✅ `robots.txt` cu reguli pentru AI bots (GPTBot, ClaudeBot, Perplexity, Google-Extended)
- ✅ `llms.txt` (rezumat pentru LLM-uri)
- ✅ `manifest.webmanifest` (PWA-ready)
- ✅ Hreflang în `<link>` și `alternates`
- ✅ Canonical URLs
- ✅ Security headers (HSTS, X-Frame-Options, Permissions-Policy)
- ✅ Cache-Control immutable pentru imagini

## Imagini

Toate imaginile sunt servite prin `next/image`:
- Format **AVIF + WebP** automat (`next.config.ts > images.formats`)
- Responsive `sizes`
- LCP marcat cu `priority + fetchPriority="high"`
- Cache 30 zile minim
- Lazy-loading pentru imaginile sub fold

## Deploy pe Vercel

1. Creează cont pe [vercel.com](https://vercel.com)
2. Conectează repo Git (GitHub / GitLab)
3. Vercel detectează Next.js automat — `npm run build` rulează din cutie
4. Adaugă domeniul tău custom (de ex. `masajgo.md`) în Vercel → Settings → Domains
5. După deploy, schimbă `siteConfig.domain` în `lib/site.ts` cu domeniul real
6. Submit `sitemap.xml` la Google Search Console și Yandex Webmaster

### Variabile de mediu

Nu sunt necesare pentru funcționarea de bază. Dacă vrei să adaugi formular real (Resend, Formspree etc.), adaugă în `.env.local`:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
```

## Recomandări pentru mai târziu (next steps)

1. **Domeniu** — cumpără `masajgo.md` sau `masaj.md` (.md e perfect pentru Moldova)
2. **Google Search Console** + **Yandex Webmaster** — submit sitemap
3. **Google Business Profile** — pentru ranking local Chișinău
4. **Pixel Facebook + Google Analytics 4** — tracking conversii
5. **Formular real** cu **Resend** sau **Formspree** (acum face mailto:)
6. **WhatsApp Business** — buton flotant + chat direct
7. **Recenzii clienți** cu structured data `Review` / `AggregateRating`
8. **Blog/sfaturi** — articole SEO (ex. „Cum alegi un fotoliu de masaj")
9. **Galerie video** — YouTube embed cu lazy-load
10. **Compară produse** — feature interactiv

## Date din `MasajGO.xlsx`

Toate cele 13 produse din fișierul tău Excel sunt integrate în `lib/products.ts`:
- 11 fotolii de masaj Leercon (de la 21.800 până la 75.800 Lei)
- 2 produse mobilier barber (Scaun Barber + Scaun spălare cap)

Descrierile sunt integrate complet, bilingv (RO + RU), exact ca în fișier.

## Editare conținut

- **Produse**: `lib/products.ts`
- **Texte UI**: `lib/i18n.ts` (RO și RU)
- **Date contact / SEO**: `lib/site.ts`
- **Poze produse**: `public/products/`
