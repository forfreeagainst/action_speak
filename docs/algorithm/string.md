# 字符串

## letcode344:反转字符串

::: details

```js
var reverseString = function(s) {
    for(let i = 0; i < s.length / 2; i++) {
        let left = i;
        let right = s.length - i - 1;
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;
    }
    return s;
};
```

:::

## letcode541:反转字符串II

::: details

```js

```

:::

## letcode151:翻转字符串里的单词

::: details

```js
var reverseWords = function(s) {
    //  \s+:	匹配连续的一个或多个空白字符
    return s.trim().split(/\s+/).reverse().join(' ');
};
```

:::

## KMP算法理论篇

::: details

```js

```

:::

## KMP算法代码篇

::: details

```js

```

:::

## letcode459重复的子字符串

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

::: details

```js

```

:::
