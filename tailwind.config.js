/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'system-ui'],
        'roboto': ['"Roboto"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

