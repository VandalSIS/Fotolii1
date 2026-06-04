"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn, signOut, isAuthed } from "@/lib/admin-auth";
import { setStockBulk, STOCK_STATES, type StockState } from "@/lib/stock";

export async function loginAction(formData: FormData): Promise<{ error?: string } | void> {
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  if (!ok) return { error: "Parolă incorectă" };
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/admin/login");
}

export async function updateStockAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAuthed())) return { ok: false, error: "unauthorized" };

  const updates: Record<string, StockState> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("stock:")) continue;
    const slug = key.slice("stock:".length);
    const state = String(value) as StockState;
    if (STOCK_STATES.includes(state)) updates[slug] = state;
  }
  if (Object.keys(updates).length === 0) return { ok: true };

  try {
    await setStockBulk(updates);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (err) {
    console.error("[admin] setStockBulk failed", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
