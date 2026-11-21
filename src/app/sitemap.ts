import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { BUILD_DATE } from "@/lib/dates";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.id}`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/records`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.5 },
  ];
}
