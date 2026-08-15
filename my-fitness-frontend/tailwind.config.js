/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E50914',       // Vivid Crimson Red
          'red-hover': '#C10712',
          dark: '#0B0B0B',      // Deep Matte Black
          card: '#161616',      // Dark Card Background
          border: '#2A2A2A',    // Subtle Dark Border
        },
      },
    },
  },
  plugins: [],
}