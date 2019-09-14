const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");
const helper = require("./helper");

const ENTRYS_DIR = path.resolve(__dirname, "src/pages/**/*.js");

const HtmlSchema = [];
helper.getHtmlSchema(ENTRYS_DIR).forEach(item => {
  HtmlSchema.push(
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true, //  去掉注释
        collapseWhitespace: true, //  去掉空格
        removeAttributeQuotes: true //  移除属性的引号
      },
      filename: `pages/${item.name}.html`,
      template: "./src/template/index.html",
      //  如果chunks不配置值 那么默认引入所有入口js文件 所以需要指定
      //  vendor是指提取涉及node_modules中的公共模块
      //  manifest是对vendor模块做的缓存
      chunks: ["manifest", "vendor", "common", item.entry],
      chunksSortMode: "manual"
    })
  );
});

module.exports = merge(baseConfig, {
  // 调试的时候 会根据.map文件去定位原始代码的位置 利于调试
  devtool: "source-map",
  
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/images/[hash:8].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __PROD__: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "assets/js/[name].[chunkhash:8].js",
      minChunks: Infinity
    }),

    // 切记 这里会的启动 会连带css也打包出一个common.css 但是很明显这里指定的格式是js 很奇怪 要搞清楚
    new webpack.optimize.CommonsChunkPlugin({
      name: ["common"],
      filename: "assets/js/[name].[chunkhash:8].js",
      chunks: ["vehicleList", "addVehicle", "home"] // 从数组中的入口中提取公共文件
    }),

    new ExtractTextPlugin("assets/css/[name].[chunkhash:8].css"),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        safe: true,
        autoprefixer: false,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),

    ...HtmlSchema,

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        drop_console: false
      },
      output: {
        beautify: false, // 最紧凑的输出
        comments: false // 删除所有的注释
      }
    })
  ]
});
