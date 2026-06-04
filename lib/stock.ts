import "server-only";
import { createClient, type RedisClientType } from "redis";
import { unstable_cache, revalidateTag } from "next/cache";
import { products } from "./products";

export type StockState = "in" | "out" | "soon";

export const STOCK_STATES: readonly StockState[] = ["in", "out", "soon"] as const;

const REDIS_KEY = "masajgo:stock:v1";
const CACHE_TAG = "stock";

type RedisGlobal = typeof globalThis & {
  __masajgoRedis?: RedisClientType;
  __masajgoRedisConnecting?: Promise<RedisClientType>;
};

const g = globalThis as RedisGlobal;

async function getRedis(): Promise<RedisClientType | null> {
  const url = process.env.KV_REDIS_URL ?? process.env.REDIS_URL;
  if (!url) return null;

  if (g.__masajgoRedis && g.__masajgoRedis.isOpen) return g.__masajgoRedis;
  if (g.__masajgoRedisConnecting) return g.__masajgoRedisConnecting;

  g.__masajgoRedisConnecting = (async () => {
    const client = createClient({
      url,
      socket: { reconnectStrategy: (retries) => Math.min(retries * 100, 2000) },
    }) as RedisClientType;
    client.on("error", (err) => console.warn("[redis] client error", err));
    await client.connect();
    g.__masajgoRedis = client;
    g.__masajgoRedisConnecting = undefined;
    return client;
  })();

  try {
    return await g.__masajgoRedisConnecting;
  } catch (err) {
    console.warn("[redis] connect failed", err);
    g.__masajgoRedisConnecting = undefined;
    return null;
  }
}

function defaultStockMap(): Record<string, StockState> {
  const map: Record<string, StockState> = {};
  for (const p of products) {
    map[p.slug] = p.available ? "in" : "out";
  }
  return map;
}

async function fetchStockFromRedis(): Promise<Record<string, StockState>> {
  const fallback = defaultStockMap();
  const client = await getRedis();
  if (!client) return fallback;
  try {
    const data = await client.hGetAll(REDIS_KEY);
    if (!data || Object.keys(data).length === 0) return fallback;
    const sanitized: Record<string, StockState> = {};
    for (const [slug, raw] of Object.entries(data)) {
      if (STOCK_STATES.includes(raw as StockState)) sanitized[slug] = raw as StockState;
    }
    return { ...fallback, ...sanitized };
  } catch (err) {
    console.warn("[stock] redis read failed, using defaults", err);
    return fallback;
  }
}

const cachedStockMap = unstable_cache(fetchStockFromRedis, ["stock-map"], {
  tags: [CACHE_TAG],
  revalidate: 60,
});

export async function getStockMap(): Promise<Record<string, StockState>> {
  return cachedStockMap();
}

export async function getStockForSlug(slug: string): Promise<StockState> {
  const map = await getStockMap();
  return (map[slug] ?? "in") as StockState;
}

export async function setStockBulk(updates: Record<string, StockState>): Promise<void> {
  const client = await getRedis();
  if (!client) throw new Error("redis-not-configured");
  const sanitized: Record<string, string> = {};
  for (const [slug, state] of Object.entries(updates)) {
    if (!STOCK_STATES.includes(state)) continue;
    sanitized[slug] = state;
  }
  if (Object.keys(sanitized).length === 0) return;
  await client.hSet(REDIS_KEY, sanitized);
  revalidateTag(CACHE_TAG);
}

export async function setStock(slug: string, state: StockState): Promise<void> {
  await setStockBulk({ [slug]: state });
}

export function isAvailableFromStock(state: StockState): boolean {
  return state === "in";
}
