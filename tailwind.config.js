const { default: postcss } = require("postcss");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
      fontFamily: {
        body: ["inter"],
      },
      // extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        },
        // Using modern `hsl`
      },
      textColor: {
        primary: "rgb(var(--color-text-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
      },
    },
    // },
  },
  plugins: [
  createThemeVariant('navy'),
  createThemeVariant('dark'),
  createThemeVariant('dracula')
  ],
  darkMode: ["class"],
};


function createThemeVariant(name){
  return plugin(function ({ addVariant, e }) {
    addVariant(`${name}`, ({ container, separator }) => {
      const supportsRule = postcss.rule({
        selector:'body',
        raws:{before:'body',between:`[data-theme="${name}"]`,selector:'body'}
      });
//         const supportsRule = postcss.atRule({
// name:'support'
//         });
    
      supportsRule.append(container.nodes);
      container.append(supportsRule);
      
    
    }); 
  })

}