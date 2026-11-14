import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090B",
        graphite: "#17191E",
        surface: {
          DEFAULT: "#111317",
          raised: "#17191E",
          hover: "#1F232B",
          border: "#262A35",
        },
        champagne: {
          300: "#E3CCA2",
          400: "#CCA977",
          500: "#B99A68",
          600: "#987948",
          700: "#755B32",
        },
        ivory: {
          50: "#FAF8F5",
          100: "#F3EFE6",
          200: "#E4DEC8",
          300: "#CFC7AB",
        },
        brand: {
          50: "#f0fdf9",
          100: "#ccfbee",
          200: "#99f6dd",
          300: "#5eead4",
          400: "#38CDBB", // Muted precision optical teal
          500: "#00c49f", // Eyeris signature vibrant teal
          600: "#00a384",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        gold: {
          300: "#F3E5C8",
          400: "#CCA977",
          500: "#B99A68",
          600: "#987948",
        },
        optic: {
          blue: "#38bdf8",
          teal: "#38CDBB",
          purple: "#a855f7",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Playfair Display", "serif"],
        sans: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        spinSlow: "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.35" },
          "100%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
