# js基础

## 原型与原型链

::: details

通过原型，对象可以共享属性和方法。
实例化对象的__proto__(隐式原型)会永远指向构造函数的显示原型prototype
原型链的顶端是null.
:::

## 词法作用域与动态作用域

::: details

JavaScript是静态作用域（词法作用域），变量的生效范围在编译时就已经确定了。与之相反的是，
bash,它是动态作用域，函数执行的时候，才确定生效范围。

:::

## 执行上下文

::: details
执行上下文有三种，全局执行上下文，函数执行上下文，Eval函数执行上下文
作用域有九种，

每个函数执行的时候，都会创建一个执行上下文。

执行上下文的生命周期包括三个阶段：创建阶段-> 执行阶段 -> 回收阶段

创建全局上下文 压入执行栈，
first函数被调用，创建函数执行上下文并压入栈
执行first函数过程 遇到second函数，再创建一个函数执行上下文 并压入栈
second函数执行完毕，对应的函数执行上下文被 推出 执行栈，执行下一个执行上下文first函数
first函数执行完毕，对应的函数执行上下文也被 推出栈中，然后执行全局上下文。
所有代码执行完毕，全局上下文也会被推出 栈中，程序结束。

:::

## 作用域与作用域链

::: details

作用域链是变量生效的区域。作用域链是由自己的执行环境和父级的执行环境组成的，通过作用域与作用域链的关系，
可以访问父级的变量。

:::

## 闭包

::: details

闭包是能够访问自由变量的函数。
通过访问闭包，就会涉及变量对象和作用域链两大概念。
因为作用域与作用域链的关系，内部函数可以访问外部的变量，让我们获取变量更方便。
因为获取变量更方便，GC不好判断这个对象不再被引用，所以不会被GC回收。
这样我们就可以延长变量的生存周期。
常见的闭包应用由：防抖，节流....

创建私有变量，延长变量的生命周期
:::

## 数据类型

::: details

原始类型：null, undefined, number, string, boolean, bigInt, Symbol
引用类型：Object, Array, regExp(正则表达式), Date, Function 

:::

## 如何判断数据类型

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

如何转成真实的数组？

* Array.from(类数组)
* [...类数组]

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

::: details

IIFE 立即执行函数表达式
common.js:用于服务端，可以动态执行
esModule: 静态执行，编译后就能知道依赖之间的关系，所以能被tree-shaking
umd:
amd:
cmd:

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

### 基础要诀

::: details

分为哪几类


:::

### 强化秘法

#### interface和type的区别

::: details

:::