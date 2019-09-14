const glob = require("glob");
const path = require("path");

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

/**
 * 组装HtmlWebpackPlugin插件需要的参数
 * @param {String} path
 */
function getHtmlSchema(path) {
  const htmlObj = [];
  const files = glob.sync(path);

  files.forEach(filePath => {
    const split = filePath.split("pages")[1];
    const name = split.substring(1, split.lastIndexOf("/"));
    const entry = name.split("/")[name.split("/").length - 1];
    htmlObj.push({
      name: name,
      entry: entry
    });
  });

  return htmlObj;
}

/**
 * 拼接绝对路径
 * @param {String} name
 */
function resolve(name) {
  return path.resolve(__dirname, name);
}

exports.resolve = resolve;
exports.getEntrys = getEntrys;
exports.getHtmlSchema = getHtmlSchema;
