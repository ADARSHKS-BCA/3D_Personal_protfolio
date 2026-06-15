/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0f1e',
          2: '#0d0d1f',
        },
        surface: '#12122a',
        border: 'rgba(139,92,246,0.2)',
        purple: {
          DEFAULT: '#8b5cf6',
          glow: 'rgba(139,92,246,0.4)',
        },
        cyan: '#06b6d4',
        text: {
          DEFAULT: '#f8fafc',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      transitionTimingFunction: {
        'ease-in-custom': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out-custom': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out-custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'fast': '300ms',
        'standard': '600ms',
        'slow': '1000ms',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shine': {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
