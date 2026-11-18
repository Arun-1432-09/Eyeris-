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
        // Minimal Apple Design: White Background & Black Text
        bg: {
          DEFAULT: "#FFFFFF",
          2: "#F7F7F7",
          elevated: "#FFFFFF",
        },
        background: "#FFFFFF",
        "background-2": "#F7F7F7",
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#F7F7F7",
          elevated: "#FFFFFF",
          border: "#E5E5E5",
        },
        text: {
          DEFAULT: "#111111",
          2: "#666666",
          muted: "#888888",
        },
        border: {
          DEFAULT: "#E5E5E5",
          subtle: "#F0F0F0",
        },
        accent: {
          DEFAULT: "#111111",
          hover: "#000000",
        },
        gold: {
          DEFAULT: "#D4AF37",
          subtle: "#B89635",
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
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
          '"JetBrains Mono"',
          "monospace",
        ],
      },
      fontSize: {
        "display-large": ["clamp(2.75rem, 5.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-medium": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "headline-large": ["clamp(1.5rem, 2.75vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "headline-medium": ["clamp(1.2rem, 2vw, 1.6rem)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "eyebrow": ["clamp(0.6875rem, 0.85vw, 0.8125rem)", { lineHeight: "1.4", letterSpacing: "0.2em" }],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "power3-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
