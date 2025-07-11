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

### node版本管理工具nvm

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

### npm镜像源管理工具nrm

::: details

```md
* `npm install -g nrm`
* 查看有哪些镜像源`nrm ls`
* 查看当前镜像源`npm config get registry`
* 切换npm的镜像源`nrm use npm`
* 设置镜像源`npm config set registry=***`
```

:::

### 热启动node服务

::: details

```md
npm install --save-dev nodemon
npx nodemon server.js
```

:::

### Buffer

::: details

#### Buffer转string

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

### :star: fs模块(操作文件)

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

### :star: http模块

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

`静态web服务器封装`

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


### :star: url

::: details

```md
URL.parse(input[, base])#>
新增于: v22.1.0
```

:::

### :star: path：文件路径

### :star: cmd： 命令行参数

### :star: process: 进程，（内存管理的，）

::: details

* stdin: 标准输入
* stderr：标准输出

:::

### :star: child_process: 

### 其他库封装

::: details

commander, inquirer, readline

graceful-fs, fs-extra, node:fs

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

## express(node.js框架)

### express封装了什么

* 封装一个类似express框架的路由
* 配置静态web服务目录（提供静态资源访问）
* 中间件

::: details

依赖

```md
"ejs": "^3.1.10"
```

server.js

```js
// const express = require('express');

// const app = express();

// app.get('/', function(req, res) {
//     console.log(res, '???')
// })

const http = require('http');
const ejs = require('ejs');
const myExpress = require('./myExpress.js');
// console.log("🚀 ~ myExpress:", myExpress)

// myExpress 即 function(req, res) {自定义逻辑}
http.createServer(myExpress).listen(1234); // 先创建服务，再注册路由
myExpress.static('/static'); // 配置静态web目录
// 注册路由
myExpress.get('/registry', function(req, res) {
    ejs.renderFile('./static/registry.ejs', {}, function(err, str){
        res.send(str);
    });
})

myExpress.post('/home', function(req, res) {
    res.send(req.body)
})
```

myExpress.js

```js
const url = require('url');
const path = require('path');
const fs = require('fs');

let myExpress = () => {
    const G = {
        _get: {}, // get路由
        _post: {}, // post路由
        staticPath: 'static', // 静态web目录
    };

    const app = function(req, res) {
        // 扩展res的方法
        res.send = (data) => {
            res.writeHead(200, {'content-type': 'text/html;charset="utf-8"'});
            res.end(data);
        }
        // 配置静态web服务
        const pathnameTemp = url.parse(req.url, true).pathname
        if (pathnameTemp === '/favicon.ico') return;
        const extname = path.extname(pathnameTemp);
        console.log("🚀 ~ app ~ extname:", extname); // .ico、.css、空
        if (extname) {
            try {
                const data = fs.readFileSync(`./${G.staticPath}${pathnameTemp}`);
                if (data) {
                    const bufferData = fs.readFileSync('./mime.json');
                    const contentTypeObj = JSON.parse(bufferData.toString());
                    const mime = contentTypeObj[extname];
                    // console.log("🚀 ~ app ~ mime:", mime)
                    res.writeHead(200, {'content-type': `${mime};charset="utf-8"`});
                    res.end(data);
                }
            } catch(err) {
                // 报错了，如果没有释放资源res.end(), 访问页面时，还会一直转圈
                console.log('???', err);
            }
            return;
        }
        // /login 路由类逻辑
        const pathname = url.parse(req.url, true).pathname;
        console.log(pathname, 'pathname')
        // 请求方式
        const method = req.method.toLowerCase();
        console.log("🚀 ~ app ~ method:", method)

        // 找不到对应的回调执行
        if (!G[`_${method}`][pathname]) {
            res.writeHead(404, {'content-type': 'text/html;charset="utf-8"'});
            res.end('404页面不存在');
            return;
        }
        // get请求方式
        if (method === 'get') {
            G._get[pathname](req, res);
        // post 请求方式
        } else if (method === 'post') {
            // 获取post传值，并放入req.body
            let postData = '';
            req.on('data', (chunk) => {
                postData += chunk;
            })
            req.on('end', () => {
                req.body = postData;
                console.log("🚀 ~ req.on ~ req.body:", req.body)
                G._post[pathname](req, res);
            })
        } else {

        }
    }
    // app.get('/login', function(req, res) {});
    app.get = function(str, callback) {
        G._get[str] = callback;
    }
    app.post = function(str, callback) {
        G._post[str] = callback;
    }
    app.static = function(staticPath) {
        G.staticPath = staticPath;
    }
    return app;
}
module.exports = myExpress(); // 调用了这个函数，返回这个函数function(req, res) {}
```

./static/registry.ejs

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./reset.css">
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

./static/reset.css

```md
* {
    padding: 0;
    margin: 0;
    background-color: skyblue;
}
```

:::

### 常用API

::: details

```md
* res.status() 设置响应码
res.writeHead(状态码, {contentType: 'text/html;charset="utf-8";'})
* res.get() / res.set() 设置响应头字段
* res.send() 发送响应数据
res.end(***)
* res.sendFile() 发送文件资源
* res.render() 响应视图模板
ejs.renderFile('./', () => {})
* res.acctachment() 响应附件下载
* req.get() 获取请求头
* req.path() 获取请求路径
* req.fresh() 获取请求是否过期
* req.query() 获取get请求的query参数
url.parse(req.url, true).query();
* req.body() 获取body请求的body参数
```

:::


### express常见语法

* 获取动态路由
* 获取get传值
* ejs：模板字符串 → 解析成语法树 → 生成JS代码 → 动态执行 → 输出HTML

::: details

server.js

```js
const express = require('express')
const app = express();

// 设置模板引擎
app.set('view engine', "ejs"); // 无需const ejs = require('ejs');
app.set('views', __dirname + '/views');

// 获取get传值 localhost:1235/news/list?page=1&pageSize=5
app.get('/news/list', (req, res) => {
    const query = req.query; // 不用express框架，就是url.parse(req.url, true).query
    res.send(query);
})

// 动态路由 http://localhost:1235/news/23435
app.get('/news/:id', (req, res) => {
    const id = req.params.id; // 获取动态路由
    res.send(id);
})

// ejs模板渲染
app.get('/list', async (req, res) => {
    res.render('list', {
        query: 23, // template里面的值必须是 基础类型
        news: ['疯魔灭神铠', '星辰塔']
    })
    // 等价于
    // const data = await ejs.renderFile('./views/list.ejs', {query: 999})
    // res.send(data);
})

app.listen(1235);
```

./views/list.ejs

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!--公共组件header-->
    <%- include('header.ejs') %>
    <%= query %><br>
    <ul>
    <% news.forEach(function(item){ %>
        <%= item%>
    <% }); %>
    </ul>
</body>
</html>
```

./views/header.ejs

```md
<header>
    我是语义化标签的头部内容
</header>
```

:::

* ejs修改后缀名
* 静态文件

::: details

server.js

```js
const express = require('express')
const app = express();
const ejs = require('ejs');

// 不喜欢ejs这个后缀名，改为html
app.engine('html', ejs.__express); // 两个下划线哦
// console.log("🚀 ~ ejs._express:", ejs.__express)
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
// 底层肯定还是ejs.renderFile(),后缀名变化不影响文件里的内容

// 静态文件配置
app.use(express.static('static'));
// 底层G.staticPath, 读取的时候 fs.readFileSync(`${G.staticPath}帮我们自动拼接`)
// 同时还要根据我们的文件后缀名，配置不同的content-type

// ejs模板渲染
// http://localhost:1235/app
app.get('/app', async (req, res) => {
    res.render('app', {
        news: ['疯魔灭神铠', '星辰塔']
    })
})

app.listen(1235);
```

./views/app.html

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./bgc.css">
</head>
<body>
    我是html文件
    <ul>
    <% news.forEach(function(item){ %>
        <%= item%>
    <% }); %>
    </ul>
</body>
</html>
```

./static/bgc.css

```css
body {
    background-color: pink;
}
```

:::

### express中间件

定义

::: details

匹配路由之前或者匹配路由完成做的一系列的操作。AOP的实现方式。

* 应用级中间件
* 路由级中间件
* 错误处理中间件
* 内置中间件
* 第三方中间件

:::

简单实践

::: details

server.js

```js
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser'); // 获取post传值

// 设置模板引擎
app.engine('html', ejs.__express); // 两个下划线哦
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// 内置中间件
app.use(express.static('static'));

// 第三方中间件
// npm install body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())

// 全局级中间件
app.use((res, req, next) => {
    console.log('全局中间件')
    next();
})

// 路由级中间件
app.get('/ccc', (req, res, next) => {
    console.log('路由级中间件，几乎不用');
    next();
})

// http://localhost:4321/ccc
app.get('/ccc/', (req, res, next) => {
    res.render('form');
})

// 表单提交成功，注意 请求方式 是 post
app.post('/home', (req, res, next) => {
    res.send(req.body); // 使用第三方中间件，获取 post传值，好快
})

// 错误级中间件
app.use((req, res) => {
    res.status(404);
    res.send("以上中间件都失效了, 错误级中间件")
})

app.listen(4321);
```

./views/form.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./bgc.css">
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

./static/bgc.css

```css
body{
    background-color: pink;
}
```

:::

### cookie和session

::: details

```md
* 第三方中间件cookie-parser
* 第三方中间件express-session

cookie特点：
* 设置cookie, 如果cookie没有过期的话，关闭浏览器后重新打开，cookie不会销毁


session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而
session 保存在服务器上。
Cookie 数据存放在客户的浏览器上，Session 数据放在服务器上。Session 相比 Cookie 要
更安全一些。由于 Session 保存到服务器上，所以当访问量增多的时候，会比较占用服务器
的性能。单个 cookie 保存的数据大小不能超过 4K，很多浏览器都限制一个站点最多保存 20
个 cookie。Session 没有这方面的限制。Session 是基于 Cookie 进行工作的。
```

:::

使用cookie-parser

::: details

```js
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')

// 如果使用加密cookie, 记得要配置密钥!!!
app.use(cookieParser('miYao'))

// localhost:5432
app.get('/', function (req, res) {
  res.send('首页')
})

// http://localhost:5432/setCookie
app.get('/setCookie', (req, res) => {
    // 第二个参数，中文，还是引用类型，都是乱码
    // cookie 第三个参数, 也可以ctrl+左键，查看方法里面有哪些选项
    // https://www.npmjs.com/package/cookie
    // res.cookie('nickname', 'haohao');
    res.cookie('secretBase', 'miao', {signed: true})
    res.send('设置cookie');
})
// http://localhost:5432/getCookie
app.get('/getCookie', (req, res) => {
    // 使用res.send()的时候
    // ${基础类型} ok
    // ${引用类型} 不ok
    res.send(`${req.cookies.nickname}, ${req.signedCookies.secretBase}`)
})

app.listen(5432);
```

:::

cookie的第三个参数，配置

::: details

```md
domain: 多个域名共享同一个cookie， .jd.com (eg: aaa.jd.com, bbb.jd.com) 
path: /app, 该路由下才有cookie
maxAge: 设置在多久后失效(eg:删除cookie, 使其快速失效{maxAge:0})
expire: 在某个时间点后，cookie就失效
secure: true, 在http中，cookie是失效的，在https是有效的
signed: 加密cookie
httpOnly: 是微软对 COOKIE 做的扩展。如果在 COOKIE 中设置了“httpOnly”属性，则通
过程序（JS 脚本、applet 等）将无法读取到 COOKIE 信息，防止 XSS 攻击产生
```

:::

使用express-session

::: details

```js
const express = require('express');
const app = express();
var session = require('express-session')

app.use(session({
    secret: 'keyboard cat', // 服务端生成 session的签名
    name: 'diy', // 修改session对应cookie的名称, 仅浏览器的cookie的key值发生改变
    resave: false, // 强制保存 session,即使它并没有变化（默认配置，就完事了）
    saveUninitialized: true, // 强制将未初始化的 session 存储 （默认配置，就完事了）
    cookie: { 
        maxAge: 1000 * 60 * 10, // 多久后失效
        secure: false, // false, http协议也可以访问cookie 
    },
    rolling: true, // 每次请求后，都会重新设置cookie, 重新刷新失效时间(maxAge)
}))

// localhost:5432/setSession
app.get('/setSession', (req, res) => {
    req.session.diyname = 'durant';
    req.session.age = '35';
    res.send('登录后，设置session');
})

app.get('/getSession', (req, res) => {
    if (req.session.diyname || req.session.age) {
        res.send(`${req.session.diyname} --${req.session.age} --'登录了'`);
    } else {
        res.send('没有登录');
    }
})

app.get('/loginOut', (req, res) => {
    // 设置session的过期时间为0， 它会把所有session都销毁
    // req.session.cookie.maxAge = 0

    // 销毁指定session
    // req.session.diyname = '';

    // 销毁所有session destroy
    req.session.destroy();
    res.send('销毁session');
})

app.listen(5432);
```

:::

一台服务器无法响应大量用户的请求 => 负载均衡nginx + 多台服务器 => 在一台服务器的session,如果存在内存
=> 其他服务器无法共享 => 那就存在redis,数据库(MySQL, MongoDB)

::: details

```md
* `npm i express-session connect-mongo` MongoDB
* `npm install redis connect-redis express-session` redis
* `npm i connect-mysql` MySQL没啥人用
```

```js
// npm i connect-mongo

const express = require('express');
const app = express();
var session = require('express-session')
const MongoStore = require('connect-mongo');

app.use(session({
    secret: 'keyboard cat', // 服务端生成 session的签名
    name: 'diy', // 修改session对应cookie的名称, 仅浏览器的cookie的key值发生改变
    resave: false, // 强制保存 session,即使它并没有变化（默认配置，就完事了）
    saveUninitialized: true, // 强制将未初始化的 session 存储 （默认配置，就完事了）
    cookie: { 
        maxAge: 1000 * 60 * 10, // 多久后失效
        secure: false, // false, http协议也可以访问cookie 
    },
    rolling: true, // 每次请求后，都会重新设置cookie, 重新刷新失效时间(maxAge)
    store: MongoStore.create({ 
        // mongoUrl: 'mongodb://127.0.0.1:27017/dbname',
        // use nba;
        // db.getUsers()
        // 查看 用户名和密码
        mongoUrl: 'mongodb://durant:123456@127.0.0.1:27017/nba',
        touchAfter: 24 * 3600, // 不管发出了多少请求，在24小时内只更新一次session，除非你改动了session
    })
}))

// localhost:5432/setSession
app.get('/setSession', (req, res) => {
    req.session.diyname = 'durant';
    req.session.age = '35';
    res.send('登录后，设置session');
})

app.get('/getSession', (req, res) => {
    if (req.session.diyname || req.session.age) {
        res.send(`${req.session.diyname} --${req.session.age} --'登录了'`);
    } else {
        res.send('没有登录');
    }
})

app.get('/loginOut', (req, res) => {
    // 设置session的过期时间为0， 它会把所有session都销毁
    // req.session.cookie.maxAge = 0

    // 销毁指定session
    // req.session.diyname = '';

    // 销毁所有session destroy
    req.session.destroy();
    res.send('销毁session');
})

app.listen(5432);

```

:::

### express路由模块化(express.Router)

1个文件不好维护，团队不好协作开发

::: details

server.js

```js
const express = require('express')
const app = express();

// user路由
const user = require('./routes/user');
app.use('/app', user);

app.get('/app', (req, res) => {
    res.send('首页');
})

// http://localhost:4321/app
// localhost:4321/app/user
// http://localhost:4321/app/user/add
app.listen(4321);
```

./routes/user.js

```js
const express = require('express')
const router = express.Router()

const userAdd = require('./user/add');

router.get('/user', (req, res) => {
    res.send('用户界面')
})

// 继续嵌套路由
router.use('/user', userAdd);

module.exports = router;
```

./routes/user/add.js

```js
const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => {
    res.send('添加用户')
})

module.exports = router;
```

:::

### express应用程序生成器（项目生成器）（express脚手架）

::: details

```md
`npm install -g express-generator`
bash环境 `express --view=ejs myapp` ejs模板引擎
`node bin/www` 启动服务

跟自己脚手架的差距
多个了打印日志
```

:::

### 上传文件模块multer的使用

::: details

单个文件上传

server.js

```js
// npm i multer
// npm i mkdirp
// https://www.npmjs.com/package/multer
const express = require('express');
const app = express();
const ejs = require('ejs');
const multer  = require('multer')

// ejs 模板引擎
app.engine('html', ejs.__express); // 两个下划线哦
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// http://localhost:4321/uploadFiles
app.get('/uploadFiles', (req, res) => {
    res.render('uploadFiles');
})

// 请求方式是post, 上传单个文件
const storage = multer.diskStorage({
    // 文件保存路径，注意路径必须存在
    destination: function(req, file, cb) {
        cb(null, 'public/upload/'); // public/upload 文件夹要有
    },
    // 修改文件名称
    filename: function(req, file, cb) {
        const fileFormat = (file.originalname).split('.');
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({storage})
app.post('/uploadComplete', upload.single('avatar'),(req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send(`上传成功`);
})

app.listen(4321);
```

./views/uploadFiles.html

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/uploadComplete" enctype="multipart/form-data" method="post">
        <div class="form-group">
            头像：<input type="file" name="avatar">
            <br><br>
            <!-- 照片：<input type="file" name="picture"> -->
            <br><br>
            <input type="submit" value="提交">
        </div>
    </form>
</body>
</html>
```

多个文件上传

server.js

```js
const express = require('express');
const app = express();
const ejs = require('ejs');
const multer  = require('multer');
const path = require('path');
const { mkdirp } = require('mkdirp');

// ejs 模板引擎
app.engine('html', ejs.__express); // 两个下划线哦
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// 2024-12-12
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

// http://localhost:4321/uploadFiles
app.get('/uploadFiles', (req, res) => {
    res.render('uploadFiles');
})

// 请求方式是post, 上传单个文件
const storage = multer.diskStorage({
    // 文件保存路径，注意路径必须存在
    destination: async (req, file, cb) => {
        // 1.获取当前日期
        const day = getFormattedDate();
        // 创建图片保存的路径
        const dir = path.join('public/upload', day);
        // 创建目录
        await mkdirp(dir)
        cb(null, dir); // public/upload/日期 文件夹要有
    },
    // 修改文件名称
    filename: function(req, file, cb) {
        const fileFormat = (file.originalname).split('.');
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({storage})
const multiUpload = upload.fields([
    {name: 'avatar',maxCount: 1},
    {name: 'picture', maxCount: 1}
])
app.post('/uploadComplete', multiUpload,(req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send(`上传成功`);
})

app.listen(4321);
```

./views/uploadFiles.html

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/uploadComplete" enctype="multipart/form-data" method="post">
        <div class="form-group">
            头像：<input type="file" name="avatar">
            <br><br>
            照片：<input type="file" name="picture">
            <br><br>
            <input type="submit" value="提交">
        </div>
    </form>
</body>
</html>
```

:::

### moogoose

封装node.js操作mongoDB，让集合的字段类型更加规范等(npm install mongoose)

::: details

使用mongoose简单操作数据库

```js
// https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');
const { Schema } = mongoose;


main().catch(err => console.log(err));

async function main() {
    // 连接数据库
    // use blogApp
    //     db.createUser({
    //     user: 'durant', 
    //     pwd: '123456', 
    //     roles: [{role: 'dbOwner', db: 'blogApp'}]
    // })
    // db.getUsers();
    // 因为我设置了超级管理员，但是每个表，也要添加相应的管理员，不然无法操作
    await mongoose.connect('mongodb://durant:123456@localhost/blogApp');

    // 定义Schema（定义集合的数据类型）
    const blogSchema = new Schema({
        title: String,
        author: String,
        desc: String
    });

    // 创建数据模型
    const Blog = mongoose.model('Blog', blogSchema);

    // 查询数据
    const blogData = await Blog.find({author: 'durant'});
    console.log("🚀 ~ main ~ blogData:", blogData)

    // 创建数据
    const blogObj = new Blog({ 
        title: '超越极限',
        author: "durant",
        desc: "不相信长夜将至，因为手把就在自己手中"
    });
    blogObj.save();

    // 修改数据，要有await, await相当于save了
    // 同时要注意 搜索条件，没有修改数据，它是不会报错的。
    // await Blog.updateMany({author: 'durant'}, {$set: {author: 'kevin durant'}});

    // 删除数据
    // await Blog.deleteMany({author: 'kevin durant'});
}
```

:::

### moogose模板化

::: details

server.js

```js
// https://mongoosejs.com/docs/guide.html
const blogModel = require('./model/blog.js');
const peopleModel = require('./model/people.js');

async function main() {
    // const people = new peopleModel({
    //     teacher: 'james',
    //     age: 40
    // })
    // people.save()

    console.time('blog');
    const blogData = await blogModel.find({});
    // console.log(blogData, '??');
    console.timeEnd('blog'); // 26.492ms

    console.time('people');
    const peopleData = await peopleModel.find({});
    // console.log(peopleData, '??');
    console.timeEnd('people'); // 1.728ms，应该是单例模式，不会再重新连接数据库了
}
main()
```

./model/db.js

```js
// https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');

mongoose.connect('mongodb://durant:123456@localhost/blogApp');

module.exports = mongoose;
```

./model/blog.js

```js
const mongoose = require('./db.js');

const BlogSchema = mongoose.Schema({
    title: String,
    author: {
        type: String,
        default: 'kevin durant'
    },
    desc: String
})

module.exports = mongoose.model('Blog', BlogSchema);
```

./model/people.js

```js
const mongoose = require('mongoose');

const PeopleSchema = mongoose.Schema({
    teacher: String,
    age: Number,
    info: {
        type: String,
        default: '未知'
    }
})

module.exports = mongoose.model("People", PeopleSchema);
```

:::

### moogoose预定义模式修饰符和Getter/Setter自定义修饰符

::: details

```md
default: 默认值
require: 必填
数字专用：min, max, 
枚举：enum
minlength：最小长度
maxlength: 最大长度
trim: 去左右两边的空格
match：正则表达式
validate：校验函数

自定义修复符：
Setter(写入数据库，补充前缀等)，
Getter(不建议用，没必要，替代方案：前端可拼接等)
```

server.js

```js
// https://mongoosejs.com/docs/guide.html
// const blogModel = require('./model/blog.js');
const peopleModel = require('./model/people.js');

async function main() {
    const people = new peopleModel({
        teacher: 'james',
        birthday: '20001',
        spot: '  adaa33  ',
        age: 38,
        add: '天气晴'
    })
    people.save()

    const peopleData = await peopleModel.find({});
    console.log(peopleData[0].spot); // adaa
    // console.log("🚀 ~ main ~ peopleData:", peopleData)
}
main()
```

./model/people.js

```js
const mongoose = require('mongoose');

const PeopleSchema = mongoose.Schema({
    teacher: {
        type: String,
        // enum: [3, 4]
        enum: ['james', 'durant']
    },
    age: {
        type: Number,
        min: 10,
        max:40
    },
    birthday: {
        type: String,
        // (.*) 2000后面的所有内容
        match: /^2000(.*)/
    },
    spot: {
        type: String,
        validate: {
            validator: function(v) {
                return v.length > 5;
            },
            message: props => `${props.value} 长度要大于5 !`
        },
        trim: true,
        // 不建议使用，访问属性的时候，才触发get。数据库查询的时候，一点变化都没有
        // console.log(peopleData[0].spot); // adaa
        get: (val) => val.slice(0, 4)
    },
    info: {
        type: String,
        default: '未知'
    },
    add: {
        type: String,
        set: (val) => '补充' + val
    }
})

// 定义模型：模型名 'People' → 对应集合 'people'
module.exports = mongoose.model("People", PeopleSchema);
```

./model/db.js

```js
// https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');

mongoose.connect('mongodb://durant:123456@localhost/blogApp');

module.exports = mongoose;
```

:::

### mongoose设置索引和mongoose的静态方法和实例方法

::: details

```md
db.peoples.getIndexes(); // 获取索引
index: true  // 普通索引
unique: true // 唯一索引
```

类的静态方法和实例方法

```js
class Animal {
    constructor() {
    }
    // 静态方法有static
    static sayHello() {
        console.log('你好')
    }
    // 实例方法
    sayNight() {
        console.log('晚安，this指向new BlogModel(传入的数据)');
    }
}
// 静态方法，不通过实例也能调用
Animal.sayHello();
// Animal.sayNight(); // 直接调用，失败
const dog = new Animal();
dog.sayNight();
```

函数的静态方法和实例方法

```js
function Person() {
    this.instanceFn = function() {
        console.log('实例方法');
    }
}
Person.staticFn = function() {
    console.log('静态方法');
}
Person.staticFn();

// Person.instanceFn(); // 无法调用
const obj = new Person();
obj.instanceFn();
```

扩展mongoose的静态方法和实例方法

server.js

```js
// https://mongoosejs.com/docs/guide.html
const blogModel = require('./model/blog.js');

async function main() {
    // const blog = new blogModel({
    //     title: '近日有台风',
    //     author: '小猪',
    //     idCard: '1001',
    //     desc: '注意安全'
    // })
    // blog.save()
    const res = await blogModel.findByIdCard('1001')
    console.log("🚀 ~ main ~ res:", res)
    // blogModel.sayHello();  // 无法调用
    const obj = new blogModel();
    obj.sayHello();
}
main()
```

./model/blog.js

```js
const mongoose = require('./db.js');

const BlogSchema = mongoose.Schema({
    title: String,
    // 索引能加快查询速度，但增加和修改的速度会变慢
    author: {
        type: String,
        unique: true // 唯一索引
    },
    idCard: {
        type: String,
        index: true // 普通索引
    },
    desc: String
})

// 定义静态方法
BlogSchema.statics.findByIdCard = async function(idCard) {
    const data = await this.find({idCard})
    return data;
}

// 定义实例方法（几乎不用）
BlogSchema.methods.sayHello = function() {
    console.log('你好呀');
}

module.exports = mongoose.model('Blog', BlogSchema);
```

:::

### mongoose多表查询

使用聚合管道

::: details

server.js

```js
const UserModel = require('./model/user');
const BookModel = require('./model/book');
const OrderModel = require('./model/order');

async function main() {
    // const users = new UserModel({
        // name: 'durant',
        // level: "封王极限",
        // nickname: '死神',
        // age: 35,
        // name: 'curry',
        // level: "封王不朽",
        // nickname: '摇头库',
        // age: 33,
        // name: 'james',
        // level: "封王军主",
        // nickname: '全力詹',
        // age: 40
    // })
    // users.save()

    // const books = new BookModel({
        // bookName: '被讨厌的勇气',
        // author: "岸键一郎",
        // desc: "缺少改变的勇气，",
        // price: 40
        // bookName: '传习录',
        // author: '王阳明',
        // desc: "心外无物，破山中贼易",
        // price: 50
        // bookName: '皇明祖训',
        // author: "朱元璋",
        // desc: "诸位藩王尽可勤王",
        // price: 70
    // })
    // books.save();


    // db.orders.drop(); 删掉集合的数据

    // const orders = new OrderModel({
    //     userId: "686f653f3566d543a1ca4ef8",
    //     bookId: "686f6467284122f92fbcf8a6",
    //     orderStatus: "已下单"
    // })
    // orders.save();


    // 值得注意的是Schema的_id定义
    // userId: Schema.Types.ObjectId,
    // bookId: Schema.Types.ObjectId,
    const result = await OrderModel.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "bookId",
                foreignField: "_id",
                as: "items"
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDesc'
            }
        }
    ]);
    // console.log("🚀 ~ main ~ result:", result)
        console.log("🚀 ~ main ~ result:", JSON.stringify(result))
}

main();
```

./model/user.js

```js

const mongoose = require('./db');
const {Schema} = mongoose;

const UserSchema = Schema({
    name: String,
    level: String,
    nickname: String,
    age: Number
})

module.exports = mongoose.model('User', UserSchema);
```

./model/book.js

```js
// 书的信息， 用户的信息， 订单信息
// 某用户买了一堆书

const mongoose = require('./db');
const {Schema} = mongoose;

const BookSchema = Schema({
    bookName: String,
    author: String,
    desc: String,
    price: Number
})

module.exports = mongoose.model('Book', BookSchema);
```

./model/order.js

```js
const mongoose = require('./db');
const {Schema} = mongoose;

const OrderSchema = Schema({
    userId: Schema.Types.ObjectId,
    bookId: Schema.Types.ObjectId,
    orderStatus: {
        type: String,
        enum: ['已下单', '已取消']
    }
    // orderTime: {
    //     type: Date,
    //     default: Date.now()
    // }
})

module.exports = mongoose.model('Order', OrderSchema);
```

:::

使用Populate(找不到 哪里有问题)

::: details

```js
const UserModel = require('./model/user');
const BookModel = require('./model/book');
const OrderModel = require('./model/order');

async function main() {
    // const orders = new OrderModel({
    //     userId: "686f65a0025dbb4cb0a81f50",
    //     bookId: "686f650d761ad000e413f57c",
    //     orderStatus: "已下单"
    // })
    // orders.save();
    // return;

    const result = await OrderModel.find({}).populate('users').populate('books');
    console.log(result[0].userId);
    // const result = await OrderModel.find({})
    // .populate({
    //     path: "books",
    //     select: "bookname"
    // }).populate({
    //     path: 'users',
    //     select: "name"
    // })
    // const result = await OrderModel.findOne({ _id: '686f668a0ff7a5d8f001ee4d' }).populate('book');
    console.log(result)
    // const temp = await UserModel.find({_id: '686f653f3566d543a1ca4ef8'});
    // console.log(temp)
    //     const temp2 = await BookModel.find({_id: '686f6467284122f92fbcf8a6'});
    // console.log(temp2)
}

main();
```

./model/order.js

```js
const mongoose = require('./db');
const {Schema} = mongoose;

const OrderSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },  // 可以单独 populate
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' }, // 可以单独 populate
    orderStatus: {
        type: String,
        enum: ['已下单', '已取消']
    },
// 检查 Book 模型定义
// const BookModel = mongoose.model('Book', BookSchema); // 必须和 ref: "Book" 一致
// 检查 User 模型定义
// const UserModel = mongoose.model('User', UserSchema); // 必须和 ref: "User" 一致
    books: [
        {type: Schema.Types.ObjectId, ref: "Book"}
    ],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Order', OrderSchema);
```

:::

## koa(node.js框架)

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

## MongoDB

### 简单聊聊MongoDB

::: details

```md
内存 => 断电后丢失数据 => 磁盘 => 文件系统呢？操作不方便 => 数据库

SQL确实非常规范，十几年前就是规范之神，但不一定在十几年后，依然被人认为规范。
非关系型数据库，noSQL, no only SQL
```

:::

### 安装MongoDB

::: details

```md
C:\Program Files\MongoDB\Server\6.0\
D:\work_space\MongoDB\data\
D:\work_space\MongoDB\log\

C:\Program Files\MongoDB\Server\6.0\bin 加入到系统环境变量中
window + R => cmd => 回车 => mongod --version  # 检查服务端是否安装 => db version v6.0.24
compass图形化界面 => 直接New Connection => 填完信息 => save and connect => Open MongoDB shell
=> MongoDB服务启动成功
window + R => services.msc => 可以找到MongoDB Server
```

:::

### 常见的MongoDB命令

::: details

| 命令 | 含义 |
| --- | --- |
| show dbs; | 查询所有的数据库 |
| use 数据库名; | 切换到指定数据库 |
| show collections; | 显示所有的表（集合）|
| db.webpack.insertOne({say: '我是webpack'}); |  往webpack表（集合）插入一条数据 |
| db.webpack.drop(); | 删除某个表（集合）|
| use jsDb;db.dropDatabase(); | 切换到某个数据库，删除某个数据库 | 
| cls | 清屏 |

:::

### 简单练习

::: details

```md
use nba
db.player.insertMany( [
    { _id: 1, name: "kevin durant", age: 35, fmvp: 2 },
    { _id: 2, name: "curry", age: 33, fmvp: 1 },
    { _id: 3, name: "james", age: 40, fmvp: 4 },
    { _id: 4, name: "维金斯", age: 30, fmvp: 0 },
    { _id: 5, name: "卡哇伊", age: 32, fmvp: 2 },
    { _id: 6, name: "哈登", age: 33, fmvp: 0 },
    { _id: 7, name: "kevin durant", age: 35, fmvp: 2 }
])

1.查询所有记录
`db.player.find({})`
`SELECT * FROM inventory`

2.过滤掉 当前聚集集合中 的某列的 重复数据
`db.player.distinct('name')`
[ 'curry', 'james', 'kevin durant', '卡哇伊', '哈登', '维金斯' ]

3.查询age=35的记录
`db.player.find({age:35})`
`SELECT * FROM inventory WHERE status = "D"`

4.查询age>35的记录
`db.player.find({age: {$gt:35}})`

5.查询age<32的记录
`db.player.find({age: {$lt: 32}})`

6.查询age>=40的记录
`db.player.find({age: {$gte: 40}})`

7.查询age<=30的记录
`db.player.find({age: {$lte: 30}})`

8.查询age>=32并且age<=35的记录
`db.player.find({age: {$lte: 35,$gte: 32}})`

9.查询name中包含'durant'的数据
`db.player.find({name: /durant/})`

10.查询name中以'kevin'开头的数据（以什么结尾呢）
`db.player.find({name: /^kevin/})`
`db.player.find({name: /durant$/})`

11.查询指定列name、age数据
`db.player.find({}, {name: 1, age:1})` 
或 `db.player.find({}, {name: true, age:true})`
`SELECT _id, name, age FROM player;`

12.查询指定列name、age数据 ，并且age>35
`db.player.find({age: {$gt: 35}}, {name: 1, age:1})`
或 `db.player.find({age: {$gt: 35}}, {name: true, age:true})`

13.按照年龄排序
`db.player.find({}).sort({age: 1})` 升序 1
`db.player.find({}).sort({age: -1})` 降序 -1

14.查询name=james age=40的数据
`db.player.find({name: 'james', age: 40})`

15.查询前2条数据
`db.player.find({}).limit(2)`

16.查询5条以后的数据
`db.player.find({}).skip(5)`

17.查询在3-4之间的数据
`db.player.find({}).skip(2).limit(2);`

18.查询年龄是30岁，或者年龄是40岁的数据
`db.player.find({$or: [ {age: 40}, {age: 30}]})`
`SELECT * FROM player WHERE age = 40 OR age = 30;`

19.查询第一条数据
`db.player.findOne();` 与db.collection.find()方法相同的操作，限制为1    

20.查询某个结果集的记录条数（统计数量）
`db.player.find({}).count();`

21.把james的年龄改为41。
`db.player.updateOne({name: 'james'}, {$set: {age: 41}});`
`db.player.find({age:41})` 验证一下

22.把所有叫'kevin durant'的年龄改为36
`db.player.updateMany({name: 'kevin durant'}, {$set: {age: 36}});`
`db.player.find({name: 'kevin durant'});` 验证一下

23.把第一个叫'kevin durant'的数据替换为{age: 45}
`db.player.replaceOne({name: 'kevin durant'}, {age: 45})`
`db.player.find({})` 验证一下 {_id: 1, age: 45}

24.删除所有年龄大于35的球员
`db.player.deleteMany({age: {$gt: 35}})`
`db.player.find({})` 验证一下

25.删除年龄小于35的第一个球员
`db.player.deleteOne({age: {$lt: 35}})`
`db.player.find({})` 验证一下

```

:::

### 索引

数据太多，查询好慢 => 使用索引 => 加快查询速度，修改速度慢了

::: details

```md
1.创建name的升序索引
`db.player.createIndex({name: 1})`

2.查询player的所有索引
`db.player.getIndexes();`
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { name: 1 }, name: 'name_1' }
]

3.删除name的升序索引
`db.player.dropIndex({name: 1})`

4.删除_id索引之外的所有索引
`db.player.dropIndexes()`

5.测试使用指定索引(age升序索引)的执行时间executionTimeMillis
`db.people.find({}).hint( { age: 1 } ).explain("executionStats")`

6.创建复合索引(name升序，age升序)
`db.player.createIndex({name: 1, age: 1})`
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { name: 1, age: 1 }, name: 'name_1_age_1' }
]

7.创建唯一索引（age）
`db.player.createIndex({age: 1}, {unique: 1})`
`db.player.insertOne({age: 33})` 集合有年龄为33的记录，则报错
```

:::

### 管理员

::: details

```md
所有数据库，使用超级管理员root
某个数据库，单独的管理员（不是所有的数据库都想让别人看见的哦）

root超级管理员，dbOwner:某个数据库的管理员

1.数据库用户角色：read、readWrite;
2.数据库管理角色：dbAdmin、dbOwner、userAdmin；
3.集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4.备份恢复角色：backup、restore；
5.所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、
dbAdminAnyDatabase
6.超级用户角色：root
```
本地连接：mongodb://localhost:27017

:::

精细步骤

::: details

```md
1.第一步创建超级管理用户
`use admin`
`db.createUser({
    user: '小驼峰的第二个英文名', 
    pwd: "小驼峰的第二个英文名123", 
    roles: [{role: 'root', db: 'admin'}]
})`
`show users` 查看用户，后续可验证一下

2.第二步修改 Mongodb 数据库配置文件
window + R => services.msc => 搜索MongoDB服务 => 查看属性 => --config 后面的东西
=> C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg
磁盘找到该文件，修改如下（以管理员身份运行，不然无法修改）（注意#security的#号要去掉）
security:
  authorization: enabled

3.第三步重启MongoDB服务
window + R => services.msc => 搜索MongoDB服务 => 右键 => 重新启动

4.第四步用超级管理员账户连接数据库
使用compass重新连接，没有权限。 => Authentication => 
填写用户名，填写密码，填写Authentication Database
(创建用户时roles的db是啥，{role: 'root', db: 'admin'})
Authentication Mechanism 选了SCRAM-SHA-256.

<!-- shell命令没有试过，因为没有安装 mongodbshell
mongo admin -u 用户名 -p 密码
mongo IP:端口号/test -u 用户名 -p 密码-->

5.单独给某个数据库，创建一个用户。
`use nba` nba是其中的一个数据库
`db.createUser({
    user: 'durant', 
    pwd: '123456', 
    roles: [{role: 'dbOwner', db: 'nba'}]
})`


6.查看当前库下的用户
`show users`

7.删除用户
`db.dropUser('durant');` durant是用户名

8.修改用户密码
`db.updateUser("durant", {pwd: "123456"})`

9.密码认证
`db.auth('durant', "123456")`
{ ok: 1 } 验证成功
Authentication failed. 验证失败

10.连接数据库的时候需要配置账户密码
使用compass可视化会自动生成
const url = "mongodb://admin:123456@localhost:27017/"
const url = 'mongodb://admin:123456@localhost:27017/';

```

:::

### 表（集合）与表（集合）之间的关系

::: details

```md
* 一对一：
* 一对多：
* 多对多：1个人收藏多见商品，1件商品被多个人收藏。
中间表（临时表）： id, userId, cartId, create_time, update_time
```

:::

### aggregate聚合管道(高级查询)

::: details

db.collection.aggregate() Stages，实际应用：表的关联查询，聚合统计

```md
常见的聚合操作

db.user.insertMany([{name: 'durant', skill: "死神降临", id: 1}, {name: 'curry', skill: "摇头库", id: 2}])
db.goods.insertMany([{id:1, name: '酸奶', price: 10}, {id: 2, name: '荔枝', price: 5}, {id: 3, name: '火神源晶', price: 50}])
db.cart.insertMany([{userId: 1, goodsId: 1, share: 10}, {userId: 1, goodsId: 3, share: 20}, {userId: 2, goodsId: 3, share: 30}])

1.查询用户表的列（name）
`db.user.aggregate([{$project: {name: 1}}])`

2.查询用户表中拥有死神降临技能的 用户
`db.user.aggregate([{$match: {skill: '死神降临'}}])`

3.统计收藏表中，每个商品的分享次数
`db.cart.aggregate([{$group: {_id: "$goodsId", total: {$sum: "$share"} } }])`

4.商品价格 由高到低
`db.goods.aggregate([{$sort: {price: -1}}])`

5.第一件商品
`db.goods.aggregate([{$limit: 1}])`

6.除去第一件商品
`db.goods.aggregate([{$skip: 1}])`

```

lookup表关联

```md
用户收藏了哪些商品（用户表关联 收藏表）
`db.user.aggregate([{$lookup: {from: 'cart', localField: 'id', foreignField: 'userId', as: 'items'} }])`

收藏表关联商品表
`db.cart.aggregate([{$lookup: {from: 'goods', localField: "goodsId", foreignField: "id", as: "items"}}])`
```

:::

### Node.js操作MongoDB数据库

::: details

```js
// npm i mongodb -S

const { MongoClient, ServerApiVersion } = require("mongodb");

// const url = 'mongodb://localhost:27017'; 没有秘密的
const url = "mongodb://用户名:密码@localhost:27017"; // 有密码的

const dbname = 'nba';

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,  // 使用 Stable API v1
    strict: true,                 // 严格模式（禁用非API命令）
    deprecationErrors: true,      // 将废弃操作报错（而非警告）
  }
});
// const client = new MongoClient(url)

async function main() {
    try {
        await client.connect(); // client.connect() 不再传入回调
        console.log('连接成功');
        
        const db = client.db(dbname);
        const data = await db.collection('user').find({}).toArray();
        console.log(data, '查询成功');
        
    } catch (err) {
        console.error('操作失败:', err);
    } finally {
        await client.close();
        console.log('连接关闭');
    }
}
main();
```

:::

## express+mongoose实战

::: details

* 数据库的导入与导出

```md
// express生成图形验证码
npm install --save svg-captcha

服务器使用iframe进行局部刷新

express-session

md5加密，权限判断（后端-中间件，前端-拦截器）

Restful API 从以下几个方面考虑
1.建议使用更安全的https
2.尽量部署在专属域名下
3.应该将api的版本号放入URL
4.在Restful架构中 ，每个网址代表一种资源（resource）,所以网址中建议不能有动词，只能有名词，
而且所用的名词往往与数据库的集合相对应。一般来说，数据库中的表都是同种记录的“集合”（collection）,
所以API中的名词也应该使用复数。使用 /users/123， 而非/getUser?id=123
http请求数据的7种方式：（GET/ POST / PUT / DELETE/PATCH / HEAD / OPTIONS）
GET (SELECT): 从服务器取出资源（一项或多项）
POST(CREATE): 在服务器新建一个资源
PUT(UPDATE):在服务器更新资源（客户端提供改变后的完整资源）
DELETE(DELETE):从服务器删除资源

res.send() res.json() res.jsonp()

解决跨域：
1.express使用`npm i cors`

如何把本地的程序上传到远程服务器
1.ftp
2.直接复制
3.svn
4.git


如何让远程电脑运行node.js程序
1.在远程电脑安装node.js,安装MongoDB
2.就可以通过ip地址访问这个程序

通过域名来访问node.js程序？
域名和服务器关联起来（域名解析）
1.配置域名解析
通过添加域名解析可将域名指向一个公网 IP 地址，将域名解析到当前实例后，即可通过域名访问实例中部署的网站。
2.用户直接访问域名 相当于就是访问这个IP地址

用户输入www.durant.com 实际访问 111.111.111.111

通过ping命令可以知道当前域名 指向哪个服务器 eg: ping www.baidu.com

如何让一个服务器放 n 个node.js网站
nginx转发

```

:::

## MySQL

### 简单聊聊MySQL

::: details

```md

```

:::

### 安装MySQL

::: details

```md

```

:::

### MySQL常见命令

::: details

数据类型

```md
存储一般为二进制和非二进制（正常文本）。
如果很大的map3,mp4等静态资源，一般使用CDN引入。

数据类型：
字符串类型
char:定长，搜索速度快，适用于长度变化不大的数据（但也会消耗一点点多余的空间）。
varchar: 不定长

日期和时间类型

数值类型

枚举与集合类型

空间数据类型
```

MySQL命令

```md
show character set;显示字符集

删除数据库的语句(危险语句，删库跑路):
DROP DATABASE IF EXISTS 库名;

查看所有的数据库：
SHOW DATABASES;
创建数据库的语句：
CREATE DATABASE IF NOT EXISTS 库名;
切换到某个数据库库:
use 库名;

删除表:
DROP TABLE IF EXISTS 表名;
创建表：(注意：每个列都要有类型，用小括号包起来)
CREATE TABLE 表名(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userAcc VARCHAR(100),
  userPwd VARCHAR(200)
);
插入数据:
INSERT 表名 values(1, 'admin', '111222');
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






