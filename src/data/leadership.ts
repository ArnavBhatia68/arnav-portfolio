export type LeadershipItem = {
  organization: string;
  role: string;
  period: string;
  details: string[];
};

export const leadershipItems: LeadershipItem[] = [
  {
    organization: "Joaquin Bustoz Math-Science Honors Program",
    role: "Class Supervisor",
    period: "May 2024 to Jul 2025",
    details: [
      "Supervised a team of five tutors and supported 53 high school students from historically underrepresented communities in STEM.",
    ],
  },
  {
    organization: "Aramark",
    role: "Marketing Ambassador",
    period: "Aug 2023 to Jul 2024",
    details: [],
  },
  {
    organization: "Rotary International",
    role: "Community Volunteer",
    period: "Jul 2020 to Jun 2021",
    details: ["Tree plantation initiatives and awareness against single-use plastic"],
  },
  {
    organization: "Kadam Foundation",
    role: "Volunteer",
    period: "Jan 2021 to Nov 2021",
    details: ["Participated in food and ration drives for below-poverty-line populations"],
  },
  {
    organization: "CodeDevils",
    role: "TODO: add role",
    period: "TODO: add timeline",
    details: ["TODO: add contribution details"],
  },
  {
    organization: "Python Users Group",
    role: "TODO: add role",
    period: "TODO: add timeline",
    details: ["TODO: add contribution details"],
  },
  {
    organization: "Google Developer Student Club ASU",
    role: "TODO: add role",
    period: "TODO: add timeline",
    details: ["TODO: add contribution details"],
  },
];
