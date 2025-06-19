# 二叉树

## 二叉树概念

满二叉树是一种特殊的二叉树，其所有非叶子节点都拥有两个子节点，而且所有叶子节点都位于同一层。如果一棵二叉树的深度为k，并且拥有(2^k - 1)个节点，则这棵树就是满二叉树

完全二叉树则要求除了最后一层外，其它各层的节点数都达到最大个数，并且最后一层的节点都连续集中在最左边。

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