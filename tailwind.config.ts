import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple HIG Pure Black & Dark Grays
        black: "#000000",
        apple: {
          pure: "#000000",
          surface: "#111111",
          elevated: "#1C1C1E",
          grouped: "#2C2C2E",
          separator: "#38383A",
          fill: "#3A3A3C",
          // Semantic accents (Apple HIG Dark Mode)
          blue: "#0A84FF",
          cyan: "#64D2FF",
          amber: "#FFD60A",
          emerald: "#30D158",
          orange: "#FF9F0A",
          red: "#FF453A",
          purple: "#BF5AF2",
          pink: "#FF375F",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "SF Pro Display",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
