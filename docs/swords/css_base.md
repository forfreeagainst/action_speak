# css基础

## 常见css属性

* background: linear-gradient(to left, cyan 50%, palegoldenrod 50%); // 使用渐变，形成样式的1/2
* transform: scale(0.5); // 使用缩（小）放（大） 实现 1px
* word-break: break-all; // 允许在单词内部进行换行。当文本内容宽度超过其容器的宽度，无论单词完整，都要换行。
* text-align: justify; // 两端对齐


## 常见问题

### 说说对盒子模型的理解？

::: details

```md
在css中，盒子模型可以分为 (W3C)标准盒子模型 和 IE盒子模型？
IE盒子模型的宽高包含padding和border，标准盒子模型的宽高不包含 padding和border。
```
:::

### 对 BFC的理解？

::: details

```md
BFC是块级格式上下文。它的特点是
独立渲染区域 => 开启BFC的区域，是一块独立的渲染区域。
应用:
1.父子margin合并 => 
父子 margin 合并 是指 父元素的 margin-top 和第一个子元素的 margin-top 合并
（或 margin-bottom 和最后一个子元素的 margin-bottom 合并）
普通文档流中，父元素的 margin-top 会和子元素的 margin-top 合并，
最终取 max(20px, 30px) = 30px。，而BFC可以阻止这种情况。
2.浮动元素会脱离文档流，导致父元素高度塌陷（height:0）。而BFC可以让父元素正确计算高度。
3.阻止浮动元素覆盖 => 浮动元素会覆盖相邻的非浮动元素

如何开启BFC?
1.使用float:left; 一起脱离文档流
2.position:absolute; 或position:fixed; 一起脱离文档流。
3.display:flow-root; 最佳实现，专门用于创建BFC,副作用小，但IE不支持
4.display:inline-block;行内块元素创建BFC
5.overflow: auto; 或 overflow:hidden;
```

#### 父子margin合并

```css
.bfc-margin-box{
    /*overflow开启BFC*/
    /* overflow: hidden; */
    /*border开启BFC*/
    /* border:solid 1px green; */
    /*以下都能开启BFC*/
    /* padding: 1px; */
    /* float:left; */
    /* position: absolute; */
    /* display: flow-root; */
    /* display: inline-block; */
    margin-top: 20px;
}
.bfc-margin-box > .top-box{
    height: 30px;
    background-color: pink;
    margin-top: 40px;
}
```

#### 浮动元素会脱离文档流，导致父元素高度塌陷（height:0）

```css
 .bfc-float-box{
    background-color: salmon;
    /*最佳实现，专门用于创建BFC,无副作用，但IE不支持*/
    /* display: flow-root; */
    /*使用overflow 开启 BFC*/
    /* overflow: hidden; */
    /* overflow: auto; */
    /* 以下三种都可以*/
    /* float:left; */
    /* position:absolute; */
    /* position:fixed; */
    /*行内块元素创建BFC*/
    display: inline-block;
    /* 父元素设置具体高度*/
    /* height: 20px; */
    /*以下两种不行,仍只有2px高度*/
    /* padding: 1px; */
    /* border:solid 1px red; */
}
.bfc-float-box > .float-box{            
    float: left;
}
```

#### 阻止浮动元素覆盖

影响了谁,就给谁开BFC.

```css
.left-box{
    float: left;
    /*浮动元素会覆盖相邻的非浮动元素,空间会,但文本内容不会*/
    background-color: purple;
}
.right-box{
    background-color: skyblue;
    /* 给非浮动元素添加 overflow: hidden，使其成为 BFC。 */
    /* overflow: hidden; */
}
```

```md
<div class="float-cover-box">
    <div class="left-box">左边浮动</div>
    <div class="right-box">右边正常文档流</div>
</div>
```

发生了什么

```md
浮动元素（float）脱离文档流，但不会覆盖后续块级元素的文本内容，
因为 CSS 设计上允许文字环绕浮动元素（这是 float 的原始用途——实现图文混排）

1.left-box 设置了 float: left，脱离普通文档流，但仍占据布局空间
（其他元素会“避开”它的位置）。
2.right-box 是块级元素，默认会占据整行宽度，但由于浮动元素的存在，它的文本内容
会环绕浮动元素（而不是被覆盖）。
3.背景色（skyblue）会延伸到浮动元素下方，但文字会自动避开浮动区域。

```

:::

### 说说em/px/rem/vh/vw区别？

::: details

```md
px是固定长度单位，不会随着其他元素的变化而变化。
em和rem都是相对长度单位。rem是相对于根元素的字体大小来计算的。em是相对父级元素的属性来变化的。
vw：设备的视口宽度，vh：设备的视口高度。
```

:::

### CSS3新特性

::: details

* border-radius: 圆角，box-shadow: 阴影
* transform: rotate旋转，scale缩放，translate移动，skew倾斜
* 媒体查询
* animation:

:::

### flex

::: details

```md

```

:::

### 什么是响应式设计？

::: details

```md
```

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

### 为什么要初始化样式？

::: details

```md
不同浏览器的默认样式不同，不初始化会造成不同浏览器的显示差异。
常见设置浏览器默认样式有哪些？
* {
padding: 0;
margin:0;
list-style: none;
text-decoration: none;//decoration装饰品
outline:none;//outline勾勒...的外形
box-sizing:border-box;//sizing标定...的大小
}

```

:::

### 三栏布局：圣杯布局和双飞翼布局

::: details

* 传统 float 布局（圣杯/双飞翼）：必须 main 放前面，否则布局会乱
* 现代 Flex/Grid 布局：可以自由调整顺序，main 放哪儿都行

#### 圣杯布局

```html
<div class="container">
  <div class="main">主要内容</div>  <!-- 优先渲染 -->
  <div class="left">左侧边栏</div>
  <div class="right">右侧边栏</div>
</div>
```

#### 双飞翼布局

```html
<div class="container">
  <div class="main">
    <div class="content">主要内容</div>  <!-- 多一层嵌套 -->
  </div>
  <div class="left">左侧边栏</div>
  <div class="right">右侧边栏</div>
</div>
```

#### 为什么把main放前面

```md
（1）SEO 优化（搜索引擎优化）
搜索引擎（如 Google）会优先抓取 HTML 中靠前的内容，认为它更重要。

把主要内容放在前面，可以让搜索引擎更快识别页面的核心内容，提高排名。

（2）无障碍访问（Accessibility）
屏幕阅读器（Screen Reader）会按 HTML 顺序读取内容，main 放在前面可以
让视障用户先听到主要内容，而不是侧边栏。

（3）流式布局（Float 布局）依赖 HTML 顺序
圣杯和双飞翼布局使用 float 实现，main 必须先渲染，才能让 left 和 right 
通过 margin-left: -100% 等技巧正确定位。
```

:::

### 常用选择器和伪元素，优先级

::: details

```md
```

:::

## CSS预处理器

### Sass

* 变量学习
`$theme-color: orange;`
* 原来没有值，才取这个加了!default的值。
`!default`
* 表示对象

```md
$themes: (
  default-theme: (
    theme-color: orange,
  )
)
```

* 导入css文件

`@import "./defaultStyle.scss";`

## CSS框架

tailwindcss: CSS原子类框架
bootstrap: CSS原子类框架

## 开发注意

* 拒绝使用行块盒，问题很多。