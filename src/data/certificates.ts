export type Certificate = {
  id: string;
  title: string;
  period: string;
  category: "Dean's List" | "Award";
  /** One-line context shown under the award name. */
  issuer?: string;
  filePath?: string;
  externalUrl?: string;
  externalLabel?: string;
};

export const certificates: Certificate[] = [
  { id: "deans-fall-2022", title: "Dean’s List", period: "Fall 2022", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2022.pdf" },
  { id: "deans-spring-2023", title: "Dean’s List", period: "Spring 2023", category: "Dean's List", filePath: "/docs/certificates/deans-list/spring-2023.pdf" },
  { id: "deans-fall-2023", title: "Dean’s List", period: "Fall 2023", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2023.pdf" },
  { id: "deans-fall-2024", title: "Dean’s List", period: "Fall 2024", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2024.pdf" },
  { id: "deans-spring-2025", title: "Dean’s List", period: "Spring 2025", category: "Dean's List", filePath: "/docs/certificates/deans-list/spring-2025.pdf" },
  { id: "deans-fall-2025", title: "Dean’s List", period: "Fall 2025", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2025.pdf" },
  {
    id: "award-moeur",
    title: "Moeur Award for Academic Excellence",
    period: "Spring 2026",
    category: "Award",
    issuer: "Arizona State University",
    externalUrl: "https://news.asu.edu/20210503-celebrating-120-years-asu-moeur-award",
    externalLabel: "ASU Moeur Award",
  },
  {
    id: "award-ta-year",
    title: "TA of the Year",
    period: "Apr 2025",
    category: "Award",
    issuer: "ASU undergraduate teaching assistant program",
    externalUrl: "https://students.engineering.asu.edu/pulse/ugta/",
    externalLabel: "UGTA Program",
  },
  {
    id: "award-new-american",
    title: "New American University Scholarship",
    period: "Aug 2022",
    category: "Award",
    issuer: "Merit scholarship, Arizona State University",
    externalUrl: "https://tuition.asu.edu/NAMU-commitment",
    externalLabel: "ASU Scholarship Info",
  },
];

export const deansList = certificates.filter((c) => c.category === "Dean's List");
export const awards = certificates.filter((c) => c.category === "Award");
