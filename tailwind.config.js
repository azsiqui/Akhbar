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
        cream: {
          50: '#FDFBF7',
          100: '#F8F4EC',
          200: '#F1E9DA',
          300: '#E7DBC4',
          400: '#D8C7A5',
        },
        brown: {
          50: '#F6F2EF',
          100: '#E7DDD7',
          200: '#CBB7AC',
          300: '#AC8C7A',
          400: '#8C6D58',
          500: '#4B3425',
          600: '#3D2A1E',
          700: '#322217',
          800: '#261A11',
          900: '#1C120B',
        },
        forest: {
          50: '#F2F7F3',
          100: '#DFEBE1',
          200: '#BBD6C0',
          300: '#91BC98',
          400: '#639E6D',
          500: '#355E3B',
          600: '#2A4B2F',
          700: '#213B25',
          800: '#182B1B',
          900: '#0F1C11',
        },
        gold: {
          50: '#FBF7ED',
          100: '#F5ECCE',
          200: '#EBD799',
          300: '#E0BF63',
          400: '#C89B3C',
          500: '#B0822A',
          600: '#8F661F',
          700: '#6E4D17',
          800: '#4F3610',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#1D1D1D',
          600: '#181818',
          700: '#141414',
          800: '#0F0F0F',
          900: '#0A0A0A',
        },
        academic: {
          paper: '#F8F4EC',
          paperDark: '#191715',
          card: '#FFFFFF',
          cardDark: '#23201C',
          border: '#E8DEC9',
          borderDark: '#36312B',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(75, 52, 37, 0.08), 0 2px 6px -1px rgba(75, 52, 37, 0.04)',
        'academic-lg': '0 10px 30px -4px rgba(75, 52, 37, 0.12), 0 4px 12px -2px rgba(75, 52, 37, 0.06)',
        'gold-glow': '0 0 15px rgba(200, 155, 60, 0.25)',
      }
    },
  },
  plugins: [],
}
