"use client";

import { useEffect, useRef, useState } from "react";
import { TOAST } from "@/lib/events";

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 2200);
    };
    window.addEventListener(TOAST, onToast);
    return () => {
      window.removeEventListener(TOAST, onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 transition-all duration-500 ease-out-expo ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {message ? (
        <span className="flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 font-mono text-[12px] text-paper shadow-lg">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden />
          {message}
        </span>
      ) : null}
    </div>
  );
}
