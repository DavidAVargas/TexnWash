module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: '#BD5700',
      },
      animation: {
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'pulse-slower': 'pulse 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};