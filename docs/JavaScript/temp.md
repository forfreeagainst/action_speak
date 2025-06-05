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

011  0开头，8进制
080  0开头，8进制，8进制没有8
0o11  0o开头，8进制
0o80  0o开头，8进制，8进制没有8,报错
0b11  0b开头，2进制
0x11  0x开头，16进制
11e2,  11* 10的2次幂
11.toString()  报错  浏览器把.当成小数点了。
11 .toString()  有空格，不报错，11.

JSON.parse(null) 结果是null。


Es6:
Async await
情况1：Await 非promise
Async chong() {
Await feng();
}
await会堵塞下一行的语句， 等待紧跟着的内容执行完成，再执行await下一行的语句。
Eg: 非promise情况，和普通方法调用。(await feng() 和 feng())区别：
会不会堵塞下一行语句的执行。

情况2： Await promise


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


for...in 循环语句只会输出 obj 对象中的可枚举属性。for of 和for in 


javaScript:
esModule和CommonJs区别？
js继承
es6有哪些？
跨域解决方案有哪些？
遍历数组/对象？

浏览器、网络：
状态码有哪些？
xss和csrf攻击的区别？

vue2
Vue的双向绑定原理？
使用虚拟DOM和原生操作DOM的区别？
Vue的生命周期
create和mounted的区别？
Vue2的组件通信方式有哪些？
computed和watch的区别？
说说vuex(使用场景以及优缺点)
v-if和v-show的区别？
说说nextTick
说说Keep-alive
data为什么是一个函数，而不是一个对象
Vue的指令有哪些？
Vue的修饰符有哪些
Vue的路由传参有哪几种方式 


找到权威的官网，视频只是用来参考的

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
* Vue官网
* Vue源码
* React文档
* React基础视频对应的学习内容
* vite 多包下create-vite有很多个 template
* 配置项目的lint规则
* 二叉树的中序遍历，letcode简单题
* 拖拽
* Vue-I18n 跟ElementPlus国际化结合
* 微前端
* 手写vue-router

50h  26h
