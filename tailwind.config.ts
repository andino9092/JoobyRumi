import type { Config } from "tailwindcss";

const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DMSerifDisplay: ["DM Serif Display", 'serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        '3xl': '15px 15px 30px -10px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'joobyDark' : '#5C585D',
        'joobyDarkPink' : '#FFB6C1',
        'joobyWhite' : '#FDF9F9',
        'joobyLightPink': '#F7E8EA'
      },
      fontSize: {
        'jooby-54': '54px',
        'jooby-40': '40px',
        'jooby-37': '37px',
        'jooby-30': '30px',
        'jooby-25': '25px',
      },
    },
  },
  plugins: [],
};
export default config;
