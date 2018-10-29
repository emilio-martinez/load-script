import path from 'path';
import prettier from 'rollup-plugin-prettier';
import camelcase from 'camelcase';

const pkg = require('./package.json');

const libraryName = camelcase(pkg.name);
const input = path.resolve(__dirname, './dist/index.js');
const file = {
  main: pkg.main,
  module: pkg.module
};

export default [
  {
    input,
    output: [
      { file: file.module, format: 'es', sourcemap: false },
      { file: file.main, name: libraryName, format: 'cjs', sourcemap: false }
    ],
    plugins: [
      prettier({
        parser: 'babylon',
        singleQuote: true
      })
    ]
  }
];
