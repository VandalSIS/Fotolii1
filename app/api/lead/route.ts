import { NextResponse } from "next/server";
import { sendLeadEmail, type LeadField, type LeadType } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD_LEN = 2000;
const ALLOWED_TYPES: readonly LeadType[] = ["booking", "contact", "order"] as const;

type RawPayload = {
  type?: string;
  productName?: string;
  productPrice?: string;
  locale?: string;
  honeypot?: string;
  data?: Record<string, unknown>;
};

function clean(value: unknown): string {
  if (value == null) return "";
  return String(value).slice(0, MAX_FIELD_LEN).trim();
}

function buildSubject(type: LeadType, data: Record<string, string>, productName?: string): string {
  const name = data.name || data.fullName || "Vizitator";
  switch (type) {
    case "booking":
      return `Programare test — ${name}`;
    case "order":
      return productName ? `Comandă: ${productName} — ${name}` : `Comandă nouă — ${name}`;
    case "contact":
    default:
      return `Mesaj nou — ${name}`;
  }
}

const LABELS: Record<string, { ro: string; ru: string }> = {
  name: { ro: "Nume", ru: "Имя" },
  phone: { ro: "Telefon", ru: "Телефон" },
  email: { ro: "Email", ru: "Email" },
  product: { ro: "Model interesat", ru: "Интересующая модель" },
  date: { ro: "Data preferată", ru: "Желаемая дата" },
  time: { ro: "Ora preferată", ru: "Желаемое время" },
  message: { ro: "Mesaj", ru: "Сообщение" },
  address: { ro: "Adresă livrare", ru: "Адрес доставки" },
};

function labelFor(key: string, locale: "ro" | "ru"): string {
  return LABELS[key]?.[locale] ?? key;
}

function buildFields(
  type: LeadType,
  data: Record<string, string>,
  locale: "ro" | "ru",
  productName?: string,
  productPrice?: string,
): LeadField[] {
  const fields: LeadField[] = [];
  const push = (key: string) => {
    if (data[key]) fields.push({ label: labelFor(key, locale), value: data[key] });
  };

  if (type === "order" && productName) {
    fields.push({
      label: locale === "ru" ? "Продукт" : "Produs",
      value: productPrice ? `${productName} — ${productPrice}` : productName,
    });
  }

  for (const key of ["name", "phone", "email", "address", "product", "date", "time", "message"]) {
    push(key);
  }

  fields.push({
    label: locale === "ru" ? "Источник" : "Sursă formular",
    value: type === "booking" ? "Programează test" : type === "order" ? "Comandă rapidă" : "Contact / Mesaj",
  });

  return fields;
}

export async function POST(request: Request) {
  let body: RawPayload;
  try {
    body = (await request.json()) as RawPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  if (body.honeypot && body.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const type = body.type as LeadType;
  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json({ ok: false, error: "invalid-type" }, { status: 400 });
  }

  const locale: "ro" | "ru" = body.locale === "ru" ? "ru" : "ro";
  const rawData = body.data ?? {};
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(rawData)) {
    const cleaned = clean(value);
    if (cleaned) data[key] = cleaned;
  }

  if (!data.name && !data.phone) {
    return NextResponse.json({ ok: false, error: "missing-required" }, { status: 400 });
  }

  const productName = clean(body.productName);
  const productPrice = clean(body.productPrice);
  const subject = buildSubject(type, data, productName);
  const fields = buildFields(type, data, locale, productName, productPrice);

  const result = await sendLeadEmail({
    type,
    subject,
    fields,
    replyTo: data.email || undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "send-failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
