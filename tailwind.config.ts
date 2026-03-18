import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        heading: ["var(--font-heading)", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        oxford: {
          50: '#f4f6f9',
          100: '#e3e8f1',
          200: '#cbd5e5',
          300: '#a3b8d3',
          400: '#7594bc',
          500: '#5376a4',
          600: '#415e87',
          700: '#354c6f',
          800: '#2e415d',
          900: '#0c1A30',
          950: '#060d1a',
        },
        gold: {
          50: '#fdfaef',
          100: '#fbf3d3',
          200: '#f6e4a6',
          300: '#f0d170',
          400: '#eabc41',
          500: '#e0a31e',
          600: '#c38015',
          700: '#9c5d12',
          800: '#804916',
          900: '#693c16',
          950: '#3e2009',
        }
      }
    },
  },
  plugins: [],
};
export default config;
