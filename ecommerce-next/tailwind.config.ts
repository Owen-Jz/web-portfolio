import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#f5f3ed",  // off-white bone
        bg2:      "#eae6dc",  // deeper stone
        ink:      "#0a0a0a",
        mute:     "#6b6b6b",
        line:     "#d4d0c4",
        klein:    "#0017d8",  // signature accent blue
        klein2:   "#001bf5",
        coral:    "#ff4d3c",  // sale tag / pop
        cream:    "#fbf9f3",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans:    ["var(--font-sans)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        out:       "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
