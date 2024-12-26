/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: "#8884d8",
        customGreen: "#82ca9d",
        customYellow: "#ffc658"
      },
    },
  },
  plugins: [],
}