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
        // Apple Space Black Canvas & Elevated Tiers
        background: "#000000",
        obsidian: "#08080A",
        surface: {
          DEFAULT: "#121214",
          raised: "#18181B",
          elevated: "#222226",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "#2A2A2E",
        },
        // Apple Typography Neutrals
        apple: {
          text: "#F5F5F7",
          subtext: "#86868B",
          tertiary: "#6E6E73",
          card: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.08)",
          blue: "#0071E3",
          "blue-hover": "#0077ED",
          "blue-light": "#2997FF",
          titanium: "#E5E5EA",
          green: "#30D158",
          gold: "#E5C384",
        },
        // Brand & Precision Accents
        brand: {
          50: "#f0fdf9",
          100: "#ccfbee",
          200: "#99f6dd",
          300: "#5eead4",
          400: "#2997FF", // Apple precision optic blue
          500: "#0071E3", // Apple flagship interactive blue
          600: "#0062C4",
          700: "#004EA2",
          800: "#003B7B",
          900: "#002855",
        },
        optic: {
          blue: "#2997FF",
          cyan: "#64D2FF",
          green: "#30D158",
          purple: "#BF5AF2",
          sun: "#FF9F0A",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          "Inter",
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
        apple: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
