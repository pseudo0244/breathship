/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'cormorant-bold': ['Cormorant-Bold', 'serif'],
        'cormorant-regular': ['Cormorant-Regular', 'serif'],
        'proxima-nova': ['Proxima Nova-Regular', 'sans-serif'],
      },
      colors: {
        // Brand colors
        'brand-green': '#535C3A',
        'brand-beige': '#FAF4F0',
        'brand-brown': '#AC683B',
        
        // Legacy colors (keeping for compatibility)
        primary: '#3D2B2A',
        'primary-dark': '#2A1E1D',
        'primary-light': '#5A3F3D',
        secondary: '#4D5442',
        'secondary-dark': '#3A4133',
        'secondary-light': '#6B7A5A',
        accent: '#8B7355',
        'accent-dark': '#6B5A42',
        'accent-light': '#A89B7A',
        earth: '#8F7B5A',
        'earth-dark': '#6B5A42',
        'earth-light': '#A89B7A',
        forest: '#2D4A3E',
        'forest-dark': '#1F3329',
        'forest-light': '#4A6B5A',
      }
    },
  },
  plugins: [],
};