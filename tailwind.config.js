/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        primary: {
          lightest: '#E3F4F6',
          light: '#16C2D5',
          dark: '#0F172A',
        },
        secondary: {
          dark: '#10217D',
        },
        accent: { one: '#D7BAAD', two: '#3F3D56', three: '#2E4450' },
      },
      keyframes: {
        bouncex: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': ' cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        bounceX: 'bouncex 1s infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })], // be warying!!! as they are only supported in Webkit-based browsers
}
