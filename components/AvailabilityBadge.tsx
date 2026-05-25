import type { Dictionary } from "@/lib/i18n";

interface Props {
  available: boolean;
  dict: Dictionary;
  size?: "sm" | "md";
}

export function AvailabilityBadge({ available, dict, size = "sm" }: Props) {
  const dotCls = "relative inline-flex h-2 w-2 rounded-full";
  const padding = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";
  if (available) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-emerald-50 font-medium text-emerald-700 ring-1 ring-emerald-200/80 ${padding}`}
      >
        <span className={dotCls}>
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {dict.products.available}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-red-50 font-medium text-red-700 ring-1 ring-red-200/80 ${padding}`}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
      {dict.products.unavailable}
    </span>
  );
}
