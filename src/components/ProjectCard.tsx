type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  href?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href ?? "#"}
      className="block border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{project.oneLiner}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.tech.map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded-full border border-gray-200">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
