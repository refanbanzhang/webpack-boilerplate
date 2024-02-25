const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const DIST_PATH = path.resolve(__dirname, 'src')
const ASSETS_PATH = path.resolve(__dirname, 'build')

module.exports = {
  entry: 'src/index.js',
  output: {
    publicPath: '',
    path: DIST_PATH,
    filename: 'assets/js/[name].[chunkhash:8].js'
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(ASSETS_PATH),
  ]
}