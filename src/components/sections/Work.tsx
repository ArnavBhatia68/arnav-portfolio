import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCover } from "@/components/work/ProjectCover";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": (index % 2) * 120 } as React.CSSProperties}
      className="group relative flex flex-col md:even:mt-28"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] border border-line bg-card transition-[border-color] duration-500 group-hover:border-line-strong">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.025]">
          <ProjectCover kind={project.cover} />
        </div>
        <span className="label pointer-events-none absolute bottom-3 left-4 right-4 flex justify-between gap-4">
          <span>
            <span className="text-ink">Fig. 2.{index + 1}</span> — {project.coverCaption}
          </span>
        </span>
      </div>

      <div className="label mt-6 flex items-center justify-between gap-4">
        <span className="whitespace-nowrap">
          <span className="text-ink">W/{number}</span> · {project.category}
        </span>
        {project.organization ? <span className="min-w-0 truncate text-right">{project.organization}</span> : null}
      </div>

      <h3 className="display mt-4 text-[clamp(2.1rem,3.4vw,3.1rem)] leading-[0.98] tracking-[-0.02em]">
        <Link href={`/work/${project.id}`} className="link-draw after:absolute after:inset-0 after:content-['']">
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-ink-soft">{project.tagline}</p>

      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-5">
        {project.metrics.slice(0, 2).map((metric) => (
          <div key={metric.label}>
            <dt className="sr-only">{metric.label}</dt>
            <dd className="display text-[2.2rem] leading-none tracking-[-0.02em]">{metric.value}</dd>
            <dd className="mt-2 font-mono text-[11px] text-muted">{metric.label}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 font-mono text-[11.5px] leading-relaxed text-muted">{project.tags.slice(0, 6).join("  ·  ")}</p>

      <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
        <span className="inline-flex items-center gap-2 text-ink">
          Case study
          <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
            →
          </span>
        </span>
        {project.primaryAction ? (
          <a href={project.primaryAction.url} target="_blank" rel="noreferrer" className="link-line text-ink-soft hover:text-ink">
            {project.primaryAction.label} ↗
          </a>
        ) : null}
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="link-line text-ink-soft hover:text-ink">
            GitHub ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function Work() {
  const featured = projects.filter((project) => project.featured);
  return (
    <section id="work" aria-label="Selected work" className="shell py-20 md:py-28">
      <SectionHeader index="02" label="Selected work" aside={`${featured.length} projects`} title={<>Selected <em className="italic">work</em></>}>
        Product engineering, distributed systems and robotics research. Every cover is a live diagram of how the thing
        works — open any project for the full case study.
      </SectionHeader>

      <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
