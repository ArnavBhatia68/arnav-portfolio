import type { NextConfig } from "next";

/**
 * The previous site had one page per section. Those URLs are still out in the
 * wild (résumés, LinkedIn, old messages), so they redirect to their new homes.
 * Temporary (307) on purpose: easy to change later without browsers caching it.
 */
const legacyRoutes: Array<[source: string, destination: string]> = [
  ["/about", "/#about"],
  ["/projects", "/#work"],
  ["/experience", "/#experience"],
  ["/leadership", "/#leadership"],
  ["/contact", "/#contact"],
  ["/certificates", "/records#deans-list"],
  ["/awards", "/records#awards"],
  ["/resume", "/records#resume"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return legacyRoutes.map(([source, destination]) => ({ source, destination, permanent: false }));
  },
};

export default nextConfig;
