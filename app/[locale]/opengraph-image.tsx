import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/i18n";
import { siteConfig, type Locale } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#1a1410",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(214,160,67,0.25), transparent 55%), radial-gradient(circle at 85% 85%, rgba(214,160,67,0.18), transparent 55%)",
          color: "#f9f1e1",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg,#e6c074,#a36e1f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "#1a1410",
            }}
          >
            M
          </div>
          <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: -1, color: "#f9f1e1" }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 20,
              color: "#e6c074",
              textTransform: "uppercase",
              letterSpacing: 6,
            }}
          >
            {dict.home.eyebrow}
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 400,
              letterSpacing: -2,
              lineHeight: 1.02,
              maxWidth: 980,
              color: "#f9f1e1",
            }}
          >
            {dict.home.heroTitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#b8a583",
          }}
        >
          <span>{siteConfig.domain.replace("https://", "")}</span>
          <span>{siteConfig.phone}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
