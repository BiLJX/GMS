/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {},
    colors: {
      "secondary": {
          blue: "#5B5F97",
          orange: "#FFC859"
      },
      "primary": {
          100: "#FF7C7C",
          200: "#ED254E",
          300: "#FF5074"
      },
      "white": {
          100: "#FFFFFF",
          200: "#FBFBFB",
          300: "#F5F8FF",
          400: "#c2c2c2"
      },
      "gray": {
          100: "#c2c2c2",
          200: "#8A8A8A",
          300: "#919191",
          400: "#404040",
          500: "#465362",
          blue: "#506b8a",
          700: "#0E1216"
      },
      "brc": {
          100: "#DCDCDC",
          200: "#8A8A8A",
          300: "#EFEFEF"
      }
    }
  },
  plugins: [],
}
