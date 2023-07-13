/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
  
    animation: {
      wavingHand: 'wave 2s linear infinite',
  },
},
    colors: {
      lightBlue: "#00B4DB",
      midleBlue: "#0083B0",
      darkBlue: "#224488",
      lightGray: "#d1d5db",
      darkGray: "#262626",
      bgHeader: "#21618C26",
    },
 
},
  plugins: [],
};
