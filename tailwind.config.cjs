const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Montserrat Variable",
                    "Montserrat",
                    ...defaultTheme.fontFamily.sans,
                ],
                display: [
                    "Sen",
                    "Montserrat Variable",
                    "Montserrat",
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            colors: {
                gray: {
                    50: "#E9E9EA",
                    100: "#D3D3D4",
                    200: "#A8A8AA",
                    300: "#7C7C7F",
                    400: "#515155",
                    500: "#25252A",
                    600: "#1E1E22",
                    700: "#161619",
                    800: "#0F0F11",
                    900: "#070708",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
