import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#5B4FCF",
          dark: "#3D35A8",
          pale: "#F0EEFF",
          light: "#8174DF",
        },
        teal: "#0EA5A0",
        coral: "#F97316",
        bg: "#FAFAF8",
        surface: "#FFFFFF",
        ink: "#0A0A0A",
        muted: "#888888",
        borderc: "#E8E6E0",
        footerColor: "#01484F",
        PrimaryColorDark: "#01263F",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
        display: ["var(--font-display)", "Syne", "Archivo", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-sans)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        ringPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.04)", opacity: "0.15" },
        },
        circuitScroll: {
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        ring: "ringPulse 4s ease-in-out infinite",
        circuit: "circuitScroll 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
