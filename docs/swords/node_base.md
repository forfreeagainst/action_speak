# Node基础

## Node.js前沿

### 说说Node.js

::: details

```md
node.js是跨平台的JavaScript运行时环境。（能创建服务器 Web 应用、命令行工具和脚本。）
node.js是轻量级服务器。
```

:::

### npx,npm区别？

::: details
npm（Node Package Manager）:包管理工具，侧重于模块的安装或卸载。
npx（Node Package eXecute）：包执行工具，侧重于执行命令。
npx 执行命令发生了什么？当前项目的依赖找模块（node_modules的.bin可执行文件查找），
全局环境找模块，没有的话，自动帮我们安装模块，
执行完命令后，自动帮我们卸载模块。（一次性命令）


:::

### package.json了解多少？

::: details
```md
3.4.0
主版本号：重大的更新
次版本号：功能的更新
修订号：bug的修复

peerDependencies: 重要

减少包大小： 通过避免安装不必要的依赖项，可以减小项目包的大小，从而提高性能。
避免版本冲突： peerDependencies 允许包开发者指定协作包所需的依赖项版本，从而防止版本冲突并确保协作包之间的正常工作。
清晰的依赖关系： peerDependencies 明确地声明了与你的项目协作的其他包所需的依赖关系，避免了混乱和错误。

devDependencies:开发依赖，线上环境不需要这个。
dependencies: 生产依赖

files: 要发布的文件，包括哪些
type: "commonjs" 或 "module" 模块规范

HomePage: 包的描述信息，会显示在npm官网所在包的 描述
Repository: 包的描述信息，会显示在npm官网所在包的 描述
```
:::

### npm常用命令有哪些？

::: details
* npm init -y
* npm install 包名 -D:
* npm config list :用于列出所有的 npm 配置信息
* 切换/设置镜像源: nrm
* 发包：npm login, npm publish
* npm ls -g：全局安装了哪些模块


:::

### 简单发个包

::: details

```md
https://www.npmjs.com/ 注册个账号
durant123 ，常用密码加个.
切换到npm ( npx nrm use npm) https://registry.npmjs.org/
npm login
回车填写登录信息
npm publish(包不要重名，不能发相同的版本号)

私服

* https://verdaccio.org/
```
:::


### 模块化规范

::: details

不知道模块文件有啥，直接用 `import * as all from xxx`

```js
export default {
    a: 33
}

export function hello() {
    console.log('hello world');
}

import * as all from './test.js';
console.log(all);
```

:::


## Q & A

### 执行npm install的时候发生了什么？

::: details

:::

### npm run xxx发生了什么

::: details

:::

### npm的生命周期了解多少

::: details

```md
npm 会按顺序执行 pre<command> → <command> → post<command>。
eg: 自己的也可以predev, dev, postdev。
```

:::

## node.js模块

### fs模块：操作文件

### path：文件路径

### http： http服务

### cmd： 命令行参数

### process: 进程，（内存管理的，）

::: details

* stdin: 标准输入
* stderr：标准输出

:::

### child_process: 

### 其他库封装

::: details

commander, inquirer, readline

graceful-fs, fs-extra, node:fs

:::

## node.js框架

### express

#### express封装了什么

::: details

:::

#### express脚手架

::: details

:::

#### 常用API

* res.status() 设置响应码
* res.get() / res.set() 设置响应头字段
* res.send() 发送响应数据
* res.sendFile() 发送文件资源
* res.render() 响应视图模板
* res.acctachment() 响应附件下载
* req.get() 获取请求头
* req.path() 获取请求路径
* req.fresh() 获取请求是否过期
* req.query() 获取get请求的query参数
* req.body() 获取body请求的body参数



