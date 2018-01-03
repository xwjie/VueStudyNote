import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [{
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  }
},{
  input: 'src/main-babel.js',
  output: {
    file: 'dist/bundle-babel.js',
    format: 'umd',
    name: 'Xiao'
  },
  plugins: [ 
  	resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}];