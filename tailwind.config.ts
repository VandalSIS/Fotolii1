import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#f9f1e1",
          100: "#f3e6cd",
          200: "#ead4a8",
          300: "#dcbb7d",
          400: "#cba055",
          500: "#b58639",
          600: "#9b6c2c",
          700: "#7c5526",
          800: "#604224",
          900: "#4c3520",
        },
        brand: {
          50: "#faefd9",
          100: "#f1dba8",
          200: "#e6c074",
          300: "#d6a043",
          400: "#c08828",
          500: "#a36e1f",
          600: "#83571c",
          700: "#67431b",
          800: "#50341a",
          900: "#3f2917",
        },
        ink: {
          50: "#f1ebde",
          100: "#dccfb6",
          200: "#b8a583",
          300: "#8a7858",
          400: "#604f37",
          500: "#3f3324",
          600: "#2e251a",
          700: "#231c15",
          800: "#1a1410",
          900: "#120e0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
