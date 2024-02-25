const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}