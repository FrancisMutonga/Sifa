/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",    
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nude: {
          light: '#E4C9A6', // Light nude
          DEFAULT: '#D2B48C', // Default nude
          dark: '#B8956F', // Dark nude
        },
        forest:{
          DEFAULT:'#2D3A34'
        },
        dusty:{
          DEFAULT:'#4A646C'
        }
      },
    },
  },
  plugins: [],
};
