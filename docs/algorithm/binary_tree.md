# 二叉树

## 二叉树概念


```js

满二叉树是一种特殊的二叉树，其所有非叶子节点都拥有两个子节点，
而且所有叶子节点都位于同一层。如果一棵二叉树的深度为k，
并且拥有(2^k - 1)个节点，则这棵树就是满二叉树

完全二叉树则要求除了最后一层外，其它各层的节点数都达到最大个数，
并且最后一层的节点都连续集中在最左边。

* 满二叉树
* 完全二叉树
* 平衡二叉树

二叉搜索树是一种有序的二叉树数据结构，其核心特性是：
任意节点的左子树的所有节点值均小于它，右子树的所有节点值均大于它。
这一特性使得 BST 在查找、插入、删除操作时能高效利用二分查找原理，平均时间复杂度为
 O(log n)（最坏情况退化为链表，O(n)）。


左子树和右子树的高度不能超过1，这就是平衡二叉树

 平衡二叉树（Balanced Binary Tree）是一种特殊的二叉搜索树（BST），
 其核心目标是 通过约束树的结构，使左右子树高度接近，
 避免退化成链表，从而保证操作效率稳定在 O(log n)。
 AVL 平衡二叉搜索树

 存储方式: 链式存储, 线性存储(数组)

 深度优先搜索: 前序遍历,中序遍历,后序遍历 ,可递归可迭代
 广度优先搜索: 一层一层地去遍历, 队列的思想,迭代法
```


### 如何定义一个二叉树节点

::: details

```js
 // Definition for a binary tree node.
 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
 }
```

:::

### 如何理解前序 & 中序 & 后序遍历

* 左 一定在 右 的左边
* 前中后序， 主要看中 在哪，中在最左边，就是前序；中在中间，就是中序，中在最右边，就是后序。

### 坑人题目

直接省略了构建树

有节点(val)的那个推入队列，进行添加left, right

::: details

```js
function buildTree(arr) {
    if (arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root]; // 有节点(val)的那个，进行添加left, right
    let i = 1;
    while(queue.length > 0 && i < arr.length) {
        const current = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i ++;

        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i ++;
    }
    return root;
}
```

:::

### 解题思路

::: details

* 递归就是栈的思想
* 确定递归函数的参数和返回值
* 确认终止条件
* 确定单层递归的逻辑

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
    if (arr.length === 0) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const current = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i++;
    }
    
    return root;
}

// root其实是一个对象。
function inorderTraversal(root) {
    const res = [];
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        res.push(node.val);
        inorder(node.right);
    };
    inorder(root);
    return res;
}

const root = buildTree([1, null, 2, 3]);
console.log("🚀 ~ root:", root)
const result = inorderTraversal(root);
console.log("🚀 ~ result:", result); // 正确输出: [1, 3, 2]
  </script>
</body>
</html>
```

:::

### leetcode144:前序遍历

::: details

#### 前序的迭代法

```js
var preorderTraversal = function(root) {
    if (!root) return [];
    const res = [];
    const stack = [root];
    let cur = null
    // 前序遍历 中 左 右
    do {
        cur = stack.pop();
        res.push(cur.val);
        // 先进后出, 模拟栈行为，先push,后pop
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    } while(stack.length);
    return res;
};
```

#### 前序的递归法

```js
var traversal = function(curr, arr) {
    // 先检查cur是否存在，才能访问cur.val呀
    if (!curr) return;
    arr.push(curr.val);
    traversal(curr.left, arr);
    traversal(curr.right, arr);
}
var preorderTraversal = function(root) {
    const arr = [];
    traversal(root, arr);
    return arr;
};
```

:::

### leetcode94:中序遍历

::: details

#### 中序迭代的思路

```js
var inorderTraversal = function(root) {
    // 中序： 左 中 右
    const res = [];
    const stk = [];
    while (root || stk.length) {
        while (root) {
            stk.push(root);
            root = root.left;
        }
        root = stk.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
}
```

#### 中序递归的思路

```js
function traversal(curr, arr) {
    if (curr === null) return;
    traversal(curr.left, arr);
    arr.push(curr.val);
    traversal(curr.right, arr);
}

var inorderTraversal = function(root) {
    // const tree = buildTree(root);
    const arr = [];
    traversal(root, arr)
    return arr;
};
```

:::

### leetcode145:后序遍历

::: details


#### 后序的迭代法

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var postorderTraversal = function(root) {
    if (!root) return [];
    // 后序: 左 右 中
    const stack = [root];
    const res = [];
    let cur = null;
    do {
        cur = stack.pop();
        // 注意看，我先push 中间的
        // 结果先 push 中，要实现 中 右 左 的反转
        res.push(cur.val);
        // 同时栈是先进后出，所以 左边先进，左边后出来。
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    } while (stack.length);
    return res.reverse();
};
```

#### 后序的递归法

```js
var postorderTraversal = function(root) {
   const arr = [];
   var traversal = function(curr) {
        if (!curr) return;
        traversal(curr.left);
        traversal(curr.right);
        arr.push(curr.val);
   }  
   traversal(root);
   return arr;
};
```

:::


## leetcode102二叉树的层序遍历(广度优先搜索)

::: details

```js
var levelOrder = function(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    let cur = null;
    while(queue.length) {
        res.push([]);
        const len = queue.length;
        for(let i = 0; i < len; i++) {
            const cur = queue.shift();
            res[res.length - 1].push(cur.val);
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right)
        }
    }
    return res;
};
```

:::

## leetcode226翻转二叉树

::: details

```js

```

:::

## leetcode101对称二叉树

::: details

```js

```

:::

## leetcode104二叉树的最大深度

::: details

```js

```

:::

## leetcode111二叉树的最小深度

::: details

```js

```

:::

## leetcode222完全二叉树的节点个数（数量）

::: details

```js

```

:::

## leetcode110平衡二叉树

::: details

```js

```

:::

## leetcode257二叉树的所有路径

::: details

```js

```

:::

## leetcode404左叶子之和

::: details

```js

```

:::

## leetcode513找树左下角的值

::: details

```js

```

:::

## leetcode112路径总和

::: details

```js

```

:::

## leetcode106从中序与后序遍历序列构造二叉树

::: details

```js

```

:::

## leetcode654最大二叉树

::: details

```js

```

:::

## leetcode617合并二叉树

::: details

```js

```

:::

## leetcode700二叉搜索树中的搜索

::: details

```js

```

:::

## leetcode98验证二叉搜索树

::: details

```js

```

:::

## leetcode530二叉搜索树的最小绝对差

::: details

```js

```

:::

## leetcode501二叉搜索树中的众数

::: details

```js

```

:::


## leetcode236. 二叉树的最近公共祖先

::: details

```js

```

:::

## leetcode701. 二叉搜索树中的插入操作

::: details

```js

```

:::

## leetcode450. 删除二叉搜索树中的节点

::: details

```js

```

:::

## leetcode669. 修剪二叉搜索树

::: details

```js

```

:::

## leetcode108. 将有序数组转换为二叉搜索树

::: details

```js

```

:::

## leetcode538. 把二叉搜索树转换为累加树

::: details

```js

```

:::