---
outline: deep
---

# 手写题

## call & apply & bind

::: details

* 三者都能改变this指向
* call和apply都是立即调用，bind不是立即调用，而是返回一个函数
* call接收多个参数，apply接收一个数组，bind可以多次接收至多个参数
:::

### 什么叫改变this指向

::: details
    // bind, call ,apply
    const fn = function () {
      console.log(this);
    }
    const obj = {
      name: 'durant'
    }
    fn();
    fn.call(obj);
:::
