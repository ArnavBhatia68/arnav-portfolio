import Link from "next/link";
import { profile } from "@/data/profile";
import { BUILD_DATE } from "@/lib/dates";

const elsewhere = [
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
  { label: "Records", href: "/records", external: false },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="display text-[clamp(3rem,7vw,5.5rem)]">
            Arnav <em className="italic">Bhatia</em>
          </p>
          <p className="label mt-4">Software engineer · Tempe, Arizona</p>
        </div>

        <div className="md:col-span-3">
          <p className="label">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {elsewhere.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="link-draw text-ink-soft hover:text-ink">
                    {item.label} <span aria-hidden>↗</span>
                  </a>
                ) : item.href.startsWith("/") ? (
                  <Link href={item.href} className="link-draw text-ink-soft hover:text-ink">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="link-draw text-ink-soft hover:text-ink">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="label">Colophon</p>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-soft">
            Set in Instrument Serif, Geist and Geist Mono. Built with Next.js and a hand-rolled physics sim, deployed on Vercel.
          </p>
          <p className="label mt-4">
            Press <kbd className="rounded border border-line px-1.5 py-0.5 text-ink">⌘K</kbd> anywhere
          </p>
        </div>
      </div>

      <div className="shell">
        <div className="flex items-center justify-between gap-4 border-t border-line py-5">
          <p className="label">© {BUILD_DATE.getUTCFullYear()} {profile.name}</p>
          <a href="#top" className="label link-draw hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
