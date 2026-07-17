/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burdan: {
          red: '#C41E24',
          darkred: '#8B1519',
          lightred: '#FEE2E2',
          orange: '#E8571F',
          darkorange: '#BF4316',
          white: '#FFFFFF',
          gray: '#F5F6FA',
          darkgray: '#2D3142',
          black: '#1A1A2E',
          gold: '#F0A500',
          cream: '#FFF8F0',
        }
      },
      fontFamily: {
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['DM Sans', 'system-ui', 'sans-serif'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.7s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.7s ease-out 0.4s forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
