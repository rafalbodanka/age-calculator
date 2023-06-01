/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            'purple': 'hsl(259, 100%, 65%)',
            'lightRed': 'hsl(0, 100%, 67%)',
            'offWhite': 'hsl(0, 0%, 94%)',
            'lightGrey': 'hsl(0, 0%, 86%)',
            'smokeGrey': 'hsl(0, 1%, 44%)',
            'offBlack': 'hsl(0, 0%, 8%)'
        },
        fontFamily: {
            'poppins': ['Poppins']
        },
        fontSize: {
          '32': '32px',
        },
        fontWeight: {
          '800': '800',
        },
        borderRadius: {
          '5xl': '200px',
          '4xl': '100px',
        }
      },
    },
    plugins: [],
  }