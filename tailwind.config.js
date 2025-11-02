/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul Institucional - Base del logo
        primary: {
          50: '#e8edf5',
          100: '#d1dbe9',
          200: '#a3b7d3',
          300: '#7593bd',
          400: '#476fa7',
          500: '#0a2342',
          600: '#081c35',
          700: '#061528',
          800: '#040e1a',
          900: '#02070d',
        },
        // Dorado Ocre - Detalle del logo
        secondary: {
          50: '#fef6e8',
          100: '#fdedd1',
          200: '#fbdba3',
          300: '#f9c975',
          400: '#f7b747',
          500: '#b8860b',
          600: '#936b09',
          700: '#6e5007',
          800: '#4a3504',
          900: '#251b02',
        },
        // Azul Amigable - Aporta frescura
        accent: {
          50: '#e8f2ff',
          100: '#d1e5ff',
          200: '#a3cbff',
          300: '#75b1ff',
          400: '#4797ff',
          500: '#3b82f6',
          600: '#2f68c5',
          700: '#234e94',
          800: '#183462',
          900: '#0c1a31',
        },
        // Naranja Cálido - Llamativo
        warm: {
          50: '#fff7e8',
          100: '#ffefd1',
          200: '#ffdfa3',
          300: '#ffcf75',
          400: '#ffbf47',
          500: '#f59e0b',
          600: '#c47e09',
          700: '#935f07',
          800: '#623f04',
          900: '#312002',
        },
        // Blanco Suave - Limpio y neutro
        soft: {
          50: '#ffffff',
          100: '#f8f8fa',
          200: '#f0f0f5',
          300: '#e8e8f0',
          400: '#e0e0eb',
          500: '#d8d8e6',
          600: '#adadb8',
          700: '#82828a',
          800: '#56565c',
          900: '#2b2b2e',
        },
      },
      spacing: {
        '70': '280px',
        '18': '70px',
      },
      zIndex: {
        '100': '100',
        '50': '50',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
