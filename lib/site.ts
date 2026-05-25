export const siteConfig = {
  name: "MasajGO",
  legalName: "MasajGO",
  domain: "https://masajgo.md",
  googleVerification: "", // Set this from Google Search Console
  description: {
    ro: "Fotolii de masaj premium Leercon și mobilier profesional pentru barber shop în Chișinău. Livrare în toată Moldova. Garanție și consultanță gratuită.",
    ru: "Премиальные массажные кресла Leercon и профессиональная мебель для барбершопа в Кишинёве. Доставка по всей Молдове. Гарантия и бесплатная консультация.",
  },
  phone: "+373 60 000 000",
  phoneHref: "tel:+37360000000",
  whatsapp: "+373 60 000 000",
  whatsappHref: "https://wa.me/37360000000",
  email: "contact@masajgo.md",
  address: {
    street: "mun. Chișinău",
    locality: "Chișinău",
    region: "Chișinău",
    postalCode: "MD-2000",
    country: "MD",
  },
  social: {
    facebook: "https://www.facebook.com/share/18tQ1aKgyR/?mibextid=wwXIfr",
    instagram: "",
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
