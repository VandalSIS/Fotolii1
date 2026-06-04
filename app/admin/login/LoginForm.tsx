"use client";

import { useState, useTransition } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await loginAction(fd);
          if (res && "error" in res && res.error) setError(res.error);
        });
      }}
      className="space-y-4 rounded-3xl border border-ink-900/10 bg-white p-7 shadow-xl shadow-ink-900/10"
    >
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-600">Parolă</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-xl border border-ink-900/15 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none ring-brand-400/30 transition focus:border-brand-500 focus:ring-4"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Se verifică..." : "Intră în panou"}
      </button>
    </form>
  );
}
