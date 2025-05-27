/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bda4ff',
          400: '#9f75ff',
          500: '#8546ff',
          600: '#7a2df7',
          700: '#6920dd',
          800: '#581cb3',
          900: '#471a8f',
          950: '#2c0e67',
        },
        secondary: {
          50: '#effcff',
          100: '#def7ff',
          200: '#b6f0ff',
          300: '#76e5ff',
          400: '#28d0fc',
          500: '#0ab3df',
          600: '#088fb7',
          700: '#0c7294',
          800: '#125e79',
          900: '#144e66',
          950: '#0a3245',
        },
        accent: {
          50: '#fff5ed',
          100: '#ffe8d3',
          200: '#fecba7',
          300: '#fda66f',
          400: '#fb7a36',
          500: '#f95e14',
          600: '#ea4009',
          700: '#c12d0a',
          800: '#9a250f',
          900: '#7c220f',
          950: '#430e05',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};