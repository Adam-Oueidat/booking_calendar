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
        // Nyhavn at golden hour — drawn from Copenhagen's painted canal houses
        cph: {
          navy: "#16263B", // canal water at dusk / dark sections
          navy2: "#1F3650",
          paper: "#EFEAE0", // warm limestone, cooled a touch off cream
          ink: "#1A1714",
          ochre: "#E6A23C", // signature mustard facade — primary accent
          rust: "#C25342", // rust-red facade
          teal: "#2F6E69", // canal-side green facade
          sky: "#A7C0CE", // Copenhagen sky
          amber: "#D98C2B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        display: ["var(--font-schibsted)", "var(--font-geist-sans)"],
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
  future: {
    hoverOnlyWhenSupported: true,
  },
};
export default config;
