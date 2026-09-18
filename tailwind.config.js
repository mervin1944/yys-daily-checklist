/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yys: {
          bg: '#1e1b2e',
          panel: '#2a2640',
          accent: '#c9a876',
          accent2: '#7c5cff',
        },
      },
    },
  },
  plugins: [],
}
