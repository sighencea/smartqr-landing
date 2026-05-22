/**
 * Centered content column with hairline side rails. Every section reuses it
 * so the vertical lines run continuously down the page — an archival,
 * blueprint-like frame around the content.
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-content border-x border-line px-6 sm:px-10 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
