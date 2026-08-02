import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#5B4FCF",
        "purple-d": "#3D35A8",
        "purple-pale": "#F0EEFF",
        teal: "#0EA5A0",
        coral: "#F97316",
        bg: "#FAFAF8",
        surface: "#FFFFFF",
        ink: "#0A0A0A",
        muted: "#888888",
        borderc: "#E8E6E0",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        display: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
