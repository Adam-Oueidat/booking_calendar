import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      animation: {
        "open-close": "open-close 3s linear",
      },
      keyframes: {
        "open-close": {
          "0%": { width: "100%", marginLeft: "0%", marginRight: "0%" },
          "50%": { width: "50%", marginLeft: "50%", marginRight: "50%" },
          "100%": { width: "100%", marginLeft: "0%", marginRight: "0%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
