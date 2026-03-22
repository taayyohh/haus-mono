import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#131313',
        foreground: '#ffffff',
      },
      backgroundImage: {
        'opal-gradient':
          'radial-gradient(circle at 50% 50%, #A8E4DA, #E0B1CB 50%, #C2D6E1 100%)',
        'opal-gradient-side':
          'linear-gradient(to bottom right, #C2D6E1, #A8E4DA 50%, #E0B1CB 100%)',
      },
      borderColor: {
        'white-13': 'rgba(255, 255, 255, 0.13)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
