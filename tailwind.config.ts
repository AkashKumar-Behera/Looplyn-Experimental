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
        background: "#050505",
        "background-2": "#0B0B0B",
        surface: "#111111",
        accent: {
          DEFAULT: "#FF2A00",
          2: "#FF4D2D",
          highlight: "#FF6A4A",
          foreground: "#FFFFFF",
        },
        // backwards-compatible aliases so existing classes still resolve
        primary: {
          DEFAULT: "#FF2A00",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF4D2D",
          foreground: "#FFFFFF",
        },
        muted: "#8A8A8A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.055em",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-reverse": "marquee-reverse 42s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        float: "float 6s ease-in-out infinite",
        grain: "grain 0.7s steps(6) infinite",
        scan: "scan 7s linear infinite",
        flicker: "flicker 4s linear infinite",
        "rec-blink": "rec-blink 1.1s steps(1) infinite",
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
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(-8%, 5%)" },
          "70%": { transform: "translate(9%, -4%)" },
          "90%": { transform: "translate(-3%, 10%)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.92" },
          "47%": { opacity: "0.9" },
          "48%": { opacity: "0.55" },
          "49%": { opacity: "0.9" },
          "72%": { opacity: "0.85" },
          "73%": { opacity: "0.6" },
          "74%": { opacity: "0.9" },
        },
        "rec-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.15" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,42,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,42,0,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(255,42,0,0.20), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
