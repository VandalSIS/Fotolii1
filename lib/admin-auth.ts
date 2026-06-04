import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "masajgo_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 zile

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

function makeToken(): string {
  const secret = getSecret();
  return createHmac("sha256", secret).update("masajgo-admin-session").digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  const expected = makeToken();
  try {
    const a = Buffer.from(cookie, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function signIn(password: string): Promise<boolean> {
  const secret = getSecret();
  if (!secret) return false;
  if (password !== secret) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
  return true;
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
