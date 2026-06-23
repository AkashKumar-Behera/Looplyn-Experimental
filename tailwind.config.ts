import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#111111",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A855F7",
          foreground: "#FFFFFF",
        },
        muted: "#A1A1AA",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(139,92,246,0.18), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
