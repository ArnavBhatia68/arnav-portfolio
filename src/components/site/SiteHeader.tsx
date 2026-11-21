"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { navSections, sections } from "@/data/site";
import { openPalette, scrollToSection } from "@/lib/events";
import { LocalTime } from "./LocalTime";
import { ThemeToggle } from "./ThemeToggle";

const navItems = navSections.map((id) => sections.find((section) => section.id === id)!);

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const mac = useSyncExternalStore(noop, isMac, () => true);

  // Scrolled / hidden state + reading progress, written straight to the DOM.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--progress", String(max > 0 ? Math.min(1, y / max) : 0));
      el.dataset.scrolled = String(y > 12);
      if (y > lastY + 6 && y > 320) el.dataset.hidden = "true";
      else if (y < lastY - 6 || y <= 320) el.dataset.hidden = "false";
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Highlight the section crossing the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const targets = ["top", ...sections.map((section) => section.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const current = isHome ? active : null;

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      data-hidden="false"
      className="group/header fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo data-[hidden=true]:-translate-y-full focus-within:translate-y-0"
    >
      <div
        aria-hidden
        className="absolute inset-0 border-b border-transparent bg-paper/0 transition-[background-color,border-color,backdrop-filter] duration-500 group-data-[scrolled=true]/header:border-line group-data-[scrolled=true]/header:bg-paper/80 group-data-[scrolled=true]/header:backdrop-blur-md"
      />

      <div className="shell relative flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={(event) => {
            if (isHome && scrollToSection("top")) event.preventDefault();
          }}
          className="group flex items-baseline gap-2 font-serif text-[22px] leading-none tracking-[-0.01em]"
        >
          Arnav Bhatia
          <span className="pulse-dot -translate-y-[3px] scale-75" aria-hidden />
        </Link>

        <nav aria-label="Sections" className="hidden items-center md:flex">
          {navItems.map((item) => {
            const isActive = current === item.id;
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => {
                  if (isHome && scrollToSection(item.id)) event.preventDefault();
                }}
                className="group relative flex items-baseline gap-1.5 px-3 py-2 text-[13.5px] text-ink-soft transition-colors hover:text-ink aria-[current=location]:text-ink"
              >
                <span className="font-mono text-[9.5px] text-muted transition-colors group-aria-[current=location]:text-signal-ink">
                  {item.index}
                </span>
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current=location]:scale-x-100"
                />
              </Link>
            );
          })}
          <Link
            href="/records"
            aria-current={pathname === "/records" ? "page" : undefined}
            className="group relative px-3 py-2 text-[13.5px] text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
          >
            Records
            <span
              aria-hidden
              className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
            />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span className="label mr-2 hidden items-center gap-2 lg:flex">
            Tempe <LocalTime className="tabular text-ink-soft" />
          </span>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-[11px] text-ink-soft transition-colors hover:border-ink hover:text-ink md:flex"
          >
            <kbd className="font-mono">{mac ? "⌘" : "Ctrl"}</kbd>
            <kbd className="font-mono">K</kbd>
          </button>
          <button
            type="button"
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-full border border-line px-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink md:hidden"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-px w-3.5 bg-current" />
              <span className="block h-px w-3.5 bg-current" />
            </span>
            Menu
          </button>
          <ThemeToggle />
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-signal opacity-0 transition-opacity group-data-[scrolled=true]/header:opacity-100"
        style={{ transform: "scaleX(var(--progress, 0))" }}
      />
    </header>
  );
}
