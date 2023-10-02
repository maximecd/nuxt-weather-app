import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: 'Product Sans, sans-serif',
      },
      colors: {
        primary: {
          100: '#F6EDFF',
          200: '#EBDEFF',
          300: '#E9DFFC',
          400: '#E1D3FA',
          600: '#E0B6FF',
        },
      },
    },
  },
}
