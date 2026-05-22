/**
 * Monospace section eyebrow: an index number, a tick, and a short label.
 */
export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
      <span className="text-accent/80">{index}</span>
      <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
