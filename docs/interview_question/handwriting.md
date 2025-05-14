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
Function.prototype.myBind = function(obj, ...args) {
    const fn = this; // 属于方法的调用 play.myBind();
    return function bindFn(...resArgs) {
        // 符合new的第三条：执行构造函数，this指向空对象
        // console.log('里层', this, JSON.stringify(this) === "{}");
        // if (Object.getPrototypeOf(this) === bindFn.prototype) {
        if (this instanceof bindFn) {
            // return new fn(...args, ...resArgs);
            // const obj = new Object();
            // obj.__proto = fn.prototype;
            // Object.setPrototypeOf(obj, fn.prototype); // 可优化，用Object.create()
            const obj = Object.create(fn.prototype); // 这是创建原型继承的标准方式
            // 比直接修改 __proto__ 更规范（__proto__ 是非标准属性）
            const data = fn.call(obj, ...args, ...resArgs);
            return typeof data === 'object' ? data: obj;
        } else {
            return fn.call(obj, ...args, ...resArgs);
        }
    }
}
const obj = {
    name: 'Brunson',
    team: '尼克斯'
}
const play = function(coach, city) {
    // 符合new的第三条：执行构造函数，this指向空对象。
    console.log(this, JSON.stringify(this) === '{}', this.name, this.team, coach, city);
    return 888;
}
// 改变this, 多次传参，不立即调用
const objBind = play.myBind(obj, '锡伯杜');
const result = new objBind('纽约');
```

:::

### 使用函数的arguments

## 手写Promise

### 实现目标

* 它有三个状态，pending, fulfilled, rejected
* 状态不可逆。初始状态为pending,一旦变为fulfilled或者rejected,就不会再发生改变了。
* throw （死肉）就会变为rejected
* then接受 两个参数，一个是成功的回调，一个是失败的回调，返回的仍然是一个Promise,
这样才能继续链式调用。回调的数据类型，可以是函数，也可以不是函数
* 什么时候会被认定是Promise.当它是一个函数的时候，或者是一个拥有then方法的对象

### 版本（三个状态）

::: details

```js

```

:::


### 版本

#### 测试用例

**异步resolve,能否正常执行then方法的逻辑（考验状态改变，才执行相应的回调函数）**

::: details

```js
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(11);//改变了Promise的状态
    }, 200)
}).then(res => {
   console.log("🚀 ~ res:", res)
})
```

:::

**promise.then是微任务**

::: details

```js
const p = new MyPromise((resolve, reject) => {
    resolve(111);
}).then(res => {
    console.log(res, '1');
})
console.log(222);// promise.then是微任务，先打印222，再打印111
```

:::

**then的成功回调不传函数，结果就穿透（直接舍弃不是函数的内容，定义一个新函数）**

::: details

```js
// 传的不是函数，结果就穿透
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(232);
    },500)
}).then(110, err=> console.log(err))
.then(res=> console.log(res), err=> console.log(err));
```

```js
let {onFulfilled, onRejected, resolve, reject} = this.#handlerList.shift();
// 不是函数，定义 成一个函数
// val => val;
// 包装成一个函数
// function anonymous(val) {
//     return val
// }
onFulfilled = typeof onFulfilled !== 'function' ? val => val: onFulfilled;
onRejected = typeof onRejected !== 'function' ? err => err: onRejected;
if (this.#promiseState === FULFILLED) {
    // 这里才执行 这个函数。
    const data = onFulfilled(this.#promiseResult)
    resolve(data);
} else if (this.#promiseState === REJECTED) {
    const data = onRejected(this.#promiseResult);
    resolve(data);
}
```

:::

**走了失败的回调，并不代表 之后的回调 都会走失败的 回调。**

::: details

```js
// 报错 和 手动 reject，可以使promiseState状态为 rejected, 可以走到失败的回调。
// 走了失败的回调，并不代表 之后的回调 都会走失败的 回调。
new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(232);
    },500)
}).then(110, err=> console.log(err, 'err1'))
.then(res=> console.log(res, 'res2'), err=> console.log(err, 'err2'));//err1和res2
```

```js
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(232);
    },500)
}).then(110, () => {throw(999)})
.then(res=> console.log(res, 'res2'), err=> console.log(err, 'err2')); // err2
```

:::

**返回值是Promise**

::: details

```js

```

:::

## 手写防抖

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="icon" href="data:,">  <!-- 空图标 -->
</head>
<body>
    <div>
        <input type="text" id="player">
    </div>
    <script>
        // 防抖：不动一段时间，就会执行。动一下，就要重新计算时间。eg: 搜索框(觉得填好了，再帮我查呀)...
        function debounce(fn, delay) {
            let timer = null;
            // 这里是直接调用debounce函数，this指向window/undefined, auguments很明显是fn, delay;
            // console.log("🚀 ~ debounce ~ debounce:", this, '\n', arguments, '\n');
            return function() {
                // console.log(this);// DOM元素
                // console.log(arguments); //接收input的e参数
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                }, delay)
            }
        }
        function play(e) {
            console.log(this, '汪汪队立大功', e);
        }
        const playerDom = document.getElementById('player');
        // playerDom.addEventListener('input', play); // this指向和arguments
        // debounce(play,2000)得到的是一个函数，而不是调用函数
        playerDom.addEventListener('input', debounce(play, 2000));
    </script>
</body>
</html>
```

:::

## 手写节流

::: details

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="icon" href="data:,">  <!-- 空图标 -->
</head>
<body>
    <input type="button" value="Subscribe!" id="submitBtn"/>
    <script>
        // 节流，一段时间内，只执行一次。eg: 表单提交（1s只触发一次请求）
        function throttle(fn, delay) {
            let prevTime = 0;
            // 需要的是是一个函数，而不是直接调用函数
            return function() {
                // 按钮的DOM点击，才会调用，才会有e（auguments）;
                const now = new Date().getTime();
                if (now - prevTime > delay) {
                    // fn();
                    fn.apply(this, arguments);
                    prevTime = new Date().getTime();
                }
            }
        }
        function submitForm(e) {
            console.log(this, e);
        }
        const submitBtn = document.getElementById('submitBtn');
        // submitBtn.addEventListener('click', submitForm);
        submitBtn.addEventListener('click', throttle(submitForm, 2000));
    </script>
</body>
</html>
```

:::