import { siteConfig, type Locale } from "./site";

export type Category = "massage" | "barber";

export interface LocalizedText {
  ro: string;
  ru: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number | null;
  priceLabel?: LocalizedText;
  recommended?: boolean;
  available: boolean;
  image: string;
  shortDescription: LocalizedText;
  features: { ro: string[]; ru: string[] };
  specs: { ro: string[]; ru: string[] };
}

/**
 * Calculează rata lunară afișată pe site — split simplu preț ÷ luni.
 * Detaliile reale ale creditului (dobândă, comision) sunt confirmate de
 * EasyCredit la solicitare. Pe site afișăm doar suma orientativă pe lună,
 * fără cost suplimentar, ca să nu sperie clientul.
 */
export function monthlyInstallment(price: number | null, months: number): number | null {
  if (price === null || months <= 0) return null;
  const tier = siteConfig.credit.tiers.find((t) => months >= t.from && months <= t.to);
  if (!tier) return null;
  return Math.round(price / months);
}

export function totalToPay(price: number | null, months: number): number | null {
  const monthly = monthlyInstallment(price, months);
  if (monthly === null) return null;
  return monthly * months;
}

const desc4D = {
  ro: [
    "Mecanism de masaj 4D",
    "Piele PU fără solvenți, fără miros și rezistentă la uzură",
    "Mecanism retractabil, extensie până la 12 cm",
    "Șină SL pentru masaj complet al corpului, cu frământare și acupresiune",
    "Multiple tehnici de masaj sincronizate",
    "Ecran LCD tactil premium",
    "Design tip capsulă spațială",
    "Butoane rapide de control",
    "Încărcare USB + încărcare wireless",
    "Masaj pentru umeri cu 4 perne de aer",
    "Masaj pentru brațe cu sistem dublu de perne de aer",
    "Perne de aer pentru picioare cu compresie completă",
    "Masaj pentru gambe și glezne cu mișcare stânga-dreapta",
    "Perne de aer lombare pentru compresie și masaj oscilant",
    "Încălzire pentru spate reglabilă între 30°C și 45°C",
    "Role pentru masajul tălpilor",
    "Detectare inteligentă a lungimii picioarelor",
    "Suport pentru picioare telescopic",
    "Ridicare independentă a gambelor",
    "Sistem electric dublu pentru ajustare și ridicare sincronizată",
    "Funcție Zero Gravity cu o singură apăsare",
    "Necesită doar 5 cm distanță față de perete",
    "Bluetooth HiFi pentru muzică",
    "Purificare a aerului cu ioni negativi",
    "Sistem electric sigur de 24V",
  ],
  ru: [
    "Массажный механизм 4D",
    "Экокожа PU без растворителей, без запаха, устойчивая к износу",
    "Выдвижной массажный механизм с регулировкой до 12 см",
    "SL-направляющая для полного массажа тела",
    "Техники массажа: разминание, акупрессура и синхронизированные программы",
    "Сенсорный LCD-дисплей премиум-класса",
    "Дизайн в стиле «космической капсулы»",
    "Быстрые кнопки управления",
    "USB-зарядка + беспроводная зарядка",
    "Массаж плеч с 4 воздушными подушками",
    "Двойные воздушные подушки для массажа рук",
    "Полный воздушно-компрессионный массаж ног",
    "Массаж икр и лодыжек с движением влево-вправо",
    "Воздушные подушки для поясничной зоны с компрессионным массажем",
    "Подогрев спины с регулировкой от 30°C до 45°C",
    "Роликовый массаж стоп",
    "Интеллектуальное определение длины ног",
    "Телескопическая подставка для ног",
    "Независимая регулировка подъёма икр",
    "Двойная электрическая система регулировки положения",
    "Функция Zero Gravity одним нажатием",
    "Требуется всего 5 см расстояния от стены",
    "Bluetooth HiFi-аудиосистема",
    "Очистка воздуха отрицательными ионами",
    "Безопасная электрическая система 24V",
  ],
};

const specs4D = {
  ro: [
    "Greutate brută / netă: 118 kg / 96 kg",
    "Putere nominală: 150W",
    "Alimentare: 220V - 240V / 50-60Hz",
    "Dimensiune cutie principală: 1675 × 870 × 925 mm",
    "Dimensiune colet suport picioare: 640 × 565 × 625 mm",
  ],
  ru: [
    "Вес брутто / нетто: 118 кг / 96 кг",
    "Номинальная мощность: 150W",
    "Напряжение: 220V – 240V / 50–60Hz",
    "Размер основной упаковки: 1675 × 870 × 925 мм",
    "Размер упаковки подставки ног: 640 × 565 × 625 мм",
  ],
};

const descSL6tech = {
  ro: [
    "Panouri laterale și suport pentru picioare cu finisaj lucios PE-mold",
    "Șină SL pentru masaj cu 6 tehnici de masaj",
    "Detectare inteligentă a formei corpului + încărcare wireless",
    "Perne de aer pentru întreg corpul: umeri, brațe, șezut, gambe și picioare",
    "Role de masaj pentru tălpi",
    "Funcție de încălzire pentru talie și gambe",
    "Control manual LCD + butoane rapide + încărcare USB",
    "Control vocal în limba engleză",
    "Detectarea ritmului cardiac",
    "Iluminare ambientală pe cotiere",
    "Ioni negativi de oxigen",
    "Funcție Zero Gravity",
    "18 programe automate de masaj + 6 tehnici de masaj",
    "Material PU prietenos cu pielea",
    "Reglare automată sus-jos a suportului pentru picioare",
    "Funcție Bluetooth",
  ],
  ru: [
    "Боковые панели и подставка для ног с глянцевым покрытием PE-mold",
    "SL-направляющая с 6 техниками массажа",
    "Интеллектуальное определение формы тела + беспроводная зарядка",
    "Воздушные подушки для всего тела: плечи, руки, сиденье, икры и стопы",
    "Роликовый массаж стоп",
    "Функция подогрева поясницы и икр",
    "LCD ручное управление + быстрые кнопки + USB зарядка",
    "Голосовое управление на английском языке",
    "Определение сердечного ритма",
    "Атмосферная подсветка на подлокотниках",
    "Отрицательные ионы кислорода",
    "Функция Zero Gravity",
    "18 автоматических программ массажа + 6 техник массажа",
    "Материал PU, безопасный и приятный для кожи",
    "Автоматическая регулировка подставки для ног",
    "Функция Bluetooth",
  ],
};

const specsSL = {
  ro: [
    "Alimentare: AC220V",
    "Putere: 150W",
    "Durata recomandată de lucru: 15-30 minute",
    "Dimensiune fotoliu: 145 × 75 × 115 cm",
    "Dimensiune ambalaj: 125 × 77 × 116 cm",
    "Greutate netă / brută: 83 / 96 kg",
  ],
  ru: [
    "Напряжение: AC220V",
    "Мощность: 150W",
    "Рекомендуемое время работы: 15–30 минут",
    "Размер кресла: 145 × 75 × 115 см",
    "Размер упаковки: 125 × 77 × 116 см",
    "Вес нетто / брутто: 83 / 96 кг",
  ],
};

const desc4Role135 = {
  ro: [
    "Mecanism de masaj cu 4 role mobile",
    "Șină SL de 135 cm",
    "Detectarea inteligentă a formei corpului",
    "Perne de aer pentru întreg corpul",
    "4 grupuri de role pentru masajul tălpilor",
    "Funcție de încălzire pentru talie și gambe",
    "Control manual LCD + panou cu butoane rapide + control vocal",
    "Detectarea ritmului cardiac",
    "Iluminare ambientală („Breathing Light”)",
    "Ioni negativi de oxigen",
    "Funcție Zero Gravity",
    "10 programe automate de masaj + 6 tehnici de masaj",
    "Material PU confortabil",
    "Cadru din oțel premium cu elemente decorative vopsite",
  ],
  ru: [
    "Массажный механизм с 4 подвижными роликами",
    "SL-направляющая длиной 135 см",
    "Интеллектуальное определение формы тела",
    "Воздушные подушки для всего тела",
    "4 группы роликов для массажа стоп",
    "Подогрев поясницы и икр",
    "LCD ручное управление + панель быстрых кнопок + голосовое управление",
    "Определение сердечного ритма",
    "Атмосферная подсветка («Breathing Light»)",
    "Отрицательные ионы кислорода",
    "Функция Zero Gravity",
    "10 автоматических программ массажа + 6 техник массажа",
    "Удобный материал PU",
    "Усиленная стальная рама с окрашенными декоративными элементами",
  ],
};

const specs4Role135 = {
  ro: [
    "Alimentare: AC220V",
    "Putere: 150W",
    "Timp recomandat de utilizare: 15-30 minute",
    "Dimensiune ambalaj: 114 × 75 × 109 cm",
    "Greutate netă / brută: 83 / 96 kg",
  ],
  ru: [
    "Напряжение: AC220V",
    "Мощность: 150W",
    "Рекомендуемое время использования: 15–30 минут",
    "Размер упаковки: 114 × 75 × 109 см",
    "Вес нетто / брутто: 83 / 96 кг",
  ],
};

const descZeroGravity = {
  ro: [
    "Elemente PE cu finisaj lucios tip pian pe cotiere",
    "Design modern cu funcție Zero Gravity",
    "Role de masaj pentru gât, umeri, spate, talie, șezut și picioare",
    "Mecanism de masaj cu puncte fixe",
    "Masaj cu presiune de aer pentru umeri, brațe, șolduri, gambe, picioare și tălpi",
    "Funcție de încălzire pentru talie și gambe",
    "Bluetooth pentru muzică",
    "Suport pentru picioare extensibil",
    "Masaj de frământare pentru tălpi",
    "20 programe automate",
    "Ecran LCD tactil de control",
    "Masaj rotativ de frământare pentru șezut",
    "Bandă decorativă LED premium",
    "Butoane rapide + încărcător USB",
    "Control vocal în limba engleză",
  ],
  ru: [
    "Глянцевые декоративные элементы PE на подлокотниках",
    "Современный дизайн с функцией Zero Gravity",
    "Массажные ролики для шеи, плеч, спины, талии, сиденья и ног",
    "Механизм точечного массажа",
    "Воздушный массаж для плеч, рук, бедер, икр, ног и стоп",
    "Подогрев талии и икр",
    "Bluetooth для музыки",
    "Выдвижная подставка для ног",
    "Разминающий массаж стоп",
    "20 автоматических программ",
    "Сенсорный LCD-дисплей управления",
    "Вращательный разминающий массаж сиденья",
    "Премиальная декоративная LED-подсветка",
    "Быстрые кнопки + USB-зарядка",
    "Голосовое управление на английском языке",
  ],
};

const specsZeroGravity = {
  ro: [
    "Alimentare: AC220V",
    "Putere: 90W",
    "Timp de funcționare: 15-30 minute",
    "Ambalare: 1 buc / cutie",
    "Dimensiuni fotoliu: 145 × 74 × 104 cm",
    "Dimensiuni ambalaj: 118 × 75 × 105 cm",
    "Greutate netă / brută: 57 / 69 kg",
  ],
  ru: [
    "Напряжение: AC220V",
    "Мощность: 90W",
    "Время работы: 15-30 минут",
    "Упаковка: 1 шт / коробка",
    "Размер кресла: 145 × 74 × 104 см",
    "Размер упаковки: 118 × 75 × 105 см",
    "Вес нетто / брутто: 57 / 69 кг",
  ],
};

export const products: Product[] = [
  {
    slug: "leercon-988a",
    name: "Leercon 988A",
    brand: "Leercon",
    category: "massage",
    price: 75800,
    available: true,
    image: "/products/leercon-988a.png",
    shortDescription: {
      ro: "Fotoliu de masaj premium cu mecanism 4D, șină SL, încălzire reglabilă și Zero Gravity. Top-of-the-line.",
      ru: "Премиальное массажное кресло с механизмом 4D, SL-направляющей, регулируемым подогревом и Zero Gravity.",
    },
    features: desc4D,
    specs: specs4D,
  },
  {
    slug: "leercon-m5-gray",
    name: "Leercon M5 Gray",
    brand: "Leercon",
    category: "massage",
    price: 33500,
    recommended: true,
    available: true,
    image: "/products/leercon-m5-gray.jpg",
    shortDescription: {
      ro: "Model recomandat. Șină SL, 18 programe automate, încărcare wireless, control vocal englez.",
      ru: "Рекомендуемая модель. SL-направляющая, 18 программ, беспроводная зарядка, голосовое управление.",
    },
    features: descSL6tech,
    specs: specsSL,
  },
  {
    slug: "leercon-m5-white",
    name: "Leercon M5 White",
    brand: "Leercon",
    category: "massage",
    price: 33500,
    recommended: true,
    available: true,
    image: "/products/leercon-m5-white.png",
    shortDescription: {
      ro: "Model recomandat în alb. Șină SL, 18 programe automate, încărcare wireless, control vocal.",
      ru: "Рекомендуемая модель в белом. SL-направляющая, 18 программ, беспроводная зарядка.",
    },
    features: descSL6tech,
    specs: specsSL,
  },
  {
    slug: "leercon-988q9",
    name: "Leercon 988Q9",
    brand: "Leercon",
    category: "massage",
    price: 25500,
    available: true,
    image: "/products/leercon-988q9.png",
    shortDescription: {
      ro: "Fotoliu cu 4 role mobile, șină SL 135 cm, 10 programe automate, încălzire și Zero Gravity.",
      ru: "Кресло с 4 роликами, SL 135 см, 10 программ, подогрев и Zero Gravity.",
    },
    features: desc4Role135,
    specs: specs4Role135,
  },
  {
    slug: "leercon-988g-brown",
    name: "Leercon 988G Brown",
    brand: "Leercon",
    category: "massage",
    price: 37500,
    available: true,
    image: "/products/leercon-988g-brown.png",
    shortDescription: {
      ro: "Variantă maro elegantă. Mecanism cu 4 role, șină SL 135 cm, 10 programe + 6 tehnici de masaj.",
      ru: "Элегантная коричневая версия. 4 ролика, SL 135 см, 10 программ + 6 техник массажа.",
    },
    features: desc4Role135,
    specs: {
      ro: [
        "Tensiune: AC220V",
        "Putere: 150W",
        "Timp de funcționare: 15-30 minute",
        "Dimensiuni fotoliu: 145 × 75 × 115 cm",
        "Dimensiuni ambalaj: 125 × 77 × 116 cm",
        "Greutate netă / brută: 83 / 96 kg",
      ],
      ru: [
        "Напряжение: AC220V",
        "Мощность: 150 Вт",
        "Время работы: 15-30 минут",
        "Размер кресла: 145 × 75 × 115 см",
        "Размер упаковки: 125 × 77 × 116 см",
        "Вес нетто / брутто: 83 / 96 кг",
      ],
    },
  },
  {
    slug: "leercon-988g-white",
    name: "Leercon 988G White",
    brand: "Leercon",
    category: "massage",
    price: 37500,
    available: true,
    image: "/products/leercon-988g-white.png",
    shortDescription: {
      ro: "Variantă albă luminoasă. Mecanism cu 4 role, șină SL 135 cm, 10 programe automate.",
      ru: "Светлая белая версия. 4 ролика, SL 135 см, 10 автоматических программ.",
    },
    features: desc4Role135,
    specs: {
      ro: [
        "Tensiune: AC220V",
        "Putere: 150W",
        "Timp de funcționare: 15-30 minute",
        "Dimensiuni fotoliu: 145 × 75 × 115 cm",
        "Dimensiuni ambalaj: 125 × 77 × 116 cm",
        "Greutate netă / brută: 83 / 96 kg",
      ],
      ru: [
        "Напряжение: AC220V",
        "Мощность: 150 Вт",
        "Время работы: 15-30 минут",
        "Размер кресла: 145 × 75 × 115 см",
        "Размер упаковки: 125 × 77 × 116 см",
        "Вес нетто / брутто: 83 / 96 кг",
      ],
    },
  },
  {
    slug: "leercon-988t",
    name: "Leercon 988T",
    brand: "Leercon",
    category: "massage",
    price: 45000,
    available: true,
    image: "/products/leercon-988t.jpg",
    shortDescription: {
      ro: "Fotoliu gri elegant. Șină SL + 6 tehnici de masaj, perne de aer pe tot corpul, Zero Gravity.",
      ru: "Элегантное серое кресло. SL + 6 техник массажа, воздушные подушки, Zero Gravity.",
    },
    features: {
      ro: [
        "Panouri laterale din PE cu finisaj lucios",
        "Șină SL pentru masaj + 6 tehnici de masaj",
        "Detectarea formei corpului",
        "Airbag-uri pentru umeri, brațe, șezut, gambe și picioare",
        "Role de masaj pentru tălpi",
        "Funcție de încălzire pentru talie și gambe",
        "Ecran LCD + butoane rapide + încărcare USB",
        "Control vocal în limba engleză",
        "Iluminare ambientală pe cotiere",
        "Funcție Zero Gravity",
        "Programe automate de masaj + 6 tehnici",
        "Material PU plăcut la atingere",
        "Funcție Bluetooth",
      ],
      ru: [
        "Боковые панели из PE с глянцевым покрытием",
        "SL-направляющая + 6 техник массажа",
        "Определение формы тела",
        "Аэроподушки для плеч, рук, сиденья, икр и стоп",
        "Массажные ролики для стоп",
        "Подогрев талии и икр",
        "LCD-дисплей + быстрые кнопки + USB-зарядка",
        "Голосовое управление на английском",
        "Атмосферная подсветка на подлокотниках",
        "Функция Zero Gravity",
        "Автоматические программы + 6 техник массажа",
        "Экокожа PU, приятная для кожи",
        "Функция Bluetooth",
      ],
    },
    specs: {
      ro: [
        "Tensiune: AC220V",
        "Putere: 150W",
        "Timp de funcționare: 15-30 minute",
        "Culoare: Gri",
        "Dimensiuni ambalaj: 130 × 76 × 108 cm",
        "Greutate netă / brută: 83 / 96 kg",
      ],
      ru: [
        "Напряжение: AC220V",
        "Мощность: 150 Вт",
        "Время работы: 15-30 минут",
        "Цвет: Серый",
        "Размер упаковки: 130 × 76 × 108 см",
        "Вес нетто / брутто: 83 / 96 кг",
      ],
    },
  },
  {
    slug: "leercon-988x9-white",
    name: "Leercon 988X9 White",
    brand: "Leercon",
    category: "massage",
    price: 21800,
    available: true,
    image: "/products/leercon-988x9-white.png",
    shortDescription: {
      ro: "Cel mai accesibil model. 20 programe automate, Zero Gravity, design modern alb.",
      ru: "Самая доступная модель. 20 программ, Zero Gravity, современный белый дизайн.",
    },
    features: descZeroGravity,
    specs: specsZeroGravity,
  },
  {
    slug: "leercon-988x9-black",
    name: "Leercon 988X9 Black",
    brand: "Leercon",
    category: "massage",
    price: 21800,
    available: true,
    image: "/products/leercon-988x9-black.png",
    shortDescription: {
      ro: "Variantă neagră elegantă. 20 programe automate, Zero Gravity, perfect pentru orice interior.",
      ru: "Элегантная чёрная версия. 20 программ, Zero Gravity, подходит к любому интерьеру.",
    },
    features: {
      ro: [
        "Design modern cu funcție Zero Gravity",
        "Mecanism de masaj cu puncte fixe",
        "Masaj cu presiune de aer pentru umeri, brațe, șolduri, gambe, picioare și tălpi",
        "Funcție de încălzire pentru talie și gambe",
        "Bluetooth pentru muzică",
        "Suport pentru picioare extensibil",
        "Masaj de frământare pentru tălpi",
        "20 programe automate",
        "Ecran LCD tactil",
        "Masaj rotativ pentru șezut + airbag-uri pentru coapse",
      ],
      ru: [
        "Современный дизайн с функцией Zero Gravity",
        "Механизм точечного массажа",
        "Воздушный массаж для плеч, рук, бедер, икр, ног и стоп",
        "Подогрев талии и икр",
        "Bluetooth для музыки",
        "Выдвижная подставка для ног",
        "Разминающий массаж стоп",
        "20 автоматических программ",
        "Сенсорный LCD-дисплей",
        "Вращательный массаж сиденья + аэроподушки для бедер",
      ],
    },
    specs: {
      ro: [
        "Tensiune: AC220V",
        "Putere: 90W",
        "Timp de funcționare: 15-30 minute",
        "Culoare: Negru",
        "Dimensiuni ambalaj: 110 × 74 × 105 cm",
        "Greutate netă / brută: 55 / 65 kg",
      ],
      ru: [
        "Напряжение: AC220V",
        "Мощность: 90 Вт",
        "Время работы: 15-30 минут",
        "Цвет: Чёрный",
        "Размер упаковки: 110 × 74 × 105 см",
        "Вес нетто / брутто: 55 / 65 кг",
      ],
    },
  },
  {
    slug: "leercon-lek-988a1",
    name: "Leercon LEK-988A1",
    brand: "Leercon",
    category: "massage",
    price: 39300,
    available: true,
    image: "/products/leercon-lek-988a1.png",
    shortDescription: {
      ro: "Fotoliu premium cu șină SL, 18 programe automate, încărcare wireless și control vocal.",
      ru: "Премиальное кресло с SL, 18 программ, беспроводная зарядка и голосовое управление.",
    },
    features: descSL6tech,
    specs: {
      ro: [
        "Alimentare: AC220V",
        "Putere: 150W",
        "Durata recomandată: 15-30 minute",
        "Dimensiune fotoliu: 145 × 75 × 115 cm",
        "Dimensiune ambalaj: 125 × 77 × 116 cm",
        "Greutate netă / brută: 83 / 96 kg",
        "Ambalare: 1 bucată / cutie",
      ],
      ru: [
        "Напряжение: AC220V",
        "Мощность: 150W",
        "Рекомендуемое время: 15–30 минут",
        "Размер кресла: 145 × 75 × 115 см",
        "Размер упаковки: 125 × 77 × 116 см",
        "Вес нетто / брутто: 83 / 96 кг",
        "Упаковка: 1 кресло / коробка",
      ],
    },
  },
  {
    slug: "leercon-lek-r9",
    name: "Leercon LEK-R9",
    brand: "Leercon",
    category: "massage",
    price: 31500,
    available: true,
    image: "/products/leercon-lek-r9.png",
    shortDescription: {
      ro: "Model R9 cu design elegant maro. Mecanism SL, programe automate, perne de aer și încălzire.",
      ru: "Модель R9 с элегантным коричневым дизайном. SL-механизм, программы, аэроподушки, подогрев.",
    },
    features: descSL6tech,
    specs: specsSL,
  },
  {
    slug: "scaun-barber",
    name: "Scaun Barber",
    brand: "MasajGO",
    category: "barber",
    price: 13500,
    available: true,
    image: "/products/scaun-barber.png",
    shortDescription: {
      ro: "Scaun profesional pentru barber shop, construcție solidă, design clasic elegant.",
      ru: "Профессиональное кресло для барбершопа, прочная конструкция, классический дизайн.",
    },
    features: {
      ro: [
        "Construcție solidă și durabilă",
        "Material premium, ușor de întreținut",
        "Confort sporit pentru client",
        "Design elegant și profesional",
        "Potrivit pentru salon de frumusețe, coafor și barber shop",
      ],
      ru: [
        "Прочная и надёжная конструкция",
        "Премиальные материалы",
        "Повышенный комфорт для клиента",
        "Современный профессиональный дизайн",
        "Подходит для салонов красоты, парикмахерских и барбершопов",
      ],
    },
    specs: { ro: [], ru: [] },
  },
  {
    slug: "scaun-spalare-cap",
    name: "Scaun pentru spălare cap",
    brand: "MasajGO",
    category: "barber",
    price: 15500,
    available: true,
    image: "/products/scaun-spalare-cap.png",
    shortDescription: {
      ro: "Scaun profesional pentru spălarea capului, design ergonomic, material rezistent.",
      ru: "Профессиональное кресло-мойка для головы, эргономичный дизайн, износостойкий материал.",
    },
    features: {
      ro: [
        "Design ergonomic",
        "Material rezistent și durabil",
        "Ușor de întreținut",
        "Aspect premium pentru salon modern",
      ],
      ru: [
        "Эргономичный дизайн",
        "Износостойкий и долговечный материал",
        "Лёгкий уход",
        "Премиум-вид для современного салона",
      ],
    },
    specs: { ro: [], ru: [] },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export function getRecommended(): Product[] {
  return products.filter((p) => p.recommended);
}

export function formatPrice(price: number | null, locale: Locale): string {
  if (price === null) return locale === "ru" ? "По запросу" : "La cerere";
  const formatted = new Intl.NumberFormat(locale === "ru" ? "ru-MD" : "ro-MD").format(price);
  return locale === "ru" ? `${formatted} лей` : `${formatted} Lei`;
}
