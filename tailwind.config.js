/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-roboto)'],
        slab: ['var(--font-roboto-slab)']
      },
      colors: {
        primary: "var(--color-primary)",
        onPrimary: "var(--color-on-primary)",
        accentPrimary: "var(--color-accent-primary)",
        secondary: "var(--color-secondary)",
        onSecondary: "var(--color-on-secondary)",
        accentSecondary: "var(--color-accent-secondary)",
        background: "var(--color-background)",
        onBackground: "var(--color-on-background)",
        surface: "var(--color-surface)",
        onSurface: "var(--color-on-surface)",
        accentSurface: "var(--color-accent-surface)",
        darkerSurface: "var(--color-darker-surface)",
        surfaceBorder: "var(--color-surface-border)",
      }
    },
  },
  plugins: [],
}
