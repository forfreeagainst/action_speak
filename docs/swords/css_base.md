# css基础

## 常见问题



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