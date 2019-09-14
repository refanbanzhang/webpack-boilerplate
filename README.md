# webpack-boilerplate
手动配置webpack


### 目标清单
- [x] sass
- [x] 将build文件添加到.gitignore文件中
- [ ] 理清楚静态资源的打包输出目录关系
- [x] 优化一下读取入口的函数
- 字体图标
- [x] 配置省略js jsx文件后缀
- [x] 定义环境变量
- [x] 读取目录生成入口配置
- [x] 全局引入jquery
- [x] devtool: 'source-map' devtool: dev ? 'cheap-module-source-map' : 'source-map',

### 生成目录树的命令
`tree -l 2 -o output.txt`


##### 打包路径结果的分析
已知的打包路径控制点分别是：
- ouput.path
- ouput.filename
- ouput.publicPath

css：
- ExtractTextPlugin

图片：
- url-loader的name

js：
- CommonsChunkPlugin的filename

html：
- HtmlWebpackPlugin的filename


##### js打包说明
将第三方库文件打包到vendor.js中
将每个入口文件中的公共js打包到common.js中
将每个入口文件中的独立js打包到页面级别的js文件中
打包路径：`config.output.publicPath + assets/js/[name].[chunkhash:8].js`


##### css打包说明
将每个入口文件中的公共css打包到common.css中
将每个入口文件中的独立css打包到页面级别的文件中
打包路径：`config.output.publicPath + assets/css/[name].[chunkhash:8].css`


##### 关于`webpack.optimize.CommonsChunkPlugin`抽取公共文件打包
这个插件似乎不单只作用到`js`文件，连`css`文件也会作用到，所以我猜测它会针对任何文件进行抽取，不限于文件格式，后面进行验证我的猜想


##### 关于`HtmlWebpackPlugin`输出的目录
输出路径：`config.output.publicPath + HtmlWebpackPlugin.filename`


##### 关于`devtool`
> 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。

开发环境 cheap-module-source-map
生产环境 source-map
