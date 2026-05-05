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
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        fg: "var(--fg)",
        "fg-soft": "var(--fg-soft)",
        muted: "var(--muted)",
        amber: "var(--amber)",
        "amber-bright": "var(--amber-bright)",
        "amber-tint": "var(--amber-tint)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ["Satoshi", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
