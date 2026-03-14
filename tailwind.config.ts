import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx,mdx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
