import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        title: ['Work Sans', 'system-ui', '-apple-system', 'sans-serif'],
        founders: ['Founders Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#333',
            p: {
              marginBottom: '1.5rem',
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
              fontWeight: '400',
            },
            h1: {
              fontFamily: 'Work Sans, system-ui, -apple-system, sans-serif',
            },
            h2: {
              fontFamily: 'Work Sans, system-ui, -apple-system, sans-serif',
            },
            h3: {
              fontFamily: 'Work Sans, system-ui, -apple-system, sans-serif',
            },
          },
        },
      },
    },
  },
  plugins: [typographyPlugin],
};
