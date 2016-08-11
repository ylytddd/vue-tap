var webpack = require('webpack');

module.exports = {
  entry: ['./test/main.js'],
  output: {
    path: './test/',
    filename: 'build.js'
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
