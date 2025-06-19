# Vue3面试题

## 为什么要使用compositionAPI?

* 代码的可读性随着组件变大而变差
* TypeScript支持有限

* options API 在处理单个逻辑关注点的时候，需要不断跳转相关代码的选项块。
* 使用composition,可以把相应的代码逻辑聚在一起，更加高内聚，低耦合。

* 在逻辑组织和逻辑复用（hook > mixin：数据来源不清晰，命名冲突）方面，Composition优势明显
* Composition API 几乎是函数，会有更好的类型推断。
* composition API 中见不到this的使用，减少了this指向不明的情况。
* Composition API 对tree-shaking 友好，代码更容易压缩。

## Vue3做了什么？

### 源码升级

* 响应式系统的升级，更快，更灵活，而不是 使用defineProperty一顿狠狠地递归
* 代码体积更小，不将所有API放在实例上了。让我们自己引入，没有使用的API不会被打包啦。
<!-- 任何一个函数，如 nextTick, 仅仅在用到的时候才打包，没用过的模块都会被摇掉，
打包整体体积变小 -->
* 支持TypeScript
* composition API让代码的逻辑组织和逻辑复用 方面 ，更强了。
* diff算法优化(静态标记)
* 静态提升，Vue3中不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
* 开启事件监听器缓存（换绑 ？绑定？卸载事件）

## 为什么使用Proxy?

* defineProperty检测不到对象属性的添加和删除（增加了set、delete API）
* 数组 API 方法无法监听到（对数组api方法进行重写）
* 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
* Proxy有多达13中拦截方法，不限于apply, ownKeys,deleteProperty,has等，这是Object.defineProperty不具备的。
* Proxy可以直接监听数组的变化（push、shift、splice）
* 正因为defineProperty自身的缺陷，导致Vue2在实现响应式过程需要实现其他的方法辅助
（如重写数组的方法，增加额外set、delete方法）
* Proxy不兼容 IE,也有没有ployfill, defineProperty 能支持到IE9

## Tree Shaking 是什么？

Tree Shaking 是一种 通过消除多余代码方式来优化项目打包体积的技术。（消除死代码）

Tree Shaking无非就是做了两件事

* 编译阶段利用 ES6 Module判断哪些模块已经加载
* 判断哪些模块和变量 未被使用或者 引用，进而删除对应代码

减少程序体积，

## Vue2和Vue3的响应式原理？

::: details

Vue2 对于对象，使用defineProperty 对对象的属性进行劫持，增加get,set方法。
如果对数组的每个索引都使用 Object.defineProperty 进行监听
对于大数组会带来严重的性能问题, 我们通过重写数组的7个方法（AOP编程：内部调用原来的方法 + 自己的逻辑）
通过重写数组的 7 个变异方法实现基本响应 reverse, sort, splice , 
如果数组的成员也是对象，也是通过defineProperty去进行数据劫持。
通过索引修改值，虽然数据变了，但不会触发响应式更新（DOM不会自动更新）（你的操作修改了数据但不会触发视图更新）
直接索引修改需要使用 Vue.set 或 splice

:::

## 说说观察者模式？

观察者模式（Observer Pattern） 定义了一种一对多的依赖关系，当一个对象（被观察者）的状态 发生改变时，
所有依赖于它的对象 （观察者）都会得到通知 并 自动更新。

::: details

### 基本实现

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

### 使用示例

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

## 手写简易发布订阅模式？

特点

* 松耦合：发布者和订阅者不需要知道对方的存在
* 灵活性：可以动态添加和移除 订阅者
* 一对多：一个事件可以被 多个订阅者监听

应用场景

* 组件间通信（如前端框架中的事件总线）
* 事件驱动系统

::: details

### 基本实现

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

### 实现用例

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

### mitt是什么？

mitt 是一个轻量级的 JavaScript 发布-订阅（Pub/Sub）模式 库，用于实现事件驱动的通信。它的全称就是 mitt（没有更长的官方全称），但它的名称可能来源于 "minimal event emitter"（最小化事件发射器）或类似含义，因为它专注于极简的发布-订阅功能

:::

## 观察者和发布订阅模式的区别？

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