const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

const PAGE_DIR = `${__dirname}/src/pages`

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
      title: '车辆列表',
      filename: `${PAGE_DIR}/peccancy/vehicleList.ftl`,
      chunks: ['vendor', 'common', 'vehicleList'],
      chunksSortMode: "manual"
    }),
  ]
})