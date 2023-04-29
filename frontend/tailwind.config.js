/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
      colors: {
        card: 'rgba(68, 64, 60, 0.78)',
      },
      backgroundColor: {
        custom: 'rgb(0, 0, 0)',
      },
      backgroundImage: {
        custom:
          'radial-gradient(at 92% 24%, rgb(82, 82, 82) 0, transparent 45%), radial-gradient(at 5% 75%, rgb(68, 64, 60) 0, transparent 38%)',
      },
    },
  },
  plugins: [],
};
