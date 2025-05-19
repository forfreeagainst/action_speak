# 数组

## 二分查找

## 快慢指针

## 双指针

## 滑动窗口

## 螺旋矩阵

### letcode59

给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

输入：n = 3

输出：[[1,2,3],[8,9,4],[7,6,5]]

::: details

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // 注意看，9的x轴是1，y轴也是1；对应就是二维数组的x和y
    // 根据循环不变量，都是左闭右开, 根本用不了。 直接一行走完了，就行了。
    let top = 0;
    let right = n -1;
    let bottom = n - 1;
    let left = 0;

    let num = 1;
    let res = new Array(n);
    for(let i = 0; i < n; i++) {
        res[i] = new Array(n);
    }
    // 结束条件，等于n的平方。
    while(num <= n *n) {
        for(let i= left;i<=right; i++) {
            res[top][i] = num ++;
        }
        top ++;
        for(let i = top; i <=bottom; i ++) {
            res[i][right] = num ++;
        }
        right --;
        for(let i = right; i >= left; i --) {
            res[bottom][i] = num++;
        }
        bottom --;
        for(let i = bottom; i>=top; i--) {
            res[i][left] = num ++;
        }
        left ++;
    }
    return res;
};
```

:::