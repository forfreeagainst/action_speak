# 简历与面试

## 近期准备

::: details

* 简历：规划项目有什么功能，实现一遍
* 手写Vue源码：珠峰的源码课
* 算法加强 ： leetcode100+代码随想录 剩下的算法题
* 面试题背一点吧 : durant文档，手机图片

:::

## 简历优化

::: details

* 谈点必炸，它的上游是什么？ 做了什么，不限于。为什么这样去做？二次封装axios，约定什么。

围绕业务呀，金融业务，pdf预览，文档签名，富文本，excel下载/导入，埋点，热门业务/冷门业务。（中心端经办，分行经办...）

简历：第四个项目就删了

公司赚多少钱，放简历里。

主导/推动/推行/联合，写量化数据 4s->0.8s 首屏加载， 一个项目 5-7条

编排引擎、插件化物料管理、大数量画布表格、流程引擎

1. 准备 3~5 个重难点
2. 背景、方案、落地、反思优化
3. 大部分面试官都会刨根问底，逮着一个问题一直深挖（承上启下，图表基础->图表渲染引擎->自定义图表->canvas与svg细节->webGL->着色器、粒子系统）
:::

## 面试回答

* 回答问题1分钟以内，不展开。如果面试官感兴趣，会接着问。
* 改题，问到websocket，其实很复杂。但你可以改，就是项目遇到了什么场景，通过什么解决。
* crud没问题，加定语/客观事实，大量的，卡顿明显。
* 不要讲主观的东西，说自己勤劳，每天人都勤劳，用客观的数据。
* 小心无效回答，React适合大型项目，Vue适合中小型项目。那什么是大项目呢？React采用单项数据流，在大型项目组件通信，比较灵活...
* 为什么做这件事？做这件事有什么好处？其他方案不好？

## 面试不过

* 匹配度不过，没有擅长React,找Vue就行了。找熟练度人员的公司

## 心态

::: details
//进去，肯定就会接触新的，不可能一直接触到你会的，考验的是你的学习能力。
//遇到不会的，就动用自己的知识，去猜想思路
//仪容仪表，身体自然，语言平和

大厂才事无巨细，好几轮面试，好几个小时。

不要把自己当外包。（一些外包人的认知：边缘人物，甲方就是在坑我，不努力干活。）

我只是想个自研或者工资高点的公司，也可以是以后。7月份就开找，实在不行，就随便找个发工资的工资就行了，当成
应届生就行，没有应届生身份，但技术还行，有工作经验。
接着继续沉淀。将所有知识扎实。eg： 看字节等大牛b站，是如何思考一些问题的。官方源码，对知识查缺补漏。
开源的代码库。
:::

## 约了大佬模拟面试

::: details
什么样的博客，博客内容值得一看。
源哥，我这里能问一些其他的？
:::


## 未归类

::: details

B端产品主要服务于企业，满足工作场景需求，用户量级小但需求定制化；
而C端产品面向大众消费者，用户量级大，通常以免费服务为基础，通过用户规模实现盈利。

厦门国际银行的跨境e站通（网银，pc后台管理，澳门国际银行，手机端交易和查询）

实现token无感刷新（单点登录）
媒体查询： media和rem，vw梭哈
通过git管理代码，svn上传前端开发规范
对网络、包体积、缓存、图片针对性优化，优化了首屏的加载速度，FCP,FP

宁波银行外汇金管家
解决ios和安卓的兼容性问题，不限于...。
货币对列表拖拉，将常用的货币对，拖至前面
keepAlive和beforeRouteEnter进行表单数据缓存。

尧顺代驾（智慧小区）
canvas图片刮刮乐
小程序分包，减少打包体积
图片懒加载，防抖，节流，md5加密
熟悉uniapp微信小程序打包流程
引入腾讯地图SDK，解析当前地址，获取驾驶距离
瀑布流

express, 搞清楚请求头，请求体，响应头，响应体的作用。
响应头writeHead，可以设置内容类型
响应体end
end和send区别？

导航守卫（全局的，单个的，组件内的）+token  长token+短token 无感刷新  单点登录
（全局beforeEach,afterEach）
(局部的：beforeRouteEnter,beforeRouteLeave, beforeRouteUpdate?)
组件懒加载, 不使用import ccc from './ccc.vue'，使用import ('./ccc.vue');
图片懒加载：占位显示，等待图片标签出现在可视区域，再使用真实路径
(document.documentElement.scrollTop || document.body.scrollTop)

交互：多级联动，且多个页面进入此功能，如何代码优化

项目难点： 各页面交互复杂，接口频繁，代码乱

项目亮点：

在大量的表单字段提交，功能开发，通过vue实现一个表单填写，减少重复的开发工作，生成对应的代码文件。
（总结有多少种填写组件，每种组件它的独特性，进行模板字符串的拼接，通过a标签进行文件下载。
目前通过localstorage进行存储，如果以后有很多这样的表单填写，可能会用express。）


你来阿里巴巴想得到什么？


你个人在1~3年内职业/生活目标是什么?你为之做了哪些努力
目标："贡献开源文档"，沉淀了很久，从基础强化到框架源码。

你对自己最不满意的地方是什么?你计划如何改变这个现状
那倒没有，金无足赤，人无完人，软件开发中也没有银弹。我只是在自己的认知范围内，做最适合的选择而已。
实践是检验真理的唯一条件，在工作中磨练自己，获取真知。热爱工作，就能改变现状。


工作中如何去和测试，业务，后端沟通
Q:遇到不会的，怎么处理?
A:找经验高的,或者技术leader,请教思路

Q:你还有什么想问的吗
A:没什么意思不好问的。巧妙地问薪资福利。

项目亮点：
前端代码规则总结:码表总结,常用语法总结

移动端H5适配
1.安装lib-flexible(设置rem的基准值)
2.安装postCss-pxtorem(可以将Css中的像素单位px抓换为rem单位)
.postcssrc.js
module.exports = {
  "plugins": {
    //插件作用：把px转换为rem
    "postcss-pxtorem": {
      //rootValue: 37.5,
      //Vant官方根字体大小是37.5
      rootValue(res) {
        return res.file.indexOf('vant') !== -1 ? 37.5: 75;
      },
      //要转换的属性列表， *代表所有
      propList: ['*'],
      //过滤掉.noChange开头的class,不进行rem转换
      (注：先过滤，后propList要转换的属性列表)
      selectorBlackList: ['.nochange']
    }
  }
}
3.main.js引入import 'lib-flexible/flexible';

技术选型：
Vue3+vite+TypeScript,vue-router,pinia,element-plus,axios网络交互，echarts

技术栈：create-react-app, react-router-dom路由，react-redux和redux-toolkit,
axios的二次封装，Ant-Design UI,mock.js数据模拟，echarts图表
项目搭建和路由配置，layout页面布局，菜单权限配置，用户列表页面，面包屑和菜单功能，
系统用户鉴权，组件封装和模块化。

技术栈：vue3全家桶+新特性，elementPlus电量智能监控系统，TypeScript
亮点：权限管理，权限配置，权限角色，数据可视化，高德地图，轨迹，动画等


:::