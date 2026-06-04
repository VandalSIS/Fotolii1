"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { updateStockAction } from "./actions";
import type { StockState } from "@/lib/stock";

interface Row {
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: string;
  state: StockState;
}

const OPTIONS: { value: StockState; label: string; tone: string }[] = [
  { value: "in", label: "În stoc", tone: "data-[active=true]:bg-emerald-500 data-[active=true]:text-white" },
  { value: "soon", label: "În curând", tone: "data-[active=true]:bg-amber-500 data-[active=true]:text-white" },
  { value: "out", label: "Epuizat", tone: "data-[active=true]:bg-red-500 data-[active=true]:text-white" },
];

export function StockTable({ rows }: { rows: Row[] }) {
  const [states, setStates] = useState<Record<string, StockState>>(
    Object.fromEntries(rows.map((r) => [r.slug, r.state])),
  );
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const setState = (slug: string, value: StockState) => {
    setStates((prev) => ({ ...prev, [slug]: value }));
    const original = rows.find((r) => r.slug === slug)?.state;
    setDirty((prev) => {
      const next = new Set(prev);
      if (value === original) next.delete(slug);
      else next.add(slug);
      return next;
    });
    setFeedback(null);
  };

  const save = () => {
    if (dirty.size === 0 || pending) return;
    const fd = new FormData();
    for (const slug of dirty) fd.append(`stock:${slug}`, states[slug]);

    startTransition(async () => {
      const res = await updateStockAction(fd);
      if (res.ok) {
        setFeedback({ kind: "ok", text: `Salvat ${dirty.size} produs(e). Schimbările apar pe site în câteva secunde.` });
        setDirty(new Set());
      } else {
        setFeedback({ kind: "err", text: `Eroare: ${res.error ?? "necunoscută"}` });
      }
    });
  };

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-ink-900/10 bg-white shadow-sm shadow-ink-900/5">
        <ul className="divide-y divide-ink-900/8">
          {rows.map((r) => (
            <li key={r.slug} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                  <Image src={r.image} alt={r.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base text-ink-900">{r.name}</p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {r.category === "massage" ? "Fotoliu masaj" : "Mobilier barber"} · {r.price}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {OPTIONS.map((opt) => {
                  const active = states[r.slug] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setState(r.slug, opt.value)}
                      data-active={active}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        active
                          ? "border-transparent shadow-sm"
                          : "border-ink-900/15 bg-white text-ink-700 hover:border-ink-900/40"
                      } ${opt.tone}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-4 mt-6 flex flex-col items-stretch gap-3 rounded-2xl border border-ink-900/10 bg-white/95 p-4 shadow-xl shadow-ink-900/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-ink-700">
          {dirty.size === 0 ? (
            <span className="text-ink-500">Toate modificările sunt salvate.</span>
          ) : (
            <span>
              <strong className="font-semibold text-ink-900">{dirty.size}</strong> modificare(i) nesalvată(e).
            </span>
          )}
          {feedback && (
            <span
              className={`ml-2 inline-flex items-center text-xs ${
                feedback.kind === "ok" ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {feedback.text}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={save}
          disabled={dirty.size === 0 || pending}
          className="btn-primary self-stretch sm:self-auto"
        >
          {pending ? "Se salvează..." : "Salvează modificările"}
        </button>
      </div>
    </div>
  );
}
