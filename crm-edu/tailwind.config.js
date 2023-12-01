/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        p1: "#B2A4FF",
        p2: "#FFB4B4",
        p3: "#FFDEB4",
        p4: "#FDF7C3",

        lightPeach: "#FFD8B6",
        paleBlue: "#AEDFF2",
        paleLavender: "#E6E6FA",
        dustRose: "#f3dddd",
        grayishBlue: "#D4D8E9",

        white: "#F2F3F5", // ! override
        "white-1": "#F7F9FC",
        "white-og": "#FFFFFF",

        "black-1": "#313338",
        charcoal: "#36454F",
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
