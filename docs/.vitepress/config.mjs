import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Try",
  description: "You′re never a loser until you quit trying.",
  base: process.env.NODE_ENV === 'production' ? '/action_speak/' : '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { 
        text: '面试题', 
        items: [
          { text: '手写题', link: '/interview_question/handwriting.md' },
          { text: '浏览器', link: '/interview_question/browser.md' }
        ]
       },
       { 
        text: '算法', 
        items: [
          { text: '数组', link: '/algorithm/array.md' },
          { text: '二叉树', link: '/algorithm/binary_tree.md' }
        ]
       },
      { 
        text: 'Vue', 
        items: [
          { text: '概述', link: '/vue/outline.md' },
          { text: "Vue哲学", link: "/vue/thinkingInVue.md"},
          { text: "创建开发环境", link: "/vue/createDevelopmentEnvironment.md"},
          { text: "响应式系统", link: "/vue/reactivity.md"}
        ]
       }
    ],

    sidebar: [
      {
        text: '面试题',
        items: [
          { text: '手写题', link: '/interview_question/handwriting.md' },
          { text: '浏览器', link: '/interview_question/browser.md' }
        ]
      },
      { 
        text: '算法', 
        items: [
          { text: '数组', link: '/algorithm/array.md' },
          { text: '链表', link: '/algorithm/linked_list.md' },
          { text: '哈希表', link: '/algorithm/hashtable.md' },
          { text: '字符串', link: '/algorithm/string.md' },
          { text: '栈与队列', link: '/algorithm/stack_and_queue.md' },
          { text: '二叉树', link: '/algorithm/binary_tree.md' }
        ]
       },
      { 
        text: 'Vue', 
        items: [
          { text: '概述', link: '/vue/outline.md' },
          { text: "Vue哲学", link: "/vue/thinkingInVue.md"},
          { text: "创建开发环境", link: "/vue/createDevelopmentEnvironment.md"},
          { text: "响应式系统", link: "/vue/reactivity.md"}
        ]
       }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
