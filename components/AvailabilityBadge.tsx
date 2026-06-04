import type { Dictionary } from "@/lib/i18n";
import type { StockState } from "@/lib/stock";

interface Props {
  state: StockState;
  dict: Dictionary;
  size?: "sm" | "md";
}

const palettes: Record<StockState, { bg: string; text: string; ring: string; dot: string; ping?: string }> = {
  in: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200/80",
    dot: "bg-emerald-500",
    ping: "bg-emerald-400/60",
  },
  out: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-200/80",
    dot: "bg-red-500",
  },
  soon: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200/80",
    dot: "bg-amber-500",
    ping: "bg-amber-400/60",
  },
};

export function AvailabilityBadge({ state, dict, size = "sm" }: Props) {
  const palette = palettes[state];
  const padding = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";
  const label =
    state === "in" ? dict.products.available : state === "out" ? dict.products.unavailable : dict.products.comingSoon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium ring-1 ${palette.bg} ${palette.text} ${palette.ring} ${padding}`}
    >
      <span className="relative inline-flex h-2 w-2 rounded-full">
        {palette.ping && <span className={`absolute inset-0 animate-ping rounded-full ${palette.ping}`} />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${palette.dot}`} />
      </span>
      {label}
    </span>
  );
}
