import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

const plugins = [
  postcss({
    extensions: ['.css', '.sss'],
  }),
  babel(babelrc()),
];

export default {
  entry: 'lib/index.js',
  plugins,
  external,
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'lodash.debounce': 'debounce',
  },
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'reactBottomScrollListener',
      sourceMap: true,
    },
  ],
};
