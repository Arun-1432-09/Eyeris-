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
        // Master Prompt Section 3 Tokens: Black Luxury
        bg: {
          DEFAULT: "#050505",
          2: "#101010",
          elevated: "#171717",
        },
        background: "#050505",
        surface: {
          DEFAULT: "#101010",
          raised: "#171717",
          elevated: "#1E1E1E",
          border: "#292929",
        },
        text: {
          DEFAULT: "#FFFFFF",
          2: "#A1A1A6",
          muted: "#707070",
        },
        border: {
          DEFAULT: "#292929",
          subtle: "#1C1C1C",
        },
        accent: {
          DEFAULT: "#D8DEE8",
          hover: "#FFFFFF",
        },
        gold: {
          DEFAULT: "#D4AF37",
          subtle: "#AA8C2C",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
        serif: [
          '"New York"',
          '"Cormorant Garamond"',
          "Georgia",
          "serif",
        ],
        mono: [
          '"SF Mono"',
          '"Space Grotesk"',
          "ui-monospace",
          "monospace",
        ],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "power3-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      boxShadow: {
        "luxury-sm": "0 2px 12px rgba(0, 0, 0, 0.6)",
        "luxury-md": "0 8px 30px rgba(0, 0, 0, 0.8)",
        "luxury-lg": "0 20px 60px rgba(0, 0, 0, 0.95)",
        "glow-accent": "0 0 40px rgba(216, 222, 232, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
