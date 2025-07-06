# Web基础

* document.querySelector
* Element.innerHTML()
* Element.setAttribute()
* EventTarget.addEventListener();
* HTMLElement.style();
* Node.appendChild();
* window.onload
* window.scrollTo()
* Node.textContent() 来设置和清除文本

## Web API增删改查

### 创建

* createElement：创建元素(html标签)
* createTextNode：创建文本节点
* `createDocumentFragment`: 创建一个文档碎片，把文档碎片的内容一次性添加到DOM 中。（创建一个临时存储区，把所有的东西都往里面放，放完之后，再统一被人收走）

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="hobby">
    </ul>
    <script>
        const ul = document.getElementById('hobby');
        const hobbies = ["football", 'basketball', 'pingpong'];
        const itemsFragment = document.createDocumentFragment();
        for(const item of hobbies) {
            const li = document.createElement('li');
            li.textContent = item;
            itemsFragment.append(li);
        }
        ul.appendChild(itemsFragment);
    </script>
</body>
</html>
```

:::

* createAttribute：创建属性节点，可以是自定义属性

### 删

* removeChild: 获取要删除的节点，调用父节点的removeChild，把自己删了。

### 改

* appendChild
* insertBefore
* setAttribute
* innerHTML
* innerText、textContent

::: details

* textContent 表示一个节点及其后代的文本内容。（显示和隐藏的都有）
* innerText 表示一个节点及其后代所渲染文本的内容（只有显示的）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .display-none{
            display: none;
        }
    </style>
</head>
<body>
    <div class="big-box">
        <div class="display-none">
            隐藏
        </div>
        <div>显示</div>
    </div>
    <script>
       const bigEl = document.getElementsByClassName('big-box')[0];
       console.log(bigEl.textContent); // 表示一个节点及其后代的文本内容，eg: 隐藏，显示
       console.log(bigEl.innerText); // 表示一个节点及其后代所渲染文本的内容(注意渲染)，eg: 显示
    </script>
</body>
</html>
```

:::

* style

### 查

* querySelector: 传入选择器，没有返回null, 查询到很多个，返回一个第一个。

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="nba">
        <li>durant</li>
        <li class="curry">curry</li>
        <li id="james">james</li>
    </ul>
    <script>
        // 标签li, ID选择器，类选择器，属性选择器，后代选择器
        const queryEl = document.querySelector('#james33');
        console.log(queryEl);
        console.log('所有的', document.querySelectorAll('li'));
    </script>
</body>
</html>
```

:::

* querySelectorAll: 传入选择器，查询所有的。
* document.getElementByTagName: 传入标签名，返回列表。eg: `document.getElementsByTagName('li')`
* document.getElementById：id选择器，具有唯一性，所以是element
* document.getElementsByClassName: 类选择器，代表一类事物，所以是elements
* document.body: 获取页面body里面的内容，包括body
* documentElement: 返回整个html文档，不包括声明是html文档那句

## JavaScript的运行环境组成

JavaScript 的完整运行环境由 ECMAScript（核心语言）、DOM（文档对象模型） 和 BOM（浏览器对象模型） 三部分组成

### 核心ECMAScript

::: details

由ECMA-262定义并提供核心功能（由 ECMA-262 标准定义的 JavaScript 语言核心，eg:语法、类型、关键字、内置对象等）

定义：由 ECMA-262 标准定义的 JavaScript 语言基础，与任何宿主环境（如浏览器、Node.js）无关。

包含内容：

* 语法（变量、循环、函数、类等）。
* 内置对象和数据类型（Array、Date、Promise、Symbol 等）。
* 严格模式（"use strict"）。

:::

### DOM文档对象模型(document object model)

::: details

提供与网页内容交互的方法和接口(由 WHATWG 标准化的 操作网页内容的接口，将 HTML/XML 文档抽象为树形结构)

:::

### BOM浏览器对象模型(brower object model)

::: details
提供与浏览器交互的方法和接口(非标准化的浏览器特有功能集合，无统一规范，各浏览器实现可能不同)

包含内容：

* window（全局对象）、navigator（浏览器信息）、location（URL 操作）、history（导航历史）、screen（屏幕信息）。
* 弹窗（alert）、定时器（setTimeout）、AJAX（早期 XMLHttpRequest）。

:::

#### window

::: details

moveBy,moveTo,resizeBy,resizeTo,scrollTo,scrollBy
Open,close
Eg: window.close() 仅用于通过window.open() 打开的窗口
新创建的window对象有一个opener属性，该属性指向打开他的原始窗口对象。

:::

#### Location

::: details
:::

#### Navigator

::: details
:::

#### Screen

::: details
:::

#### History

::: details
用来操作浏览器URL的历史记录
:::

## 字符串的常用方法（有助于算法题）

### 增

::: details

* concat

```js
const a = 'hello,'
const b = 'world!';
console.log(a.concat(b)); // hello,world!
```

:::

### 截取

* slice：截取。不改变原字符串的内容，而是创建字符串的一个副本。

```js
const str = 'durant';
console.log(str.slice(2, 4), str); // ra durant
```

::: details

* substring: 

```js
const tel = "12580";
console.log(tel.substring(1,2)); // 2
```

* substr:截取，不再推荐使用该特性。已弃用。

:::

### 改

::: details

* trim: 清空左右的空格

```js
const greeting = "   Hello world!   ";
console.log(greeting); //   Hello world!   
console.log(greeting.trim()); // Hello world!
```

* trimStart：trimLeft() 是该方法的别名
* trimEnd
* toUpperCase: 将字符串转换为大写形式
* toLowerCase: 将字符串转换为小写形式

```js
const words = 'it is nothing, no big deal';
console.log(words.toUpperCase()); // IT IS NOTHING, NO BIG DEAL
console.log(words.toLowerCase()); // it is nothing, no big deal
```

:::

### 查

::: details

* chatAt: 返回给定索引处的字符

```js
const words = 'siakam';
console.log(words.charAt(3)); // k
```

* indexOf: 返回字符串第一次出现的位置索引，没有找到，返回 -1。第二个参数可选，从哪个索引开始搜索

```js
const words = 'siakamaaa';
console.log(words.indexOf('a', 1)); // 2
```

* startWith, includes: 返回布尔值

```js
console.log('redux'.includes('du')); // true
console.log('pinia'.startsWith('pi')); // true
```

:::

### 转换方法

* split

### 模板匹配方法

* match
* matchAll
* search
* replace

## 数组的常用方法

::: details

### 找符合条件

#### find: 返回符合的第一项，否则返回undefined;

```js
const arr = [{name: 'webpack'}, {name: 'vite'}, {name: 'vite'}];
const obj1 = arr.find(v => v.name === 'vite');  // {name: "vite"}
const obj2 = arr.find(v => v.name === 'rollup'); // undefined
console.log(obj1, obj2); // {name: 'vite'} undefined
```

#### filter: 返回所有符合条件的，否则返回[]

```js
const arr = [{name: 'webpack'}, {name: 'vite'}, {name: 'vite'}];
const temp1 = arr.filter(v => v.name === 'vite'); // [{name: 'vite'}, {name: 'vite'}]
const temp2 = arr.filter(v => v.name === 'rollup'); // []
console.log(temp1, temp2);
```

#### findIndex: 找到第一个符合条件的索引，否则返回-1

```js
const arr = [{name: 'webpack'}, {name: 'vite'}, {name: 'vite'}];
const temp1 = arr.findIndex(v => v.name === 'vite'); // 1
const temp2 = arr.findIndex(v => v.name === 'rollup'); // -1
console.log(temp1, temp2);
```

#### some：有一个符合条件就返回true, 都不符合返回 false

```js
const arr = [{name: 'webpack'}, {name: 'vite'}, {name: 'vite'}];
const temp1 = arr.some(v => v.name === 'vite'); // true
const temp2 = arr.some(v => v.name === 'rollup'); // false
console.log(temp1, temp2);
```

#### every: 全部符合就返回true, 否则返回false

```js
const arr = [{name: 'vite'}, {name: 'vite'}];
const temp1 = arr.every(v => v.name === 'vite'); // true
const temp2 = arr.every(v => v.name === 'rollup'); // false
console.log(temp1, temp2);
```

:::

## 字符串的方法

::: details

#### repeat:重复某个字符

```js
console.log('abc'.repeat(3)); // abcabcabc
```

#### 

```js

```

:::

## js本地存储的方式有哪些？

* cookie
* sessionStorage
* localStorage
* indexedDB

## 如何判断一个元素是否在可视区域中？

### 常见应用

* 图片的懒加载
* 列表的无限滚动
* 计算广告元素的曝光情况
* 可点击链接的预加载

### 实现方式

* offsetTop、scrollTop
* getBoundingClientRect
* Intersection Observer

## 单点登录

单点登录 Single Sign On 简称为 SSO, 是目前比较流行的企业业务整合的解决方案之一。
SSO的 定义是在多个应用系统中，用户只需要登录一次 就可以访问所有相互信任 的应用系统
SSO 一般都需要一个独立的认证中心 （passport）,子系统的登录均得 通过passport, 子系统本身将不参与登录操作。
当一个系统成功登录以后， passport 将会颁发一个令牌 给各个子系统，子系统可以拿着 令牌去获取 各自得受保护资源。
各个子系统在被 passport 授权以后，会建立一个局部会话，在一定时间内可以无需再次向 passport发起认证。

## 如何实现上拉加载，下拉刷新？

## 正则表达式的理解？应用场景？

## web常见的攻击方式有哪些？如何防御？(web安全)

* XSS(Cross Site Scripting) 跨脚本攻击
* CSRF(Cross-site request forgery) 跨站请求伪造
* SQL注入攻击

## js的继承方式？

### 简单说说js的继承方式？

::: details

```md
原型链继承的缺点：引用类型的属性会被所有的实例共享。换言之，如果一个实例改变了该属性，
那么其他实例的该属性也会被改变。
使用构造函数继承避免了引用类型的属性会被所有的实例共享
构造函数继承，通过使用call或apply方法，我们可以在子类中 执行父类的构造函数，从而实现继承。
构造函数继承的缺点是，方法都在构造函数中定义，每次创建实例都会创建一遍方法。同时不能继承
基类的prototype上的属性。
```

:::

### 原型链继承

::: details

常见应用：

* Vue2重写了数组的7个变异方法（通过修改数组的原型来实现响应式）

#### 典型的原型链继承Child.prototype = new Parent();

```js
function Parent () {
    this.names = ['xianzao', 'zaoxian'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('test');

console.log(child1.names); // ["xianzao", "zaoxian", "test"]

var child2 = new Child();

console.log(child2.names); // ["xianzao", "zaoxian", "test"]
```

:::

### 构造函数继承

::: details

构造函数继承，通过使用call或apply方法，我们可以在子类中 执行父类的构造函数，从而实现继承。

```js
function Animal(name) {
    this.favorite = ['篮球', '跑步']
}
Animal.prototype.hobby = ['吃饭', '睡觉', '打豆豆']

function Dog() {
    Animal.call(this);
}

function Cat() {
    Animal.call(this);
}

const dogPlus = new Dog();
const catPlus = new Cat();
dogPlus.favorite.push('训练');
// catPlus.favorite.push('极限运动');
console.log("🚀 ~ dogPlus:", dogPlus)
console.log("🚀 ~ catPlus:", catPlus)
console.log(dogPlus.hobby, catPlus.hobby, '压根访问不到基类的hobby');
console.log("🚀 ~ dogPlus.favorite:", dogPlus.favorite)
console.log("🚀 ~ catPlus.favorite:", catPlus.favorite)
```

:::

### 组合继承

::: details

原型链继承 + 构造函数继承

```js
function Parent() {
    this.sayHello = function() {
        console.log('你好')
    }
}
Parent.prototype.desc = {
    name: '无敌风火轮'
}
function Child1() {
    Parent.call(this);
}
function Child2() {
    Parent.call(this);
}
Child1.prototype = new Parent();
Child2.prototype = new Parent();
const child1 = new Child1();
const child2 = new Child2();
child1.desc.name = "冲";
console.log(child1.desc, child2.desc);
```

```js
function Animal(name) {
    this.favorite = ['篮球', '跑步']
}
Animal.prototype.hobby = ['吃饭', '睡觉', '打豆豆']

function Dog() {
    Animal.call(this);
}

function Cat() {
    Animal.call(this);
}
Dog.prototype = new Animal();
Cat.prototype = new Animal();

const dogPlus = new Dog();
const catPlus = new Cat();
dogPlus.favorite.push('训练');
console.log("🚀 ~ dogPlus:", dogPlus)
console.log("🚀 ~ catPlus:", catPlus)
dogPlus.hobby.push('执行上下文有几种')
console.log(dogPlus.hobby, catPlus.hobby, '这下能访问到基类的prototype上的属性hobby了');
```

:::

### 寄生继承

::: details

```md

Object.create() + 增强对象

寄生继承是一种模式，通过增强对象的方式实现继承（不依赖构造函数或原型链）：

特点：
* 类似“工厂模式”，通过函数封装对象的创建和扩展。
* 适合需要动态增强对象的场景，但无法复用方法（每次创建新方法）。
```


```js
function createEnhancedObject(original) {
    const clone = Object.create(original); // 基于原对象创建新对象
    clone.newMethod = function() {         // 增强对象
        console.log('Added method!');
    };
    return clone;
}

const parent = { hobby: ['吃饭'] };
const child = createEnhancedObject(parent);
child.newMethod(); // "Added method!"
```

:::

### 寄生组合继承

::: details

```md

Object.create(Parent.prototype)	

最优解，属性独立、方法共享	现代开发推荐

特点：
* 只调用一次父类构造函数（Parent.call）。
* 避免组合继承中重复调用 new Parent() 的性能问题。
* 完美隔离引用类型属性（如 hobby）。
```

```js
function Parent(name) {
    this.name = name;
    this.hobby = ['吃饭'];
}
Parent.prototype.sayHello = function() { console.log(this.name); };

function Child(name) {
    Parent.call(this, name); // 构造函数继承（实例属性）
}

// 关键步骤：用 Object.create() 继承原型方法
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child; // 修复构造函数指向

const child1 = new Child('小明');
child1.hobby.push('睡觉');
console.log(child1.hobby); // ['吃饭', '睡觉']（独立）
```

```js
function inherit(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}
```

:::


#### 原型继承

::: details

通过原型，对象可以共享属性和方法

```js
function Animal(name) {
    this.name = name;
    // this.hobby = ['吃饭', '睡觉', '打豆豆']
}
Animal.prototype.sayHello = function() {
    console.log(`Hello, everyone! My Name is ${this.name}`);
}
// 这才叫原型属性 是 引用类型
Animal.prototype.hobby = ['吃饭', '睡觉', '打豆豆']
var dog = new Animal('小狗');
var cat = new Animal('小猫');

dog.sayHello();
cat.sayHello();

dog.hobby.push('训练')
// console.log(dog.hobby === cat.hobby)
console.log(dog.hobby); // ['吃饭', '睡觉', '打豆豆', '训练']
console.log(cat.hobby); // ['吃饭', '睡觉', '打豆豆', '训练']

```

:::

## 事件代理（也叫事件委托）

## 跨域（如何解决跨域问题） 

### 同源策略

### jsonp实现原理
