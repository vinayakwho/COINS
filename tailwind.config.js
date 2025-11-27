/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43', // Deep Navy
        },
        accent: {
          50: '#fffaeb',
          100: '#fcefc7',
          200: '#fae3a3',
          300: '#f8d37e',
          400: '#f5c05a',
          500: '#f0a92e', // Gold/Amber
          600: '#d98b1c',
          700: '#b06611',
          800: '#8a4b0d',
          900: '#66360b',
        },
        cream: '#f8f5f2',
      }
    },
  },
  plugins: [],
}
