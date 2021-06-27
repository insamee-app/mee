module.exports = {
  purge: {
    content: ['node_modules/insamee-components/src/components/**'],
  },
  theme: {
    colors: {
      primary: {
        base: '#931F1C',
        dark: '#5F0000',
        light: '#FF8F8B',
      },
      secondary: {
        base: '#3BA99C',
        dark: '#00796E',
        light: '#72DBCD',
      },
      grey: {
        base: '#998483',
        dark: '#301514',
        light: '#E4DCDC',
      },
      'grey-secondary': {
        base: '#889492',
        dark: '#182C2A',
        light: '#DEE2E2',
      },
      white: '#FCFDFD',
      black: '#000517',
      negative: '#F33C3C',
      positive: '#63ED92',
    },
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
