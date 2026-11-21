export const sections = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "recognition", label: "Recognition", index: "04" },
  { id: "leadership", label: "Leadership", index: "05" },
  { id: "toolkit", label: "Toolkit", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

/** The subset shown in the top bar; everything is reachable from ⌘K. */
export const navSections = ["about", "work", "experience", "recognition", "contact"] as const;

export const site = {
  url: "https://arnavbhatia-portfolio.vercel.app",
  title: "Arnav Bhatia — Software Engineer",
  description:
    "Arnav Bhatia builds reliable full-stack products and distributed backends, and researches learning-based control for cooperative quadrotors. Computer Science @ Arizona State University.",
};
