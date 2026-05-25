"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

interface Props {
  dict: Dictionary;
}

export function BookTestForm({ dict }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fields = ["name", "phone", "email", "product", "date", "time", "message"];
    const body = fields
      .map((k) => `${k}: ${String(fd.get(k) ?? "-")}`)
      .join("%0A");
    const subject = encodeURIComponent(`${siteConfig.name} — Programare test`);
    setStatus("sending");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${encodeURIComponent(
      "Programare test gratuit:\n\n",
    )}${body}`;
    setStatus("sent");
  };

  const inputCls =
    "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none ring-brand-400/30 transition focus:border-brand-500 focus:ring-4";

  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-600";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>{dict.bookTest.name}</span>
          <input name="name" required autoComplete="name" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>{dict.bookTest.phone}</span>
          <input name="phone" type="tel" required autoComplete="tel" placeholder="+373 ..." className={inputCls} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>{dict.bookTest.email}</span>
        <input name="email" type="email" autoComplete="email" className={inputCls} />
      </label>

      <label className="block">
        <span className={labelCls}>{dict.bookTest.product}</span>
        <select name="product" className={inputCls} defaultValue="">
          <option value="">—</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>{p.name}</option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>{dict.bookTest.date}</span>
          <input name="date" type="date" required className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>{dict.bookTest.time}</span>
          <input name="time" type="time" className={inputCls} />
        </label>
      </div>

      <label className="block">
        <span className={labelCls}>{dict.bookTest.message}</span>
        <textarea name="message" rows={4} className={`${inputCls} resize-none`} />
      </label>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
        {dict.bookTest.submit}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
      {status === "sent" && (
        <p className="text-sm text-emerald-700">{dict.bookTest.sent}</p>
      )}
    </form>
  );
}
