/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'opal-gradient': 'radial-gradient(circle at 50% 50%, #A8E4DA, #E0B1CB 50%, #C2D6E1 100%)',
        'opal-gradient-side': 'linear-gradient(to bottom right, #C2D6E1, #A8E4DA 50%, #E0B1CB 100%)'
      }),
      borderColor: theme => ({
        'white-13': 'rgba(255, 255, 255, 0.13)'
      })
    },
  },
  plugins: [],
}
