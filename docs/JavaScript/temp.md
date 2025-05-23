# 临时文件

## JavaScript的运行环境组成

JavaScript 的完整运行环境由 ECMAScript（核心语言）、DOM（文档对象模型） 和 BOM（浏览器对象模型） 三部分组成

### 核心ECMAScript

由ECMA-262定义并提供核心功能（由 ECMA-262 标准定义的 JavaScript 语言核心，eg:语法、类型、关键字、内置对象等）

定义：由 ECMA-262 标准定义的 JavaScript 语言基础，与任何宿主环境（如浏览器、Node.js）无关。

包含内容：

* 语法（变量、循环、函数、类等）。
* 内置对象和数据类型（Array、Date、Promise、Symbol 等）。
* 严格模式（"use strict"）。

### DOM文档对象模型(document object model)

提供与网页内容交互的方法和接口(由 WHATWG 标准化的 操作网页内容的接口，将 HTML/XML 文档抽象为树形结构)

### BOM浏览器对象模型(brower object model)

提供与浏览器交互的方法和接口(非标准化的浏览器特有功能集合，无统一规范，各浏览器实现可能不同)

包含内容：

* window（全局对象）、navigator（浏览器信息）、location（URL 操作）、history（导航历史）、screen（屏幕信息）。
* 弹窗（alert）、定时器（setTimeout）、AJAX（早期 XMLHttpRequest）。

#### window

moveBy,moveTo,resizeBy,resizeTo,scrollTo,scrollBy
Open,close
Eg: window.close() 仅用于通过window.open() 打开的窗口
新创建的window对象有一个opener属性，该属性指向打开他的原始窗口对象。

#### Location

#### Navigator

#### Screen

#### History

用来操作浏览器URL的历史记录

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


数据类型
基本类型
null, undefined,number,string,boolean, bigInt,symbol
引用类型
Object,Array,Function, Map,Set, Date, regExp

判断数据类型
typeof
能判断所有的基本类型和function(引用类型)


数据结构
数组Array，映射Map,集合Set,栈Stack,堆Heap, 队列Queue,树Tree,图Graph,链表Linked-list


堆： 引用类型对象的值存储在堆中，在栈中存放的是指向堆内存的引用地址。
队列：先进先出


DOM的常见操作
增：createElement,createTextNode,createDocumentDragment,createAttribute
删：removeChild
改：innerHTML、innerText、innerContent、style,appendChild,insertBefore,setAttribute
Eg: innerText不返回隐藏元素的文本，textContent返回所有文本
查：querySeletor,querySeletorAll