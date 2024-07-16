/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Basis Grotesque', 'sans-serif'],
      'sans-2': ['Sweet Sans', 'sans-serif'],
      serif: ['Freight', 'serif']
    },
    colors: {
      'current': 'currentColor',
      'transparent': 'transparent',
      'white': '#ffffff',
      'true-black': '#000000',
      'bg': 'var(--bg-color)',
      'main': 'var(--main-color)',
      'text-color': 'var(--text-color)',
      'light-text-color': 'var(--light-text-color)',
      'hr-color': 'var(--hr-color)',
      'light-grey': 'var(--light-grey)',
      'error': 'var(--error)',
      'success': 'var(--success)',
      'notify': 'var(--notify)'
    },
    borderRadius: {
      'none': '0',
      'sm': '4px',
      DEFAULT: 'var(--base-border-radius)',
      'button': 'var(--button-border-radius)',
      'md': '12px',
      'lg': '20px',
      'full': '9999px',
      'large': '30px',
    },
    extend: {
      spacing: {
        'gutter': 'var(--site-gutters)',
        'margin': 'var(--site-margins)',
        'v-space': 'var(--vertical-spacing)',
        'v-space-sm': 'var(--vertical-spacing-small)',
        'half-gutter': 'calc(var(--site-gutters) / 2)',
        'half-margin': 'calc(var(--site-margins) / 2)',
        'half-v-space': 'calc(var(--vertical-spacing) / 2)',
        'header-height': 'var(--header-height)',
        'header-height-expanded': 'var(--header-height-expanded)',
        'sticky-top': 'var(--sticky-top)',
        'full-header-height': 'var(--full-header-height)',
        'screen-height': 'calc(100 * var(--vh))'
      },
      maxWidth: {
        'site-max-w': 'var(--site-max-width)',
        'narrow': 'var(--narrow-width)',
        '1/2': '50%',
        '1/3': '33.333%',
        '1/4': '25%'
      },
      transitionDuration: {
        DEFAULT: 'var(--md-speed)',
        'slow': 'var(--slow-speed)',
        'fast': 'var(--fast-speed)'
      },
      transitionProperty: {
        'width': 'width, min-width',
        'height': 'height, min-height',
        'top': 'top',
        'color': 'color',
        'opacity': 'opacity',
        'background': 'background',
        'border': 'border'
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
      },
      transitionDelay: {
        'stagger-time': 'var(--stagger-time)',
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '2/1': '2 / 1',
        '1/2': '1 / 2'
      },
      screens: {
        'huge': '1900px'
      }
    }
  },
  plugins: [],
}
