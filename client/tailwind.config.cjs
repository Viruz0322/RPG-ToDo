/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      zIndex: {
        '1' : '1'
      },
      colors: {
        warprime: '#F5E05A',
        warsecond: '#DB873d',
        healprime: '#9CE845',
        healsecond: '#43A856',
        scholprime: '#79EAF2',
        scholsecond: '#4B9EC4',
      },
      fontFamily: {
        display: ['Roboto Mono', 'monospace']
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    }
  },
  plugins: [require("daisyui")],
}
