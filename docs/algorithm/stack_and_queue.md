# 栈与队列

## letcode232.用栈实现队列

```md
将一个栈当作输入栈，用于压入 push 传入的数据；另一个栈当作输出栈，用于 pop 和 peek 操作。

每次 pop 或 peek 时，若输出栈为空则将输入栈的全部数据依次弹出并压入输出栈，这样输出栈从栈顶往栈底的顺序就是队列从队首往队尾的顺序。

输出栈为空是唯一正确的触发条件，确保：

out_stack 的栈顶始终是队列的头元素。

避免不必要的转移操作。

严格满足队列的 FIFO 特性。
```

::: details

```js
var MyQueue = function() {
    this.stackIn = [];
    this.stackOut = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.stackOut.length === 0) {
        while(this.stackIn.length) {
            this.stackOut.push(this.stackIn.pop())
        }
    } 
    return this.stackOut.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.stackOut.length === 0) {
        while(this.stackIn.length) {
            this.stackOut.push(this.stackIn.pop())
        }
    }
    return this.stackOut[this.stackOut.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

:::

## letcode225:用队列实现栈

::: details

```js

```

:::

## letcode20:有效的括号

::: details

```js

```

:::

## letcode1047.删除字符串中的所有相邻重复项

::: details

```js

```

:::

## letcode150逆波兰表达式求值

::: details

```js

```

:::

## letcode239:滑动窗口最大值

::: details

```js

```

:::

## letcode347:前K个高频元素

::: details

```js

```

:::