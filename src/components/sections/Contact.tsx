import { LocalTime } from "@/components/site/LocalTime";
import { CopyButton } from "@/components/ui/CopyButton";
import { profile } from "@/data/profile";

export function Contact() {
  const channels = [
    { label: "LinkedIn", value: "in/bhatiaarnav", href: profile.linkedin },
    { label: "GitHub", value: "ArnavBhatia68", href: profile.github },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div className="shell py-24 md:py-36">
        <div data-reveal className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="label whitespace-nowrap text-ink">§ 07</span>
          <span className="label">Contact</span>
          <span className="label flex items-center gap-2 text-ink-soft sm:ml-auto">
            <span className="pulse-dot" aria-hidden /> {profile.opportunityCta}
          </span>
        </div>

        <h2
          id="contact-title"
          data-reveal
          className="display mt-14 max-w-[14ch] text-[clamp(3.4rem,10.4vw,10.5rem)] leading-[0.86] tracking-[-0.04em] md:mt-20"
        >
          Let’s build something that <em className="italic text-signal-ink">holds&nbsp;up.</em>
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-6">
          <div data-reveal className="md:col-span-7">
            <p className="label">Write to me</p>
            <a
              href={`mailto:${profile.email}`}
              className="display link-line mt-4 inline-block break-all text-[clamp(2.1rem,4.6vw,4.2rem)] leading-[1.05] tracking-[-0.02em]"
            >
              {profile.email}
            </a>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CopyButton value={profile.email} label="Copy email" toastMessage="Email copied" />
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.08em] text-paper transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
              >
                Résumé <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <dl data-reveal className="divide-y divide-line border-y border-line md:col-span-5">
            {channels.map((channel) => (
              <div key={channel.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-4">
                <dt className="label">{channel.label}</dt>
                <dd>
                  <a
                    href={channel.href}
                    {...(channel.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group inline-flex items-baseline gap-2 text-[16px] text-ink"
                  >
                    <span className="link-draw">{channel.value}</span>
                    {channel.href.startsWith("http") ? (
                      <span aria-hidden className="text-muted transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    ) : null}
                  </a>
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-4">
              <dt className="label">Local time</dt>
              <dd className="text-[16px] text-ink">
                <LocalTime className="tabular" /> <span className="text-muted">in {profile.location} (MST)</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
