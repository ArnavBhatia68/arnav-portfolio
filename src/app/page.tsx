import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Arnav Bhatia</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          CS @ ASU — I am an aspiring Software Engineer who is ambitious and self-driven. I thrive on learning, challenges and constantly set goals for myself. I take feedback as a scope to improve and I am always seeking such opportunities.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
            href="/Resume-%20Arnav%20Bhatia_CS.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>

          <a
            className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
            href="mailto:abhati35@asu.edu"
          >
            Email Me
          </a>

          <Link
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
            href="/about"
          >
            About
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
