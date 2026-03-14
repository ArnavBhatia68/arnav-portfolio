import type { SupportingDocument } from "./experience";

export type LeadershipItem = {
  id: string;
  organization: string;
  role: string;
  dates: string;
  location?: string;
  summary: string;
  bullets: string[];
  referenceLabel?: string;
  referenceName?: string;
  referenceEmail?: string;
  supportingDocuments?: SupportingDocument[];
};

export const leadershipItems: LeadershipItem[] = [
  {
    id: "joaquin-bustoz",
    organization: "Joaquin Bustoz Math-Science Honors Program",
    role: "Class Supervisor",
    dates: "May 2024 - Jul 2025",
    location: "Tempe, Arizona, United States",
    summary: "Led tutor coordination and STEM curriculum delivery for 53 students.",
    bullets: [
      "Supervised a team of five tutors, ensuring effective delivery of PreCalculus curriculum to 53 high school students from historically underrepresented communities in STEM.",
      "Implemented and managed tailored educational strategies that enhanced student engagement and learning outcomes, contributing to the academic success of participants from diverse backgrounds.",
    ],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "aramark",
    organization: "Aramark",
    role: "Marketing Ambassador",
    dates: "Aug 2023 - Jul 2024",
    location: "Phoenix, Arizona, United States",
    summary: "Drove campus marketing campaigns that increased meal plan sign-ups and awareness.",
    bullets: [
      "Served as a Marketing Ambassador for SunDevil Hospitality at Arizona State University.",
      "Spearheaded successful marketing campaigns to promote and sell meal plans, resulting in a substantial increase in plan sign-ups and student engagement.",
    ],
    referenceLabel: "Point of Contact",
    referenceName: "Available upon request",
    referenceEmail: "reference-coming-soon@example.com",
  },
  {
    id: "rotary",
    organization: "Rotary International",
    role: "Community Volunteer",
    dates: "Jul 2020 - Jun 2021",
    summary: "Contributed to sustainability awareness and local environmental action drives.",
    bullets: [
      "Participated in tree plantation initiatives through Rotary Club of Ambala.",
      "Created awareness against the harms caused by single-use plastic.",
    ],
    supportingDocuments: [{ label: "Letter of Appreciation", fileUrl: "/docs/letters/rotary-appreciation.pdf" }],
  },
  {
    id: "kadam-foundation",
    organization: "Kadam Foundation",
    role: "Volunteer",
    dates: "Jan 2021 - Nov 2021",
    summary: "Supported food and ration drives for below-poverty-line communities.",
    bullets: ["Participated in food and ration drives for below-poverty-line populations."],
    supportingDocuments: [{ label: "Letter of Appreciation", fileUrl: "/docs/letters/kadam-appreciation.pdf" }],
  },
];
