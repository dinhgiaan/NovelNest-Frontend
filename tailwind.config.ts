import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'gentle-float-swing': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
          '75%': { transform: 'translateY(-15px) rotate(-3deg)' }
        }
      },
      animation: {
        'gentle-float-swing': 'gentle-float-swing 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
export default config;
