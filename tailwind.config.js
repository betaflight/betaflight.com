/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#FFDA66', // pale orange, Hue 45, Luminance 70  #fd7 is Hue 45, Luminance 73
          300: '#FFD044', // orange, Hue 45, Luminance 63  #fc3 is Hue 45, Luminance 60
          400: '#FFC622', // orange, Hue 45, Luminance 57
          500: '#FFBB00', // orange, Hue 44, Luminance 50 #fbo is Hue 45, Luminance 50.
          600: '#EEA600', // orange, Hue 42, Luminance 47
          700: '#DD9100', // orange, Hue 39, Luminance 43
          800: '#CC7E00', // darker orange, Hue 37, Luminance 40 #c90 is Hue 45, Luminance 40
        },
        neutral: {
          150: 'rgb(240, 240, 240)', // pale grey, Hue 0, Luminance 94
          750: 'rgb(44 44 44)', // dark grey, Hue 0, Luminance 71
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
