import { cn } from "@/lib/utils";

interface EclipseLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/** Single canonical Eclipse mark. Replaces PixelLogo + Logo pixel engines. */
const EclipseLogo = ({ size = 32, showText = true, className }: EclipseLogoProps) => (
  <span className={cn("inline-flex items-center gap-2.5", className)}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Eclipse"
      className="shrink-0"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="13" r="8" fill="hsl(var(--background))" />
      <circle
        cx="21"
        cy="13"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="38 14"
        strokeLinecap="round"
        transform="rotate(35 21 13)"
      />
    </svg>
    {showText && (
      <span className="font-display text-lg font-semibold tracking-tight">
        Eclipse
      </span>
    )}
  </span>
);

export default EclipseLogo;
