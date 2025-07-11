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

## leetcode203：移除链表元素

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


## leetcode707. 设计链表

* 获取第几个节点的值
* 头部插入节点
* 尾部插入节点
* 第几个节点前插入节点
* 删除第几个节点

::: details

* size 要减少/增加
* get不到，返回 -1
* addAtIndex, 在哪个下表，插入东西，也是参考splice。

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
    // const arr = [1, 2, 3];
    // arr.splice(3,0, 4);
    // console.log("🚀 ~ arr:", arr); // 1, 2, 3,4
    if (index < 0 || index > this.size) return; // 边界参考splice
    // const arr = [1, 2, 3];
    // arr.splice(0,0, 4);
    // console.log("🚀 ~ arr:", arr); // 4，1， 2，3
    let cur = this.head; // 是this.head，也是参考splice
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
    // 链表下标从0开始
    if (index < 0 || index >= this.size) return -1; // 注意：要返回-1
    let cur = this.head.next; // 链表下标为0的数
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    return cur.val;
};

MyLinkedList.prototype.addAtHead = function(val) {
    const headNode = new ListNode(val);
    headNode.next = this.head.next;
    this.head.next = headNode;
    this.size ++;
};

MyLinkedList.prototype.addAtTail = function(val) {
    let cur = this.head;
    while(cur.next) {
        cur = cur.next;
    }
    cur.next = new ListNode(val);
    this.size ++;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0 || index > this.size) return; // 参考splice的边界
    let cur = this.head;
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    const newNode = new ListNode(val);
    newNode.next = cur.next;
    cur.next = newNode;
    this.size ++;
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
   if (index < 0 || index >= this.size) return;
   let cur = this.head;
   for(let i = 0; i < index; i++) {
        cur = cur.next;
   }
   cur.next = cur.next.next;
   this.size --; // 注意 size要减少
};
```

:::

## leetcode206-反转链表

::: details

### 双指针

```js
var reverseList = function(head) {
    let tail = null; // 最后一个节点，它是我们最终想要的新链表
    let cur = head;
    while(cur) {
        let next = cur.next;
        cur.next = tail; // 最后一个节点的前一个
        tail = cur;
        cur = next;        
    }
    return tail;
};
```

### 递归

```js
function reverse(cur, tail) {
    if (!cur) return tail;
    const temp = cur.next;
    cur.next = tail;
    tail = cur;
    return reverse(temp, tail);
}

var reverseList = function(head) {
    return reverse(head, null);
};
```

<!-- ```js
// 晦涩难懂
var reverseList = function(head) {
     if (head == null || head.next == null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};
``` -->

:::

## leetcode24.两两交换链表中的节点

::: details

```js
var swapPairs = function(head) {
    const dummyNode = new ListNode(0);
    dummyNode.next = head;
    let cur = dummyNode;
    // 空节点的下两个节点
    while(cur.next && cur.next.next) {
        const node1 = cur.next;
        const node3 = cur.next.next.next;
        cur.next = cur.next.next;
        cur.next.next = node1;
        node1.next = node3;
        cur = node1;
    }
    return dummyNode.next;
};
```

:::

## leetcode19.删除链表倒数第N个节点

::: details

```js
var removeNthFromEnd = function(head, n) {
    // 这是倒数呀
    const dummyNode = new ListNode(0, head);
    let first = head;
    let second = dummyNode;

    for(let i = 0; i < n; i++) {
        first = first.next;
    }
    while(first) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummyNode.next;
};
```

:::

## leetcode142.环形链表

::: details

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if (!head) return null;
    let slow = head;
    let fast = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        // 相等说明有环，且这个点为环入口
        if (fast === slow) {
            let index = head;
            while(index !== slow) {
                index = index.next;
                // 这句需要重点理解
                slow = slow.next;
            }
            return index;
        }
    }
    return null;
};
```

```js
var detectCycle = function(head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
};
```

:::

## :star: leetcode2：两数相加

::: details

```js
var addTwoNumbers = function(l1, l2) {
    const dummyNode = new ListNode(0);
    let carry = 0
    let link1 = l1;
    let link2 = l2;
    let link3 = dummyNode;
    while(link1 || link2 || carry > 0) {
        const aVal = link1 && link1.val ? link1.val : 0;
        const bVal = link2 && link2.val ? link2.val : 0;
        const sum = aVal + bVal + carry;
        link3.next = new ListNode(sum % 10);
        link3 = link3.next;
        carry = ~~(sum / 10)
        if (link1) {
            link1 = link1.next;
        }
        if (link2) {
            link2 = link2.next;
        }
    }
    return dummyNode.next;
};
```

```js
// 辣鸡代码 * 1
var addTwoNumbers = function(l1, l2) {
    // Step 1: Convert linked lists to arrays (digits in reverse order)
    const aArr = [];
    while (l1) {
        aArr.push(l1.val);
        l1 = l1.next;
    }
    const bArr = [];
    while (l2) {
        bArr.push(l2.val);
        l2 = l2.next;
    }

    // Step 2: Calculate sum from least significant digit (right to left)
    let i = 0;
    const resultArr = [];
    let carry = 0;

    while (i < aArr.length || i < bArr.length || carry > 0) {
        const sum = (aArr[i] || 0) + (bArr[i] || 0) + carry;
        resultArr.push(sum % 10);
        carry = Math.floor(sum / 10);
        i++;
    }

    // Step 3: Build the result linked list (in reverse order)
    let dummyNode = new ListNode(0);
    let current = dummyNode;
    for (const num of resultArr) {
        current.next = new ListNode(num);
        current = current.next;
    }
    return dummyNode.next;
};
```

:::

## :star: leetcode25. K 个一组翻转链表

```md
给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
```

