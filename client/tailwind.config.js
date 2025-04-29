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
        primary: {
          light: '#4f46e5', // indigo-600
          dark: '#6366f1', // indigo-500 (lighter in dark mode)
        },
        secondary: {
          light: '#f3f4f6', // gray-100
          dark: '#1f2937', // gray-800
        },
        background: {
          light: '#ffffff', // white
          dark: '#111827', // gray-900
        },
        card: {
          light: '#f9fafb', // gray-50
          dark: '#1f2937', // gray-800
        },
        text: {
          light: '#111827', // gray-900
          dark: '#f9fafb', // gray-50
        },
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.08)',
        'custom-dark': '0 2px 10px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'slide-in': 'slideIn 0.2s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}