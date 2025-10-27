const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
    sans: ["Montserrat", "sans-serif"], // 👈 default body font
      serif: ["Montserrat", "sans-serif"], // 👈 consistent headings too
      DejaVu: ["DejaVu Sans", "Arial", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        'emerald': {
          50: '#FDEDEB',
          100: '#F9D4D1',
          200: '#F4A9A5',
          300: '#F07E79',
          400: '#EC5450',
          500: '#B52427',
          600: '#A21F22',
          700: '#8F1A1D',
          800: '#7C1518',
          900: '#6A1013',
          950: '#54100F',
        },
      },
      height: {
        header: "560px",
      },
      backgroundImage: {
        "page-header": "url('/page-header-bg.jpg')",
        "contact-header": "url('/page-header-bg-2.jpg')",
        subscribe: "url('/subscribe-bg.jpg')",
        "app-download": "url('/app-download.jpg')",
        cta: "url('/cta-bg.png')",
        "cta-1": "url('/cta/cta-bg-1.png')",
        "cta-2": "url('/cta/cta-bg-2.png')",
        "cta-3": "url('/cta/cta-bg-3.png')",
      },
      animation: {
        scroll: 'scroll 30s linear infinite', // Adjust the duration as needed
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },  // Starting position
          '100%': { transform: 'translateX(-100%)' }, // Move by full width of both card sets
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
