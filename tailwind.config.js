/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPrimary: '#EA7C69',
        customSecondary: '#9288E0',
        customDarkLine: '#393C49',
        customOrange: '#FFB572',
        customGreen: '#6BE2BE',
        customWhite_5: 'color-mix(in srgb, var(--color-white, #fff) 5%, transparent)',
      },
      backgroundColor: {
        customPrimary: '#EA7C69',
        customSecondary: '#9288E0',
        customDarkLine: '#393C49',
        customDark1: '#1F1D2B',
        customDark2: '#252836',
        customDark3: '#2D303E',
        customOrange: '#FFB572',
        customGreen: '#6BE2BE',
        customWhite_5: 'color-mix(in srgb, var(--color-white, #000) 50%, transparent)',
        customWhite_10: 'color-mix(in srgb, var(--color-white, #fff) 10%, transparent)',
      }
    },
  },
  variants: {
    extend: {
      stroke: ['hover', 'focus'], // Kích hoạt các trạng thái cho stroke
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari, Edge */
        },
        '.clip-trapezoid': {
          clipPath: 'polygon(25% 0, 75% 0, 100% 100%, 0% 100%)',
        },
      });
    },
  ],
}