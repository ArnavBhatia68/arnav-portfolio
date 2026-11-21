"use client";

import { copyText } from "@/lib/events";

export function CopyButton({ value, label = "Copy", toastMessage, className = "" }: { value: string; label?: string; toastMessage?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => copyText(value, toastMessage)}
      className={`inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft transition-colors hover:border-ink hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3.5 10.5h-.5A1.5 1.5 0 0 1 1.5 9V3A1.5 1.5 0 0 1 3 1.5h6A1.5 1.5 0 0 1 10.5 3v.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      {label}
    </button>
  );
}
