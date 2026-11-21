/**
 * Renders a tiny markup used in the data files:
 *   *italic*      → serif italic
 *   ==signal==    → accent colour
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*|==[^=]+==)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*"))
          return (
            <em key={i} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        if (part.startsWith("==") && part.endsWith("=="))
          return (
            <span key={i} className="text-signal-ink">
              {part.slice(2, -2)}
            </span>
          );
        return part;
      })}
    </>
  );
}
