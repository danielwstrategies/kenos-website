/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kenos Restaurant Brand Colors
        primary: {
          DEFAULT: '#C8102E',
          light: '#E31837',
          dark: '#A00D25',
          brown: '#3D1A1A',
        },
        secondary: {
          DEFAULT: '#3D1A1A',
          light: '#5D2A2A',
          dark: '#2B1515',
        },
        accent: {
          DEFAULT: '#D4AF37',
          light: '#E5C54D',
          dark: '#B8962E',
          gold: '#D4AF37',
        },
        brand: {
          red: '#C8102E',
          brown: '#3D1A1A',
          gold: '#D4AF37',
          cream: '#F5E6D3',
        },
        neutral: {
          50: '#FFFFFF',
          100: '#FAF6F0',
          200: '#F5E6D3',
          300: '#E5D5C3',
          400: '#D4D4D4',
          500: '#A3A3A3',
          600: '#666666',
          700: '#525252',
          800: '#2D2D2D',
          900: '#000000',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
        yeseva: ['var(--font-heading)', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.5rem' }], // 14px
        'lg': ['1rem', { lineHeight: '1.75rem' }],
        'xl': ['1.125rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        'huge': ['4rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'hard': '0 8px 24px rgba(0, 0, 0, 0.16)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
