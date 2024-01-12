/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      md: "1050px",
      lg: "1280px",
      xl: "1536px",
      "2xl": "2010px",
    },
    container: {
      maxWidth: "2010px",
    },
    extend: {
      fontFamily: {
        NotoHk: ["Noto Sans HK", "sans-serif"],
      },
      colors: {
        "custom-blue": "#262262",
      },
      animation: {
        bounce: "bounce 1s ease-in-out",
      },
      keyframes: {
        bounce: {
          "0% 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
}
