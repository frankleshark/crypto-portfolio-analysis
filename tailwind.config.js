/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#00FFA7',
          blue: '#008EFF',
          purple: '#9900FF',
        },
        light: {
          green: '#C5E5E0',
          blue: '#C6D8FF',
          purple: '#E2C6FF',
        },
        medium: {
          green: '#004C37',
          blue: '#004981',
          purple: '#5B0083',
        },
        dark: {
          green: '#002811',
          blue: '#011243',
          purple: '#340045',
        },
        custom: {
          black: '#0A0A0A',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 167, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 255, 167, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}