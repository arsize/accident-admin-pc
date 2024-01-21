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
        yellowbtn: {
          50: "#FCB04C",
          100: "#FCB04C",
          200: "#FCB04C",
          300: "#FCB04C",
          400: "#FCB04C",
          500: "#FCB04C",
          600: "#FCB04C",
          700: "#FCB04C",
          800: "#FCB04C",
          900: "#FCB04C",
          950: "#FCB04C",
        },
        defaultb: {
          50: "#85C8EE",
          100: "#85C8EE",
          200: "#85C8EE",
          300: "#85C8EE",
          400: "#85C8EE",
          500: "#85C8EE",
          600: "#85C8EE",
          700: "#85C8EE",
          800: "#85C8EE",
          900: "#85C8EE",
          950: "#85C8EE",
        },
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
