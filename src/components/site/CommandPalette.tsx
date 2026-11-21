"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { sections } from "@/data/site";
import { copyText, PALETTE_OPEN, scrollToSection } from "@/lib/events";
import { toggleTheme } from "@/lib/theme";

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
};

function matches(command: Command, query: string) {
  const haystack = `${command.label} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const show = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActiveIndex(0);
    dialog.showModal();
    // Only grab focus for the text field on devices with a keyboard-ish pointer,
    // so phones don't throw up the on-screen keyboard just to open the menu.
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_OPEN, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_OPEN, show);
    };
  }, [show, close]);

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      if (pathname === "/" && scrollToSection(id)) return;
      router.push(`/#${id}`);
    };
    const open = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

    return [
      ...sections.map((section) => ({
        id: `section-${section.id}`,
        group: "Navigate",
        label: section.id === "work" ? "Selected work" : section.label,
        hint: section.index,
        keywords: "section go jump",
        run: goTo(section.id),
      })),
      { id: "page-records", group: "Navigate", label: "Records", hint: "page", keywords: "certificates documents letters", run: () => router.push("/records") },
      ...projects.map((project) => ({
        id: `work-${project.id}`,
        group: "Case studies",
        label: project.title,
        hint: project.category,
        keywords: `${project.tags.join(" ")} ${project.organization ?? ""} project`,
        run: () => router.push(`/work/${project.id}`),
      })),
      { id: "doc-resume", group: "Documents", label: "Open résumé", hint: "PDF", keywords: "resume cv", run: open(profile.resumePath) },
      {
        id: "doc-resume-download",
        group: "Documents",
        label: "Download résumé",
        hint: "PDF",
        keywords: "resume cv save",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resumePath;
          a.download = "ArnavBhatia_Resume.pdf";
          a.click();
        },
      },
      { id: "doc-transcript", group: "Documents", label: "Open transcript", hint: "PDF", keywords: "grades gpa", run: open(profile.transcriptPath) },
      {
        id: "action-copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        keywords: "contact mail",
        run: () => copyText(profile.email, "Email copied"),
      },
      {
        id: "action-theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        hint: "theme",
        keywords: "dark light mode appearance",
        run: () => toggleTheme(),
      },
      { id: "link-github", group: "Elsewhere", label: "GitHub", hint: "↗", keywords: "code repos", run: open(profile.github) },
      { id: "link-linkedin", group: "Elsewhere", label: "LinkedIn", hint: "↗", keywords: "profile", run: open(profile.linkedin) },
      { id: "link-email", group: "Elsewhere", label: "Write an email", hint: "↗", keywords: "contact mailto", run: () => (window.location.href = `mailto:${profile.email}`) },
    ];
  }, [pathname, router]);

  const results = useMemo(() => (query.trim() ? commands.filter((c) => matches(c, query)) : commands), [commands, query]);
  const safeIndex = Math.min(activeIndex, Math.max(0, results.length - 1));
  const activeId = results[safeIndex] ? `cmd-${results[safeIndex].id}` : undefined;

  useEffect(() => {
    if (!activeId) return;
    listRef.current?.querySelector(`#${CSS.escape(activeId)}`)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const run = (command: Command) => {
    close();
    // Let the dialog close (and restore focus) before navigating or toggling.
    requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((safeIndex + 1) % Math.max(1, results.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((safeIndex - 1 + results.length) % Math.max(1, results.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[safeIndex];
      if (command) run(command);
    }
  };

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      className="palette m-0 mx-auto mt-[12vh] w-[min(640px,calc(100vw-24px))] max-w-none overflow-visible bg-transparent p-0 text-ink backdrop:bg-transparent"
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg viewBox="0 0 20 20" className="size-4 flex-none text-muted" aria-hidden>
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            placeholder="Jump to a section, project or document…"
            className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
          />
          <button type="button" onClick={close} className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-muted hover:text-ink">
            esc
          </button>
        </div>

        <ul ref={listRef} id="palette-list" role="listbox" aria-label="Commands" className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 ? (
            <li className="px-3 py-10 text-center text-[14px] text-muted">Nothing matches “{query}”.</li>
          ) : null}
          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            const selected = index === safeIndex;
            return (
              <li key={command.id} role="presentation">
                {showGroup ? <p className="label px-3 pb-1.5 pt-3 first:pt-1">{command.group}</p> : null}
                <div
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => run(command)}
                  className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2 text-[14.5px] text-ink-soft aria-selected:bg-ink aria-selected:text-paper"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden className={`size-1.5 rounded-full ${selected ? "bg-signal" : "bg-line-strong"}`} />
                    {command.label}
                  </span>
                  {command.hint ? (
                    <span className={`truncate font-mono text-[11px] ${selected ? "text-paper/70" : "text-muted"}`}>{command.hint}</span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10.5px] text-muted sm:flex">
          <span>↑↓ move</span>
          <span>↵ select</span>
          <span>esc close</span>
          <span className="ml-auto">⌘K to toggle</span>
        </div>
      </div>
    </dialog>
  );
}
