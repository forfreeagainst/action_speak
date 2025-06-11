# 链表

## 链表结构如何书写

::: details

```js
function listNode(val, next) {
    this.val = (val === undefined ? null: val);
    this.next = (next === undefined ? null: next);
}
```

:::

## letcode203：移除链表元素

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。删除链表上的某个元素

输入：head = [7,7,7,7], val = 7

输出：[]

::: details

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while(temp.next !== null) {
        if (temp.next.val == val) {
            temp.next = temp.next.next;
        } else {
            temp = temp.next;
        }
    }
    return dummyHead.next;
};
```

:::


## letcode707. 设计链表

* 获取第几个节点的值
* 头部插入节点
* 尾部插入节点
* 第几个节点前插入节点
* 删除第几个节点

::: details

```js
function ListNode(val, next) {
    this.val = (val === undefined ? null: val);
    this.next = (next === undefined ? null: next);
}

var MyLinkedList = function() {
    this.size = 0;
    this.head = new ListNode(0);
};

MyLinkedList.prototype.get = function(index) {
   if (index < 0 || index >= this.size) {
        return -1; // 检查 index 合法性
    }
    let cur = this.head.next; // 直接从第一个实际节点开始（跳过 dummy）
    for (let i = 0; i < index; i++) { // 循环 index 次（不是 index+1 次）
        cur = cur.next;
    }
    return cur.val; // 返回目标节点的值
};

MyLinkedList.prototype.addAtHead = function(val) {
    const newNode = new ListNode(val);
    newNode.next = this.head.next;     // 新节点指向原第一个实际节点
    this.head.next = newNode;          // 虚拟头节点指向新节点
    this.size ++;  
};

MyLinkedList.prototype.addAtTail = function(val) {
    let cur = this.head;
     while (cur.next !== null) { // 直接遍历到最后一个节点（cur.next 为 null）
        cur = cur.next;
    }
    cur.next = new ListNode(val);
    this.size ++;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0 || index > this.size) return; // ??边界合理？
    let cur = this.head;
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    const node = new ListNode(val);
    // 0 1 2
    node.next = cur.next;
    cur.next = node;
    this.size ++;
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index < 0 || index >= this.size) return;
    let cur = this.head;
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    cur.next = cur.next.next;
    this.size --;
};

```

:::

## letcode206-反转链表

::: details

```js
var reverseList = function(head) {
     if (head == null || head.next == null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};
```

:::

## letcode24.两两交换链表中的节点

::: details

```js
```

:::

## letcode19.删除链表倒数第N个节点

::: details

```js

```

:::

## letcode142.环形链表

::: details

```js

```

:::