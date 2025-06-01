# 响应式原理

* defineProperty 和 Proxy
* 为什么使用Reflect

::: details

Reflect：Reflect.get() 方法与从 对象 (target[propertyKey]) 中读取属性类似，但它是通过一个函数执行来操作的。

* receiver: 如果target对象中指定了getter，receiver则为getter调用时的this值。
* Reflect.get(target, key, receiver)：属性的值

```js
// name变化了，desc的name也要变化。
const person = {
    name: 'durant',
    get desc() {
        return this.name + '35岁了';
    }
}
```

:::

* effect 是什么？

:::details

副作用

:::


## Proxy

::: details

接收一个对象，和一个handler函数

:::

## reactivity源码

### 阅读

::: details

加强es6的class写法

变量命名

* builtin 内置
* primitive 原始的
* createReativeObject 创建响应式对象

代码梳理

1.reactive.ts => createReativeObject => new Proxy()
Object,Array 为1
Map, Set, WeakMap, WeakSet 为2
其他INVALID: 0 无效的
不同的TargetType，不同的处理逻辑

def => defineProperty 可配置，不可枚举的

2.baseHandlers.ts => targetType: 1
BaseReactiveHandler: get
MutableReactiveHandler: set, deleteProperty, has, ownKeys
ReadonlyReactiveHandler: set, deleteProperty

computed.ts => ComputedRefImpl
ReactiveEffect、trackRefValue

dep.ts => createDep

4.effect.ts
effect => new ReactiveEffect(run: preCleanupEffect，postCleanupEffect)
trackEffect
triggerEffects

3.reactiveEffect.ts
track => trackEffect
trigger => triggerEffects

ref.ts
ref => createRef => RefImpl
get: trackRefValue => trackEffect
set: triggerRefValue => triggerEffects
:::


::: details

http请求包括：
请求行：user-agent、accept、accept-language、host、cookie、connection
请求行：
请求方法字段、URL字段和HTTP协议版本eg: GET /index.html HTTP/1.1
get方法将数据拼接到url后面，传递参数受限
请求头（key,value形式）
User-Agent: 产生请求的浏览器类型
Accept: 客户端可识别的内容类型列表application/json, text/plain, */*,application/x-www-form-urlencoded
Host: 主机地址
请求数据
请求体：

如何区分电脑呢？ IP地址 + 主机名
ifconfig: Ipv4地址：192.168.43.131 => 192.168.43局域网下第131台电脑
一般来收，两台电脑相连，需要在同一个局域网下
主机名 => 电脑 > 属性 > 计算机全名： LAPTOP-D6QU3PSD
如何判断两台电脑是否联通？ ping ip地址 （ping 192.168.43.131）(ping www.baidu.com)
如何相连两个电脑呢？
A.两个电脑在同一个WIFI(局域网)
B.电脑要关闭防火墙（360等杀毒软件、自带windows防火墙）

如何阻止这个协议呢？分层协议
TCP/IP的五个层
应用层：HTTP、FTP、SMTP等
数据传输层：TCP协议
网络层：IP协议
数据链路层：
物理层：硬件

`<input v-bind="$attrs" v-on="$listener"></input>`

把data 的数据放在 _data, 通过this, 就能改变 _data的数据，叫做数据代理。
把data的数据放在_data, 还进行了加工，产生了relativeSetter和relativeGetter，
叫做数据劫持。
数据代理和数据劫持都离不开 defineProperty.

vm和vc不一样的，举例？
vc: vue实例对象
vm: 组件实例对象
vm有 el, data可函数可对象
vc没有 el, data只能函数




:::