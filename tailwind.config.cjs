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
        green: {
          50: "#F0FFE7",
          100: "#E1FFD0",
          200: "#C4FFA3",
          300: "#A7FF75",
          400: "#8AFF47",
          500: "#6CFF19",
          600: "#55EA00",
          700: "#3FAD00",
          800: "#297000",
          900: "#123200",
          950: "#071400",
        },
        red: {
          50: "#FFE7E7",
          100: "#FFD0D0",
          200: "#FFA3A3",
          300: "#FF7575",
          400: "#FF4747",
          500: "#FF1919",
          600: "#EA0000",
          700: "#AD0000",
          800: "#700000",
          900: "#320000",
          950: "#140000",
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
