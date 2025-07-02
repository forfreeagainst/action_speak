# Vue面试题

## 学习源码的无尽方法

::: details

```md
* 通过测试用例+断点调试
* 看相关视频，先有个思路学习
* 加强基础，基础的清晰程度，使阅读更清晰、有共鸣
* 动手实践从小到大，从单独到整体
（eg: 最长递增子序列、发布订阅模式、观察者模式的概念 => 响应式原理运用了**模式）
* 必经之路的清除障碍：算法、
```

:::

## 请说一下Vue2响应式数据的理解

::: details

```md
data中的数据变化，框架底层帮我们自动更新视图。new Vue的时候，会初始化状态
，遍历重写data中的属性的get和set方法，在$mount后，调用vm._update(vm._render())
方法。vm.render使用了模板引擎的编译原理。with + new Function();
调用了render方法，就会去访问vm上的数据，触发了get方法，这时候，就开始收集依赖。
每个数据都是dep,都是被观察者，给每个数据都添加渲染watcher。渲染watcher是观察者，
一般是vm_update(vm._render())。在修改的时候，
我们调用观察者的渲染watcher。
```

:::

::: details

```md
可以监控一个数据的修改和获取操作。针对对象格式，会给每个对象的属性进行劫持。Object.defineProperty.

源码层面 initData => observe => defineReactive方法（内部对所有属性进行了重写 性能问题）递归增加对象
中的对象增加getter和setter

我们在使用Vue的时候，如果层级过深（考虑优化）如果数据不是响应式的 就不要放在data中了。（不在模板使用）
我们属性取值的时候，尽量避免多次取值。如果有些对象是放到data中（在模板里使用），但不是响应式的，
可以考虑使用Object.freeze()来冻结对象。

```

```js
let total = 0;
for(let i = 0; i < 100; i++) {
    total += i;
}
this.timer = total;
// 而不是 this.timer ++; 一百次， this.timer会不断地调用this.timer的get方法获取值
```

:::

## Vue2中如何检测数组的变化？

::: details

```md
通过重写数组的7个变异方法。AOP编程+ 自定义逻辑（触发更新），初始渲染的时候，给每个响应式数据.
```

:::

::: details

```md
vue2中检测数组的变化，并没有采用defineProperty,因为修改索引的情况不多。
（如果直接使用defineProperty会浪费大量性能）
重写数组的变异方法来实现（函数劫持）

initData => observe => 对我们传入的数组进行原型链修改，后续调用的方法
都是重写后的方法 => 对数组中每个对象
也再次进行代理

修改数组索引，修改长度是无法进行监控的。arr[1] = 100; arr.length = 200;

arr[0].xxx = 'come on'; // 因为数组中的对象会被observe

```

:::

## vue2 如何进行依赖收集？

::: details

```md
都是访问对象的属性，调用了get方法进行收集。在首次渲染的时候，模板引擎
with+new Function()的时候，会去访问实例上的
属性，进而触发get方法，这时候就会创建一个dep, dep代表每一个数据，dep中带
有watcher,watcher用来存放副作用，可以是渲染方法，eg:vm._update(vm._render());
 这里还会运用到观察者模式，数据变化了，在set方法的内部，帮我们调用
观察者的更新视图的方法。
```

:::

::: details

```md
所谓的依赖收集(观察者模式) 被观察者指代的是数据(dep), 
观察者（watcher3 中渲染watcher、计算属性getter、用户watcher）
一个watcher中可能对应着多个数据，watcher 中还需要保存dep(重新渲染的时候
可以让属性重新记录 watcher) 计算属性getter也会用到。
```

:::

## vue2生命周期钩子是如何实现的？

::: details

```md

```

:::

::: details

```md

```

:::

## vue的生命周期方法有哪些？一般在哪一步发送请求及原因？

::: details

```md

```

:::

::: details

```md

```

:::

## vue.mixin的使用场景和原理

::: details

```md

```

:::

::: details

```md

```

:::

## Vue组件data为什么必须是个函数？

::: details

```md

```

:::

::: details

```md

```

:::

## nextTick在哪里使用？原理是？

::: details

```md

```

:::

::: details

```md

```

:::

## computed和watch区别？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue.set方法是如何实现的？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue为什么需要虚拟DOM?

::: details

```md

```

:::

::: details

```md

```

:::

## Vue2中diff算法原理？

::: details

```md

```

:::

::: details

```md

```

:::

## 既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行 diff检测差异？

::: details

```md

```

:::

::: details

```md

```

:::

## 请说明Vue中key 的作用和原理，谈谈你对它的理解？

::: details

```md

```

:::

::: details

```md

```

:::

## 谈一谈对Vue组件化的理解？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue的组件渲染流程？

::: details

```md

```

:::

## Vue组件更新流程？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue中异步组件原理

::: details

```md

```

:::

::: details

```md

```

:::

## 函数组件的优势及原理

::: details

```md

```

:::

::: details

```md

```

:::

## Vue组件间传值的方式 及之间区别？

::: details

```md

```

:::

::: details

```md

```

:::

## ref原理？

::: details

```md

```

:::

::: details

```md

```

:::

## v-if 和 v-for 哪个优先级 更高？

::: details

```md

```

:::

::: details

```md

```

:::

## v-if, v-model,v-for的实现原理？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue中.sync修饰符的作用，用法及实现原理？

::: details

```md

```

:::

::: details

```md

```

:::

## vue中slot是如何实现的？什么时候使用它？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue.use是干什么的？原理是什么？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue2中事件修饰符有哪些？其实现原理是什么？

::: details

```md

```

:::

::: details

```md

```

:::



## 如何理解自定义指令？

::: details

```md

```

:::

::: details

```md

```

:::

## keep-alive平时在哪里使用？原理是？

::: details

```md

```

:::

::: details

```md

```

:::

## 组件中写name选项有哪些好处及作用？

::: details

```md

```

:::

::: details

```md

```

:::

## Vue-router实现原理？

::: details

```md

```

:::

