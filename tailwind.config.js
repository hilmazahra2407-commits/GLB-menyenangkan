/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#93d7e2", // Light Blue
        secondary: "#faf3a5", // Light Yellow
        accent: "#f6b9cf", // Pink
        dark: "#c35e80", // Dark Pink
      },
      fontFamily: {
        sans: ['"Sorts Mill Goudy"', 'sans-serif'],
        bubblegum: ['Bubblegum Sans', 'cursive'], // A fun font for kids/education
      }
    },
  },
  plugins: [],
}
