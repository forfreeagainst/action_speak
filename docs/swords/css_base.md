# css基础

## 常见问题

### 说说对盒子模型的理解？

::: details
在css中，盒子模型可以分为
* W3C 标准盒子模型
* IE 盒子模型

:::

### 对 BFC的理解？

::: details

块级格式上下文，它是页面中一块渲染区域，并且有一套属于自己的渲染规则。


:::

### 说说em/px/rem/vh/vw区别？

::: details

:::

### CSS3新特性

::: details

* animation:
* transform:

:::

### flex

### 什么是响应式设计？

::: details



:::

### 如何画一个三角形

::: details

```css
.triangle-box{
    border-top: solid 10px #999; /* 上边框饱满*/
    border-left: solid 10px transparent;
    border-right: solid 10px transparent;
    width: 0;
    height: 0;
}
```

:::

### 水平/垂直居中几种方式

::: details

* margin: 0 auto; child块级元素水平居中
* text-align: center; parent的内容水平居中
* line-height:20px;height: 20px; parent的内容垂直居中
* 父position: relative; + 子 position: absolute; left: 50%;top:50%;transform:translate(-50%,-50%);
* display: flex; justify-content: center;align-items: center;
* display:grid;justify-content: center;align-items: center;

:::

### flex1 什么意思

::: details

:::

### 隐藏元素的方式

* visibility:

## CSS预处理器