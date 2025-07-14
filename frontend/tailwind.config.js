/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#2563eb',
        'dark-primary': '#111827',
        'dark-secondary': '#1f2937',
        'dark-tertiary': '#374151',
      },
    },
  },
  plugins: [],
};
