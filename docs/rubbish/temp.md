# 临时文件

## 冷门知识

遍历对象的属性的时候，不是按照书写的顺序来遍历。
规则：先数字（升序），后字符串（书写的顺序）。
因为浏览器的内存管理。数字的内存地址可以存在规律。（1,2,3,知道相邻多少，就知道5大概在什么位置）。

如何退出外层循环

```js
outerloop: for(var i = 0; i < 10; i++) {
    console.log('外层循环')
    for(var j = 0; j < 10; j++) {
        console.log('内存循环');
        // 结束外层循环
        break outerloop;
    }
}
```


```md



Es6:

数组的方法：
Redcue : 应用场景：条件统计，累加器，累乘器，去重
console.log([33, 4444, 555].reduce(((pre,current) => pre += current>34 ? 1: 0),0));	
第一次进来，Pre是0，当前是33，
第二次进来，pre是第一次的返回值，当前是4444，

数据结构
数组Array，映射Map,集合Set,栈Stack,堆Heap, 队列Queue,树Tree,图Graph,链表Linked-list


堆： 引用类型对象的值存储在堆中，在栈中存放的是指向堆内存的引用地址。
队列：先进先出


json-server 启动本地服务，mock数据

{
    getList: {
        code: 200,
        list: [{name: 'durant', age: 35}]
    }
}

http://localhost:3000/getList



javaScript:
esModule和CommonJs区别？
跨域解决方案有哪些？

浏览器、网络：
状态码有哪些？
xss和csrf攻击的区别？

vue2
说说vuex(使用场景以及优缺点)
Vue的路由传参有哪几种方式 

谷歌代码：chromium/chromium

行内样式表
内部样式表
外部样式表
浏览器默认样式表。
浏览器把div设置为了display:none,所以它独占一行。
document.styleSheets[0].addRule('div', 'border: 2px solid #f30 !imporant');

1. 对外统一口径，设计一致化的 API
2. 策略模式处理多场景


* 拿个Vue2+webpack的开源项目，测试构建时长。
* vite 多包下create-vite有很多个 template
* 配置项目的lint规则
* 拖拽
* Vue-I18n 跟ElementPlus国际化结合
* 微前端
* 手写vue-router

而是因为控制台显示的是对象的实时状态。
// 这是开发者工具的一个便利特性，帮助开发者看到对象的最终状态，但也可能造成一些理解上的困惑。


方法	性能	适用场景	可中断 (break/continue)
for	🚀 最快	数组、类数组、高性能需求	✅ 支持
for...of	⚡ 中等	所有可迭代对象（Set、Map）	✅ 支持
forEach	🐢 最慢	数组、函数式编程风格	❌ 不支持
推荐：

默认用 for...of（平衡性能和可读性）。
for...in 循环语句只会输出 obj 对象中的可枚举属性。for of 和for in 

极端性能优化用 for 循环。

避免在热代码路径用 forEach。

for of 与 for in;

```

**sessionStorage 和 localStorage 之间的区别是什么？**

::: details
都是web存储，在浏览器里保存数据，在页面刷新后仍可以访问这些数据

存储范围：localStorage是持久化的，没有时间限制，关闭浏览器还在，直到手动删除，sessionStorage是会话级别的，关闭浏览器或标签页就清除了

存储大小：都能存储大概5M，视浏览器而定

访问限制：localStorage是同一域名下共享，所有标签页和窗口都能访问，sessionStorage只在当前窗口下可访问，不同标签页或窗口的互不干扰

使用场景：保存长期需要的用localStorage，临时数据用sessionStorage
:::


