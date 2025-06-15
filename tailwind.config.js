/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          300: '#FFB380',
          400: '#FFA066',
          500: '#FF9D66',
          600: '#FF8533',
        },
        gray: {
          750: '#2D3748',
          850: '#1A202C',
          900: '#121826',
          950: '#0D1117',
        },
      },
      boxShadow: {
        'inner-orange': 'inset 0 2px 4px 0 rgba(255, 157, 102, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};