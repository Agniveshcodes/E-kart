/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        100: "440px",
        150: "700px",
        200: "840px"
      },
      width: {
        200: "800px"
      },
      margin: {
        68: "272px"
      }
    },
  },
  plugins: [],
}