export default {
  darkMode: 'class', // ✅ THIS IS REQUIRED
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['var(--font-arabic)'],
      },
    },
  },
  plugins: [],
}