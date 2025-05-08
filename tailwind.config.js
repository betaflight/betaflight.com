/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx,md}', './docs/**/*.{js,jsx,ts,tsx,mdx,md}'],
  theme: {
    extend: {
      colors: {
        // colour review: https://hslpicker.com/
        // colour format must be either:
        // #XXXXXX, where characters must be uppercase, and all 6 values are required; or
        // rgb (val, val, val) / rgb(val val val) (commas are not essential)
        primary: {
          200: '#FFDA66', // pale orange,   Hue 45, Luminance 70
          300: '#FFD044', // orange,        Hue 45, Luminance 63
          400: '#FFC622', // orange,        Hue 45, Luminance 57
          500: '#FFBB00', // mid orange,    Hue 44, Luminance 50
          600: '#EEA600', // orange,        Hue 42, Luminance 47 ** coloured text **
          700: '#DD9100', // orange,        Hue 39, Luminance 43
          800: '#CC7E00', // brown,         Hue 37, Luminance 40
        },
        neutral: {
          150: '#F0F0F0', // rgb(240, 240, 240); pale grey, Hue 0, Luminance 94
          750: '#2C2C2C', // rgb(44, 44, 44);    dark grey, Hue 0, Luminance 17
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
