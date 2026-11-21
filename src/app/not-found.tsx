import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[88svh] place-items-center pb-16 pt-[calc(var(--header-h)+24px)] text-center">
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 120 80" className="hero-fade w-40 text-ink" aria-hidden>
          <g className="origin-center animate-[drift_4s_ease-in-out_infinite] motion-reduce:animate-none">
            <line x1="38" y1="30" x2="82" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="34" cy="30" rx="12" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="86" cy="30" rx="12" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="60" cy="30" r="4" fill="currentColor" />
            <line x1="60" y1="34" x2="60" y2="58" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            <rect x="53" y="58" width="14" height="10" className="fill-signal" />
          </g>
        </svg>
        <p className="hero-fade label mt-8 [--d:100ms]">Error 404 · Signal lost</p>
        <h1 className="display mt-6 text-[clamp(4rem,13vw,11rem)] leading-[0.85] tracking-[-0.04em]">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <span className="hero-rise [--d:120ms]">
              Out of <em className="italic">bounds</em>
            </span>
          </span>
        </h1>
        <p className="hero-fade mt-8 max-w-md text-pretty text-[17px] leading-relaxed text-ink-soft [--d:300ms]">
          This page drifted outside the workspace. The rest of the formation is holding position back at base.
        </p>
        <Link
          href="/"
          className="hero-fade mt-10 inline-flex h-11 items-center gap-3 rounded-full bg-ink pl-5 pr-4 text-[14px] text-paper [--d:400ms]"
        >
          Return to base
          <span className="grid size-6 place-items-center rounded-full bg-signal text-on-signal">→</span>
        </Link>
      </div>
    </section>
  );
}
