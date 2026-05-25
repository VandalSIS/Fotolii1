import { products, formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description.ro}`);
  lines.push("");
  lines.push("## About");
  lines.push(
    `${siteConfig.name} este distribuitor de fotolii de masaj premium Leercon și mobilier profesional pentru saloane barber în Chișinău, Republica Moldova. Oferim consultanță gratuită, livrare în toată țara, instalare și garanție oficială.`,
  );
  lines.push("");
  lines.push("## Contact");
  lines.push(`- Phone: ${siteConfig.phone}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- Address: ${siteConfig.address.street}, ${siteConfig.address.locality}, Moldova`);
  lines.push(`- Facebook: ${siteConfig.social.facebook}`);
  lines.push("");
  lines.push("## Pages");
  lines.push(`- [Home (RO)](${siteConfig.domain}/ro)`);
  lines.push(`- [Home (RU)](${siteConfig.domain}/ru)`);
  lines.push(`- [Products (RO)](${siteConfig.domain}/ro/produse)`);
  lines.push(`- [Products (RU)](${siteConfig.domain}/ru/produse)`);
  lines.push(`- [About (RO)](${siteConfig.domain}/ro/despre)`);
  lines.push(`- [Contact (RO)](${siteConfig.domain}/ro/contact)`);
  lines.push("");
  lines.push("## Products");
  for (const p of products) {
    lines.push(
      `- ${p.name} — ${formatPrice(p.price, "ro")} — ${p.shortDescription.ro} (${siteConfig.domain}/ro/produse/${p.slug})`,
    );
  }
  lines.push("");
  lines.push("## Categories");
  lines.push("- Fotolii de masaj (massage chairs): Leercon 4D, SL, Zero Gravity");
  lines.push("- Mobilier barber (barber furniture): scaune barber, scaune spălare cap");

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
