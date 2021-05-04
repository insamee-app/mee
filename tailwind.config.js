module.exports = {
  theme: {
    colors: {
      primary: {
        dark: '#7B0000',
        base: '#B20000',
        light: '#EC492C',
      },
      grey: {
        dark: '#6E5353',
        base: '#B59B9B',
        light: '#EBE0E0',
      },
      white: '#FCFCFC',
      black: '#221B1B',
    },
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
