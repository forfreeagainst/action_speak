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
        text: 'Vue', 
        items: [
          { text: '概述', link: '/vue/outline.md' },
          { text: "Vue哲学", link: "/vue/thinkingInVue.md"}
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
        text: 'Vue', 
        items: [
          { text: '概述', link: '/vue/outline.md' },
          { text: "Vue哲学", link: "/vue/thinkingInVue.md"}
        ]
       }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
