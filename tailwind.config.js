/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'house': `url(./src/assets/img/house.jpg)`
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}