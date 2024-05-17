/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
          sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h3': '1.25rem',
        'sm': '0.875rem',
        'base': '1rem',
      },
      colors: {
        green: {
          100: '#E9F6CC',
          200: '#C8E980',
          300: '#92D400',
          400: '#618D00',
          500: '#314700',
        },
        grey: {
          100: '#EFEFEF',
          200: '#D6D7D7',
          300: '#ADAFAF',
          400: '#737575',
          500: '#3A3A3A',
        },
          black: {
            100: '#000'
          },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
