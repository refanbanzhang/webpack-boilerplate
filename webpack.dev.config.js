const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

const PAGES_DIR = path.resolve(__dirname, 'src/pages')
const ENTRYS_DIR = path.resolve(__dirname, 'src/pages/**/*.js')
const DIST_PATH = path.resolve(__dirname, 'build')

function resolve(prefix, _path) {
  return path.resolve(prefix, _path)
}

module.exports = merge(baseConfig, {
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader'
          }]
        })
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/images/[hash:8].[ext]'
          }
        }]
      },
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/[name].[chunkhash:8].js',
      minChunks: Infinity
    }),

    // 切记 这里会的启动 会连带css也打包出一个common.css 但是很明显这里指定的格式是js 很奇怪 要搞清楚
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      filename: 'assets/js/[name].[chunkhash:8].js',
      chunks: ['vehicleList'] // 从数组中的入口中提取公共文件
    }),

    new ExtractTextPlugin('assets/css/[name].[chunkhash:8].css'),

    new HtmlWebpackPlugin({
      filename: resolve(DIST_PATH, 'pages/peccancy/vehicleList.html'),
      //  如果chunks不配置值 那么默认引入所有入口js文件 所以需要指定
      //  vendor是指提取涉及node_modules中的公共模块
      //  manifest是对vendor模块做的缓存
      chunks: ['manifest', 'vendor', 'common', 'vehicleList'],
      chunksSortMode: "manual"
    }),
  ]
})