import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/admin-auth";
import { products, formatPrice } from "@/lib/products";
import { getStockMap, type StockState } from "@/lib/stock";
import { logoutAction } from "./actions";
import { StockTable } from "./StockTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const stockMap = await getStockMap();
  const rows = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    image: p.image,
    price: p.price ? formatPrice(p.price, "ro") : "La cerere",
    state: (stockMap[p.slug] ?? "in") as StockState,
  }));

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.state] += 1;
      return acc;
    },
    { in: 0, out: 0, soon: 0 } as Record<StockState, number>,
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-100 to-cream-50">
      <header className="border-b border-ink-900/10 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">MasajGO Admin</p>
            <h1 className="mt-1 font-display text-2xl font-normal tracking-tight text-ink-900">Gestionare stocuri</h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-ink-900/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink-700 transition hover:border-ink-900/40 hover:bg-white"
            >
              Ieși
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="În stoc" value={counts.in} tone="emerald" />
          <StatCard label="În curând" value={counts.soon} tone="amber" />
          <StatCard label="Epuizate" value={counts.out} tone="red" />
        </div>

        <StockTable rows={rows} />

        <p className="mt-6 text-xs text-ink-500">
          Modificările apar pe site în maxim 60 de secunde (cache automat). Hard refresh ({" "}
          <kbd className="rounded border border-ink-900/20 bg-white px-1.5 py-0.5 font-mono text-[10px]">Cmd + Shift + R</kbd>
          ) le afișează instant.
        </p>
      </section>
    </main>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: "emerald" | "amber" | "red" }) {
  const palette = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200/70" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200/70" },
    red: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200/70" },
  }[tone];
  return (
    <div className={`rounded-2xl px-5 py-4 ring-1 ${palette.bg} ${palette.ring}`}>
      <p className={`text-[11px] font-medium uppercase tracking-[0.16em] ${palette.text}`}>{label}</p>
      <p className={`mt-1 font-display text-3xl font-normal ${palette.text}`}>{value}</p>
    </div>
  );
}
