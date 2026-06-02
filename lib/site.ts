export const siteConfig = {
  name: "MasajGO",
  legalName: "MasajGO",
  domain: "https://masajgo.md",
  googleVerification: "", // Set this from Google Search Console
  description: {
    ro: "Fotolii de masaj premium Leercon și mobilier profesional pentru barber shop în Chișinău. Livrare în toată Moldova. Garanție și consultanță gratuită.",
    ru: "Премиальные массажные кресла Leercon и профессиональная мебель для барбершопа в Кишинёве. Доставка по всей Молдове. Гарантия и бесплатная консультация.",
  },
  phone: "+373 69 595 968",
  phoneHref: "tel:+37369595968",
  whatsapp: "+373 69 595 968",
  whatsappHref: "https://wa.me/37369595968",
  email: "contact@masajgo.md",
  address: {
    street: "str. Albisoara 38A",
    locality: "Chișinău",
    region: "Chișinău",
    postalCode: "MD-2001",
    country: "MD",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=str.+Albisoara+38A,+Chișinău,+Moldova",
  social: {
    facebook: "https://www.facebook.com/share/18tQ1aKgyR/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/masajgo_chisinau/",
    instagramHandle: "@masajgo_chisinau",
  },
  currency: "MDL",
  credit: {
    maxMonths: 12,
    minMonths: 3,
    defaultMonths: 12,
  },
} as const;

export const locales = ["ro", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";
