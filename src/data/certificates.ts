export type AwardSnapshot = {
  title: string;
  date: string;
};

export type Certificate = {
  id: string;
  title: string;
  period: string;
  category: "Dean's List" | "Award";
  filePath?: string;
};

export const awardsSnapshot: AwardSnapshot[] = [
  { title: "New American University Scholarship", date: "Aug 2022" },
  { title: "TA of the Year", date: "Apr 2025" },
  { title: "Moeur Award for Academic Excellence", date: "Spring 2026" },
  { title: "Dean’s List", date: "6 semesters" },
];

export const certificates: Certificate[] = [
  { id: "deans-fall-2022", title: "Dean’s List", period: "Fall 2022", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2022.pdf" },
  { id: "deans-spring-2023", title: "Dean’s List", period: "Spring 2023", category: "Dean's List", filePath: "/docs/certificates/deans-list/spring-2023.pdf" },
  { id: "deans-fall-2023", title: "Dean’s List", period: "Fall 2023", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2023.pdf" },
  { id: "deans-fall-2024", title: "Dean’s List", period: "Fall 2024", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2024.pdf" },
  { id: "deans-spring-2025", title: "Dean’s List", period: "Spring 2025", category: "Dean's List", filePath: "/docs/certificates/deans-list/spring-2025.pdf" },
  { id: "deans-fall-2025", title: "Dean’s List", period: "Fall 2025", category: "Dean's List", filePath: "/docs/certificates/deans-list/fall-2025.pdf" },
  { id: "award-new-american", title: "New American University Scholarship", period: "Aug 2022", category: "Award" },
  { id: "award-ta-year", title: "TA of the Year", period: "Apr 2025", category: "Award" },
  { id: "award-moeur", title: "Moeur Award for Academic Excellence", period: "Spring 2026", category: "Award" },
];
