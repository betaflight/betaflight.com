/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#FFDA66',
          300: '#FFD044',
          400: '#FFC622',
          500: '#FFBB00',
          600: '#EEA600',
          700: '#DD9100',
          800: '#CC7E00',
        },
      },
      backgroundSize: {
        '0w': '0% 2px',
        '100w': '100% 2px',
      },
    },
  },
  plugins: [],
};
