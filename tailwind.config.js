/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#eaf6f0', 100: '#d5eddf', 200: '#acdcbf', 300: '#77cba1',
          400: '#38b884', 500: '#169d70', 600: '#0c835f', 700: '#0a6d51',
          800: '#09543f', 900: '#073c30', 950: '#082b23'
        },
        gov: {
          emerald: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#006a4e', // Bangladesh Gov Green
            900: '#064e3b',
            950: '#022c22',
          },
          red: {
            DEFAULT: '#f42a41', // Bangladesh Red
            50: '#fff1f2',
            500: '#f42a41',
            600: '#e11d48',
            700: '#be123c',
          },
          gold: {
            DEFAULT: '#d97706',
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          navy: {
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          }
        }
      },
      fontFamily: {
        sans: ['"Noto Sans Bengali"', '"Hind Siliguri"', '"Inter"', 'sans-serif'],
        bengali: ['"Noto Sans Bengali"', '"Hind Siliguri"', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 2px 12px rgba(7, 60, 48, 0.06)',
        'gov-lg': '0 8px 25px rgba(7, 60, 48, 0.12)',
        'glass': '0 5px 20px rgba(7, 60, 48, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
