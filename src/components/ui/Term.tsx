/** Hover / long-press for a one-line weather glossary hint (uses native tooltip). */
export function Term({ children, hint }: { children: React.ReactNode; hint: string }) {
  return (
    <abbr title={hint} className="cursor-help border-b border-dotted border-[var(--dim)] underline-offset-2">
      {children}
    </abbr>
  );
}
