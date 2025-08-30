// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// module.exports = {
//    darkMode: "class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode based on the 'dark' class
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-icon': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        'fade-in-down-delay': 'fade-in-down 1s ease-out 0.5s forwards',
        'fade-in-down-delay-2': 'fade-in-down 1s ease-out 1s forwards',
        'fade-in-down-delay-3': 'fade-in-down 1s ease-out 1.5s forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'pulse-icon': 'pulse-icon 2s infinite',
      },
    },
  },
  plugins: [],
}