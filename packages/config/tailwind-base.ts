import type { Config } from "tailwindcss";

/**
 * Shared Tailwind theme/base for all apps in the monorepo.
 * Apps spread this and supply their own `content` globs.
 */
const base: Omit<Config, "content"> = {
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
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default base;
