import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace'

export default [{
  input: 'src/main.js',
  output: {
    file: 'dist/xiao.js',
    format: 'umd',
    name: 'Xiao'
  },
  plugins: [ 
  	resolve(),
    babel({
      presets:[
        "es2015-rollup", "stage-0"
      ],
      exclude: 'node_modules/**' // only transpile our source code
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ]
}];