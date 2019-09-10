const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'build')
const ENTRYS_DIR = path.resolve(__dirname, 'src/pages/**/*.js')

function getEntrys() {
  const entryFiles = glob.sync(ENTRYS_DIR)
  var resultEntry = {}
  entryFiles.forEach(filePath => {
      const filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      console.log('文件路径', filePath)
      console.log('文件名', filename)
      resultEntry[filename] = filePath
  })
  console.log('读取的目录：', resultEntry)
  return resultEntry  
}

getEntrys()

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'axios', './src/assets/js/weui.min.js'],
    vehicleList: './src/pages/peccancy/vehicleList/index.jsx',
    addVehicle: './src/pages/peccancy/addVehicle/index.jsx',
    userPeccancy: './src/pages/peccancy/userPeccancy/index.jsx',
    userPeccancyDetail: './src/pages/peccancy/userPeccancyDetail/index.jsx'
  },

  output: {
    path: DIST_PATH,
    filename: '[name].[chunkhash:8].js', // 这里的name是根据entry的入口key决定的
    publicPath: '', //  生成到打包后的文件中的路径前缀
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
    new CleanWebpackPlugin(DIST_PATH),

    new webpack.DefinePlugin({
      root: JSON.stringify('/portal')
    })
  ]
}