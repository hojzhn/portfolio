/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      maxWidth: {
        ...defaultTheme.maxWidth, // ✅ this brings back sm → 7xl
      },
    },
  },
  plugins: [],
};
