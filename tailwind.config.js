/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ scan all React files for Tailwind classes
  ],
  theme: {
    extend: {
      backgroundSize: {
        '400%': '400% 400%',
      },
      keyframes: {
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':    { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
      },
    },
  },
  
};

