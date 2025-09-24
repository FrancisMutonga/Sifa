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
          light: '#E4C9A6',
          DEFAULT: '#D2B48C', 
          dark: '#B8956F',
        },
        forest:{
          DEFAULT:'#2D3A34'
        },
        dusty:{
          DEFAULT:'#4A646C'
        }
      },
      animation: {
        'slide-in': 'slideIn 1s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-delay': 'fadeIn 1s ease-out 0.5s',  
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      
    },
  },
  plugins: [],
};
