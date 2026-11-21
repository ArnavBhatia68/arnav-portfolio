"use client";

import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => null);
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className={`group grid size-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink ${className}`}
    >
      <svg viewBox="0 0 20 20" className="size-[17px] transition-transform duration-700 ease-out-expo dark:rotate-180" aria-hidden>
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
