# Node基础


## 说说Node.js

::: details

```md
node.js是跨平台的JavaScript运行时环境。（能创建服务器 Web 应用、命令行工具和脚本。）
node.js是轻量级服务器。
非堵塞 I/O
适合I/O密集型应用（Web服务器、API服务），不适合CPU密集型应用（视频编码、复杂计算）
node: 脚手架，lint工具，构建工具等等等，简直是工程化的利器。
```

:::

## node版本管理工具nvm

::: details

```md
下载 nvm-setup.exe 并安装

* nvm version: 查看nvm版本
* nvm list available：查看node的所有可用版本
* nvm install 12.22.12
* nvm use 12.22.12
* nvm uninstall 12.22.12
* nvm list / nvm ls: 查看已安装的所有版本
* nvm current: 查看当前使用的版本

低版本的node，会导致npm 和pnpm 使用不了。eg: node14,node12。
```

:::

## npm镜像源管理工具nrm

::: details

```md
* `npm install -g nrm`
* 查看有哪些镜像源`nrm ls`
* 查看当前镜像源`npm config get registry`
* 切换npm的镜像源`nrm use npm`
* 设置镜像源`npm config set registry=***`
```

:::

## 热启动node服务

::: details

```md
npm install --save-dev nodemon
npx nodemon server.js
```

:::

## Buffer

::: details

### Buffer转string

```js
const fs = require('fs');
fs.readFile('./data.json', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data, typeof data); // object(buffer)
    console.log(data.toString(), typeof data.toString()); // string
    const obj = JSON.parse(data.toString())
    console.log(obj, typeof obj); // object
})
```

:::

## node模块

### fs模块(操作文件)

::: details

#### fs.stat 的isFile、isDirectory检测是文件还是目录

```js
const fs = require('fs');
fs.stat('hello.js', (error,stats) => {
    console.log(stats.isFile(), stats.isDirectory());
})
```

#### fs.mkdir：创建目录

```js
const fs = require('fs');
fs.mkdir('logs', (error) => {
    if (error) {
        console.log('创建目录失败', error);
    } else {
        console.log('创建目录成功');
    }
})
```

#### fs.writeFile:往文件中，写入内容

```js
const fs = require('fs');
// logs目录需要存在
fs.writeFile('logs/hello.txt', '你好', (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('成功写入文件');
    }
})
```

#### fs.appendFile:往文件中追加内容

```js
const fs = require('fs');
fs.appendFile('logs/hello.txt', '追加内容', (err) => {
    if (err) {
        console.log('error:', err);
    } else {
        console.log('追加内容成功');
    }
})
```

#### fs.readFile:读取文件内容

```js
const fs = require('fs');
fs.readFile('logs/hello.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('error:', err);
    } else {
        // 读取内容
        console.log(data);
    }
})
```

#### fs.readdir：返回该目录下的所有文件（数组形式返回）

```js
const fs = require('fs');
// logs目录下的文件
fs.readdir('logs', (err, files) => {
    if (err) {
        console.log(`err: ${err}`);
    } else {
        console.log(files); // [ 'hello.txt' ]
    }
})
```

#### fs.rename:1.文件重命名2.移动文件

重命名

```js
const fs = require('fs');
fs.rename('logs/hello1.txt', 'logs/hello2.txt', (err) => {
    if (err) {
        console.log(`err: ${err}`);
    } else {
        console.log('重命名成功');
    }
})
```

移动文件

```js
const fs = require('fs');
// logs目录要有
fs.rename('log2/hello.js', 'logs/hello.js', (err) => {
    if (err) {
        console.log(`err: ${err}`);
    } else {
        console.log('移动成功');
    }
})
```

#### fs.rmdir:如果目录有文件，就删除不了目录

```js
const fs = require('fs');
// 如果目录有文件，就删除不了目录
fs.rmdir('logs', (err) => {
    if (err) {
        console.log(err, '???');
    } else {
        console.log('删除目录成功');
    }
})
```

#### fs.unlink: 删除文件

```js
const fs = require('fs');
fs.unlink('logs/hello2.txt', err=> {
    if (err) {
        console.log(err);
    } else {
        console.log('删除文件');
    }
})
```

#### fs.fileReadStream：从文件流中 读取数据

```js
const fs = require('fs');
// data.json
// {
//     "name": "durant",
//     "log": "I counldn't find the checkpoints"
// }
const fileReadStream = fs.createReadStream('data.json');
let count = 0;
let str = '';
// 从官网如何知道有data这个事件呢？
// fs.ReadStream 的实例 是使用 createReadStream()函数 创建和返回的。
// fs.ReadStream继承于 stream.Readable
// 而stream.Readable 就有了 事件‘data’
// Node.js 官方文档通常不会在子类文档中重复列出父类的所有属性和事件，
// 而是通过 “继承自” 的说明引导用户查阅父类文档
fileReadStream.on('data', (chunk) => {
    console.log(`${++count}, ${chunk.length}`); // 1, 74
    str += chunk;
})
fileReadStream.on('end', () => {
    console.log('结束', count, str)
    //     结束 1 {
    //     "name": "durant",
    //     "log": "I counldn't find the checkpoints"
    // }
})
fileReadStream.on('error', err=> {
    console.log('错误', err);
})
```

#### fs.createWriteStream:通过文件流 写入文件

```js
const fs = require('fs');
const data = 'When I was watching the tutorial';
// 创建一个可以写入的流，写入到文件output.txt中
const writeStream = fs.createWriteStream('output.txt');
// 使用utf8编码写入数据
writeStream.write(data, 'utf8');
writeStream.end();
writeStream.on('finish', () => {
    console.log('写入完成')
})
writeStream.on('error', err => {
    console.log(err, '发生错误了');
})
```

#### 管道流：边读边写

```js
const fs = require('fs');
// 创建一个可读流
const readStream = fs.createReadStream('output.txt');
// 创建一个可写流
const writeStream = fs.createWriteStream('output-plus.txt');
// 管道读写操作
// 读取 文件内容，并将内容写入到 新文件中
readStream.pipe(writeStream);
```

:::

### http模块

::: details

```js
var http = require('http');

http.createServer(function(req, res) {
    // 案例一：

    // 设置响应头
    // 状态码200， 文件类型是html, 字符集和utf-8
    // res.writeHead(200, {
    //     "content-type": "text/html;charset=UTF8"
    // });
    // //   res.writeHead(200, { 'Content-Type': 'application/json' });
    // // 给页面输出一句话并且结束响应
    // res.end('Hello World， durant杜兰特');

    // 案例二：

    res.writeHead(200, {
        "content-type": "text/html;charset='utf-8'"
    })
    // 看！+tab生成的html书写就行了
    res.write("<head><meta charset='UTF-8'></head>")
    res.write('你好，杜兰特durant');
    res.end();
}).listen(8086);
```

:::

:star: 静态web服务器封装

::: details

```js
const http = require('http');
const fs = require('fs');
// const path = require('path');
const url = require('url')

// 访问 http://localhost:1234/xxx
// 访问：http://localhost:1234/a.html
http.createServer((req, res) => {
    // 我这里是 url.parse, 而不是JSON.parse(), 看错了
    // url.parse() 解析 URL 字符串为对象
    // JSON.parse() 解析 JSON 字符串为 JS 对象	
    let urlObj = url.parse(req.url); // req.url (eg: / 或 aa.html)
    let pathname = urlObj.pathname;  // 获取地址
    if (pathname === '/favicon.ico') {
        console.log('这个网站图标不理它');
        return;
    }
    console.log("🚀 ~ fs.readFile ~ ./static${pathname}:", `./static${pathname}`)
    // ./static/a.html存在文件
    fs.readFile(`./static${pathname}`, (err, data) => {
        if (err) {
            res.writeHead(404, {'content-type': 'text/html;charset="utf-8"'});
            res.end('404,这个页面不存在')
            return;
        }
        // content-type需要根据文件类型，进行判断 TODO
        res.writeHead(200, {'content-type': 'text/html;charset="utf-8"'}); // end是字符串才行，utf=8
        res.end(data);
    })
}).listen(1234)
```

:::

#### content-type常见的类型

::: details

```md
text/javascript
application/javascript; charset=utf-8
image/png
application/json; charset=utf-8
text/plain; charset=utf-8
```

:::

#### 路由指的就是针对不同请求的 URL，处理不同的业务逻辑。

* 路由封装
* ejs模板引擎
* 获取get传值
* 获取post传值

::: details

server.js

```js
const http = require('http');
const url = require('url');
const fs = require('fs');
const ejs = require('ejs');

function createRoutes(req, res, staticPath = 'static') {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    // console.log("🚀 ~ createRoutes ~ pathname:", pathname)
    if (pathname === '/favicon.ico') return false; // 标记为未处理
    try {
        const data = fs.readFileSync(`./${staticPath}${pathname}`);
        // err先不做处理，后续再处理
        // 处理正常情况
        if (data) {
            res.writeHead(200, {"content-type": "text/html;charset='utf-8'"});
            res.end(data);
            return true; //标记为已处理
        }
    } catch (err) {
        console.log(`catch:${err}`)
        return false; // 标记为未处理
    }
}

// const getUrl = 'localhost:1234/new?name=durant&page=35';
http.createServer(async (req, res) => {
    const handle = await createRoutes(req, res);
    // Node.js 会抛出 ERR_HTTP_HEADERS_SENT 错误，
    // 因为 HTTP 协议不允许对同一个请求多次发送响应头。
    if (handle) return;
    console.log('请求方式', req.method); // 'GET'
    // 路由
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/favicon.ico') return;
    // http://localhost:1234/login
    // 调试ejs模板引擎
    if (pathname === '/login') {
        const dataObj = {
            log: 'When I was watching the tutorial',
            result: "I countn't find the checkpoints"
        }
        ejs.renderFile('./static/login.ejs', dataObj, function(err, str){
            if (err) {
                console.log('渲染失败');
                return;
            }
            res.writeHead(200, {'content-type': 'text/html;charset="utf-8"'});
            res.end(str);
        });
    // http://localhost:1234/registry
    } else if (pathname === '/registry') {
        ejs.renderFile('./static/registry.ejs', {}, function(err, str){
            res.writeHead(200, {'content-type': 'text/html;charset="utf-8"'});
            res.end(str);
        });
    // 获取post传值
    }else if (pathname === '/home') { 
        // 获取post传值
        let postData = '';
        req.on('data', function(chunk) {
            postData += chunk;
        })
        req.on('end', () => {
            console.log("🚀 ~ req.on ~ postData:", postData)
            res.end(postData);
        })
    // 获取get 传值
    } else if (pathname === '/news') {
        // true, 能让req.query转为对象
        const query = url.parse(req.url, true).query; // 获取get 传值
        console.log(`获取get传值`, query)
        res.writeHead(200, {'content-type': 'text/html;charset="utf-8"'});
        res.end(`get请求`);
    // 如果有问题，统一这里处理
    } else {
        res.writeHead(404, {'content-type': 'text/html;charset="utf-8"'});//end是字符串才行，utf=8
        res.end('404页面找不到');
    }
}).listen(1234);
```

./static/registry.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/home" method="post">
        用户名<input type="text" name="username"/>
        <br>
        <br>
        密码<input type="password" name="password">
        <br>
        <br>
        <input type="submit" value="提交">
    </form>
</body>
</html>
```

./static/login.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <%= log %><br>
    <%= result %>
</body>
</html>
```

:::


### url

::: details

```md
URL.parse(input[, base])#>
新增于: v22.1.0
```

:::


## npm知多少

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

^不允许更新主版本号
~只允许更新修订号
*允许更新所有版本号（主版本、次版本、修订号）。

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
* npm install 包名 -D: 开发依赖
* npm install 包名 -S: 生产依赖
* npm config list :用于列出所有的 npm 配置信息
* 切换/设置镜像源: nrm
* 发包：npm login, npm publish
* npm ls -g：全局安装了哪些模块
* npm info 包名：查看某包的信息
* npm list: 查看当前package.json安装了哪些包


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

### 执行npm install的时候发生了什么？

::: details

```md
安装 package.json 中所有 dependencies 和 devDependencies。

如果存在 package-lock.json，严格按锁文件安装。

如果定义了preinstall脚本和postinstall脚本，还会不一样，
它会先执行preinstall,然后执行install, 最后执行postinstall.
```

:::

### npm run start流程

::: details

```md
首先会从package.json的script去找对应的脚本命令，
如何没找到，默认会执行node server.js,
如果server.js不存在，就会报错。
如果定义了prestart脚本和poststart脚本，还会不一样，
它会先执行prestart,然后执行start, 最后执行poststart.
```

#### npm run xxx发生了什么

```md
首先会从package.json的script去找对应的脚本命令，
如果没找到对应的脚本命令就会报错
如果定义了preXXX脚本和postXXX脚本，还会不一样，
它会先执行preXXX,然后执行XXX, 最后执行postXXX.
```

:::

### npm的生命周期了解多少

::: details

```md
npm 会按顺序执行 pre<command> → <command> → post<command>。
eg: 自己的也可以predev, dev, postdev。
```

:::

## node.js模块

### path：文件路径

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

## 安装依赖失败

* Node版本的问题，eg：查看package.json，README.md，issue等可能出现node版本号

## 如何理解fs，graceful-fs,fs-extra?

::: details

```md
Node.js 原生 `fs` 
    → `graceful-fs`（增强健壮性） 
        → `fs-extra`（扩展功能 + 继承 `graceful-fs` 的健壮性）

如果你只需要更稳定的 fs → 用 graceful-fs。
如果需要额外功能（如复制/删除目录） → 直接用 fs-extra（它已经内置了 graceful-fs 的优化）。
fs-extra 是事实上的 Node.js 文件操作标准库，推荐优先使用。
```

:::

## node.js工具库

### EsModule的TypeScript工具库

EsModule模式，不能使用__dirname、require

## node.js的API

### fs

* readdirSync
* statSync
* existsSync
* mkdirSync
* readFileSync
* rmSync
* writeFileSync

### url

* fileURLToPath

### process

* argv：解析命令行参数

* cwd: 当前的工作目录

* env:

* exit(0)：指示 Node.js 以 code 的退出状态同步终止进程

### path

* resolve: 解析为一个绝对路径，换言之，构造绝对路径,当前命令行的绝对路径(区别：__dirname是当前文件的绝对路径)

`const dir = resolve(__dirname, `../packages/${target}/package.json`);`

打印结果：D:\git-database\no-less-than-anyones-effort\vue3.4.0\packages\reactivity\package.json

* join:

### child_process

* exexSync：同步执行shell命令(npm view 包名 version)

### module

* createRequire: esModule不能使用require

```md
require: 一个json，或者commonjs模块（esModule不能使用require,commonJs才可以）
解决办法：
import { createRequire} from "module";
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

import.meta.url ://file:///D:/soul-ocean/vue3_monorepo/script/dev.js
__dirname：当前文件的绝对路径（esModule不能使用__dirname,commonJs才可以）
解决办法：
import { dirname } from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);//获取文件的绝对路径
//D:\soul-ocean\vue3_monorepo\scripts\dev.js
const __dirname = dirname(__filename);
//D:\soul-ocean\vue3_monorepo\scripts
```

### os

* cpus

### API使用场景分析

##### require和fs.readFileSync区别？

* require: 可用于JSON文件，JavaScript模块。加载JSON文件时，会将JSON文件解析为JavaScript对象并返回。
* fs.readFileSync,读取JSON文件时，它只是读取文件的原始内容，需要额外步骤将其解析为JavaScript对象。

```js
const fs = require('fs-extra');

const res1 = fs.readFileSync('./package1.json');
const res2 = fs.readFileSync('./package1.json', 'utf8');
const res3 = JSON.parse(fs.readFileSync('./package1.json', 'utf8'));
console.log(res1); //得到一个Buffer
console.log(res2, typeof res2, res2.name);//得到字符串
console.log(res3, res3.name);//得到一个js对象
```

### 命令

* node  *** -f esm

## npm包

### fast-glob: 返回符合条件的文件路径列表。

是的，fast-glob 的主要功能是 快速匹配文件路径，它可以根据指定的 通配符模式（Glob Patterns） 扫描文件系统，返回符合条件的文件路径列表。

```js
const files = fg.sync('**/*.m4s', { ignore: ['package-lock.json'], cwd: __dirname});
console.log(files);
```

### command-exists：检查命令（命令行的）是否存在

sync as commandExistsSync: commandExistsSync('pnpm')

### copyfiles

copyfiles -a -u 1 \"src/config/**\" lib：在script命令通过Node.js的fs模块完成I/O操作。

### commander：构建命令行界面

区别于minimist: minimist 用来解析命令行参数
minimist 常见语法 `const args = require('minimist')(process.argv.slice(2))`

#### :star: 注意

* 使用commander, 要记得加 `program.parse(process.argv);`

### inquirer:构建交互式命令行界面

### ora：输出时的loading效果，和显示各种状态的图标等

### fs-extra：强大的文件操作功能

* moveSync: 可以移动文件，还可以改文件名

```js
// 配合fast-glob，挺好用的
fs.moveSync('./old/file.md', './new/renamed.txt');
```

* remove: 删除文件

```js
fs.remove(`./${name}.mp3`);
```

* readFileSync
* writeFileSync
* existsSync
* mkdirSync

JSON.stringify(res1, null, 2)  格式化输出 JSON 数据。

### ejs(embedded 嵌入...之中**)：将ejs模板语法编译成js

```md
<%_ if (enableStylelint) {  _%>
<%_ stylelintIgnores.forEach((txt) => { _%>
<%= txt %>
<% }) %>
<%_ } _%>
```

### chalk：对控制台输出添加样式（console.log打印不明显）

### git-clone：克隆git上的文件

```js
const clone = require('git-clone/promise');
const { removeSync } = require('fs-extra');
const process = require('process');

const repo = 'https://github.com/forfreeagainst/zhrx-code-review.git';
const targetPath = 'src/';
const options = {
  checkout: 'main'//revision/branch/tag to check out after clone
}
clone(repo, targetPath, [options]).then(() => {
  //删除.git文件
  const removePath = `${process.cwd()}/${targetPath}.git`
  console.log("🚀 ~removePath:", removePath)
  removeSync(removePath);
})
```

### terminalLink: 终端链接

### cross-env

改变的是当前执行命令的进程环境

### cross-spawn

会创建新的子进程来执行指定的命令

### vue-tsc

vue3+typescript的类型检查

常用命令：`vue-tsc --noEmit`

### 脚手架入门: commander、ora、inquirer、chalk、fs-extra

```js
#!/usr/bin/env node

//demo练习：commander, ora, inquirer, chalk，fs-extra
//bug:ora版本8.多，提示oraEsM导入失败，使用低的版本了。

import { program } from 'commander';
import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';
// import fs from 'fs-extra';
// 常见API: readJSONSync,

program
  // 包名 init(command是必输，option是选输)
  .command('init')
  .description("一键接入")
  // 包名 init -s "<>必输"
  .option('-s, --port <number>', '{port: "必输内容"}')
  // 包名 init -z "[]选输"
  .option("-z, --fix [boolean]", "输入-z, 默认{fix: true}")
  // 包名 init -v
  .option('-v', "前面一个参数没有逗号分隔, 输入-v,得到{v: true},否则为undefined")
  .action(async function (opt) {//args是选项值，如：Object: {fix: true}
    // const { port, fix, v} = opt;
    // console.log(port, fix, v);
    console.log(opt);
    let step = 0;

    const { answer1 } = await inquirer.prompt({
      type: 'input',
      name: 'answer1',
      message: '请输入你的项目名'
    })
    console.log(answer1);
    if (!answer1) {
      //红色，加粗，背景色是白色，%s是变量
      console.log(chalk.red.bold.bgWhite('请%s%s'), '输入', '，不然无法使用');
      return;
    }
    const Question_Two = [
      {
        name: '黑色',
        value: 'black'
      },
      {
        name: '白色',
        value: 'white'
      },
      {
        name: '黄色',
        value: 'yellow'
      }
    ];
    const { answer2 } = await inquirer.prompt({
      type: 'list',
      name: 'answer2',
      message: `Step ${++step}. 请选择你喜欢的颜色`,
      choices: Question_Two,
    });
    console.log(answer2);

    const { answer3 } = await inquirer.prompt({
      type: 'confirm',
      name: 'answer3',
      //你确定要使用唯一的外挂 no(界面会显示yes或者no)
      message: '你确定要使用唯一的外挂',
      default: true
    });
    //answer的值为true或者false
    console.log(answer3);

    //loading的效果
    // const loading = ora('初始化加载中......').start();
    // setTimeout(() => {
    //   loading.stop();
    // },2000)
  });

// program
//   .name('wiggins-lint-cli')
//   .description('CLI to some JavaScript string utilities')
//   .version('0.0.0');
// program
//   .option('-s, --small', 'small pizza size')
//   .option('-c, --cheese [type]', 'Add cheese with optional type');

program.parse(process.argv);
```

### mkdirp:创建多层级目录

```js
const { mkdirp } = require('mkdirp')
// 从D盘开始创建，多层级目录
// made directories, starting with D:\tmp

// return value is a Promise resolving to the first directory created
mkdirp('/tmp/foo/bar/baz').then(made =>
  console.log(`made directories, starting with ${made}`)
)
```

## package.json字段详解

### 参考

[npm的packages.json处理细节](https://npm.nodejs.cn/cli/v8/configuring-npm/package-json#google_vignette)

### 字段说明

* 必备属性：包名称name，包版本version
* 目录&文件相关：程序入口main，命令行工具入口bin，发布文件配制files
* 协议：license(MIT、ISC)
* 脚本配制： script，config
* 依赖：dependencies生产依赖，devDependencies开发环境依赖，peerDependencies兼容依赖
* 描述信息（项目）：项目描述description，项目关键字keywords
* 描述信息（作者）：作者author,贡献者contributors
* 描述信息（地址）：首页homepage，仓库repository，提交bug地址bugs
* 发布配制： private限制发布，限制发布仓库+限制发布版本publishConfig，os限制安装系统
`private: true; 不会发布到npm市场，只是一个仓库，一个基建罢了。`

### package.json常见脚本命令

* `npm install --no-frozen-lockfile`：不冻结锁文件版本

1.确保版本一致性：在持续集成环境中，`--frozen-lockfile` 可以防止由于`package.json`和锁文件版本
不匹配而导致的依赖更新，从而确保每次安装的依赖版本一致。

2.避免意外更新：如果锁文件不存在或不满足`package.json`中的所有依赖项，Yarn或npm会查找
最新的满足约束并更新锁文件。使用`--frozen-lockfile`可以避免这种情况。

### package.json中unpkg用途？

在`package.json`中并不存在`unpkg`这样一个直接的标准字段或配置项，但`unpkg`与`package.json`
所涉及的包管理等内容密切相关，其主要用于如下：

* 内容分发网络（CDN）服务

`unpkg`是一个免费的CDN，可用于托管和分发开源项目的代码和资源。当一个项目的开发者将代码发布到
像npm这样的包管理器时，`unpkg`能根据`package.json`中的信息，如版本号、文件路径等，快速地将
相应的文件内容通过CDN分发到全球各地，让用户能快速访问和加载项目的代码和资源。

* 快速原型开发和测试

在开发前端时，开发者可以在HTML文件中直接通过`unpkg`的链接引入所需的库或框架，无需在本地使用
`npm install`等命令安装。例如`https://unpkg.com/vue@3.2.37/dist/vue.global.js`，可快速
验证代码逻辑或展示效果。

* 共享和引用项目源码

项目中的`package.json`记录了项目的依赖等信息，`unpkg`可根据这些让其他开发者方便地共享和引用
项目的资源，便于代码的复用和传播。如果项目中有一些可供外部使用的工具函数、样式文件等，通过
`unpkg`结合`package.json`的配置，能轻松实现资源共享。

### npm script有生命周期？

npm script是有生命周期的，主要包括以下几个常见阶段

#### 生命周期顺序

1. :star: 安装阶段：preinstall, install, postinstall, prepare
2. 运行脚本阶段：prerun, run, postrun
3. 卸载阶段：preuninstall,unintall,postuninstall

#### :star: 预安装阶段（preinstall）

* 在`npm install`开始安装依赖之前触发。可用于执行一些准备工作，如检查环境、下载额外资源等。

eg: `"preinstall": "npx only-allow pnpm"` 指定pnpm作为包管理工具

#### 安装阶段（install）

* 当执行`npm install`命令时，会下载并安装项目的依赖包，此阶段会触发相关脚本。

#### :star: 准备阶段（prepare）

* 在所有依赖安装完成后执行，在生成`package.json`或`npm-shrinkwrap.json`前执行。与会在
`npm publish`之前执行，用于在发布前进行一些准备工作。

eg: `"prepare": "husky install "`安装husky(git生命周期)

#### 预发布阶段（prepublish）

* 在 `npm publish` 命令执行前触发。常用于进行一些准备发布的操作。像代码检查、测试、构建
等，确保发布的代码符合要求。

#### 发布阶段（publish）

* 执行 `npm publish` 命令时触发，用于将包发布到npm仓库。

#### 预启动阶段（prestart）

* 在 `npm start`命令执行前触发。用于进行启动前的准备工作，如环境配制、检查服务依赖等。

#### 启动阶段（start）

* 执行`npm start` 命令时触发，通常用于启动项目的主要服务或应用程序。






