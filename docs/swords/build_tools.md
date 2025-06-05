# 构建工具

## webpack

### Q & A

::: details

#### 无脚手架，使用webpack 进行工程搭建

ok

### webpack是什么？

::: details
JavaScript应用程序的静态模块打包工具。Webpack 是一个 模块打包工具（Module Bundler），主要解决前端开发中的以下问题：

* 模块化依赖管理：将分散的 JavaScript 文件（及其依赖的 CSS、图片等资源）合并成少数优化后的文件。
* 资源转换（Loader）：通过 Loader 将浏览器不能直接识别的语言（如 TypeScript、Sass、Less）或新特性（如 ES6+）转换成浏览器兼容的代码。
* 代码优化（Plugin）：压缩代码、拆分代码（Code Splitting）、Tree Shaking（删除未使用的代码）等。
:::

### 常见的loader?

::: details
以前有资源loader，现在改为了资源模块 （type: "asset"等）。资源模块(asset module)是一种模块类型，它允许使用 资源文件（字体，图标等）而无需配置额外 loader。(file-loader,raw-loader,url-loader, webpack5官网说它们将在不久 的将来被淘汰)。

语法转化

babel-loader: 将ES2015+ 代码并将其转换为 ES5
ts-loader: 将typescript转换为javascript
样式

style-loader 将模块导出的内容作为样式并添加到 DOM 中
css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
less-loader 加载并编译 LESS 文件
sass-loader 加载并编译 SASS/SCSS 文件
postcss-loader 使用 PostCSS 加载并转换 CSS/SSS 文件，处理css兼容性问题
stylus-loader 加载并编译 Stylus 文件
框架

vue-loader 加载并编译 Vue 组件

构建速度

thread-loader: 多线程打包

语法loader有babel-loader, ts-loader
框架有vue-loader
样式loader(css相关loader): style-loader, css-loader,sass-loader
构建速度：thread-loader
如果问一些：raw-loader,file-loader,url-loader,webpack5官网说不久之后淘汰，
将用资源模块来进行配置。
:::

### 常见的plugin?

### loader和plugin的区别？

::: details
loader是转换器，本质是一个函数，接收源代码内容作为参数，返回转换后的内容。如：es6+的语法，转换成浏览器兼容的代码。
plugin是扩展器，Webpack在构建过程会触发一系列生命周期钩子，Plugin则通过监听这些钩子，在特定的时机执行自定义逻辑。如代码压缩，修改资源。
:::

#### webpack执行过程

#### 常用loader，自定义loader

#### 常用plugins，自定义插件

#### babel-loader原理

词法分析，语法分析，ast ()

:::

### webpack源码

::: details

package.json

"bin": {
    "webpack": "bin/webpack.js" // 安装webpack-cli工具
}
  
"main": "lib/index.js",

index.js => lib/webpack.js
compiler.js
compilation.js
:::
