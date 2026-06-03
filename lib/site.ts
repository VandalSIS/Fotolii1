export const siteConfig = {
  name: "MasajGO",
  legalName: "MasajGO",
  domain: "https://masajgo.md",
  googleVerification: "", // Set this from Google Search Console
  description: {
    ro: "Fotolii de masaj Leercon în Chișinău: modele 4D, Zero Gravity, șină SL. Livrare gratuită în toată Moldova, garanție 3 ani, rate 0% până la 12 luni. Showroom în Chișinău.",
    ru: "Массажные кресла Leercon в Кишинёве: модели 4D, Zero Gravity, рельса SL. Бесплатная доставка по Молдове, гарантия 3 года, рассрочка 0% до 12 месяцев. Шоурум в Кишинёве.",
  },
  phone: "+373 69 595 968",
  phoneHref: "tel:+37369595968",
  whatsapp: "+373 69 595 968",
  whatsappHref: "https://wa.me/37369595968",
  email: "masajgomoldova@gmail.com",
  address: {
    street: "str. Bănulescu-Bodoni 61, bloc V, of. 112",
    locality: "Chișinău",
    region: "Chișinău",
    postalCode: "MD-2005",
    country: "MD",
    note: { ro: "oficiu · showroom", ru: "офис · шоурум" },
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=str.+B%C4%83nulescu-Bodoni+61,+Chi%C8%99in%C4%83u,+Moldova",
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
