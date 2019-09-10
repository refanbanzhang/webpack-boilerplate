const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const DIST_PATH = path.resolve(__dirname, 'src')
const ASSETS_PATH = path.resolve(__dirname, 'build')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'axios', './src/assets/js/weui.min.js'],
    vehicleList: './src/pages/peccancy/vehicleList/index.jsx',
    addVehicle: './src/pages/peccancy/addVehicle/index.jsx',
    userPeccancy: './src/pages/peccancy/userPeccancy/index.jsx',
    userPeccancyDetail: './src/pages/peccancy/userPeccancyDetail/index.jsx'
  },

  output: {
    publicPath: '',
    path: DIST_PATH,
    filename: 'assets/js/[name].[chunkhash:8].js'
  },

  module: {
    rules: [{
      test: /\.(ttf|eot|woff|otf|woff2|svg)/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'assets/font/[hash:8].[ext]'
        }
      }]
    }]
  },

  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },

  plugins: [
    new CleanWebpackPlugin(ASSETS_PATH),

    new webpack.DefinePlugin({
      root: JSON.stringify('/portal')
    })
  ]
}