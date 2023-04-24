/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#3C4DE9",
        "secondary": "#6587FF",
        "tertiary": "#3e3e3e",
      },
      fontFamily:{
        "sans": ["Poppins", "sans-serif"],
      },
      boxShadow:{
        "formCard": "0px 0px 4px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [],
}

