/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  content: [
    "./index.html", // rootフォルダのindex.htmlも含める
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        //フォント
        stardos: ['"Stardos Stencil"', "system-ui"],
        yuji: ['"Yuji Hentaigana Akari"', "cursive"],
      },
      animation: {
        "rainbow-pulse": "rainbow-pulse 3s linear infinite",
      },
      keyframes: {
        "rainbow-pulse": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
            transform: "scale(1)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
  plugins: [],
};
