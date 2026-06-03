"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

interface Props {
  productName: string;
  productPrice?: string;
  disabled?: boolean;
  dict: Dictionary;
  buttonLabel?: string;
  buttonClassName?: string;
  buttonContent?: ReactNode;
}

export function OrderModal({
  productName,
  productPrice,
  disabled,
  dict,
  buttonLabel,
  buttonClassName = "btn-primary",
  buttonContent,
}: Props) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "ru" ? "ru" : "ro";
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(
      ["name", "address", "phone"].map((k) => [k, String(fd.get(k) ?? "")]),
    );

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          locale,
          productName,
          productPrice,
          honeypot: String(fd.get("company") ?? ""),
          data,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error("send-failed");
      setStatus("sent");
      form.reset();
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1800);
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none ring-brand-400/30 transition focus:border-brand-500 focus:ring-4";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} disabled={disabled} className={buttonClassName}>
        {buttonContent ?? (
          <>
            {buttonLabel ?? dict.product.orderNow}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink-900/65 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-2xl shadow-ink-900/40 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.product.orderClose}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-600 transition hover:bg-ink-900/5 hover:text-ink-900"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-700">
                <span className="h-px w-6 bg-brand-400" />
                {dict.product.orderTitle}
              </span>
              <h3 className="font-display text-2xl font-normal text-ink-900">{productName}</h3>
              <p className="mt-1 text-sm text-ink-600">{dict.product.orderSubtitle}</p>
              {productPrice && (
                <p className="mt-2 font-display text-xl text-brand-700">{productPrice}</p>
              )}

              <form onSubmit={onSubmit} className="mt-6 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-ink-600">{dict.product.orderName}</span>
                  <input name="name" required autoComplete="name" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-ink-600">{dict.product.orderAddress}</span>
                  <input name="address" required autoComplete="street-address" className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-ink-600">{dict.product.orderPhone}</span>
                  <input name="phone" required type="tel" autoComplete="tel" placeholder="+373 ..." className={inputCls} />
                </label>

                <div aria-hidden className="hidden">
                  <label>
                    Company
                    <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 w-full">
                  {status === "sending"
                    ? locale === "ru"
                      ? "Отправка..."
                      : "Se trimite..."
                    : status === "sent"
                    ? dict.contact.sent
                    : dict.product.orderSubmit}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
                {status === "error" && (
                  <p className="text-center text-sm text-red-600">{dict.contact.error}</p>
                )}
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full"
                >
                  {dict.product.whatsappOrder}
                </a>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
