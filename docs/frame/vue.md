# vue

## 应用层

### 受限的全局访问

模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date。

没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 window 上的属性。然而，你也可以
自行在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用。

### ref 的实现

```js
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

非原始值将通过 reactive() 转换为响应式代理，该函数将在后面讨论。

也可以通过 shallow ref 来放弃深层响应性。对于浅层 ref，只有 .value 的访问会被追踪。浅层 ref 可以用于避免对
大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。

### Reactive实现

reactive() 返回的是一个原始对象的 Proxy

依靠深层响应性，响应式对象内的嵌套对象依然是代理

有限的值类型：它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

### nextTick使用场景

之前有个 驳回的业务，需要把 之前填写的业务数据，渲染给用户。表单的数据有联动，一开始，我们关闭了监听，等
页面重新渲染Dom完成，再打开监听。用到了nextTick

### computed的实现

返回值为一个计算属性 ref。和其他一般的 ref 类似，你可以通过 publishedBooksMessage.value 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。

计算属性 VS 方法： 1个数据在模板多次被使用，建议使用计算属性

计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM！

### 事件修饰符

* .stop: 阻止冒泡, eg：
* .prevent 阻止 默认行为， eg: 表单默认提交
* .self 
* .capture 阻止捕获
* .once 至多触发一次
* .passive 不阻止 默认行为， eg: touch、wheel

### 3.4+使用

#### props

* 同名简写`<div :id></div> => <div v-bind:id></div>`
* 如果需要，可以通过访问计算属性的 getter 的第一个参数来获取计算属性返回的上一个值

#### 组件 v-model

v-model 可以在组件上使用以实现双向绑定。

child.vue

```md
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>

// 实例2
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

parent.vue

```md
<Child v-model="countModel" />
```

### 3.5+使用

#### 模板引用的useTemplateRef

```md
<script lang="ts" setup>

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')
// const input = ref('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

#### 响应式 Props 解构

* `const { foo } = defineProps(['foo'])`

### 侦听器

#### watch

侦听数据源类型:它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```md
const count = ref(1);
const book = ref({
  bookName: '被讨厌的勇气',
  author: '岸见一郎'
})
const person = reactive({
  name: 'durant',
  age: 35
})
const song = reactive({
  songName: '进阶',
  author: 'JJ'
})
watch([() => book.value.author, count, () => person.name, song],() => {
  console.log("🚀 ~ watch ~ book.value:", book.value)
  console.log("🚀 ~ watch ~ song:", song)
  console.log("🚀 ~ watch ~ person:", person)
  console.log("🚀 ~ watch ~ count.value:", count.value)
})

setTimeout(()=> {
  book.value.author = 'me';// ref定义的非原始类型，需要（）=> book.value.author
})
setTimeout(() => {
  person.name = 'Brunson';
}, 2000);
setTimeout(() => {
  count.value += 1;
}, 1000)
setTimeout(() => {
  song.songName = '江南';
}, 3000)
```

#### watchEffect

不用写侦听数据源，侦听数据源为回调的响应式依赖。immediate立即执行一次。

```md
const count = ref(1);
watchEffect(async() => {
  console.log(count.value);
})
setTimeout(() => {
  count.value += 1;
}, 1000);
```

#### 停止侦听器

侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏

### 代码风格

#### 组件命名

`<MyComponent greeting-message="hello" />`

对于组件名我们推荐使用 PascalCase，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素。然而对于传递 props 来说，使用 camelCase 并没有太多优势，因此我们推荐更贴近 HTML 的书写风格。(官网推荐而已)

像组件与 prop 一样，事件的名字也提供了自动的格式转换。注意这里我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 prop 大小写格式一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

### 深入组件的props

#### 更改对象 / 数组类型的 props​

当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，对 Vue 来说，阻止这种更改需要付出的代价异常昂贵。

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该抛出一个事件来通知父组件做出改变。

#### 深入组件的透传 Attributes



## Vue3

### 脚手架

* [脚手架](https://github.com/vuejs/create-vue.git)

### 常用API

* reactivity：传入的是对象
* shallowReactivity
* ref: 可传入基本类型和 对象
* shallowRef：

* isRef: 检查某个值是否为 ref。
* unref: 如果参数是 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 计算的一个语法糖。
* toRef: 把reactive变成ref去使用，意义是解构的时候，丧失响应式。同时模板上使用方便，模板自动补充.value;

```md
// 中转了一下 name.value ===> state.name
let state = reactive({name: 'durant', age: 35});
// toRef: 两个参数, 代码书写，又是一个类，有set value, 和get value;
let name = toRef(state, 'name');
let age = toRef(state, 'age');
console.log(name.value, age.value);
```

* toRefs: 可多个一起
* proxyRef: 工具函数，接收带有ref的对象，主要用于处理 ref 对象的自动解包(unwrap)问题。

```md
import { ref, proxyRefs } from 'vue'

const foo = ref('hello')
const bar = ref('world')

const proxy = proxyRefs({ foo, bar })

console.log(proxy.foo) // 直接输出 'hello'，而不是 ref 对象
console.log(proxy.bar) // 直接输出 'world'
```

* proxyRefs: Vue3 响应式系统中一个相对底层的 API，在大多数应用开发中可能不会直接使用，但在编写库或复杂组合式函数时会很有用

```md
function proxyRefs(objectWithRef) {
  return new Proxy(objectWithRef, {
    get(target, key, receiver) {
      let r = Reflect.get(target, key, receiver);
      return r.__v_isRef ? r.value : r;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      if (oldValue.__v_isRef) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  });
}
```

* computed: 接收参数 getter函数，或者 选项（对象有get方法和set方法） 
* watch: 接收参数 1 监测数据  2 回调函数  3选项可选 (监测数据 ：ref 或reactive 或 函数)
* watchEffect: 监控多个数据

* readonly
* shallowReadonly

* storeToRefs：store里的数据解构不失去响应式。（可以让解构的东西不失去响应式,只可以对变量，方法不行）

```md
import { blocksEditor } from '@/stores/blocksEditor';
const blocksStore = blocksEditor();
const { blocks } = storeToRefs(blocksStore);
```

* toRaw：变成未加工的，可以返回由 reactive()、readonly()、shallowReactive() 或者 shallowReadonly() 创建的代理对应的原始对象。

```md
const foo = {};
const reactiveFoo = reactive(foo);
console.log(toRaw(reactiveFoo) === foo); // true
```

* markRaw：将一个对象标记为不可被转为代理。返回该对象本身。

## Vue3AndTypeScirpt

### ref、reactive

```md
type blockType = 'a': 'b': null;
const block = ref<blockType>('a')
```

### defineProps、defineEmits

```md
<van-field
    v-model="formData[fieldInfo.name]"
    :name="fieldInfo.name"
    :label="fieldInfo.label"
    :type="fieldInfo.type"
    :placeholder="fieldInfo.placeholder"
    :rules="fieldInfo.rules"
/>
```

```md
// props非模板里面使用， fieldInfo可以在模板里面使用
const props = defineProps<{
    fieldInfo: object,
}>();
const props = defineProps<{
  preview: {
    type: Boolean,
    default: false
  }
}>();

// js写法
const props = defineProps({
  foo: String
});
const props = defineProps({
  upload: {
    type: Boolean,
    default: false,
  },
});
// :upload="true" 这样不会报错
```

```md
const emit = defineEmits(['submit'])
const onSubmit = (values) => {
    emit('submit', values);
};
```

### provide、inject

```md
import {ref, provide} from 'vue';
const formData = ref({
    username: 'durant',
    useCoupon: true,
})

provide('formData', formData);
```

```md
import {inject} from 'vue';

const formData = inject('formData');
```

### watch

```md
watch(() => formData.value.username, ()=> {
    formData.value.useCoupon = !!(formData.value.username)
    console.log("🚀 ~ watch ~ formData.value.useCoupon:", formData.value.useCoupon)
})
```

### 组件的ref

```md
<div class="canvas" ref="containerRef"></div>

// HTMLDivElement、HTMLElement
var containerRef = ref<HTMLDivElement | null>(null)
```

注意ref，要在onMounted后使用。setup里是没有dom。

### 定义类型

```md
import type { App } from 'vue'
app: App<Element>


```

## Vue3项目如何使用Webpack?

区别于vite创建vue3项目，区别于vue-cli创建vue3项目并把webpack.config.js给隐藏了

### 初始化项目

```md
mkdir vue3-webpack-project
cd vue3-webpack-project
npm init -y
```

### 安装 Vue 3 和 Webpack 相关的依赖

```md
npm install vue@3
npm install --save-dev webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc css-loader style-loader html-webpack-plugin
```

* vue@next: Vue 3 的核心库。
* webpack: Webpack 构建工具。
* webpack-cli: Webpack 命令行工具。
* webpack-dev-server: 开发服务器。
* vue-loader@next: 用于加载 .vue 文件。
* @vue/compiler-sfc: 用于编译 Vue 单文件组件。
* css-loader 和 style-loader: 用于处理 CSS 文件。
* html-webpack-plugin: 用于生成 HTML 文件。

### 创建项目结构

```md
vue3-webpack-project/
├── src/
│   ├── App.vue
│   ├── main.js
│   └── index.html
├── webpack.config.js
└── package.json
```

### 编写代码

`src/App.vue`

```md
<template>
  <div id="app">
    <h1>Hello Vue 3 with Webpack!</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

`src/main.js`

```md
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

`src/index.html`

```md
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3 Webpack</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### 配置webpack.config.js

```md
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
};
```

### 配置 `package.json` 脚本

```mdon
"scripts": {
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

### 运行项目

* 运行开发服务器 `npm run dev`
* 构建生产版本 `npm run build`

### 访问项目

在浏览器中访问 http://localhost:9000，你应该会看到 "Hello Vue 3 with Webpack!" 的页面。

### 强化webpack.config.js配置

#### 思考

##### Vue警告: VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__,

```md
const { DefinePlugin } = require("webpack");

new DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false,
}),
```

##### style-loader还是vue-style-loader

vue-style-loader：专门为 Vue 项目设计，主要用于处理 Vue 单文件组件（SFC）中的样式。Vue 单文件组件有 style 标签，这些样式可能会有 scoped 属性，用于实现局部样式，vue-style-loader 能够很好地处理这些特性。
style-loader：是一个通用的 Webpack loader，可用于任何 Webpack 项目，不局限于 Vue 项目。它可以将 CSS 代码以 style 标签的形式插入到 HTML 文档的 head 中，适用于处理普通的 CSS 文件。

##### 按需加载elementUiPlus（待测）

```md
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
```

plugin放置

```md
// 按需加载element-plus
AutoImport({
  resolvers: [ElementPlusResolver()],
}),
Components({
  resolvers: [
    ElementPlusResolver({
      // 自定义主题，引入sass
      importStyle: "sass",
    }),
  ],
}),
```

##### 其他看官网配置

* npm install --save-dev mini-css-extract-plugin
* npm install css-minimizer-webpack-plugin --save-dev
* npm install terser-webpack-plugin --save-dev
* ImageMinimizerWebpackPlugin可用tinyPng替代吧，感觉没啥必要
* npm install copy-webpack-plugin --save-dev
* 处理图片（png等）和其他资源（ttf等）
* 处理js（babel-loader、@babel/core）,babel.config.js
* vue-loader开启缓存
* 优化：codeSplit, runtimeChunk等

## Vue3源码

### Set、Map、WeakSet、WeakMap区别？

####  Set（集合）

* 存储结构：[值, 值]，存储唯一的值（不允许重复）。
* 键类型：任意类型的值（包括对象、原始值）。
* 可遍历：是（支持 forEach、keys()、values()、entries() 等方法）。
* 引用类型：强引用（即使对象不再使用，也不会被垃圾回收）。

常用方法：

* add(value)：添加值。
* delete(value)：删除值。
* has(value)：检查是否存在某值。
* clear()：清空集合。

使用场景：数组去重、集合运算（并集、交集等）。

#### WeakSet（弱集合）

* 存储结构：[值, 值]，但仅能存储对象（不能是原始值）。
* 键类型：仅对象（如 {}、new Object()）。
* 可遍历：否（没有 size 属性，也不能用 forEach 或迭代方法）。
* 引用类型：弱引用（如果对象在其他地方没有被引用，会被垃圾回收自动清除）。

常用方法：

* add(obj)：添加对象。
* delete(obj)：删除对象。
* has(obj)：检查是否存在某对象。

使用场景：临时存储对象（如 DOM 节点是否已被处理）。

#### Map（字典）

* 存储结构：[键, 值]，键值对集合。
* 键类型：任意类型（对象、原始值均可）。
* 可遍历：是（支持 forEach、keys()、values()、entries() 等方法）。
* 引用类型：强引用（键和值都不会被垃圾回收）。

常用方法：

* set(key, value)：设置键值对。
* get(key)：获取值。
* delete(key)：删除键值对。
* has(key)：检查是否存在某键。
* clear()：清空字典。

使用场景：需要复杂键（如对象）的映射、缓存、数据关联。

#### WeakMap（弱字典）

* 存储结构：[键, 值]，但键必须是对象（值可以是任意类型）。
* 键类型：仅对象（不能是原始值）。
* 可遍历：否（没有 size 属性，也不能用 forEach 或迭代方法）。
* 引用类型：弱引用（仅对键弱引用，如果键对象在其他地方没有被引用，会被垃圾回收，对应的值也会被释放）。

常用方法：

* set(key, value)：设置键值对（key 必须是对象）。
* get(key)：获取值。
* delete(key)：删除键值对。
* has(key)：检查是否存在某键。

使用场景：存储对象的私有数据或元数据（避免内存泄漏）。

帮助内存管理的数据结构：WeakMap,WeakSet。尽管JavaScript没有直接暴露垃圾回收器API。但语言
提供几个间接观察垃圾回收的数据结构，能用于内存管理。

| 特性 | Set| WeakSet| Map | WeakMap |
| --- | --- | --- | --- | --- |
| 存储结构 | [值，值] | [对象，对象] | [键，值] | [对象键，值] |
| 键类型 | 任意值 | 仅对象 | 任意值 | 仅对象 |
| 可遍历性 | 可 | 不可 | 可 | 不可 |
| 引用类型 | 强引用 | 弱引用 | 强引用 | 弱引用（仅键） |
| 垃圾回收影响 | 不回收 | 自动回收 | 不回收 | 自动回收 |
| 典型用途 | 去重、集合运算 | 临时对象管理 | 复杂键映射 | 对象私有数据 |

#### 关键性总结

* Set vs WeakSet

Set 可以存储任意值，WeakSet 只能存储对象。

Set 可遍历，WeakSet 不可遍历。

WeakSet 对对象是弱引用，适合临时存储（如 DOM 节点管理）。

* Map vs WeakMap

Map 的键可以是任意类型，WeakMap 的键必须是对象。

Map 可遍历，WeakMap 不可遍历。

WeakMap 对键是弱引用，适合存储对象的私有数据（避免内存泄漏）。

* 强引用 vs 弱引用

Set 和 Map 会阻止垃圾回收，可能导致内存泄漏。

WeakSet 和 WeakMap 不会阻止垃圾回收，适合临时存储。

## Vue讲述

### 响应式模块

```md
effect是个副作用，数据发生改变，立即执行effect。我们通过数据代理，在get和set方法进行切面编程，
get里面进行依赖收集，把effect中 使用到的变量 和 effect 进行关联，形成一个映射表。
get里面进行触发更新，数据发生改变，调用映射表的effect方法，进行页面数据的渲染(innerHTML)。

effect: 数据发生改变立即执行effect
watch, computed 都是基于 effect ，
effect(() => {
    document.innerHTML = `hello${name}`;
}, {}); // 执行函数，选项
写在effect里面的变量，才具有响应式。
父子组件，就是嵌套的effect;

设计响应式的effect
effect访问 对象的属性进行 依赖收集， 书写innerHTML = 啥 进行触发更新。
trackEffect, triggerEffect
1. 在proxy 的get 进行 依赖收集，

收集这个对象上的这个属性和 effect关联在一起。
收集依赖的数据格式 
 Map:  obj:  {属性 ： Map:  effect, effect, effect   }
嵌套Map ,
第一层： 对象，  Map
第二层： 属性， Map 


// 将当前的effect放入到dep （映射表）中，后续可以根据值得变化触发此dep中存放的 effect 。

2. 触发更新


3. 解决effect 的遗留问题
effect 有条件（前后的依赖不一样的各种情况） state.flag ? state.name : state.age;
（effect在进行第二次依赖收集，有个简单的diff算法））
effect 有重复的，映射表要去重  state.name + state.name

4. effect调度实现 （effect第二个参数scheduler, 数据更新了，不重新渲染，走自己的逻辑。
还可以赋值给变量即函数名，然后在scheduler中调用）。

5. 解决 innerHTML = state.name; state.name = 22; 陷入死循环
  当取的值也是对象的时候，我需要对这个对象 再进行代理，递归代理


reactive只能针对对象， proxy就是针对对象呀

ref 实现原理， 可以是基础类型，可以是对象
包了一层，成为对象。拥有三个属性：_v,  get方法 ，set方法
contructor：判断是不是对象 ,是的话，包一层reactive

其他API: toRef, toRefs, proxyRef, proxyRefs

书写computed, 也是ref (ref特征 _v, get value方法， set value方法)

思路：

```

缩略版 computed

```ts
 // 在effect 里用到 fullname.value才行
// const fullname = computed(() => state.firstname + state.name);
// effect(() => {
//   console.log(fullname.value);
// })


export class ComputedRefImpl<T> {
  private _value!: T

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
  ) {
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(this, DirtyLevels.ComputedValueMaybeDirty),
    )
  }

  get value() {
    trackRefValue(self)

    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }

  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty
  }

  set _dirty(v) {
    this.effect.dirty = v
  }
  // #endregion
}
```

reactiveEffect: 接收参数: getter函数，调度器
收集依赖， 

```ts
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []

  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean

  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void

  /**
   * @internal
   */
  _dirtyLevel = DirtyLevels.Dirty
  /**
   * @internal
   */
  _trackId = 0
  /**
   * @internal
   */
  _runnings = 0
  /**
   * @internal
   */
  _queryings = 0
  /**
   * @internal
   */
  _depsLength = 0

  constructor(
    public fn: () => T,
    public trigger: () => void,
    public scheduler?: EffectScheduler,
    scope?: EffectScope,
  ) {
    recordEffectScope(this, scope)
  }

  public get dirty() {
    if (this._dirtyLevel === DirtyLevels.ComputedValueMaybeDirty) {
      this._dirtyLevel = DirtyLevels.NotDirty
      this._queryings++
      pauseTracking()
      for (const dep of this.deps) {
        if (dep.computed) {
          triggerComputed(dep.computed)
          if (this._dirtyLevel >= DirtyLevels.ComputedValueDirty) {
            break
          }
        }
      }
      resetTracking()
      this._queryings--
    }
    return this._dirtyLevel >= DirtyLevels.ComputedValueDirty
  }

  public set dirty(v) {
    this._dirtyLevel = v ? DirtyLevels.Dirty : DirtyLevels.NotDirty
  }

  run() {
    this._dirtyLevel = DirtyLevels.NotDirty
    if (!this.active) {
      return this.fn()
    }
    let lastShouldTrack = shouldTrack
    let lastEffect = activeEffect
    try {
      shouldTrack = true
      activeEffect = this
      this._runnings++
      preCleanupEffect(this)
      return this.fn()
    } finally {
      postCleanupEffect(this)
      this._runnings--
      activeEffect = lastEffect
      shouldTrack = lastShouldTrack
    }
  }

  stop() {
    if (this.active) {
      preCleanupEffect(this)
      postCleanupEffect(this)
      this.onStop?.()
      this.active = false
    }
  }
}
```

effect: 

```ts
export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions,
): ReactiveEffectRunner {
  if ((fn as ReactiveEffectRunner).effect instanceof ReactiveEffect) {
    fn = (fn as ReactiveEffectRunner).effect.fn
  }

  const _effect = new ReactiveEffect(fn, NOOP, () => {
    if (_effect.dirty) {
      _effect.run()
    }
  })
  if (options) {
    extend(_effect, options)
    if (options.scope) recordEffectScope(_effect, options.scope)
  }
  if (!options || !options.lazy) {
    _effect.run()
  }
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}
```


特性	ReactiveEffect 类	effect 函数
层级	底层实现类	高级 API（基于 ReactiveEffect）
使用方式	需实例化并手动调用 run()	直接传入函数，自动执行和追踪
调度控制	支持自定义调度器（scheduler）	通过 effect 的选项间接支持
停止监听	调用 stop() 方法	返回 stop 函数
典型用途	Vue 内部实现（如渲染、computed、watch）	开发者显式管理副作用

### runtime-dom

提供 DOM API (提供一系列dom操作的api方法) ，针对浏览器的

1. createRenderer(RuntimeCore的方法) 我们可以自己创建渲染器 （自定义渲染器），接收rendererOptions
2. render(RuntimeCore的方法) 用内置的渲染器来进行渲染 （渲染dom元素）(把虚拟节点变成真实节点)
3. h方法可以创建一个虚拟dom (接收参数：type, propsOrChildren, children)


type 标签：div , propsOrChildren 属性 {}

nodeOps 节点渲染
patchProp 属性渲染： attrs,class,events,props,style
events: 希望是一个() => 函数名， 这样可以移除事件和监听事件。

引用关系：runtime-core -> runtime-core -> reactivity

### runtime-core

#### 重点看createRenderer (渲染器)

createRenderer 返回一个对象，有render方法，render方法中 会调用核心函数patch, patch会根据初次渲染和
更新渲染，把虚拟节点，转化为真实节点。

createRenderer： 可以不针对浏览器的自定义渲染器，实现跨平台。
createRenderer：接收rendererOptions渲染器选项，自己有个render方法，

render: 接收参数： vnode/虚拟dom, Element/dom节点 

Vue 3 的 Diff 比 Vue 2 更高效，主要依赖以下优化：

优化策略	作用
静态提升（Hoist Static）	将静态节点（无动态绑定）提取到渲染函数外，复用旧 VNode，避免重复对比。
Patch Flags	在 VNode 上标记动态属性（如 class、style），仅对比变化的属性。
Block Tree	将模板划分为动态区块（Block），仅对比区块内的动态节点，跳过静态内容。
靶向更新	直接定位到动态节点，减少递归遍历。
1 << 2 , 二进制数，左移两位。 1  2  4  8 16 
组合起来，1111111， 一下子就看出来，它拥有全部的组合。10001，头和尾的组合。
| 或运算 1 | 8 得到9， & 与运算


Vue 3 的 Diff 比 Vue 2 更高效，主要依赖以下优化：

优化策略	作用
静态提升（Hoist Static）	将静态节点（无动态绑定）提取到渲染函数外，复用旧 VNode，避免重复对比。
Patch Flags	在 VNode 上标记动态属性（如 class、style），仅对比变化的属性。
Block Tree	将模板划分为动态区块（Block），仅对比区块内的动态节点，跳过静态内容。
靶向更新	直接定位到动态节点，减少递归遍历。



特性	render 函数	h 函数
角色	组件的视图生成器（返回整个 VNode 树）	单个 VNode 的工厂函数
调用者	Vue 内部调用（或开发者手动定义）	在 render 函数内部调用
输入	组件实例的 this（访问状态）	标签名/组件、props、children
输出	完整的 VNode 树	单个 VNode
是否必需	必须有（直接或间接）	可选（可用 JSX 替代）

#### 组件

template 会变成 render函数

```js
const VueComponent = {
  data() {
    return { name: 'durant', age: 35}
  },
  render() {
    return h(Fragment, [
      h(Text, "my name is" + this.name),
      h('a', this.age)
    ])
  }
}

// h 接收参数（type, propsOrChildren, children）
// type： 是 文本，注释，Fragment, 元素（组件，div...）
render(h(VueComponent, {}), app)
```


组件渲染整理流程

创建组件实例
给实例的属性赋值
创建一个effect

### 模板变成js语法

diff算法优化：

如果在编写vue3的时候，你直接采用jsx 或者 h 的写法，得不到优化

template 编译成 js 语法时，会有 PatchFlags，标记是文本、class, style等，没有
使用h, 使用了_createElementVNode。
反正用h是见得比较多，回头有用到_openBlock,_createElementBlock和_createElementVNode，再看一下吧。

* PatchFlags 优化：只考虑属性和内容发生变化
* BlockTree: 处理 虚拟DOM 树的层级，v-if,v-else, v-for不确定有多少个


我觉得直接 编写 h 代码 ，实现 一些插件（eg: vue-draggable-plus等）功能很难的。
1.它可以通过书写template, 然后通过某些插件进行转换为 h语法。
2.或者通过vue转换语法的网站，实现代码编写。


template 转换成 js 语法
1.“语法” 转化成一个对象 ast语法树
2.对树进行优化 （打标记 patchFlag）
3.根据转换后的代码生成 一个字符串。

compile(模板) 得到 {
  ast: {},
  code: render函数的字符串
}

编译主要分为三步
1. 将模板转换成 ast语法树
2. 转换生成 codegennode
3. 转换成 render函数


状态机：循环每个字符，判断它是什么类型，然后分别进行处理


## 面试题

### 请说以下 Vue2 响应式数据的理解

源码层面: 内部对所有属性进行了重写，性能问题，如果对象是多层级的，就会递归对象中的属性，增加
getter和 setter

我们在使用Vue的时候，如果层级过深（考虑优化），如果数据不是响应式的，就不要放在data中了。
我们属性取值的时候尽量避免多次取值。如果有些对象放在 data中，但不是响应式的，可以考虑采用
Object.freeze() 来冻结对象。

多次取值（多次访问get方法）

```js
for(let i =0; i< 100; i++) {
  this.sum ++; // 多次访问get方法
}

let sum = 0;
for(let i =0; i< 100; i++) {
  sum ++;
}
this.sum = sum;
```

### Vue2中如何监测数组的变化？

vue2 中监测数组的变化 没有采用defineProperty, 因为修改索引的情况不多，如果直接使用defineProperty 会浪费大量性能。
采用重写数组的变异方法来实现函数劫持。

initData -> observe -> 对我们传入的数组进行原型链修改，后续调用的方法都是 重写后的方法。->
对数组中每个对象 也再次进行代理

修改数组索引，修改长度是无法进行监控的。arr[1] = 100; arr.length = 300;

### Vue中如何进行依赖收集？

所谓的依赖收集（观察者模式），被观察者指代的是数据(dep), 观察者（watcher）
一个watcher中 可能对应着 多个数据，watcher 中还需要 保存dep, (重新渲染的时候可以让属性重新记录watcher)

多对多的关系 一个dep 对应多个watcher, 一个watcher 有多个dep。默认渲染的时候会进行依赖收集（会触发get方法），
数据更新了就找到属性对应的watcher去触发更新。

### 如何理解Vue中模板编译原理？

我们用户传递的是template 属性，我们需要将这个template 编译成 render函数

template ——> ast语法树
对语法树进行标记 （标记的是静态节点）
将ast 语法树生成 render函数

最终每次渲染可以调用render函数返回对应的虚拟节点（递归是先子后父）

### Vue生命周期钩子是如何实现的

内部利用了一个发布订阅模式，将用户写的钩子维护成了一个数组，后续一次调用callback.

## Vue2源码

`自己理解，并不一定对`

new Vue() 做了啥？
1.调用_init方法
2. 合并选项

Observer类，Dep类，
渲染完真实DOM,
再开启监听者模式，Object.defineProperty.
get: dep.depend(); set: dep.notify();

### API的实现

#### ref的实现

包了一层对象，{_v, get, set} 里面的_v如果是 引用类型，也是个proxy


## Vue生态

### Vue-Router

路由其实就是条件渲染，匹配到哪个路由，就渲染哪个路由对应的视图

#### 源码实现

#### 常见API

* go
* push
* replace

#### 用法

路由组件传参

```js
const routes = [
  { path: '/users/:id', component: User },
]
```

#### 导航守卫

##### 全局前置守卫

##### 全局解析守卫

##### 全局后置钩子

##### 路由独享的守卫

##### 组件内的守卫

#### 实践

##### 重定向接受参数

```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```
