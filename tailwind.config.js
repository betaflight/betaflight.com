/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
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
        neutral: {
          150: 'rgb(240, 240, 240)',
          750: 'rgb(44 44 44)',
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
