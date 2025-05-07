---
outline: deep
---

# 手写题

手写题，只为把知识串联起来。只做平时练习用。

## 手写new

首先new 是关键字，我这里使用构造函数来实现

* 创建一个空对象
* 空对象的 隐式原型 指向 构造函数的显示原型
* 执行构造函数，this指向空对象。
* 构造函数的返回值如果是引用类型，就返回这个构造函数的返回值，否则就返回
新的对象本身。

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
(1). 默认绑定：严格模式下，this会绑定到undefined。非严格模式下，this会绑定到window。
(2). 隐式绑定：this永远指向最后调用它的对象
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

::: details

```js
// 这样写不可以？
Function.prototype.myBind = function(context, ...args) {
  let fn = this;
  // ??多次传参，不立即调用
  return fn.apply(context, ...args);
}
```

:::

(面试)[https://vue3js.cn/interview/JavaScript/pull_up_loading_pull_down_refresh.html#%E4%BA%8C%E3%80%81%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86]

(面试)[https://vue3js.cn/interview/vue/bind.html#%E4%BA%8C%E3%80%81%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88]

### 手写Promise

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
