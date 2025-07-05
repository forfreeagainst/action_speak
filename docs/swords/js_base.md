# js基础

## 原型与原型链

::: details

```md
Js是基于原型的继承。通过原型，对象可以共享属性和方法。
实例化对象的__proto__(隐式原型)会永远指向构造函数的显示原型prototype
原型链的顶端是null.
```

```js
const arr = [33];
console.log(Object.getPrototypeOf(arr) === Array.prototype)
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype)
console.log(Object.getPrototypeOf(Object.prototype) === null);
```
:::

## 词法作用域与动态作用域

::: details

JavaScript是静态作用域（词法作用域），变量的生效范围在编译时就已经确定了。与之相反的是，
bash,它是动态作用域，函数执行的时候，才确定生效范围。

:::

## 执行上下文

::: details

```md
执行上下文有三种，全局执行上下文，函数执行上下文，Eval函数执行上下文

每个函数执行的时候，都会创建一个执行上下文。

执行上下文的生命周期包括三个阶段：创建阶段-> 执行阶段 -> 回收阶段

创建全局上下文 压入执行栈，
first函数被调用，创建函数执行上下文并压入栈
执行first函数过程 遇到second函数，再创建一个函数执行上下文 并压入栈
second函数执行完毕，对应的函数执行上下文被 推出 执行栈，执行下一个执行上下文first函数
first函数执行完毕，对应的函数执行上下文也被 推出栈中，然后执行全局上下文。
所有代码执行完毕，全局上下文也会被推出 栈中，程序结束。
```

:::

## 作用域与作用域链

::: details

```md
作用域是 变量和函数生效的范围。
作用域有哪些？
全局作用域，函数作用域，块级作用域；
脚本作用域，模块作用域，闭包作用域，
eval作用域，catch作用域，with作用域

作用域链是JavaScript中查找变量和函数的一种机制。作用域链是有当前执行环境（Execution Context） 
中的变量对象（Variable Object）以及父级执行环境的变量对象组成的。当代码在一个执行环境中执行时， 
如果访问一个变量或者函数，JavaScript引擎会首先在当前执行环境的变量对象中查找，如果找不到，
它会 沿着作用域链向上一级的执行环境中查找，直到找到对应的变量或者函数，或者达到全局执行环境为止。
```

:::

## 函数提升、变量提升

### 函数提升

#### 什么是函数提升

::: details

```js
// js脚本追求的是灵活性，它允许先执行后定义。
sayHello(); // Hello World!
function sayHello() {
    console.log('Hello World!')
}
```

:::

#### 为什么需要函数提升

::: details

* js脚本追求的是灵活性，它允许先执行后定义。
* 性能优化：JavaScript 引擎在代码执行前会进行 预解析（Hoisting），将函数声明
提前存入内存，这样在执行阶段可以直接调用，减少重复解析的开销
（js: 预解析在当前作用域中，JavaScript代码执行之前，浏览器首先会默认的把所有带var和function
声明的变量进行提前的声明或者定义。）
* 函数嵌套，没有预解析，很难实现嵌套的效果。

```js
// 即使 fib 函数在定义时 内部调用了自身，JavaScript 仍然可以正常解析，不会报错 fib is not defined。
// 这是因为 函数声明会被提升（Hoisting），使得 fib 在函数体内部可用，即使它还没完全解析完成。
// 用的预解析的结构
function fib(n) { // 解析fib
    if (n <= 1) return n; // 基准条件
    return fib(n - 1) + fib(n - 2); // fib没解析完成
}
// 用的预解析的结构
function a() {
    b();
}
function b() {
    console.log('b');
}
console.log(a);
```

:::

### 变量提升

::: details

实现原理是预解析，特性叫变量提升。

```js
console.log(a);
var a = 33;
```

:::

### 两者结合

函数提升 比 变量提升的优先级 高

::: details

```js 
console.log(a); // function a，函数优先级高
var a = 1; // 重新声明，重新赋值
console.log(a); // 1
function a() {} // 预解析已经解析过了。
console.log(a); // 1
```

:::

## 闭包

::: details

```md
闭包是能够访问自由变量的函数。
通过访问闭包，就会涉及变量对象和作用域链两大概念。
因为作用域与作用域链的关系，内部函数可以访问外部的变量，让我们获取变量更方便。
因为获取变量更方便，GC不好判断这个对象不再被引用，所以不会被GC回收。
这样我们就可以延长变量的生存周期。
常见的闭包应用由：防抖，节流....

创建私有变量，延长变量的生命周期
```

:::

## 数据类型

::: details

原始类型：null, undefined, number, string, boolean, BigInt, Symbol
引用类型：Object, Array, regExp(正则表达式), Date, Function 

:::

### 原始类型

#### null

#### number

::: details

```js
const a = 0b11; // 二进制
console.log(a); // 3
const b = 0o11; // 八进制
console.log(b); // 9
const c = 0x11; // 十六进制
console.log(c); // 17
console.log(11 .toString()); // 需要有空格，不然浏览器会把.当成小数点，就报错了。 打印结果为 11

// 进制转换
const d = parseInt(100, 2); // 等价于 0b100
console.log(d, 0b100); // 4 4
const e = 100 .toString(2); // 100转成 2进制
console.log(e); // 1100100
```

:::

#### string

* JSON.stringify() 序列化：能不能传给后端，看能不能被序列化（JSON.stringify()）。
* JSON.parse() 反序列化

```js
// 打印结果：{"d":999,"e":null}
console.log(JSON.stringify({
    a: undefined, // 直接忽略了
    b: Symbol(), // 直接忽略了
    d: 999, // 不会被忽略
    e: null, // 不会被忽略
    // 报错：Do not know how to serialize a BigInt（不知道如何序列化BigInt）
    // c: BigInt(9007199254740991) 
}))
```

#### boolean

!! 转成布尔值

#### undefined

不建议使用undefined,它是 window的一个属性。使用void 0，就好了;

#### BigInt

以node.js计算为主，正经的浏览器业务不会用到

#### Symbol

解决命名冲突

### 如何判断数据类型

* typeof :可以判断原始类型和 Function
* instanceof: 构造函数的prototype属性是否出现在某个实例对象的原型链上。

::: details

```js
const arr = [3223];
console.log(arr instanceof Object); // 结果为true
```

手写instanceof

```js
function myInstanceof(left, right) {
  // 基本类型直接返回false
  if (typeof left !== 'object' || left === null) return false;
  
  // 检查right是否为有效构造函数
  if (typeof right !== 'function' || !right.prototype) {
    throw new TypeError('Right-hand side of instanceof is not callable');
  }

  let proto = Object.getPrototypeOf(left);
  while (proto !== null) {
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```


:::

* Object.prototype.toString.call(arr) === "[object Array]  判断是否是数组

::: details

```md
    const arr = [23423, {a:323}];
    console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true

      Object.prototype.toString({}) // "[object Object]"
      console.log("🚀 ~  Object.prototype.toString({}) :",  Object.prototype.toString({}) )
Object.prototype.toString.call({}) // call ok
console.log("🚀 ~ Object.prototype.toString.call({}) :", Object.prototype.toString.call({}) )
Object.prototype.toString.call(1) // "[object Number]"
console.log("🚀 ~ Object.prototype.toString.call(1) :", Object.prototype.toString.call(1) )
Object.prototype.toString.call('1') // "[object String]"
console.log("🚀 ~ Object.prototype.toString.call('1') :", Object.prototype.toString.call('1') )
Object.prototype.toString.call(true) // "[object Boolean]"
console.log("🚀 ~ Object.prototype.toString.call(true) :", Object.prototype.toString.call(true) )
const fn = Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call(null) //"[object Null]"
console.log("🚀 ~ fn:", fn)
Object.prototype.toString.call(undefined) //"[object Undefined]"
console.log("🚀 ~ Object.prototype.toString.call(undefined):", Object.prototype.toString.call(undefined))
Object.prototype.toString.call(/123/g) //"[object RegExp]"
console.log("🚀 ~ Object.prototype.toString.call(/123/g):", Object.prototype.toString.call(/123/g))
Object.prototype.toString.call(new Date()) //"[object Date]"
console.log("🚀 ~ Object.prototype.toString.call(new Date()) :", Object.prototype.toString.call(new Date()) )
Object.prototype.toString.call([]) //"[object Array]"
console.log("🚀 ~ Object.prototype.toString.call([]) :", Object.prototype.toString.call([]) )
Object.prototype.toString.call(document) //"[object HTMLDocument]"
console.log("🚀 ~ Object.prototype.toString.call(document) :", Object.prototype.toString.call(document) )
Object.prototype.toString.call(window) //"[object Window
    console.log("🚀 ~ Object.prototype.toString.call(window):", Object.prototype.toString.call(window))

🚀 ~  Object.prototype.toString({}) : [object Object]
test.html:13 🚀 ~ Object.prototype.toString.call({}) : [object Object]
test.html:15 🚀 ~ Object.prototype.toString.call(1) : [object Number]
test.html:17 🚀 ~ Object.prototype.toString.call('1') : [object String]
test.html:19 🚀 ~ Object.prototype.toString.call(true) : [object Boolean]
test.html:22 🚀 ~ fn: [object Function]
test.html:24 🚀 ~ Object.prototype.toString.call(undefined): [object Undefined]
test.html:26 🚀 ~ Object.prototype.toString.call(/123/g): [object RegExp]
test.html:28 🚀 ~ Object.prototype.toString.call(new Date()) : [object Date]
test.html:30 🚀 ~ Object.prototype.toString.call([]) : [object Array]
test.html:32 🚀 ~ Object.prototype.toString.call(document) : [object HTMLDocument]
test.html:34 🚀 ~ Object.prototype.toString.call(window): [object Window]
```

:::

* 通用手写

::: details

```js
function getType(obj){
 let type = typeof obj;
 if (type !== "object") { // typeof
 return type;
 }
 // typeof object
 return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/,
'$1');
}
```

:::

### 如何保证某个function为函数/构造器

::: details

```js
function judge() {
    if (new.target) {
        console.log('构造器')
    } else {
        console.log('函数')
    }
}
judge(); // 函数
new judge(); // 构造器
```

:::

## 堆和栈

:::details

栈是固定大小且容量小的内存空间，用来存储比较小的数据，如原始类型的值和引用类型地址的指针。
堆是不定大的内存空间，用来存储引用类型的值

:::

## 按值传递和按引用传递

:::details

对于原始类型，它都比较小，它会拷贝一个新的内存空间。对于引用类型，不适合拷贝新的值，开辟新的内存空间，
所以它是按引用传递的。

:::

## 浅拷贝和深拷贝

### 浅拷贝

浅拷贝只复制对象的第一层属性，如果属性值是引用类型(如对象、数组等)，则复制的是对象引用(内存地址)，而不是实际数据。
两个指针指向一个真实数据，从内存实现层面描述。

* 扩展运算符

::: details

```js
// 属性值如果是原始类型，就直接拷贝值。如果是引用类型，拷贝的是堆内存的地址指针（放于栈中）， 
// 不会新创建一个堆，存储真实数据。
const arr = [23,23423, {name: '虚空剑神'}];
const newArr = [...arr];
newArr[0] = 999; // 23， 999
newArr[2].name = "星空联盟"; // 星空联盟， 星空联盟
// newArr[2] = {name: '星空联盟'}; // 虚空剑神，星空联盟
console.log("🚀 ~ arr:", arr, arr[2].name); 
console.log("🚀 ~ newArr:",newArr, newArr[2].name)
```

:::

* Object.assign

::: details

```js
const obj = {dynasty:['秦朝', '汉朝'], year: 2000};
const newObj = {};
// target, source
// 将source的属性赋值给target。
Object.assign(newObj, obj);
// Object(obj, newObj);
// 直接赋值，就是深拷贝
// obj.dynasty = ['隋朝', '唐朝']; // 秦朝，汉朝 ； 隋朝，唐朝
// obj.year = 3000; // 2000, 3000
newObj.year = 5000; // 2000， 5000
newObj.dynasty[1] = '唐朝'; // 都是 隋朝 唐朝
obj.dynasty[0] = '隋朝'; // 都是隋朝 唐朝
console.log("🚀 ~ newObj:", newObj, newObj.dynasty)
console.log("🚀 ~ obj:", obj, obj.dynasty)
```

:::

* Array.prototype.slice()

::: details

```js
const arr = [23,23423, {name: '虚空剑神'}];
const newArr = arr.slice();
newArr[0] = 999; // 23， 999
newArr[2].name = "星空联盟"; // 星空联盟， 星空联盟
// newArr[2] = {name: '星空联盟'}; // 虚空剑神，星空联盟
console.log("🚀 ~ arr:", arr, arr[2].name); 
console.log("🚀 ~ newArr:",newArr, newArr[2].name)
```

:::

### 深拷贝

::: details

```js

```

:::

## this指向

::: details

new

* 创建了一个新的对象
* 对象的__proto__执行函数的prototype
* 立即调用这个函数，并将this指向这个对象
* 如果函数的返回值是引用类型，返回值直接取函数的返回值，否则取新的对象

bind: 改变this指向，不立即调用（返回调用的函数），可以多次传参且参数随意，
call: 改变this指向，立即调用，一次可以传多的参数
apply: 改变this指向，立即调用，一次只能传数组

this指向

* this会永远指向最后调用它的人。
* new, apply, call, bind也是根据这条不变的规律，通过包装，实现改变this指向。
* new > apply,call,bind动态绑定 > 最后调用它的人（隐式绑定） > 默认绑定（undefined或window）

:::

## 类数组对象与arguments

:::details

普通函数都默认有arguments参数，它是一个类数组

### 如何转成真实的数组？

* Array.from(类数组)
* [...类数组]
* Array.prototype.slice.call(类数组)
* for循环

:::

## 浏览器事件模型

::: details

事件流都会经历三个阶段

* 事件捕获阶段
* 处于目标阶段
* 事件冒泡阶段

preventDefault() 阻止默认事件
stop阻止事件冒泡，从子到父，
prevent阻止事件捕获，从父到子

事件委托（事件代理）
如列表的元素有很多，不好一个一个地给它们绑定事件，就让它的父元素代理绑定事件

兼容各类浏览器
addEventLister  => attachEventListener => onclick

:::

## 浏览器请求



xhr

fetch

### ajax

#### 概念

::: details
AJAX 全称 （Async JavasScript and XML）
即异步的 JavaScript 和 XML, 是一种创建 交互式网页应用 的网页开发技术，可以在不重新
加载整个网页的情况下，与服务器交换数据，并且更新部分网页。
Ajax 的原理 简单来说，就是通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，
然后用 JavaScript 来操作 DOM 而更新页面。

实现Ajax 异步交互需要服务器逻辑进行配合，需要完成以下步骤：

* 创建 Ajax 的核心对象 XMLHttpRequest 对象
* 通过 XMLHttpRequest 对象的 open() 方法与服务器端建立连接
* 构建请求所需要的数据内容，并通过 XMLHttpRequest 对象的 send() 方法发送给服务器端
* 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件 监听服务器端的通信状态
* 接收并处理服务器 向 客户端 响应的数据结果
* 将 处理结果 更新到 HTML 页面中。

XMLHttpRequest: 该 API 由微软在 1999 年（IE5）首次实现，命名为 XMLHttpRequest，因为当时 XML 是主流的数据交换格式。

:::

#### 封装一个ajax请求

::: details

```js
// 封装一个ajax请求
function ajax(options) {
    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    // 初始化参数的内容
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';
    const params = options.data;

    // 发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true);
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true);
        xhr.send(params);
    }

    //接收请求
    xhr.onreadystatechange = function () {
        // 请求操作已经完成。这意味着数据传输已经彻底完成或失败。readyState === 4
        if (xhr.readyState === 4) {
            let status = xhr.status;
            if (status >=200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }
}
```

:::

#### 使用方式如下

::: details

```js
ajax({
    type: "post",
    dataType: 'json',
    data: {},
    url: 'https://xxx',
    success: function(text, xml) { // 请求成功后的回调函数
        console.log(text);
    },
    fail: function(status) { // 请求失败后的回调函数
        console.log(status);
    }
})
```

:::

axios

## 前端异步编程规范

### Promise

::: details

1. 三个状态，状态不可逆
2. throw会触发reject
3. then本身也是返回一个Promise,可以进行链式调用，
可以接收两个回调函数，回调函数可以是函数，也可以不是函数，
不是函数，状态和结果都会穿透。
4. Promise.then()的回调函数是以微任务的方式执行的

:::

### Promise的其他方法

::: details

* Promise.all 所有都成功就执行,一个失败都不行，返回所有的结果
* Promise.race 第一个完成的，无论失败或成功，就执行
* Promise.allSettle: 所有的都有结果，无论成功失败与否，就执行
* Promise.any: 只有有一个成功就执行，直到所有的都失败，才不执行。

:::

### 带并发限制的异步调度器 Scheduler

::: details

:::

### async 和 await

::: details

async 函数 返回一个promise对象

```js
function fn() {
    return Promise.resolve('200');
}

// 等价于
async function asyncFn() {
    return '200';
}
```

:::

::: tip

下面的例子中，await 会阻塞下面的代码（即加入微任务队列, 想象成promise.resolve().then() ）。
先执行async 外面的同步代码（console.log(3)）
，同步代码执行完，再回到async 函数中，再执行之前阻塞的代码(console.log(2))。 

```js
async function fn1() {
    console.log(1);
    await fn2();
    console.log(2); // 阻塞, 理解成promise.resolve().then(function() {console.log(2)})
}
async function fn2() {
    console.log('fn2');
}
fn1();
console.log(3);
// 结果： 1， fn2, 3, 2
```

:::

拿捏呢，我不是几百年前就无敌了，而是努力了几百年后，才无敌的。手写Promise后，明白Promise构造函数里面的
东西是同步代码，.then的回调函数是微任务执行的。

::: details

```js
async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end'); // 微任务1  6
}
async function async2() {
    console.log('async2'); // 3
}
console.log('script start'); // 1
setTimeout(function() {
    console.log('settimeout'); // 宏任务1 8
})
async1();
new Promise(function(resolve) {
    console.log('promise1'); // 4
    resolve()
}).then(function () {
    console.log('promise2'); // 微任务2 7
})
console.log('script end');// 5
```

:::

### generator

::: details

:::

## 前端模块化规范


### 总结

::: details

```md
IIFE 立即执行函数表达式
common.js:用于服务端，可以动态执行
esModule: 静态执行，编译后就能知道依赖之间的关系，所以能被tree-shaking
umd:
amd:
cmd:
```

:::

### UMD

::: details

```md
判断是否支持 CommonJS（Node.js） → typeof module === 'object' && module.exports

判断是否支持 AMD（RequireJS） → typeof define === 'function' && define.amd

判断是否支持 CMD（SeaJS） → 部分 UMD 实现也会兼容 CMD

否则，挂载到全局变量（window 或 global）
```

```js
(function(root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        console.log('是commonjs模块规范，nodejs环境')
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        console.log('是AMD模块规范，如require.js')
        define(factory)
    } else if (typeof define === 'function' && define.cmd) {
        console.log('是CMD模块规范，如sea.js')
        define(function(require, exports, module) {
            module.exports = factory()
        })
    } else {
        console.log('没有模块环境，直接挂载在全局对象上')
        root.umdModule = factory();
    }
}(this, function() {
    return {
        name: '我是一个umd模块'
    }
}))
```

:::

## 解释型语言与编译型语言

::: details

JavaScript是解释型语言，边编译，边执行
Go是编译型语言，

:::

## JavaScript引擎

### 进程与线程

::: details

每个应用程序，都有单独的进程。进程之间的数据互不影响。
线程是应用程序执行的最小单位。

:::

### Js为什么是单线程

::: details

* js的设计之初，被应用于页面的简单交互
* 多线程存在竞态问题，
* 单线程就能解决大多数问题，让开发更简单。
* 事件循环和现代接口，助力程序执行

:::

### js为了实现非堵塞的异步编程=>采用了事件循环机制

::: details

调用栈(Call Stack)：同步代码（任务）的执行栈
任务队列(Task Queue)：包括宏任务队列和微任务队列
事件循环(Event Loop)：协调调用栈和任务队列的机制

完整事件循环流程：

1. 执行当前宏任务（如script整体代码）
2. 执行所有可执行的微任务 - 直到微任务队列为空
3. 执行渲染（浏览器环境）
4. 从宏任务队列取出下一个任务
5. 重复循环

宏任务->当前产生的所有微任务->GUI渲染->宏任务

无论是宏任务还是微任务，都属于异步任务
JavaScript 是单线程语言，真正的同步任务会直接在主线程执行

宏任务：除了微任务，就是宏任务
微任务：MutationOberserve(), Promise.then/catch/finally, process.nextTick(Node.js), 
:::

## GC

### 查证

* https://v8.dev/blog/trash-talk
* https://v8.dev/blog
* https://v8.dev/

### 什么是垃圾

::: details
程序中使用过的或者不再使用的内存，就是垃圾。比如，定义一个变量，将这个变量赋值给了一个对象，
就是这个变量引用了这个对象。这时将这个变量重新赋值给一个数组，此时变量就引用了数组对象，
那么之前的变量的引用关系就没有了。
:::

### 为什么要垃圾回收

::: details

操作系统提供的内存是有限的，程序的运行需要内存。如果不释放不再使用的内存空间，
随着我们的程序运行得越来越多，内存空间迟早会不够用，这样就会导致系统崩溃和程序运行错误。

:::

### 内存泄漏

::: details

内存泄漏（Memory leak）是在计算机科学中，由于疏忽或错误造成程序 未能释放已经不再使用的内存。

场景：

* 闭包：内部函数引用外部变量，阻止GC, 避免不必要的闭包。
* 定时器未清除，使用clearInterval, clearTimeout, 再赋值null;
* removeChild(el); 还需 el = null;
* 不需要事件监听，removeEventListener.
* 第三方库未销毁。调用destroy()或类似方法。eg: sortable.js

如何检查内存泄漏？

Chrome DevTools → Memory → Heap Snapshot：对比前后快照，查看内存增长。

Performance Monitor：观察 JS Heap 是否持续增长。

window.performance.memory（非标准 API）：

:::

### 垃圾回收的方式

#### 还需要继续分析，

::: details
分代回收是 V8 的基础设计。

增量标记（Incremental Marking）用于减少垃圾回收导致的页面卡顿。

```cpp
// V8 的堆内存分为新生代和老生代：
enum AllocationSpace {
  NEW_SPACE,   // 新生代（使用 Scavenge 算法）
  OLD_SPACE,   // 老生代（Mark-Sweep-Compact）
  // ...其他空间
};

* 新生代（NEW_SPACE）使用 Scavenge（复制算法）。
* 老生代（OLD_SPACE）使用 Mark-Sweep-Compact（标记-清除-压缩）。


```

:::

#### 标记清除法

::: details
将程序中所有的语句，都标记为0，被执行了，就标记为1，清除没有标记为1的垃圾。
只需要一个二进制，就能实现垃圾回收。
问题是 会产生较多的内存碎片。通过标记整理法，优化了下。
:::

#### 引用计数法

::: details
一个变量被引用，计数就+1，反之没被引用了，计数就-1。但如果存在互相引用关系，
就无法被标记为垃圾，进而清除。
:::

#### 新生代与老生代

::: details
新生代：比较小，活跃
老生代：比较大，不活跃
:::

## 浏览器运行机制

### 浏览器输入url

::: details

* DNS解析
* tcp三次握手
* 客户端向服务端发送请求
* 服务端响应客户端
* 客户端接收服务端数据并处理
* 浏览器渲染

:::

### 浏览器渲染

::: details

* 解析HTML,生成 DOM 树
* 解析CSS，生成CSSOM树
* 合成DOM树和CSSOM树，生成渲染树
* 计算每个节点的几何信息
* GUI进行绘制

:::

## 函数式编程

::: details
函数式编程旨在 尽可能地提高代码的无状态性和 不变性。要做到这一点，就要学会使用无副作用的函数，
也就是纯函数。
纯函数是 对给定的输入返还相同的输出，并且要求你所有的数据都是不可变的，即纯函数 = 无状态 + 数据不可变。

纯函数的好处：

* 使用纯函数，我们可以产生可测试的代码
* 不依赖外部环境计算，不会产生副作用，提高函数的复用性。

函数式编程的 优点：

* 更好的管理状态：因为它的宗旨是无状态，或者说更少的状态，能最大化地减少这些未知、优化
代码，减少出错情况
* 更简单的复用：固定输入 -> 固定输出，没有其他外部变量影响，并且无副作用。这样代码复用时，
完全不需要考虑它的内部实现和外部影响
* 更优雅的组合：往大的说，网页是由各个组件组成的。往小的说，一个函数也可能是由 多个小函数组成的。
更强的复用性，带来更强大的组合性。
* 隐性好处。减少代码量，提高维护性。

函数式编程的缺点：

* 性能：函数式编程相对于指令式编程，性能绝对是一个短板，因为它往往会对一个方法进行过度包装，从而产生
上下文切换的性能开销。
* 资源占用：在Js中为了实现对象状态的不可变，往往会创建新的对象，因此，它对垃圾回收所产生的压力
远远超过其他编程方式。
* 递归陷阱：在函数式编程中，为了实现迭代，通常会采用递归操作。

:::

## 柯里化解决了什么

::: details

柯里化的目的在于避免频繁调用具有相同参数的函数
惰性执行：
每次调用柯里化函数时，若参数不足，则返回一个新函数（继续等待剩余参数），直到参数足够时才执行计算。

 

:::

## es6 & EsNext

### const、let、var

::: details
const,let存在块级作用域，不存在声明提升，且不允许重复声明

:::

##### 变量声明：const、var、let

变量声明 ，变量/参数 ，字面量

##### 区别

::: details

* 块级作用域

```md
var: 具有函数作用域或全局作用域。在函数内部声明的var变量，在整个函数内都可访问，即便在块级作用域
(如for循环)内声明，也会提升到函数的顶部，这种现象称为变量提升。
let 和const: 具有块级作用域。在块级作用域内声明的let 和 const 变量，只能在该块级作用域内访问，
在块级作用域外部无法访问。
```

```js
function play() {
    console.log(i); // undefined
    for(var i = 0; i < 3; i++) {
    }
    console.log(j); // ReferenceError: j is not defined
    for(let j = 0; j < 3; j++) {
    }
}
play();
```

* 变量提升

```md
var: 会发生变量提升，即变量可以在声明之前被使用，但是值为undefined.
let 和 const ：不存在变量提升。在声明之前访问 let 或const 声明 的变量会导致ReferenceError错误，
这被称为暂时性死区。
```

* 重复声明
* 重新赋值

:::

##### 字面量

### 箭头函数和普通函数的区别？

::: details

* 箭头函数没有自己的this (闭包 => 作用域链 和 变量对象)(闭包 => 词法作用域)
* 箭头函数不能通过 call,apply,bind改变 this指向
* 箭头函数没有arguments (闭包 => 作用域链 和 变量对象)(闭包 => 词法作用域)
* 箭头函数不能作为构造函数（不能使用 new 调用）（没有prototype属性）
* 箭头函数比较简洁（没有花括号，可直接帮我们return函数调用结果）

总结：需要动态this或者拥有自己的arguments或者构造函数时 用普通函数，否则优先箭头函数

```js
// 案列一
const obj = {
    say: () => {
        console.log(this, 'arrow Fn');
        console.log(arguments, 'arrow');

    },
    speak() {
        console.log(this, '普通函数');
        console.log(arguments, '普通函数');
    }
}
obj.speak();
obj.say();

// 案例二
function fn() {
    const obj = {
        say: () => {
            console.log(this, 'arrow Fn');
            console.log(arguments, 'arrow');

        },
        speak() {
            console.log(this, '普通函数');
            // 打印外层函数的arguments
            console.log(arguments, '普通函数');
        }
    }
    obj.speak();
    obj.say();
}
fn();

// 案例三
const arrowFn = () => {
    console.log('arrowFn');
}
const fn = function() {
    console.log('fn')
}
console.log("🚀 ~ fn:", fn.prototype)       
console.log("🚀 ~ arrowFn:", arrowFn.prototype)
const fnObj = new fn();
console.log("🚀 ~ fnObj:", fnObj)
const arrowObj = new arrowFn();
console.log("🚀 ~ person:", person)

// 案例四
const arrowFn = () => {
    console.log('arrowFn', this);
}
const fn = function() {
    console.log('fn', this);
}
const obj = {
    name: 'durant'
}
fn.bind(obj)();
arrowFn.bind(obj)();
const person = {
    name: 'durant',
    age: 35
}
fn.call(person);
arrowFn.call(person);
const gracefulPerson = {
    name: 'durant',
    age: 35,
    fmvp: 2
}
fn.apply(gracefulPerson);
arrowFn.apply(gracefulPerson);
```

:::

## TypeScript

### 关键特性

* 静态类型检查：TypeScript 在编译时就会检查代码的类型是否匹配，能够发现很多潜在的错误。即使是简单的错误（例如拼写错误或类型不一致），也可以在编写代码时被捕获到。
* 类型推断：TypeScript 能够自动推断变量的类型。比如当你声明一个变量并赋值时，TypeScript 会根据赋值来推断这个变量的类型，不需要每次都显式声明类型。
* 代码提示：已知是字符串，vscode编辑器就能显示字符串的方法，使开发过程高效。
* 团队合作
* 便于前后端协作，thift/swagger

### 类型

#### 基础类型

```md
const aa: null = null;
const bb: undefined = undefined;
const cc: string = "23";
const dd: number = 2;
const ee: boolean = true;
const ff: Symbol = Symbol();
let gg: bigint;
const func: Function = () => undefined;
```

#### 常见类型

```md
// Object
const obj: Record<string, any> = {string: 'any'}

// Array
const numArr: number[] = [32, 33];
const numArr: Array<number> = [123, 456];

// Promise
//async 是异步函数，也适合用promise<string>
function chooseColor = () : promise<string> {
} 

//interface的extends
interface Person {
    age: number
}
interface BaseInfo extends Person{
    name: string,
    gender?: string
}

//namespace:归类效果
namespace Eslint {
    interface ccc {
        log: string,
        isLog: boolean
    }
    interface animal {
        nickname: string
    }
    type: number
}
Eslint.ccc


interface Obj {
  name: 'durant',
  age: '18'
}
type PickUser = Pick<Obj, 'name'>;
type OmitUser = Omit<Obj, 'name'>;
// Omit: 忽略我们不需要关心的属性
// Pick: 拣选我们需要关系的属性
// Partial：全都变成可选属性
// Required: 全都变成必选属性

import type { langType } from "@/I18n/index.ts";  // ✅ 正确：显式声明仅导入类型

["zh-cn", "en"] as const; // 固定常量，用于类型安全。

// 对象（遍历对象中的每个属性，键不一定有，值为 replaceCallback的数组）
{ [key in EventTypes]?: ReplaceCallback[] }



declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $blocksMap: string
  }
}
// 同样用法
import {
  DefineNumberFormat
} from 'vue-i18n'
declare module 'vue-i18n' {
  // define the number format schema
  export interface DefineNumberFormat {
    currency: {
      style: 'currency'
      currencyDisplay: 'symbol'
      currency: string
    }
  }
}
```

#### 特殊类型

* any 相当于js
* unknown 更安全的any, 有类型守卫/判断类型。（eg: *** instanceof Array）

TypeScript 提供了类型守卫（如 typeof 和 instanceof），用于在运行时缩小变量的类型范围。

* void 函数没有返回值
* never 永远没有结果

* type
* interface

interface 可以重复定义，type 不行。

* 枚举 enum
* promise `Promise<name: string> => Person`
* 联合类型 |
* 交叉类型 &
* 命名空间 namespace: iife+闭包

#### 类型工具/类型操作工具

* Partial 把必填变为可选
* Require 把可选变为必填
* Record<string, any>用于表示一个键为字符串类型，值可以为任意类型的对象。
* Readonly 只读，可以解决引用类型+const定义的变量，其属性可被修改，很像Object.freeze()
* Pick<Person, 'name' | 'gender'> 挑选哪些属性，我有名、有性别
* Omit<Person, 'age'> 省略（排除）哪些属性，除了年龄我都有
* exclude<'a' | 'b' | 'c', 'a'> 从联合类型，进行排除
* Parameters<****> 有点像函数的arguments，类数组
* ReturnType<****>

### tsc命令行编译器

tsc是TypeScript的官方命令行编译器，用来检查和编译TypeScript代码，生成JavaScript代码。

tsc 默认使用当前目录下的配置文件tsconfig.json，但也可以接受独立的命令行参数。命令行参数会覆盖tsconfig.json，比如命令行指定了所要编译的文件，那么 tsc 就会忽略tsconfig.json的files属性。

#### ts-node

ts-node是一个TypeScript执行引擎，能让我们在Node.js环境下直接运行TypeScript代码。

运行命令 `ts-node test.ts`

#### tsc的命令行参数

* --watch（或者-w）：进入观察模式，只要文件有修改，就会自动重新编译。
* --module：指定编译生成的模块格式。
* --sourcemap：为编译产生的 JS 文件生成 SourceMap 文件（.map 文件）。
* --outDir：指定编译产物的存放目录。
* --outFile：所有编译产物打包成一个指定文件。

#### 用例

npm install -g typescript

`tsc --init` 生成tsconfig.json文件

`tsc -p ./` 编译ts文件，转成js文件

tsconfig.json

```json
{
    "compilerOptions": {
        "outDir": "./dist", // 指定输出目录为dist文件夹
        "target": "es5", // 设置目标语言的版本
        "module": "commonjs", // 设置模块系统
        "strict": true // 启用所有严格类型检查
    },
    "include": [
        "./src/**/*" // 包含src目录及其子目录下所有的ts文件
    ],
    "exclude": [
        "./node_modules", // 排除node_modules目录
        "./**/*.spec.ts" // 排除所有的spec文件
    ]
}
```

```json
{
  "compilerOptions": {
    "outDir": "dist", // 输出的目录
    "sourceMap": true,
    "target": "ES2016", // 目标语法
    "module": "ESNext", // 模块格式
    "moduleResolution": "node", // 模块解析方式
    "strict": false, // 严格模式(eg: any会报红)
    "resolveJsonModule": true, // 解析json 模块
    "esModuleInterop": true, // 允许通过es6模块引入commonjs模块
    "jsx": "preserve", // jsx 不转译
    "lib": ["ESNext", "DOM"], // 支持的类库
    // 配置别名
    "baseUrl": ".",
    "paths": {
      "@vue/*": ["packages/*/src"]
    }
  }
}
```

#### 待补充，未整理

extends interface
implements class 的定义
namespace命名空间的本质是闭包+iife。
同级目录ts变量共享，我们使用EsModule解决这个问题。
global.d.ts
thift / swagger
HTMLButtonElement、HTMLCanvasElement
装饰器-》类方法-内层定义、类的构造器-外层定义，属性。运用像express api（user/getUserInfo）中间件
Reflect
declare
keyof、typeof
变量命名空间const a :string，类型命名空间type a = "string" | "number"

### 强化秘法

#### interface和type的区别

::: details

```md
相同点：interface和type都可以用于定义 对象结构。
不同的是
* interface: 更专注与对象和类的结构，支持继承、自动合并。
* type: 可以定义类型别名、联合类型、交叉类型，不支持继承和自动合并。

type a = number; // 类型别名
```

:::

#### interface 和抽象类的区别？

::: details

```md
相同点：都用于定义一个类的格式
不同点：
* 接口：只能描述结构，不能有任何实现代码，一个类，可以实现多个接口。
* 抽象类：既可以包含抽象方法，也可以包含具体方法。一个类只能继承一个抽象类。
```

```js
interface Esbuild {
    dev(): void;
}
interface Rollup {
    prod(): void;
}
class Vite implements Esbuild, Rollup {
    
}
```

:::

#### any 和unknown的区别

::: details

```md
unknow是更安全的any,是需要类型守卫，才能进行操作的。
```

:::