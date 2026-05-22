import { ArrowRight, ArrowDown } from "lucide-react";

type Variant = "primary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] transition-all duration-300";

const variants: Record<Variant, string> = {
  primary:
    "border border-accent/30 bg-accent/[0.06] text-accent hover:border-accent/60 hover:bg-accent/[0.1] hover:shadow-[0_0_46px_-10px_rgba(121,230,216,0.55)]",
  ghost:
    "border border-line text-muted hover:border-line-strong hover:text-ink",
};

/**
 * Pill call-to-action link. Renders a plain anchor so it works for both
 * placeholder routes (/signup) and in-page anchors (#how-it-works).
 */
export function CtaButton({
  href,
  children,
  variant = "primary",
  ariaLabel,
  icon = "arrow",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  ariaLabel?: string;
  icon?: "arrow" | "down" | "none";
}) {
  return (
    <a href={href} aria-label={ariaLabel} className={`${base} ${variants[variant]}`}>
      {children}
      {icon === "arrow" && (
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
      {icon === "down" && (
        <ArrowDown
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
