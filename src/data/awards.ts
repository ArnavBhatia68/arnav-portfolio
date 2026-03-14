export type Award = {
  title: string;
  date: string;
  description?: string;
};

export type Certificate = {
  title: string;
  period: string;
  filePath: string;
};

export const highlightedAwards: Award[] = [
  { title: "New American University Scholarship", date: "Aug 2022" },
  { title: "TA of the Year", date: "Apr 2025" },
  { title: "Moeur Award for Academic Excellence", date: "Spring 2026" },
];

export const deansListCertificates: Certificate[] = [
  { title: "Dean’s List", period: "Fall 2022", filePath: "/awards/deanslist/deanslist_fall_2022.pdf" },
  { title: "Dean’s List", period: "Spring 2023", filePath: "/awards/deanslist/deanslist_spring_2023.pdf" },
  { title: "Dean’s List", period: "Fall 2023", filePath: "/awards/deanslist/deanslist_fall_2023.pdf" },
  { title: "Dean’s List", period: "Fall 2024", filePath: "/awards/deanslist/deanslist_fall_2024.pdf" },
  { title: "Dean’s List", period: "Spring 2025", filePath: "/awards/deanslist/deanslist_spring_2025.pdf" },
  { title: "Dean’s List", period: "Fall 2025", filePath: "TODO: add certificate asset" },
];

export const additionalCertificates: Certificate[] = [
  { title: "TODO: Add Certificate Name", period: "TODO: Add Date", filePath: "TODO: add certificate asset" },
];
