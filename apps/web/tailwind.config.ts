import type { Config } from "tailwindcss";
import base from "@repo/config/tailwind";

const config: Config = {
  ...base,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Scan the shared UI package so its Tailwind classes are not purged
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
