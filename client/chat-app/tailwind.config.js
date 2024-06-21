/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#3f0000 rgb(255 228 230)", // specify both thumb and track colors
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "5px",
            borderRadius: "30px"
          },
          "&::-webkit-scrollbar-track": {
            background: "#3f0000",
            borderRadius: "30px"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#3f0000",
            borderRadius: "30px",
            border: "1px solid #3f0000",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
