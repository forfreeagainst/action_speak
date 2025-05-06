---
outline: deep
---

# 手写题

手写题，只为把知识串联起来。只做平时练习用。

## 手写new

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
