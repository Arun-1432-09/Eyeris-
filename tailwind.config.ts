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
        // Apple Pure Light Canvas & Monochrome Studio Palette
        background: "#FFFFFF",
        surface: {
          DEFAULT: "#FBFBFD",
          raised: "#F5F5F7",
          elevated: "#FFFFFF",
          border: "#E5E5EA",
          hover: "#EAEAEF",
        },
        // Apple Typography & Monochrome Neutrals
        apple: {
          text: "#1D1D1F",
          subtext: "#6E6E73",
          tertiary: "#86868B",
          black: "#000000",
          white: "#FFFFFF",
          card: "#FFFFFF",
          border: "#E5E5EA",
          titanium: "#86868B",
          gray: "#F5F5F7",
          "gray-dark": "#1D1D1F",
          "gray-hover": "#2C2C2E",
          emerald: "#1B4332",
        },
        // Brand tokens redefined as Pure Monochrome (Zero Blue Tints)
        brand: {
          50: "#FFFFFF",
          100: "#F5F5F7",
          200: "#E5E5EA",
          300: "#D2D2D7",
          400: "#86868B",
          500: "#1D1D1F",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
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
      boxShadow: {
        "apple-sm": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "apple-md": "0 4px 16px rgba(0, 0, 0, 0.06)",
        "apple-lg": "0 12px 32px rgba(0, 0, 0, 0.08)",
        "apple-xl": "0 20px 48px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
