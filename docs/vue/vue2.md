# Vue2源码

## 搭建开发环境

::: details

rollup.config.js

```js
// rollup默认可以导出一个对象，作为打包的配置文件
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
export default {
    input: './src/index.js', // 入口
    output: {
        file: "./dist/vue.js", // 出口
        name: "Vue", // Global .vue
        format: "umd", 
        sourcemap: true // 希望可以调试源代码
    },
    Plugin: [
        // 使用 @rollup/plugin-node-resolve 插件来解析第三方模块。
        resolve(),
        babel({
            exclude: "node_modules/**",
            //将 Babel 的辅助函数（helpers）打包到输出文件中，而不是在每个模块中重复引入。
            babelHelpers: 'bundled' 
        })
    ]
}
```

`"dev": "rollup -cw"`

:::

## 源码解析

### new Vue()

#### 为什么不使用class

::: details

用构造函数.prototype,能将所有的方法都耦合在一起。而类

```js
class Vue {
    init() {

    }
    xxx() {

    }
    // ...
}
```

:::

#### 为什么要new Vue

::: details
Vue是一个构造函数，
init 方法被添加到 Vue.prototype（构造函数的prototype）上，而不是直接添加到 Vue函数对象上
原型上的方法 只能通过 实例 访问， 不能通过构造函数直接访问。

对象则不同

```js

export default {
    init: function() {
        console.log('对象则不同')
    }
};

// console.log(Vue.init);
```
:::

#### new Vue做了什么？

::: details

将用户的选项挂载在实例上，
初始化状态。（对象的响应式原理，使用defineProperty进行劫持）。

根实例可以是对象，可以是函数。组件必须是函数。

:::

### 

::: details

将数据 解析到el元素上

将模板变成 js语法，通过js语法生成 虚拟ODM

el
render ? => template => outerHTML(外部的template)(div id = "app" 及里面的东西)

编译主要分为三步
1. 将模板转换成 ast语法树
2. 转换生成 codegennode
3. 转换成 render函数

template字符串转换成 抽象语法树。eg:htmlparser2
通过正则匹配，匹配到一个开始标签/属性/开始标签的结束，就删除，继续正则匹配。
通过栈形结构，判断parent是谁，children是谁

1.template 变成 ast
2.ast转换成 一堆字符串（_c, _s, _v）
3.通过with和new Function, 转成render函数
(模板引擎的实现原理就是width+new Function())
4.调用render方法产生虚拟节点/虚拟DOM (render方法内部调用_c, _s,_v)
5.根据虚拟DOM产生真实DOM
6.插入到el元素中

Vue核心流程，1.创造了响应式数据 2.模板转换成ast语法树
3.将ast语法树转换成 render函数4.后续每次数据更新，只要执行render函数
（无需再次执行ast转化的过程）

render函数会去产生虚拟节点（使用响应式数据）
//根据生成虚拟节点创造真实的DOM

```js
render() {
    // _c 是什么， 标签，属性，儿子
    // _v 是什么 文本
    // _s 是什么 变量
    // _v(_s(name) + "hello" + _s(age) + "hello")

    // _c 是 返回一个虚拟dom
    // _v 是 返回一个文本的虚拟dom
    // _s 是 返回 字符串（将变量转换为字符串）
    return "_c(标签，属性，儿子)" // 第二部，生成这样的字符串
}
```

正则-g, exec, 重置：lastIndex = 0;

ast用来表示源代码的树形结构。(描述js,css,html)
vNode(虚拟dom) 是描述的dom元素，可以增加一些自定义属性。（描述dom）
:::