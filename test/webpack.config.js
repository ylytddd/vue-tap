var webpack = require('webpack');

module.exports = {
  entry: ['./main.js'],
  output: {
    path: './',
    filename: 'build.js'
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}
