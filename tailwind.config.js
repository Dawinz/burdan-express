/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burdan: {
          red: '#B91C1C',
          darkred: '#7F1D1D',
          lightred: '#FEE2E2',
          orange: '#EA580C',
          darkorange: '#C2410C',
          white: '#FFFFFF',
          gray: '#E8EAED',
          darkgray: '#374151',
          black: '#111827',
          gold: '#D97706',
          cream: '#F9FAFB',
        }
      },
      fontFamily: {
        'heading': ['Archivo', 'system-ui', 'sans-serif'],
        'body': ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        'sans': ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '0.75rem',
        '3xl': '1rem',
        '4xl': '1.25rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.55s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.55s ease-out 0.12s forwards',
        'fade-up-delay-2': 'fadeUp 0.55s ease-out 0.24s forwards',
      },
    },
  },
  plugins: [],
}
