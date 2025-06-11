# 模拟面试

## 2分钟的自我介绍

## Vue2和Vue3的区别？

::: details
1.Vue2使用选项式API, Vue3使用组合式API。
2.响应式系统的不同，Vue2使用defineProperty,Vue3使用proxy.
3.diff算法的不同。Vue2采用双端比较，Vue3采用最长递增子序列。
4.更好支持Ts
5.通过treeShaking,代码体积更小。
:::

## 为什么Vue3要使用proxy呢？

::: details
为什么vue3要使用proxy?defineProperty需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题。
同时检测不到对象属性的增加和删除，导致其在Vue2实现响应式过程需要实现其他的方法辅助 （如重写数组的方法，增加额外set、delete方法。Proxy可以直接监听数组的变化，对对象有丰富的拦截方法，这是defineProperty不具备的。
:::

## 为什么要使用最长递增子序列呢？

::: details

:::

## Promise

::: details

:::

## 千分符金额文本框组件

::: details

:::

## 文件上传

::: details
难点，多文件上传，并发控制(一次上传3个)
:::

## 代码生成器

::: details
拖拽，主要是选项式Api+要书写很多表单字段，复制黏贴的效率不高，也用过一些其他拖拽表单，在物料组件和代码生成内容，不太满意，所以自己手写了个表单代码生成器。

量大、周期短：拖拽 = 流式+栅格。
:::

## webpack和vite区别？

::: details
webpack功能强大，对图片，markdown等有出色的解决方案。
vite的生产环境采用rollup,rollup是一个纯js的模块打包工具。
webpack打包慢，是因为很多插件采用了commonjs,common.js是动态加载语言，
而vite的开发环境采用的esbuild,esbuild是用esModule写的,
:::

## webpack的执行过程是怎样的？

::: details
初始化阶段，读取并合并配置参数，
编译阶段，从入口触发，针对每个模块串行执行 loader, 
输出阶段

讲一下webpack的构建流程？从运行run build到获得dist包，经历了什么阶段，每个阶段做了什么事情。
:::

## 常见loader?

::: details
语法转换的loader: babel-loader, ts-loader
框架的loader: vue-loader
样式的loader: css-loader, style-loader, sass-loader,less-loader
构建速度的loader: thread-loader
它们是干啥用的，说话快，可以讲用途。但也要知道
:::

## 开发过哪些loader?

::: details
通过正则匹配，去除console.log()
:::

## loader和plugin区别？

::: details
loader是一个转换器，本质是一个函数，接收源代码作为参数，
plugin是一个扩展器。webpack在执行过程中，会执行一系列的生命钩子函数，plugin通过监听它们，
可以执行自定义逻辑。它是个class类，通过apply方法，
:::

## 用过哪些plugin?

::: details

:::

## 有没有写过plugin?

::: details


:::

## 说一下webpack的plugin是怎么实现的？（webpack的插件系统是怎么实现？）

## 说说ast?

::: details

:::

## esModule对比common.js?

::: details
esModule是静态语言，在编译前，就能确认依赖关系，能更好地tree shaking.
common.js是动态加载语言，在运行时，才能确认依赖关系。
:::

## 说一下你的性能优化是怎么做的？

::: details
sdk,
ToB项目，要求的是内部人员使用柜面系统的时候，设备老旧，用起来不卡。ToC项目，就有具体指标，
fcp小于1s，fp小于300ms。在95的情况下，接口响应小于1.5s,高峰时小于2s。一些特定场景下。

:::

## 你们公司性能优化的衡量指标有哪些？

::: details

:::

## 是否有真实用户的衡量指标？

::: details

:::

## RBAC权限控制有了解过？

::: details

:::

## 权限控制怎么做的？

::: details
动态表单,axios拦截器，自定义指令
:::

## axios

::: details

:::

## 自定义指令

::: details

:::

## 为什么使用lerna?(pnpm+workspace不好？)

::: details
pnpm+workspace不好？lerna有更灵活的发布策略，如独立发布和固定发布。lerna 可以一次性在所有包中执行测试、构建、发布等命令，大大提高了开发效率。而 pnpm 的 workspace 虽然也能通过一些命令来管理多包，但在命令的统一性和便捷性上不如 lerna。标准化流程？
:::

## 使用官方的脚手架不香？(为什么要定制项目模板)

::: details
定制化项目模块？拷贝相同技术栈，用到i18n或者组件库的时候，拷贝这些配置的时候，容易丢失某些文件。
:::

## lint工具？

::: details
遇到的问题，多人开发，在改公共文件的时候，经常代码格式的不同，引起冲突。代码评审的时候，看到一些不易理解的
变量命名或者一些未使用的代码或冗余大量的代码，维护起来不舒服。

lint工具？代码规范，同事难免要改到一些相同的文件，由于代码格式的不同，导致解决冲突的时候，要逐行去解决。
通过减少一些不规范的代码，如变量命名，一些没有用的代码，影响维护。
代码不适合全量修复和扫描，对提交的代码/全量的代码/某个范围内的代码，进行修复和扫描。
借助lint工具的相关api,将这些修复前后的代码进行标准化输出。
:::

## 动态表单？

::: details
组件更新频繁，不限于风格修改、属性和事件修改。
:::

## websocket和段轮询？

::: details
在做牌价页面的时候，
:::

## 虚拟滚动

::: details
链路长，每次请求的时间都很长（1.5s~2s），所以分页不好。
每次请求的时间多很长（接口请求时间长），所以没有采用分页，选择一次性返回。数据也不多这样子。
虚拟滚动，全场景的虚拟滚动。

:::

## 低代码

::: details

:::

## 聊聊产品的业务场景，考虑业务熟悉度

::: details

:::

## 你的项目中遇到过什么复杂问题，怎么给出解决方案的？谈一谈。

::: details

:::

## js基础问题，必须全都流利

* 事件循环
* js为什么是单线程
* GC
* 0.1+0.2!==0.3
* async和await原理？ Generator+promise

## 未归类问题

* 讲一下https建立连接的过程？
* 讲一下https和http的区别

## 设计模式

* 发布订阅模式：不知道能手写？
* 观察者模式

::: details
被观察者（Subject）：Promise 对象本身，维护一个状态（pending/fulfilled/rejected）和回调队列。

观察者（Observer）：通过 .then()、.catch() 注册的回调函数。

通知机制：当 Promise 状态改变时，自动触发队列中的回调
:::


## 算法/手写

* 函数组合
* LRU

## 没听过

* 知道什么是中间人攻击吗？
