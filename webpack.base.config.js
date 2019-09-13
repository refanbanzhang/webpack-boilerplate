const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const DIST_PATH = path.resolve(__dirname, "build");
const ENTRYS_DIR = path.resolve(__dirname, "src/pages/**/index.js");

/**
 * 获取指定路径下的文件
 * @param {String} globPath
 */
function getEntrys(globPath) {
  const entries = {};
  const files = glob.sync(globPath);

  files.forEach(filePath => {
    const split = filePath.split("/");
    const name = split[split.length - 2];
    entries[name] = filePath;
  });

  return entries;
}

module.exports = {
  entry: {
    vendor: ["react", "react-dom", "axios"],
    ...getEntrys(ENTRYS_DIR)
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

exports.getEntrys = getEntrys;
