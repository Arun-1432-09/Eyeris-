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
        background: "#08090C",
        surface: "#101217",
        "surface-raised": "#171A21",
        "surface-border": "#242933",
        brand: {
          50: "#f0fdf9",
          100: "#ccfbee",
          200: "#99f6dd",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#00c49f", // Eyeris signature precision teal / optical green
          600: "#00a384",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        optic: {
          blue: "#38bdf8",
          purple: "#a855f7",
          cyan: "#06b6d4"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
