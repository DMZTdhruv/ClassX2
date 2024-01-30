/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "Primary_purple": "#891DCC",
        "Primary_gray": "#171717"
      },
      fontFamily: {
        "Poppins": "Poppins"
      }
    },
  },
  plugins: [],
};
