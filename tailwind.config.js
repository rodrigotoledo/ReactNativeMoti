/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#8007d9", 
        secondary: "#333",  
        accent: "#36092b",  
        light: "#fff",      
        muted: "#gray-300", 
        dark: "#1a1a1a",    
        inputBackground: "#f9f9f9",
      },
    },
  },
  plugins: [],
};
