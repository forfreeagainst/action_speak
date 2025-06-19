# Vue源码

## 重要原理

::: details

1.1搭建Vue3开发环境，详解Vue3设计理念及整体架构思想
2.2手写Vue3响应式原理，包括reactive、effect、watch、computed、ref等核心API
3.3掌握Vue3源码调试技巧，深入理解Vue3的内部机制。
4.4深入理解自定义渲染器原理及在Runtime DOM中的属性和事件处理方法。
5.5探索虚拟DOM的概念，手写Vue3中的diff算法以及最长递增子序列实现原理。
6.6手写Vue3组件的实现原理，深入理解组件的渲染、挂载流程，以及异步渲染的机制。
7.7掌握Vue3中生命周期的原理，以及props、emit、slot、provide、inject等功能的实现机制。
8.8学习编译优化技巧，掌握patchFlags、blockTree等实现靶向更新的方法。
9.9手写Vue3编译原理，掌握解析器、AST语法树的优化、代码生成原理。
10.10理解Vue3中的异步组件、函数式组件、Teleport、keep-alive、Transition组件的实现原理。

:::

## Vue哲学

### 声明式框架

* 声明式编程：关注“做什么”
* 命令式编程：关注“如何做”

#### 声明式编程的优点

::: details

```md
**提高开发效率**
 eg: 往数组末尾插入一条数据，声明式编程就得经过四个步骤。
 1. 获取父节点DOM 元素。
 2. 创建子节点DOM元素
 3. 修改子节点内容
 4. 将子节点插入父节点末尾
 使用声明式编程，我们只要定义好数据和声明好模板，不用关心更新DOM的这个过程。
 1. 定义数据 
 2. 声明模板 
 3. 更新数据
```

:::


### 采用虚拟DOM

#### 解决直接操作 DOM的性能瓶颈

* 每个DOM节点都包含大量内置属性（如clientWidth、scrollHeigth、className等），创建大量DOM节点会消耗较多内存，可能导致：内存泄漏（如未正确移除事件监听器）; 垃圾回收（GC）压力增大，导致页面卡顿。
`console.dir(document.getElementsByClassName('custom-block1')[0])`
* 直接操作DOM (如修改样式、结构) 会触发浏览器的 重排（Reflow）和重绘（Repaint）,频繁操作会导致性能下降。
* 虚拟DOM 是对真实 DOM 的抽象表示，操作它不会触发浏览器 渲染流程，仅在最终 更新时 批量同步到 真实DOM。

#### 跨平台能力

抽象渲染层。虚拟DOM 是与平台无关的 JavaScript 对象，使得Vue 可以在浏览器中渲染为真实DOM,
也可以在非浏览器环境（如 SSR、Native应用中）渲染为 其他结构（如字符串、原生组件）。

#### 代价

虚拟 DOM 的创建需要额外内存和 CPU 时间（但在现代设备上可忽略）。

### 区分编译时和运行时

#### 不要和开发环境和生产环境搞混了

::: details

* 开发和生产环境都会把 template -> VNode -> DOM ,只是编译时机和优化策略不同。
* 开发环境功能更全（如错误检查、热更新）
* 生产环境优化更多（如静态提升、Tree-shaking 移除未使用的代码）
* Vite/Webpack会在开发和生产环境都提前编译模板，浏览器里运行的始终是优化的render函数，而不是原始 Template.
* (编译时，把template变成虚拟节点，运行时，把虚拟dom变成真实Dom。)

:::

#### 编译时

将开发者编写的 模板（Template） 或 JSX 转换为 可执行的 JavaScript 代码（通常是渲染函数或虚拟 DOM 结构）。

#### 运行时

执行编译生成的代码，处理 数据响应式、虚拟 DOM 比对、组件生命周期 等动态逻辑。

### Vue3设计思想

* Vue3更注重模块上的拆分。Vue2无法单独使用部分模块，需要引入完整的Vue.js。 Vue3中的模块之间耦合度低，模块可以独立使用。
* Vue2中很多方法挂载到了实例上，即便没有使用也会被打包。 Vue3通过构建工具Tree-shaking机制实现按需加载，减少用户打包后体积。
* Vue3允许自定义渲染器，扩展能力强。


## 创建开发环境

### 熟练

* pnpm + workspace: 多包架构

::: details

<!-- * npm install pnpm -g : 在全局安装pnpm -->
* shamefully-hoist: 为true，会将其扁平化，官网不建议，实践出现幽灵依赖，还不好解决

```md
扁平化代价：重复安装相同依赖时会占用更多空间，失去 pnpm 的核心优势。

// 不使用 羞耻的提升，这么玩。
import {reactive} from '../../../node_modules/.pnpm/@vue+reactivity@3.4.23/node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
// import {reactive} from './reactivity.js';
console.log("🚀 ~ reactive:", reactive)
``` 

* -w / -workspace: 根目录
```md
创建pnpm-workspace.yaml，内容如下

packages:
  - "packages/*"
```

* 子包间互装 依赖 **pnpm install @vue/shared --workspace --filter @vue/reactivity** 

:::

* typescript: tsconfig.json，子包间互相引用

::: details

```json
{
  "compilerOptions": {
    "outDir": "dist", // 输出的目录
    "sourceMap": true, // 采用sourcemap
    "target": "es2016", // 目标语法
    "module": "esnext", // 模块格式
    "moduleResolution": "node", // 模块解析方式
    "strict": false, // 严格模式
    "resolveJsonModule": true, // 解析json模块
    "esModuleInterop": true, // 允许通过es6语法引入commonjs模块
    "jsx": "preserve", // jsx 不转义
    "lib": ["esnext", "dom"], // 支持的类库 esnext及dom
    "baseUrl": ".", // 和paths结合，做到包与包之间，可以更好地引用
    "paths": {
      "@vue/*": ["packages/*/src"]
    }
  }
}
```

:::

* esbuild: 开发环境中优秀的构建工具

::: details

构建脚本："dev": "node scripts/dev.js compiler-core -f esm"

```js
// 这个文件会帮我们打包 packages下的模块， 最终打包出js文件

// node dev.js （要打包的名字 -f 打包的格式） === argv.slice(2)

import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from "esbuild";
// node中的命令函参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2));

// esm 使用commonjs 变量
const __filename = fileURLToPath(import.meta.url); // 获取文件的绝对路径 file: -> /usr
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const target = args._[0] || "reactivity"; // 打包哪个项目
const format = args.f || "iife"; // 打包后的模块化规范

// 入口文件 根据命令行提供的路径来进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);
// 根据需要进行打包

console.log(resolve(__dirname, `../packages/${target}/dist/${target}.js`));
esbuild
  .context({
    entryPoints: [entry], // 入口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 出口
    bundle: true, // reactivity -> shared  会打包到一起
    platform: "browser", // 打包后给浏览器使用
    sourcemap: true, // 可以调试源代码
    format, // cjs esm iife
    globalName: pkg.buildOptions?.name,
  })
  .then((ctx) => {
    console.log("start dev");
    return ctx.watch(); // 监控入口文件持续进行打包处理
  });
```

:::

* node的能力

::: details

* minimist: 命令行参数（输出格式为结构化对象）
* process.argv(命令行参数,输出格式为原始数组)，通常是将 process.argv.slice(2) 传递给 minimist 进行解析

:::


## 面试题

### 为什么要使用compositionAPI?

* 代码的可读性随着组件变大而变差
* TypeScript支持有限

* options API 在处理单个逻辑关注点的时候，需要不断跳转相关代码的选项块。
* 使用composition,可以把相应的代码逻辑聚在一起，更加高内聚，低耦合。

* 在逻辑组织和逻辑复用（hook > mixin：数据来源不清晰，命名冲突）方面，Composition优势明显
* Composition API 几乎是函数，会有更好的类型推断。
* composition API 中见不到this的使用，减少了this指向不明的情况。
* Composition API 对tree-shaking 友好，代码更容易压缩。

### Vue3做了什么？

#### 源码升级

* 响应式系统的升级，更快，更灵活，而不是 使用defineProperty一顿狠狠地递归
* 代码体积更小，不将所有API放在实例上了。让我们自己引入，没有使用的API不会被打包啦。
<!-- 任何一个函数，如 nextTick, 仅仅在用到的时候才打包，没用过的模块都会被摇掉，
打包整体体积变小 -->
* 支持TypeScript
* composition API让代码的逻辑组织和逻辑复用 方面 ，更强了。
* diff算法优化(静态标记)
* 静态提升，Vue3中不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
* 开启事件监听器缓存（换绑 ？绑定？卸载事件）

### 为什么使用Proxy?

* defineProperty检测不到对象属性的添加和删除（增加了set、delete API）
* 数组 API 方法无法监听到（对数组api方法进行重写）
* 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
* Proxy有多达13中拦截方法，不限于apply, ownKeys,deleteProperty,has等，这是Object.defineProperty不具备的。
* Proxy可以直接监听数组的变化（push、shift、splice）
* 正因为defineProperty自身的缺陷，导致Vue2在实现响应式过程需要实现其他的方法辅助
（如重写数组的方法，增加额外set、delete方法）
* Proxy不兼容 IE,也有没有ployfill, defineProperty 能支持到IE9

### Tree Shaking 是什么？

Tree Shaking 是一种 通过消除多余代码方式来优化项目打包体积的技术。（消除死代码）

Tree Shaking无非就是做了两件事

* 编译阶段利用 ES6 Module判断哪些模块已经加载
* 判断哪些模块和变量 未被使用或者 引用，进而删除对应代码

减少程序体积，

### Vue2和Vue3的响应式原理？

::: details

Vue2 对于对象，使用defineProperty 对对象的属性进行劫持，增加get,set方法。
如果对数组的每个索引都使用 Object.defineProperty 进行监听
对于大数组会带来严重的性能问题, 我们通过重写数组的7个方法（AOP编程：内部调用原来的方法 + 自己的逻辑）
通过重写数组的 7 个变异方法实现基本响应 reverse, sort, splice , 
如果数组的成员也是对象，也是通过defineProperty去进行数据劫持。
通过索引修改值，虽然数据变了，但不会触发响应式更新（DOM不会自动更新）（你的操作修改了数据但不会触发视图更新）
直接索引修改需要使用 Vue.set 或 splice

:::

### 说说观察者模式？

观察者模式（Observer Pattern） 定义了一种一对多的依赖关系，当一个对象（被观察者）的状态 发生改变时，
所有依赖于它的对象 （观察者）都会得到通知 并 自动更新。

::: details

#### 基本实现

```js
// 被观察者 (主题)
class ObserverTheme {
    constructor() {
        this.observers = []; // 存储观察者列表
    }
    // 添加观察者
    addObserver(observer) {
        if (observer && observer.update) {
            this.observers.push(observer);
        } else {
            throw new Error('观察者 必须实现 update方法');
        }
    }
    // 移除观察者
    removeObserver(observer) {
        this.observers = this.observers.filter(ob => ob !== observer);
    }
    // 通知所有观察者
    notify(data) {
        this.observers.forEach(observer => {
            observer.update(data);
        })
    }
}
// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    // 被通知时执行的方法
    update(data) {
        console.log(`${this.name} 收到更新`, data);
    }
}
```

#### 使用示例

```js
const themeOb = new ObserverTheme();

// 创建观察者
const observer1 = new Observer('观察者1');
const observer2 = new Observer('观察者2');

themeOb.addObserver(observer1);
themeOb.addObserver(observer2);

// 发布通知
themeOb.notify('待到秋来九月八');

// 移除一个观察者
themeOb.removeObserver(observer1);

// 再次发布通知
themeOb.notify('我花开后百花杀');

```

:::

### 手写简易发布订阅模式？

特点

* 松耦合：发布者和订阅者不需要知道对方的存在
* 灵活性：可以动态添加和移除 订阅者
* 一对多：一个事件可以被 多个订阅者监听

应用场景

* 组件间通信（如前端框架中的事件总线）
* 事件驱动系统

::: details

#### 基本实现

```js
class PubSub {
    constructor () {
        this.events = {};
    }
    subscribe(event, callback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }
    publish(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                callback(...args);
            })
        }
    }
    unsubscribe(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(
            cb => cb !== callback
        )
    }
}
```

#### 实现用例

```js
// 创建发布订阅实例
const pubsub = new PubSub();

// 定义回调函数
function logMessage(data) {
    console.log('收到消息', data);
}


// 订阅‘message’ 事件
pubsub.subscribe('message', logMessage);

// 发布‘message’事件
pubsub.publish('message', 'Hello World!');

// 取消订阅
pubsub.unsubscribe('message', logMessage);

// 再次发布，不再有反应
pubsub.publish('message', '???');
```

#### mitt是什么？

mitt 是一个轻量级的 JavaScript 发布-订阅（Pub/Sub）模式 库，用于实现事件驱动的通信。它的全称就是 mitt（没有更长的官方全称），但它的名称可能来源于 "minimal event emitter"（最小化事件发射器）或类似含义，因为它专注于极简的发布-订阅功能

:::

### 观察者和发布订阅模式的区别？

::: details

```md

1.耦合度
* 观察者模式：被观察者和观察者知道彼此的存在
* 发布订阅模式：发布者和订阅者 不需要知道对方的存在
2.通信方式
* 观察者模式：直接调用观察者的方法
* 发布订阅模式：通过事件中心进行通信
3.灵活性
* 发布订阅模式通常更灵活，支持动态添加 / 移除 订阅关系。

```

:::

## 响应式原理

* defineProperty 和 Proxy
* 为什么使用Reflect

::: details

Reflect：Reflect.get() 方法与从 对象 (target[propertyKey]) 中读取属性类似，但它是通过一个函数执行来操作的。

* receiver: 如果target对象中指定了getter，receiver则为getter调用时的this值。
* Reflect.get(target, key, receiver)：属性的值

```js
// name变化了，desc的name也要变化。
const person = {
    name: 'durant',
    get desc() {
        return this.name + '35岁了';
    }
}
```

:::

* effect 是什么？

:::details

副作用

:::


### Proxy

::: details

接收一个对象，和一个handler函数

:::

### reactivity源码

#### 阅读

::: details

加强es6的class写法

变量命名

* builtin 内置
* primitive 原始的
* createReativeObject 创建响应式对象

代码梳理

1.reactive.ts => createReativeObject => new Proxy()
Object,Array 为1
Map, Set, WeakMap, WeakSet 为2
其他INVALID: 0 无效的
不同的TargetType，不同的处理逻辑

def => defineProperty 可配置，不可枚举的

2.baseHandlers.ts => targetType: 1
BaseReactiveHandler: get
MutableReactiveHandler: set, deleteProperty, has, ownKeys
ReadonlyReactiveHandler: set, deleteProperty

computed.ts => ComputedRefImpl
ReactiveEffect、trackRefValue

dep.ts => createDep

4.effect.ts
effect => new ReactiveEffect(run: preCleanupEffect，postCleanupEffect)
trackEffect
triggerEffects

3.reactiveEffect.ts
track => trackEffect
trigger => triggerEffects

ref.ts
ref => createRef => RefImpl
get: trackRefValue => trackEffect
set: triggerRefValue => triggerEffects
:::


::: details

http请求包括：
请求行：user-agent、accept、accept-language、host、cookie、connection
请求行：
请求方法字段、URL字段和HTTP协议版本eg: GET /index.html HTTP/1.1
get方法将数据拼接到url后面，传递参数受限
请求头（key,value形式）
User-Agent: 产生请求的浏览器类型
Accept: 客户端可识别的内容类型列表application/json, text/plain, */*,application/x-www-form-urlencoded
Host: 主机地址
请求数据
请求体：

如何区分电脑呢？ IP地址 + 主机名
ifconfig: Ipv4地址：192.168.43.131 => 192.168.43局域网下第131台电脑
一般来收，两台电脑相连，需要在同一个局域网下
主机名 => 电脑 > 属性 > 计算机全名： LAPTOP-D6QU3PSD
如何判断两台电脑是否联通？ ping ip地址 （ping 192.168.43.131）(ping www.baidu.com)
如何相连两个电脑呢？
A.两个电脑在同一个WIFI(局域网)
B.电脑要关闭防火墙（360等杀毒软件、自带windows防火墙）

如何阻止这个协议呢？分层协议
TCP/IP的五个层
应用层：HTTP、FTP、SMTP等
数据传输层：TCP协议
网络层：IP协议
数据链路层：
物理层：硬件

`<input v-bind="$attrs" v-on="$listener"></input>`

把data 的数据放在 _data, 通过this, 就能改变 _data的数据，叫做数据代理。
把data的数据放在_data, 还进行了加工，产生了relativeSetter和relativeGetter，
叫做数据劫持。
数据代理和数据劫持都离不开 defineProperty.

vm和vc不一样的，举例？
vc: vue实例对象
vm: 组件实例对象
vm有 el, data可函数可对象
vc没有 el, data只能函数

:::