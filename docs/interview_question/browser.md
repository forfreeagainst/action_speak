---
outline: deep
---

# 浏览器

**sessionStorage 和 localStorage 之间的区别是什么？**

::: details
都是web存储，在浏览器里保存数据，在页面刷新后仍可以访问这些数据

存储范围：localStorage是持久化的，没有时间限制，关闭浏览器还在，直到手动删除，sessionStorage是会话级别的，关闭浏览器或标签页就清除了

存储大小：都能存储大概5M，视浏览器而定

访问限制：localStorage是同一域名下共享，所有标签页和窗口都能访问，sessionStorage只在当前窗口下可访问，不同标签页或窗口的互不干扰

使用场景：保存长期需要的用localStorage，临时数据用sessionStorage
:::
