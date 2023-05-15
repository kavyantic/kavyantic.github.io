/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    
    fontFamily:{
      body:['inter']
    },
    extend: {
      colors:{
        primary:"#2C3333",
        secondry:"#2E4F4F",
        dark:"#081f22"

      },
      textColor:{
        primary:"#CBE4DE",
        secondry:"#0E8388"
      }
      
    },
  },
  plugins: [],
  darkMode: 'media',

}


