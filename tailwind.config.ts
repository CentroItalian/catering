import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "italiana": ["Italiana", "sans-serif"],
        "garamond": ["Cormorant Garamond", "serif"],
        "nunito": ["Nunito", "sans-serif"],
        "yeseva": ["Yeseva One", "serif"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        zoom: 'zoom 20s ease-in-out infinite',
      },
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["cupcake", "dark", "cmyk", "fantasy"],
    darkTheme: "fantasy",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
};
export default config;
