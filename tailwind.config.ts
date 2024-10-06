import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '1/10': '10%'
      },
      width: {
        'window': '600px',
        'range': '900px'
      },
      height: {
        'window': '600px'
      },
      backgroundImage: {
        'gradient': 'linear-gradient(45deg, #030072, #0062FF);',
        'range-gradient': 'linear-gradient(90deg, #00B500, #F2E530, #FF6700, #E01919);'
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      fontFamily: {
        "inter": "Inter"
      }
    },
  },
  plugins: [],
};
export default config;
