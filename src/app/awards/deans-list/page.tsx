export default function DeansListPage() {
  const certs = [
    { term: "Fall 2022",  href: "/awards/deanslist/deanslist_fall_2022.pdf"  },
    { term: "Spring 2023",href: "/awards/deanslist/deanslist_spring_2023.pdf"},
    { term: "Fall 2023",  href: "/awards/deanslist/deanslist_fall_2023.pdf"  },
    { term: "Fall 2024",  href: "/awards/deanslist/deanslist_fall_2024.pdf"  },
    { term: "Spring 2025",href: "/awards/deanslist/deanslist_spring_2025.pdf"},
  ];

  return (
    <article className="prose">
      <h1>Dean’s List Certificates</h1>
      <p>Click any term to view the official certificate (PDF).</p>
      <ol>
        {certs.map(({ term, href }) => (
          <li key={term}>
            <a className="underline" href={href} target="_blank" rel="noopener noreferrer">
              {term}
            </a>
          </li>
        ))}
      </ol>
      <p><a className="underline" href="/about">← Back to About</a></p>
    </article>
  );
}
