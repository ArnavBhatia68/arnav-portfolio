"use client";

import { useEffect, useRef } from "react";

function format(n: number, decimals: number, prefix: string, suffix: string) {
  return `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
}

/**
 * Server-renders the final value (so it's always correct without JS), then
 * counts up from zero the first time it scrolls into view.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it alone rather than flashing to zero.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    el.textContent = format(0, decimals, prefix, suffix);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1700;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = format(value * eased, decimals, prefix, suffix);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value, decimals, prefix, suffix);
    };
  }, [value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(value, decimals, prefix, suffix)}
    </span>
  );
}
