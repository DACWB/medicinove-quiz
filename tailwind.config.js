/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0F1115',
        'bg-card': '#1C1F26',
        'border': '#2A2E37',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B4BC',
        'text-muted': '#8A8F98',
        'action': '#3A7AFE',
        'action-hover': '#5C8CFF',
        'error': '#E5533D',
      },
    },
  },
  plugins: [],
}
