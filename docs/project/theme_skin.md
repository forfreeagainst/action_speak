# 一键换肤

## 1. 使用sass

缺点：

*   项目使用sass
*   mixin.scss文件，我要写一堆方法get-background,get-fontColor，对应不同主题的键值对(background、font-color)

```css
/* variable.scss */
$themes: (
  default-theme: (
    background-color: orange,
    font-color: blue,
  ),
  holiday-theme: (
    background-color: pink,
    font-color: yellow,
  )
)
```

mixin.scss

```css
/* mixin.scss */
@mixin get-backcolor($color) {
  @each $key, $value in $themes {
    [data-skin='#{$key}'] & {
      background-color: map-get($value, $color);
    }
  }
}
@mixin get-fontColor($color) {
  @each $key, $value in $themes {
    [data-skin='#{$key}'] & {
      color: map-get($value, $color);
    }
  }
}
```

书写哪些需要换肤的css样式，然后全局引入此样式

index.scss

```css
@import "./variable.scss";
@import "./mixin.scss";
button {
  @include get-backcolor('background-color');
  @include get-fontColor('font-color');
}
```

```js
window.document.documentElement.setAttribute("data-skin", 'default-theme');
//或
window.document.documentElement.setAttribute("data-skin", 'holiday-theme');
```

## **2. css3的var:推荐使用**

style

```css
<style>
/*夏天的颜色*/
body.summer{
  /*颜色不能带引号*/
  --diy-bg-color: #DD0000;
}
.season-panel{
  width: 200px;
  height: 200px;
  /*如果--diy-bg-color未定义，就取后面的颜色*/
  background-color: var(--diy-bg-color, #00FF55)
}
</style>
```

body

```md
<body>
  <div class="season-panel">
  </div>
  <script>
    /*如果summer存在，就移除它，否则添加它。（跟add,remove效果差不多，相关的还有replace）*/
    document.body.classList.toggle('summer');
    setTimeout(function() {
      document.body.classList.toggle('summer');
    }, 2000)
  </script>
</body>
```

兼容性：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cbc0e72066ed497493b2beafb0859387~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Y-W5ZCN5oCq5YW9:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDMzMjU0Nzg2MDYwMzA3MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1750860234&x-orig-sign=O3m%2FhNy9E54oS4un23wn%2FevtA70%3D)

## 3. UI框架常有的主题切换功能

```md
eg: elementUI,antDesign,等
```
