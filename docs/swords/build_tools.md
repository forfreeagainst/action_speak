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


## esbuild(开发环境)

```md
esbuild.context({
  entryPoints: [entry], //入口
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), //出口
  bundle: true, // reactivity -> shared 会打包到一起
  platform: "browser", //打包给浏览器使用
  sourcemap: true, //可以调试源代码
  format,
  globalName: pkg.buildOptions?.name
}).then(ctx => {
  console.log("start dev");
  return ctx.watch();//监控入口文件持续进行打包处理
})
```

## rollup

Rollup 是一个基于 ES 模块（ESModule）进行开发的 JavaScript 模块打包工具。

### 命令行接口

#### 命令行标志

```md
-c, --config <filename>     使用此配置文件
-w, --watch                 监视产物文件并在更改时重新构建
--environment <values>      传递给配置文件的设置（请参阅示例）
```


### rollup常用插件

核心打包工具 & Babel 相关

* @babel/core	Babel 的核心库，用于 JavaScript 代码转换（如 ES6+ → ES5）。
* @rollup/plugin-babel	让 Rollup 支持 Babel，用于 转译现代 JS 语法 或 TypeScript。
* @rollup/plugin-commonjs	将 CommonJS 模块（如 Node.js 的 require）转换为 ES 模块（import），以便 Rollup 处理。
* @rollup/plugin-node-resolve	解析 node_modules 中的第三方依赖，使 Rollup 能正确打包它们。
* @rollup/plugin-replace	在打包时 替换代码中的变量（如 process.env.NODE_ENV → "production"）。

Vue 相关

* @vue/compiler-sfc	Vue 3 的 单文件组件（SFC）编译器，用于解析 .vue 文件中的 template、script 和 style。
* rollup-plugin-vue	Rollup 插件，用于打包 Vue 单文件组件（.vue 文件）（Vue 2 和 Vue 3 都支持）。

CSS 处理

* autoprefixer	自动添加 CSS 浏览器前缀（如 -webkit-, -moz-），确保兼容性。
* clean-css	压缩 CSS，删除注释、空格，优化代码。
* rollup-plugin-css-only	提取 Vue 组件中的 CSS 并生成单独的 .css 文件。
* rollup-plugin-css-porter	类似功能，可合并多个 CSS 文件并优化。

生产环境优化

* cross-env	跨平台设置环境变量（如 NODE_ENV=production），避免 Windows/macOS 兼容性问题。
* rollup-plugin-terser	使用 Terser 压缩 JS 代码，删除注释、缩短变量名，减小文件体积。

## Vite

AutoImport（）: 自动帮我们导入，useRouter,useI18n, 等

### 官网

#### 为什么选择Vite

官网说的挺好的。

### 构建生产版本

#### 自定义构建

构建过程可以通过多种 构建配置选项 来自定义构建。具体来说，你可以通过 build.rollupOptions 直接调整底层的 Rollup 选项

```vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
    },
  },
})
```

### 部署

```md
npmjs.com的serve：可以把打包后的东西部署到本地，适用于开发环境。生产环境使用Vercel
serve -s dist(打包后的路径)
serve -s dist -p 10007 修改端口号，部署到本地
```
