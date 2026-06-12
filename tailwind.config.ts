import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#060504",
        midnight: "#101010",
        aureate: "#D9A441",
        champagne: "#F6E7BC",
        burnish: "#8F6422",
        pearl: "#FFF8E6"
      },
      boxShadow: {
        gold: "0 0 60px rgba(217, 164, 65, 0.28)",
        insetGold: "inset 0 0 60px rgba(246, 231, 188, 0.08)"
      },
      backgroundImage: {
        "gold-radial": "radial-gradient(circle at center, rgba(246,231,188,0.35), rgba(217,164,65,0.16) 38%, transparent 68%)",
        "ceremony": "linear-gradient(135deg, #060504 0%, #12100d 44%, #201608 100%)"
      }
    }
  },
  plugins: []
};

export default config;
