/**
 * Theme lives on <html class="dark">. An inline script in the root layout sets
 * it before first paint; this module is the client-side store + toggle.
 */
export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;
let media: MediaQueryList | null = null;

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function onSystemChange(event: MediaQueryListEvent) {
  // Follow the OS only until the visitor makes an explicit choice.
  if (!storedTheme()) applyTheme(event.matches ? "dark" : "light", false);
}

export function subscribeTheme(callback: () => void) {
  listeners.add(callback);
  if (!observer) {
    observer = new MutationObserver(() => listeners.forEach((listener) => listener()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onSystemChange);
  }
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0) {
      observer?.disconnect();
      media?.removeEventListener("change", onSystemChange);
      observer = null;
      media = null;
    }
  };
}

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode: the choice just won't persist */
    }
  }
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/** Toggle with a circular reveal that grows from `origin` (viewport px). */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  const doc = document as ViewTransitionDocument;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof doc.startViewTransition !== "function" || reduce) {
    applyTheme(next);
    return;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 32;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = doc.startViewTransition(() => applyTheme(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.7, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {
      /* transition skipped — the theme has still been applied */
    });
}

/** Inline, render-blocking script: sets theme + `js` class before paint. */
export const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('${STORAGE_KEY}');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){d.classList.add('dark')}}catch(e){}})();`;
