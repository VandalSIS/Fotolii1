import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig } from "./site";

export type LeadType = "booking" | "contact" | "order";

export interface LeadField {
  label: string;
  value: string;
}

export interface LeadPayload {
  type: LeadType;
  subject: string;
  fields: LeadField[];
  replyTo?: string;
}

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter | null {
  if (cachedTransport) return cachedTransport;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!user || !pass) return null;

  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user, pass },
  });
  return cachedTransport;
}

const BRAND = "#a36e1f";
const BG = "#f9f1e1";
const TEXT = "#1a1410";
const MUTED = "#6b5e4b";
const BORDER = "#e7dac4";

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function makeLink(value: string): string {
  const trimmed = value.trim();
  if (/^\+?\d[\d\s().-]{6,}$/.test(trimmed)) {
    const tel = trimmed.replace(/[^\d+]/g, "");
    return `<a href="tel:${tel}" style="color:${BRAND};text-decoration:none;font-weight:600;">${escape(trimmed)}</a>`;
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return `<a href="mailto:${trimmed}" style="color:${BRAND};text-decoration:none;font-weight:600;">${escape(trimmed)}</a>`;
  }
  return escape(value).replace(/\n/g, "<br />");
}

function typeBadge(type: LeadType): { label: string; color: string } {
  switch (type) {
    case "booking":
      return { label: "Programare test", color: "#1f6f3a" };
    case "order":
      return { label: "Comandă produs", color: "#9c2424" };
    case "contact":
    default:
      return { label: "Mesaj general", color: "#1f4f9c" };
  }
}

export function renderEmailHtml(payload: LeadPayload): string {
  const badge = typeBadge(payload.type);
  const rows = payload.fields
    .filter((f) => f.value && f.value.trim().length > 0)
    .map(
      (f) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${BORDER};vertical-align:top;width:38%;">
            <span style="display:block;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};font-weight:600;">${escape(
              f.label,
            )}</span>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid ${BORDER};vertical-align:top;font-size:15px;color:${TEXT};line-height:1.5;">
            ${makeLink(f.value)}
          </td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escape(payload.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BG};font-family:'Helvetica Neue',Arial,sans-serif;color:${TEXT};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid ${BORDER};box-shadow:0 4px 20px rgba(26,20,16,0.06);">
            <tr>
              <td style="background:linear-gradient(135deg,#1a1410 0%,#2a1f17 100%);padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:1px;color:#f9f1e1;font-weight:400;">MasajGO</div>
                      <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND};margin-top:6px;font-weight:600;">Fotolii de masaj premium</div>
                    </td>
                    <td align="right" style="vertical-align:top;">
                      <span style="display:inline-block;background:${badge.color};color:#fff;padding:6px 12px;border-radius:999px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">${escape(
                        badge.label,
                      )}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 36px 12px;">
                <div style="font-size:13px;color:${MUTED};letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Cerere nouă de pe site</div>
                <h1 style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:${TEXT};line-height:1.2;">
                  ${escape(payload.subject)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 36px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    ${
                      payload.replyTo
                        ? `<td style="padding-right:8px;"><a href="mailto:${escape(
                            payload.replyTo,
                          )}" style="display:inline-block;background:${BRAND};color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px;">Răspunde clientului</a></td>`
                        : ""
                    }
                    <td><a href="${
                      siteConfig.domain
                    }" style="display:inline-block;background:#fff;color:${TEXT};text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:999px;border:1px solid ${BORDER};">Deschide site-ul</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:${BG};padding:20px 36px;border-top:1px solid ${BORDER};text-align:center;">
                <div style="font-size:12px;color:${MUTED};line-height:1.6;">
                  Trimis automat din formularul de pe <a href="${
                    siteConfig.domain
                  }" style="color:${BRAND};text-decoration:none;">masajgo.md</a><br />
                  ${escape(siteConfig.address.street)}, ${escape(siteConfig.address.locality)} · ${escape(
                    siteConfig.phone,
                  )}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderEmailText(payload: LeadPayload): string {
  const lines: string[] = [];
  lines.push(`MasajGO — ${payload.subject}`);
  lines.push("=".repeat(48));
  lines.push("");
  for (const f of payload.fields) {
    if (!f.value || !f.value.trim()) continue;
    lines.push(`${f.label}: ${f.value}`);
  }
  lines.push("");
  lines.push(`Site: ${siteConfig.domain}`);
  return lines.join("\n");
}

export async function sendLeadEmail(payload: LeadPayload): Promise<{ ok: boolean; reason?: string }> {
  const transport = getTransport();
  if (!transport) {
    console.warn("[email] SMTP not configured — logging payload only", {
      subject: payload.subject,
      fields: payload.fields,
    });
    return { ok: true, reason: "smtp-not-configured" };
  }

  const from = process.env.SMTP_FROM ?? `MasajGO <${process.env.SMTP_USER}>`;
  const to = process.env.SMTP_TO ?? siteConfig.email;

  try {
    await transport.sendMail({
      from,
      to,
      subject: `[MasajGO] ${payload.subject}`,
      text: renderEmailText(payload),
      html: renderEmailHtml(payload),
      replyTo: payload.replyTo,
    });
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed", err);
    return { ok: false, reason: err instanceof Error ? err.message : "unknown" };
  }
}
