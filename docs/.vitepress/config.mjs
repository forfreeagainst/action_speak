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
        text: '剑客', 
        items: [
          { text: 'Web API', link: '/swords/web_api.md' },
          { text: 'CSS', link: '/swords/css_base.md' },
          { text: 'JavaScript', link: '/swords/js_base.md' },
          { text: "Node.js", link: "/swords/node_base.md"}
        ]
       },
      { 
        text: '面试题', 
        items: [
          { text: '手写题', link: '/interview_question/handwriting.md' },
          { text: '模拟面试', link: '/interview_question/moni.md' },
          { text: '面试技巧', link: "/interview_question/interview_skill.md"}
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
          { text: '二叉树', link: '/algorithm/binary_tree.md' },
          { text: '回溯算法', link: "/algorithm/backtrack.md"},
          { text: '贪心算法', link: "/algorithm/greedy.md"},
          { text: '动态规划', link: "/algorithm/dynamic_programming.md"},
          { text: '单调栈', link: "/algorithm/monotonic_stack.md"},
          { text: '代码总结', link: "/algorithm/fine.md"},
        ]
       },
      {
        text: 'Vue', 
        items: [
          { text: "Vue2源码", link: "/vue/vue2.md"},
          { text: '加深源码理解', link: '/vue/interview_question.md' },
          { text: '概述', link: '/vue/outline.md' },
          { text: "Vue哲学", link: "/vue/thinkingInVue.md"},
          { text: "创建开发环境", link: "/vue/createDevelopmentEnvironment.md"},
          { text: "响应式系统", link: "/vue/reactivity.md"}
        ]
       }
    ],

    sidebar: [
      { 
        text: '剑客', 
        items: [
          { text: 'Web API', link: '/swords/web_api.md' },
          { text: 'CSS', link: '/swords/css_base.md' },
          { text: 'JavaScript', link: '/swords/js_base.md' }
        ]
       },
      {
        text: '面试题',
        items: [
          { text: '手写题', link: '/interview_question/handwriting.md' },
          { text: '模拟面试', link: '/interview_question/moni.md' },
          { text: '面试技巧', link: "/interview_question/interview_skill.md"}
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
          { text: '二叉树', link: '/algorithm/binary_tree.md' },
          { text: '回溯算法', link: "/algorithm/backtrack.md"},
          { text: '贪心算法', link: "/algorithm/greedy.md"},
          { text: '动态规划', link: "/algorithm/dynamic_programming.md"},
          { text: '单调栈', link: "/algorithm/monotonic_stack.md"},
          { text: '代码总结', link: "/algorithm/fine.md"},
        ]
       },
      { 
        text: 'Vue', 
        items: [
          { text: "Vue2源码", link: "/vue/vue2.md"},
          { text: '加深源码理解', link: '/vue/interview_question.md' },
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
