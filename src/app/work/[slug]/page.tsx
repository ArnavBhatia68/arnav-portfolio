import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/work/ArchitectureDiagram";
import { ProjectCover } from "@/components/work/ProjectCover";
import { architectures } from "@/data/architecture";
import { getProject, projects } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: { title: project.title, description: project.tagline, url: `/work/${project.id}`, type: "article" },
  };
}

function Block({ label, index, children }: { label: string; index: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-6 md:py-16">
      <h2 className="label md:col-span-3">
        <span className="text-ink">{index}</span> — {label}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const diagram = architectures[project.id];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="pt-[calc(var(--header-h)+28px)]">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="label flex items-center justify-between gap-4 border-b border-line pb-4">
          <Link href="/#work" className="link-draw text-ink">
            ← All work
          </Link>
          <span>
            Case study <span className="text-ink">W/{number}</span> of {String(projects.length).padStart(2, "0")}
          </span>
        </nav>

        <header className="grid gap-x-6 gap-y-8 pb-14 pt-12 md:grid-cols-12 md:pt-20">
          <p className="hero-fade label md:col-span-12">
            {project.category}
            {project.organization ? <> · {project.organization}</> : null}
          </p>
          <h1 className="display text-balance text-[clamp(3.4rem,9.5vw,9.5rem)] leading-[0.86] tracking-[-0.04em] md:col-span-11">
            <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span className="hero-rise [--d:60ms]">{project.title}</span>
            </span>
          </h1>
          <p className="hero-fade text-pretty font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.15] text-ink-soft md:col-span-8 [--d:250ms]">
            {project.tagline}
          </p>
          {project.primaryAction || project.githubUrl ? (
            <div className="hero-fade flex flex-wrap items-end gap-3 md:col-span-4 md:justify-end [--d:350ms]">
              {project.primaryAction ? (
                <a
                  href={project.primaryAction.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] text-paper transition-transform duration-500 ease-out-expo hover:-translate-y-0.5"
                >
                  {project.primaryAction.label} <span aria-hidden>↗</span>
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[14px] text-ink transition-colors hover:border-ink"
                >
                  GitHub <span aria-hidden>↗</span>
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        <figure className="hero-fade [--d:300ms]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] border border-line bg-card sm:aspect-[16/9] lg:aspect-[21/9]">
            <ProjectCover kind={project.cover} />
          </div>
          <figcaption className="label mt-3">
            <span className="text-ink">Fig. 1</span> — {project.coverCaption} (illustration)
          </figcaption>
        </figure>

        <div className="mt-16 md:mt-24">
          <Block index="01" label="Overview">
            <p className="max-w-3xl text-pretty text-[clamp(1.15rem,1.6vw,1.35rem)] leading-relaxed text-ink">{project.summary}</p>
          </Block>

          <Block index="02" label="Impact">
            <dl className={`grid gap-px border-y border-line bg-line ${project.metrics.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {project.metrics.map((metric) => (
                <div key={metric.label} className="bg-paper py-6 sm:px-6 sm:first:pl-0">
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="display text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.03em]">{metric.value}</dd>
                  <dd className="mt-3 font-mono text-[11.5px] text-muted">{metric.label}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block index="03" label="What I did">
            <ol className="space-y-8">
              {project.bullets.map((bullet, i) => (
                <li key={bullet} className="grid grid-cols-[3rem_1fr] gap-2 md:grid-cols-[4rem_1fr]">
                  <span className="display text-[2rem] leading-none text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                  <p className="max-w-3xl text-pretty text-[17px] leading-[1.7] text-ink-soft">{bullet}</p>
                </li>
              ))}
            </ol>
          </Block>

          {diagram ? (
            <Block index="04" label="Architecture">
              <figure>
                <ArchitectureDiagram diagram={diagram} id={project.id} />
                <figcaption className="label mt-4 max-w-3xl leading-relaxed">
                  <span className="text-ink">Fig. 2</span> — {diagram.caption}
                </figcaption>
              </figure>
            </Block>
          ) : null}

          <Block index={diagram ? "05" : "04"} label="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[12px] text-ink">
                  {tag}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      <Link href={`/work/${next.id}`} className="group mt-10 block border-t border-line transition-colors hover:bg-card">
        <div className="shell flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div>
            <p className="label">Next case study</p>
            <p className="display mt-5 text-balance text-[clamp(2.8rem,7vw,7rem)] leading-[0.9] tracking-[-0.035em]">{next.title}</p>
          </div>
          <span
            aria-hidden
            className="grid size-16 flex-none place-items-center rounded-full border border-line-strong text-2xl transition-all duration-700 ease-out-expo group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal md:size-24"
          >
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
