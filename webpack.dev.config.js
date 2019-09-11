const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");

const PAGES_DIR = path.resolve(__dirname, "src/pages");
const ENTRYS_DIR = path.resolve(__dirname, "src/pages/**/*.js");
const DIST_PATH = path.resolve(__dirname, "build");

function resolve(prefix, _path) {
  return path.resolve(prefix, _path);
}

function getHtmlSchema() {
  const resultEntry = [];
  const entryFiles = glob.sync(ENTRYS_DIR);
  entryFiles.forEach(filePath => {
    const str = filePath.split("pages")[1];
    const name = str.substring(1, str.lastIndexOf("/"));
    const entry = name.split("/")[name.split("/").length - 1];
    resultEntry.push({
      name: name,
      entry: entry
    });
  });
  return resultEntry;
}

const htmlSchema = getHtmlSchema();

const arr = [];
htmlSchema.forEach(item => {
  arr.push(
    new HtmlWebpackPlugin({
      filename: resolve(DIST_PATH, `pages/${item.name}.html`),
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
        test: /\.(jpe?g|png|gif|bmp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/images/[hash:8].[ext]"
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
    // 配置全局变量 无需import或者requre即可使用
    new webpack.ProvidePlugin({
      $: "jquery"
    }),

    // 将第三方库打包
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "assets/js/[name].[chunkhash:8].js",
      minChunks: Infinity
    }),

    // 切记 这里会的启动 会连带css也打包出一个common.css 但是很明显这里指定的格式是js 很奇怪 要搞清楚
    // 推测这里是不分文件类型的 所以js和css都有被抽取的可能
    new webpack.optimize.CommonsChunkPlugin({
      name: ["common"],
      filename: "assets/js/[name].[chunkhash:8].js",
      chunks: ["vehicleList", "addVehicle", "home"] // 从数组中的入口中提取公共文件
    }),

    new ExtractTextPlugin("assets/css/[name].[chunkhash:8].css"),

    // 定义全局变量
    // 这里会直接进行文本替换 如果你定义一个ENV: 'production' 那么在业务代码中使用ENV会变成一个production变量
    // 所以 如果你期望ENV被替换为一个字符串'production'而不是production变量 你需要用引号包起来 或者使用
    // JSON.stringify('production')
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    ...arr
    // new HtmlWebpackPlugin({
    //   filename: resolve(DIST_PATH, "pages/peccancy/vehicleList.html"),
    //   //  如果chunks不配置值 那么默认引入所有入口js文件 所以需要指定
    //   //  vendor是指提取涉及node_modules中的公共模块
    //   //  manifest是对vendor模块做的缓存
    //   chunks: ["manifest", "vendor", "common", "vehicleList"],
    //   chunksSortMode: "manual"
    // })
  ]
});
