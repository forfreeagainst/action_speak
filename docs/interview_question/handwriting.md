---
outline: deep
---

# 手写题

手写题，只为把知识串联起来。只做平时练习用。

## 手写new

### 实现原理

::: details

首先new 是关键字，我这里使用构造函数来实现

* 创建一个空对象
* 空对象的 隐式原型 指向 构造函数的显示原型
* 执行构造函数，this指向空对象。
* 构造函数的返回值如果是引用类型，就返回这个构造函数的返回值，否则就返回新的对象本身。

:::

### 实现

::: details

```js
function myNew(constructor, ...args) {
  const obj = new Object();
  // 因为要通过原型和原型链，共享属性和方法呀。
  obj.__proto__ = constructor.prototype; // 注意是两个下划线
  let res = constructor.apply(obj, args);
  return res instanceof Object ? res: obj;
}

function fn(name, age) {
  this.name = name;
  this.age = age;
  return 'ccc';
  return '测试';
  return {
    cc: '冲冲冲'
  };
}

const p1 = new fn('durant', 25);
console.log(p1, p1.name);
const p2 = myNew(fn, 'durant', 35);
console.log(p2, p2.name);
```

:::

## call & apply & bind

### 得先明白this指向问题

::: details

```md
绑定规则：
(1). 默认绑定：严格模式下，this会绑定到undefined。非严格模式下，this会绑定到window。eg: play(); // 直接调用 
(2). 隐式绑定：this永远指向最后调用它的对象。eg: obj.play(); fn.bind(); // 通过对象进行调用
(3). 显示绑定：call,apply,bind
(4). new绑定
优先级：new绑定优先级>显示绑定优先级> 隐式绑定优先级>默认绑定优先级。
（箭头函数没有this,它是基于闭包，闭包基于词法作用域，而词法作用域是在编译时确定的）
```

:::

### call、apply、bind区别

::: details

* 三者都能改变this指向
* call和apply都是立即调用，bind不是立即调用，而是返回一个函数
* call接收多个参数，apply接收一个数组，bind可以多次接收至多个参数
:::

### 什么叫改变this指向

::: details
    // bind, call ,apply
    const fn = function () {
      console.log(this, typeof this);
    }
    const obj = {
      name: 'durant'
    };
    let num = 999;
    fn(); // 打印window
    fn.call(obj); //打印obj
    console.log(typeof num)
    fn.call(num); // num会从number变成 object
:::

### call

::: details

```js
// context是基本类型，不能用呀，必须是对象呀，跟真实的call不一样呀
Function.prototype.call2 = function(context, ...args) {
  // 判断是否是undefined和null
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  let fnSymbol = Symbol()
  console.log(this, 'this');
  context[fnSymbol] = this
  let fn = context[fnSymbol](...args)
  delete context[fnSymbol] 
  return fn;//调用这个call2方法的函数的返回值
}
```

补充：

* 如果是undefined 或者 null ,指向window。基本类型nubmer转"object"
* 函数有返回值

:::

### bind

#### 无new, 初始版

::: details

```js
Function.prototype.myBind = function(obj, ...args) {
      const fn = this; // 属于方法的调用 play.myBind();
      // return fn.call(obj, ...args);// 返回了 调用这个函数的返回值
      return function(...resArgs) {
          // console.log(this);// 直接调用 objBind();
          return fn.call(obj, ...args, ...resArgs);
      }
  }
  const obj = {
      name: 'Brunson',
      team: '尼克斯'
  }
  const play = function(coach, city) {
      console.log(this.name, this.team, coach, city);
      return 999;
  }
  // 改变this, 多次传参，不立即调用
  const objBind = play.myBind(obj, '锡伯杜');
  // console.log("🚀 ~ objBind:", objBind)
  console.log(objBind('纽约'));
```

:::

#### 手写bind

::: details

```js

```

:::

### 使用函数的arguments

## 手写Promise

* 它有三个状态，pending, fulfilled, rejected
* 状态不可逆。初始状态为pending,一旦变为fulfilled或者rejected,就不会再发生改变了。
* throw （死肉）就会变为rejected.
* then接受 两个参数，一个是成功的回调，一个是失败的回调，返回的仍然是一个Promise,
这样才能继续链式调用。回调的数据类型，可以是函数，也可以不是函数
* 什么时候会被认定是Promise.当它是一个函数的时候，或者是一个拥有then方法的对象

::: details

```js

```

:::



