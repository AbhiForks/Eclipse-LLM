import { useMemo } from "react";
import { cn } from "@/lib/utils";

const PALETTES = [
  "from-zinc-800 via-neutral-900 to-black",
  "from-stone-800 via-stone-900 to-black",
  "from-neutral-700 via-zinc-900 to-black",
  "from-zinc-900 via-stone-900 to-black",
];

/** Classy deterministic fallback art — replaces ugly placeholder PNGs. */
const SourceArt = ({
  source,
  className,
}: {
  source: string;
  className?: string;
}) => {
  const palette = useMemo(() => {
    let h = 0;
    for (let i = 0; i < source.length; i++) h = (h * 31 + source.charCodeAt(i)) >>> 0;
    return PALETTES[h % PALETTES.length];
  }, [source]);

  const initials = useMemo(
    () =>
      source
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase() || "E",
    [source],
  );

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        palette,
        className,
      )}
    >
      <span className="font-display text-2xl font-semibold tracking-tight text-white/80">
        {initials}
      </span>
    </div>
  );
};

export default SourceArt;
