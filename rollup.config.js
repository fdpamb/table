const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const replace = require('@rollup/plugin-replace');
const { uglify } = require('@blaumaus/rollup-plugin-uglify');

const config = (isProd) => ({
  input: 'src/index.js',
  output: {
    file: isProd ? 'react-table.min.js' : 'react-table.js',
    format: 'umd',
    globals: {
      react: 'React',
    },
    name: 'ReactTable',
    exports: 'named',
  },
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    }),
    commonjs({
      namedExports: {
        'react-is': ['isValidElementType', 'isElement'],
      },
    }),
    isProd ? uglify({
      compress: {
        dead_code: true,
        //warnings: false,
      },
    }) : null,
  ],
});

module.exports = [false, true].map(config);
