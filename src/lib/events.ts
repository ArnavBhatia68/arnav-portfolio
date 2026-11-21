/** Tiny window-event bus so unrelated client components can talk. */
export const PALETTE_OPEN = "palette:open";
export const TOAST = "toast:show";

export function openPalette() {
  window.dispatchEvent(new Event(PALETTE_OPEN));
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST, { detail: message }));
}

export async function copyText(text: string, message = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    toast(message);
  } catch {
    toast("Couldn’t copy — select it manually");
  }
}

/** Smooth-scroll to a section on the home page, or navigate there. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? "/" : `/#${id}`);
  return true;
}
