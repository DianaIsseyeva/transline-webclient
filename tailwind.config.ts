import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '50': '50px',
        '32': '32px',
        '25': '25px',
        '19_83': '19.83px',
        '16': '16px',
        '14': '14px',
        '12': '12px',
      },
      lineHeight: {
        '100': '100%',
        '110': '110%',
        '120': '120%',
        '140': '140%',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        grey: {
          DEFAULT: '#D9D9D9',
          light: '#F4F8F9',
          charcoal: '#252526',
          charcoal70: '#454545',
          charcoal40: '#808080',
        },
        primary: '#05C0E6',
        disabled: '#C1EFF9',
        error: '#E62B05',
        blue: { primary: '#05C0E6' },
      },
      fontFamily: { sans: ['var(--font-sans)'] },
      screens: {
        mobile: { min: '320px', max: '767px' },
        tablet: { min: '768px', max: '1280px' },
        desktop: { min: '1280px' },
      },
    },
  },

  plugins: [],
};

export default config;
