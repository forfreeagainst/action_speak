# 二叉树

## 二叉树概念

* 满二叉树
* 完全二叉树
* 平衡二叉树

### 如何定义一个二叉树节点

```js
 // Definition for a binary tree node.
 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
 }
```

### 如何理解前序 & 中序 & 后序遍历

letcode 144 ，145，94

* 左 一定在 右 的左边
* 前中后序， 主要看中 在哪，中在最左边，就是前序；中在中间，就是中序，中在最右边，就是后序。

### 解题思路

// 递归就是栈的思想
// 确定递归函数的参数和返回值
// 确认终止条件
// 确定单层递归的逻辑