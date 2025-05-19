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
