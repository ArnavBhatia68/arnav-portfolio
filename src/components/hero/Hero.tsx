import { hero, profile } from "@/data/profile";
import { FlightDeck } from "./FlightDeck";

function Intro() {
  return (
    <div className="flex max-w-[34rem] flex-col gap-6">
      <p className="hero-fade label flex items-center gap-2.5 text-ink-soft [--d:150ms]">
        <span className="pulse-dot" aria-hidden />
        {profile.opportunityCta}
      </p>

      <p className="hero-fade text-balance font-serif text-[clamp(1.65rem,2.3vw,2.3rem)] leading-[1.1] tracking-[-0.012em] text-ink [--d:250ms]">
        {hero.lead}
      </p>

      <p className="hero-fade label [--d:350ms]">{hero.meta.join("  ·  ")}</p>

      <div className="hero-fade flex flex-wrap items-center gap-3 [--d:450ms]">
        <a
          href="#work"
          className="group inline-flex h-11 items-center gap-3 rounded-full bg-ink pl-5 pr-4 text-[14px] text-paper transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
        >
          Selected work
          <span className="grid size-6 place-items-center rounded-full bg-signal text-on-signal transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">
            ↓
          </span>
        </a>
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[14px] text-ink transition-colors hover:border-ink"
        >
          Résumé
          <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      </div>

      <p className="hero-fade max-w-sm border-l border-signal pl-4 text-[13px] leading-relaxed text-muted [--d:600ms]">
        <span className="text-ink">Fig. 1 is a live sketch of my IRIS Lab research:</span> three drones carry one
        payload without talking to each other. <span className="[@media(hover:none)]:hidden">Move your cursor to steer it; click for a gust.</span>
        <span className="hidden [@media(hover:none)]:inline">Tap inside the frame to steer it.</span>
      </p>
    </div>
  );
}

function Title() {
  return (
    <h1 className="display flex items-end justify-between gap-6 text-[clamp(4.4rem,29vw,17.5rem)] leading-[0.8] tracking-[-0.045em] sm:text-[clamp(4.4rem,18.6vw,17.5rem)]">
      <span className="block">
        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em] pr-[0.06em] sm:inline-block">
          <span className="hero-rise [--d:80ms]">Arnav</span>
        </span>{" "}
        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em] pr-[0.08em] sm:inline-block">
          <span className="hero-rise italic [--d:180ms]">Bhatia</span>
        </span>
      </span>
      <span aria-hidden className="hero-fade label mb-[0.6em] hidden shrink-0 text-right leading-relaxed xl:block [--d:900ms]">
        Portfolio
        <br />
        Edition 2026
        <br />
        <span className="text-ink">Scroll ↓</span>
      </span>
    </h1>
  );
}

export function Hero() {
  return <FlightDeck intro={<Intro />} title={<Title />} />;
}
