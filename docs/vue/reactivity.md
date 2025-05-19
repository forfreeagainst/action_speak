# 响应式原理

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


## Proxy

::: details

接收一个对象，和一个handler函数

:::