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
        },
        typing: {
          'from': { width: '0' },
          '40%, 60%': { width: '100%' },
          '100%': { width: '0' }
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'orange' },
        }
      },
      animation: {
        'gentle-float-swing': 'gentle-float-swing 3s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
        'typing-loop': 'typing 3.5s steps(40, end) infinite',
      },
      backgroundImage: {
        bannerLogin: "url('/assets/background_login.webp')",
        bannerRegister: "url('/assets/background_register.webp')",
      }
    },
  },
  plugins: [],
};
export default config;
