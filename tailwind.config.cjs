const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      fontFamily: {
        sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          50: "#D8D8DA",
          100: "#CBCBCD",
          200: "#B1B1B4",
          300: "#97979B",
          400: "#7D7D82",
          500: "#646468",
          600: "#4B4B4E",
          700: "#323234",
          800: "#19191A",
          900: "#0A0A0A",
          950: "#030303",
        },
      },
      opacity: {
        1: "0.01",
        2: "0.02",
        3: "0.03",
        4: "0.04",
        6: "0.06",
        7: "0.07",
        8: "0.08",
        9: "0.09",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate"), require("@kobalte/tailwindcss")],
}
