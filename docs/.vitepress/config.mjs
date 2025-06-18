import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "九劫秘典",
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
       },
       {
        text: "项目",
        items: [
          {text: "Canvas", link: "/project/canvas.md"},
          {text: "从Vue2迁移到Vue3", link: "/project/MigratingFromVue2ToVue3.md"},
          {text: "基于Promise调用子组件弹窗", link: "/project/PromiseDialog.md"},
          {text: "权限控制", link: "/project/permission.md"},
          {text: "性能优化", link: "/project/PerformanceOptimization.md"},
          {text: "国际化", link: "/project/I18n.md"},
          {text: "动态表单", link: "/project/DynamicForm.md"},
          {text: "脚手架", link: "/project/cli.md" },
          {text: "大文件上传", link: "/project/FileUpload.md" },
          {text: "低代码", link: "/project/LowCode.md"},
          {text: "Echarts图表", link: "/project/EchartsHook.md"},
          {text: "可排序的", link: "/project/sortable.md"},
          {text: "sdk前端埋点", link: "/project/sdk.md"},
          {text: "持续集成持续部署", link: "/project/CICD.md"},
          {text: "配置式Provider", link: "/project/ConfigProvider.md"},
          {text: "虚拟滚动", link: "/project/VirtualScrolling.md"},
          {text: "千分符金额文本框组件", link: "/project/ThousandSeparatorAmoutInput.md"},
          {text: "WebSocket", link: "/project/WebSocket.md"},
          {text: "SEO", link: "/project/seo.md"},
          { text: "大屏", link: "/project/largeScreen.md"},
          { text: "前端安全", link: "/project/safe.md"},
          { text: "单点登录", link: "/project/singleSignOn.md"},
          {text: "视频合成", link: "/project/video_merger.md"},
          {text: "音乐软件", link: "/project/music_soft.md"},
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
       },
        {
        text: "项目",
        items: [
          {text: "Canvas", link: "/project/canvas.md"},
          {text: "从Vue2迁移到Vue3", link: "/project/MigratingFromVue2ToVue3.md"},
          {text: "基于Promise调用子组件弹窗", link: "/project/PromiseDialog.md"},
          {text: "权限控制", link: "/project/permission.md"},
          {text: "性能优化", link: "/project/PerformanceOptimization.md"},
          {text: "国际化", link: "/project/I18n.md"},
          {text: "动态表单", link: "/project/DynamicForm.md"},
          {text: "脚手架", link: "/project/cli.md" },
          {text: "大文件上传", link: "/project/FileUpload.md" },
          {text: "低代码", link: "/project/LowCode.md"},
          {text: "Echarts图表", link: "/project/EchartsHook.md"},
          {text: "可排序的", link: "/project/sortable.md"},
          {text: "sdk前端埋点", link: "/project/sdk.md"},
          {text: "持续集成持续部署", link: "/project/CICD.md"},
          {text: "配置式Provider", link: "/project/ConfigProvider.md"},
          {text: "虚拟滚动", link: "/project/VirtualScrolling.md"},
          {text: "千分符金额文本框组件", link: "/project/ThousandSeparatorAmoutInput.md"},
          {text: "WebSocket", link: "/project/WebSocket.md"},
          {text: "SEO", link: "/project/seo.md"},
          { text: "大屏", link: "/project/largeScreen.md"},
          { text: "前端安全", link: "/project/safe.md"},
          { text: "单点登录", link: "/project/singleSignOn.md"},
          {text: "视频合成", link: "/project/video_merger.md"},
          {text: "音乐软件", link: "/project/music_soft.md"},
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
