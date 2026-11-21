/** Reads the live theme tokens for canvas drawing (canvas can't use CSS vars). */
export type CanvasPalette = {
  ink: string;
  inkSoft: string;
  muted: string;
  line: string;
  signal: string;
  paper: string;
  card: string;
  mono: string;
  dark: boolean;
};

export function readCanvasPalette(): CanvasPalette {
  const styles = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    ink: get("--ink", "#121211"),
    inkSoft: get("--ink-soft", "#3a3934"),
    muted: get("--muted", "#6b675e"),
    line: get("--line", "#d9d4c7"),
    signal: get("--signal", "#e8492a"),
    paper: get("--paper", "#f1eee6"),
    card: get("--card", "#f7f5ef"),
    mono: get("--font-geist-mono", "ui-monospace, monospace"),
    dark: document.documentElement.classList.contains("dark"),
  };
}

/** Deterministic PRNG so illustrations look the same on every load. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
