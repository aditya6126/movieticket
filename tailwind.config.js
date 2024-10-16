/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "light-yellow": "#faedd2",
        "light-pink": "#ec81a7",
        "light-sky": "#9ed2e6"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
