"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { Dictionary } from "@/lib/i18n";

interface Props {
  dict: Dictionary;
}

export function ContactForm({ dict }: Props) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "ru" ? "ru" : "ro";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(
      ["name", "phone", "email", "message"].map((k) => [k, String(fd.get(k) ?? "")]),
    );

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          locale,
          honeypot: String(fd.get("company") ?? ""),
          data,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error("send-failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-cream-300 bg-white/80 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none ring-brand-500/20 transition focus:border-brand-500 focus:bg-white focus:ring-4";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-800">{dict.contact.name}</span>
          <input name="name" required className={inputCls} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-800">{dict.contact.phone}</span>
          <input name="phone" type="tel" required className={inputCls} autoComplete="tel" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-800">{dict.contact.email}</span>
        <input name="email" type="email" className={inputCls} autoComplete="email" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-800">{dict.contact.message}</span>
        <textarea name="message" required rows={5} className={`${inputCls} resize-none`} />
      </label>

      <div aria-hidden className="hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? (locale === "ru" ? "Отправка..." : "Se trimite...") : dict.contact.send}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
      {status === "sent" && <p className="text-sm text-emerald-700">{dict.contact.sent}</p>}
      {status === "error" && <p className="text-sm text-red-600">{dict.contact.error}</p>}
    </form>
  );
}
