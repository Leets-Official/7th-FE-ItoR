/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ede9fe',
          DEFAULT: '#7c3aed',
          dark: '#6d28d9',
        }
      },
    },
  },
  plugins: [],
}