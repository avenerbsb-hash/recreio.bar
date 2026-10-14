import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#0a0b0d', 900: '#111316', 850: '#16191d', 800: '#1c2025', 700: '#262b31', 600: '#353b43', 500: '#4a515b' },
        ok: { DEFAULT: '#22c55e', soft: '#0f2a1a' },
        warn: { DEFAULT: '#eab308', soft: '#2b2408' },
        bad: { DEFAULT: '#ef4444', soft: '#2e1112' },
      },
      fontFamily: { sans: ['var(--font-sans)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
