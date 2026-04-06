/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        slideFromLeft: {
          '0%': { transform: 'translate3d(-24vw, 0, 0) scale(0.94)', opacity: '0' },
          '60%': { opacity: '0.82' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '1' },
        },
        slideFromRight: {
          '0%': { transform: 'translate3d(24vw, 0, 0) scale(0.94)', opacity: '0' },
          '60%': { opacity: '0.82' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '1' },
        },
        slideFromTop: {
          '0%': { transform: 'translate3d(0, -18vh, 0) scale(0.94)', opacity: '0' },
          '60%': { opacity: '0.82' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '1' },
        },
        slideFromBottom: {
          '0%': { transform: 'translate3d(0, 18vh, 0) scale(0.94)', opacity: '0' },
          '60%': { opacity: '0.82' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '1' },
        },
        contentReveal: {
          '0%': {
            opacity: '0.18',
            transform: 'translate3d(0, 24px, 0)',
            filter: 'blur(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
            filter: 'blur(0)',
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        slideFromLeft: 'slideFromLeft 1.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        slideFromRight: 'slideFromRight 1.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        slideFromTop: 'slideFromTop 1.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        slideFromBottom: 'slideFromBottom 1.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        contentReveal: 'contentReveal 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both',
      },
    },
  },
  plugins: [],
}
