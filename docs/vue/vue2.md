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
:::