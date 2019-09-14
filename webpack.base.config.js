const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const helper = require("./helper");

const DIST_PATH = helper.resolve("build");
const ENTRYS_DIR = helper.resolve("src/pages/**/index.js");

module.exports = {
  entry: {
    vendor: ["react", "react-dom", "axios"],
    ...helper.getEntrys(ENTRYS_DIR)
  },

  output: {
    path: DIST_PATH,
    filename: "assets/js/[name].[chunkhash:8].js", // 这里的name是根据entry的入口key决定的
    publicPath: "/build" //  生成到打包后的文件中的路径前缀
  },

  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|otf|woff2|svg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/font/[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      "@": path.resolve("src")
    },
    extensions: [".js", ".jsx", ".css", ".scss", ".json"]
  },

  plugins: [
    new CleanWebpackPlugin(DIST_PATH),

    // 配置全局变量 无需import或者requre即可使用
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
};
