# 虚拟滚动

vue-virtual-scroller (vue的h用途，mitt、vue-observe-visibility、vue-resize配合使用，) 

不支持分页，一次传输所有数据，且接口响应时间长。

```md
Vue Mitt 是一个用于 Vue.js 的事件总线库，它基于 mitt（一个轻量级的 JavaScript 事件发射器/订阅器库）。
跨组件通信：允许 Vue 组件之间进行通信，而不需要直接的父子关系

```

## 核心思想

动态渲染：只渲染可视区域（Viewport）内的数据。
DOM 复用：滚动时复用已存在的 DOM 节点，仅更新内容。

## 使用场景

* 超过 1,000 条数据的表格/列表。
* 对滚动流畅性要求高的场景（如移动端）。
* 需要高频更新的实时数据展示。

## 检验

* 防抖函数不够合理，requestAnimationFrame
* 缓冲区，快速滑动有留白
* transform: translateY 或者  top
* scrollTo精确滚动
* :key="item.id"
* Performance 绘画帧，检验性能。在Chrome DevTools的Performance面板中检查滚动时的FPS是否稳定在60左右
* 打开F12，观察DOM元素的变化
* 向下滚动时用 Math.ceil：这会使得 start 跳跃式增加（比如从 10.1 → 11），导致渲染区域突然跳变，可能触发反向滚动，形成死循环。无论向上，还是向下，都使用Math.floor就好了。

## 初始版本

```js
<script setup lang="ts">
interface ListItem {
  id: string,
  name: string
}
import {onMounted, ref, computed} from 'vue';
const allListData = ref<ListItem[]>([]); // 所有的数据，比如这个数组存放了十万条数据
const itemHeight =  ref(50) // 每一条（项）的高度，比如40像素
const count =  ref(10); // 一屏展示几条数据
const buffer = ref(10); // 高频滚动的留白
const start = ref(0);
const end = ref(10)
const topVal = ref<string>('0')
const loading = ref(false);

const showListData = computed(() => {
    return allListData.value.slice(
      Math.max(0, start.value - buffer.value),
      Math.min(allListData.value.length, end.value + buffer.value)
    )
})

//当用户滚动列表时，期望内容 实时跟随滚动位置变化（即使略有延迟），而不是等到滚动停止才突然刷新。
// 如果使用防抖，用户在快速滚动时会看到 长时间空白（因为更新被延迟到滚动停止后），体验极差。
const virtualListWrap = ref()
const throttle = (fn: () => void, delay = 300) => {
  let ticking = false;
  return function(this: any, ...args: any[]) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this);
        ticking = false;
      });
      ticking = true;
    }
  };
  // let prev = 0;
  // return function() {
  //   let now = new Date().getTime();
  //   if (now - prev > delay) {
  //     fn();
  //     prev = new Date().getTime();
  //   }
  // }
}

const scrollEvent = () => {
  const scrollTop = virtualListWrap.value.scrollTop;
  start.value =  Math.floor(scrollTop/itemHeight.value)
  end.value = start.value + count.value
  // 滚动的位置
  const scrollPosition = start.value * itemHeight.value
  topVal.value = `translateY(${scrollPosition}px)`
  // 如果向上滑动，就抹平，否则就取整
  virtualListWrap.value.scrollTo({top: scrollPosition, behavior: 'smooth'})
  // topVal.value = virtualListWrap.value.scrollTop + 'px'
}

const handleScroll = throttle(scrollEvent, 300);

onMounted(() => {
    loading.value = true
    let temp: any[] = [];
    for(let i = 0; i < 1000; i++ ) {
        temp.push({name: `durant${i}${i}${i}${i}${i}`, id: Math.random()})
    }
    allListData.value = temp;
    loading.value = false
})
</script>

<template>
      <div
    class="virtualListWrap"
    ref="virtualListWrap"
    :style="{ height: itemHeight * count + 'px' }"
    @scroll="handleScroll"
  >
    <!--可弄骨架屏-->
    <div
      class="placeholderDom"
      :style="{ height: allListData.length * itemHeight + 'px' }"
    >
      骨架屏
    </div>
    <div class="contentList" :style="{ transform: topVal }">
      <!-- 每一条（项）数据 -->
      <div
        v-for="(item, index) in showListData"
        :key="item.id"
        class="itemClass"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="loadingBox" v-show="loading">
      <i class="el-icon-loading"></i>
      &nbsp;&nbsp;<span>loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 虚拟列表容器盒子
.virtualListWrap {
  box-sizing: border-box;
  width: 240px;
  border: solid 1px #000000;
  // 开启滚动条
  overflow-y: auto;
  // 开启相对定位
  position: relative;
  .contentList {
    width: 100%;
    // height: auto;
    // 搭配使用绝对定位
    position: absolute;
    top: 0;
    left: 0;
    .itemClass {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    // 奇偶行改一个颜色
    .itemClass:nth-child(even) {
      background: #c7edcc;
    }
    .itemClass:nth-child(odd) {
      background: pink;
    }
  }
  .loadingBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.64);
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
```

## 其他思路

### 分堆渲染

缺点：把没有在可视区的内容都渲染出来。

* 把所有数据进行切割，
* 通过递归 和 requestAnimationFrame，逐渐增加DOM

```js
<script setup lang="ts">
interface ListItem {
  id: string,
  name: string
}
import {onMounted, ref} from 'vue';
const allListData = ref<ListItem[]>([]); // 所有的数据，比如这个数组存放了十万条数据
const itemHeight =  ref(50) // 每一条（项）的高度，比如40像素
const count =  ref(10); // 一屏展示几条数据
const loading = ref(false);

function averageFn(arr: ListItem[]){
  let i = 0;
  let res = []
  while(i<arr.length){
    res.push(arr.slice(i,i+10))
    i = i+10
  }
  return res
};

onMounted(() => {
    loading.value = true

    let temp: any[] = [];
    for(let i = 0; i < 1000; i++ ) {
        temp.push({name: `durant${i}${i}${i}${i}${i}`, id: Math.random()})
    }
    const resArr = averageFn(temp)
    console.log("🚀 ~ onMounted ~ resArr:", resArr, resArr.length)
    const useArr = (page:number)=>{
      if(page > resArr.length -1){
        return 
      }
      requestAnimationFrame(()=>{
        // console.log(resArr, page)
        allListData.value = [...allListData.value,...resArr[page]]
        // console.log("🚀 ~ requestAnimationFrame ~ allListData.value:", allListData.value)
        page = page+1
        useArr(page)
      })
    }
    useArr(0)
    loading.value = false
})
</script>

<template>
      <div
    class="virtualListWrap"
    ref="virtualListWrap"
    :style="{ height: itemHeight * count + 'px' }"
  >
    <!--可弄骨架屏-->
    <div
      class="placeholderDom"
      :style="{ height: allListData.length * itemHeight + 'px' }"
    >
      骨架屏
    </div>
    <div class="contentList">
      <!-- 每一条（项）数据 -->
      <div
        v-for="(item, index) in allListData"
        :key="item.id"
        class="itemClass"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="loadingBox" v-show="loading">
      <i class="el-icon-loading"></i>
      &nbsp;&nbsp;<span>loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 虚拟列表容器盒子
.virtualListWrap {
  box-sizing: border-box;
  width: 240px;
  border: solid 1px #000000;
  // 开启滚动条
  overflow-y: auto;
  // 开启相对定位
  position: relative;
  .contentList {
    width: 100%;
    // height: auto;
    // 搭配使用绝对定位
    position: absolute;
    top: 0;
    left: 0;
    .itemClass {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    // 奇偶行改一个颜色
    .itemClass:nth-child(even) {
      background: #c7edcc;
    }
    .itemClass:nth-child(odd) {
      background: pink;
    }
  }
  .loadingBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.64);
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
```

### paddingTop+ 滚动到底部，追加数据。

```js
<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
interface ListItem {
  id: number,
  title: string,
  desc: string,
  origin: string,
  date: string
}
const allDataList = ref<ListItem[]>([]);
const loading = ref<boolean>(false);
const msg = ref<string>('');
const scrollContainer = ref();
const oneHeight = ref<number>(100);
// 当前容积最多放几个
const count = ref<number>(0);
// 开始索引
const startIndex = ref<number>(0);
const endIndex = computed(() => {
  return Math.min(startIndex.value + count.value, allDataList.value.length);
})
const showDataList = computed(() => {
  return allDataList.value.slice(startIndex.value, endIndex.value);
})
const blankFillStyle = computed(() => {
  return {
    paddingTop: startIndex.value * oneHeight.value + 'px',
    paddingBottom: (allDataList.value.length - endIndex.value) * oneHeight.value
  }
})
const getContainerSize = () => {
    count.value = Math.floor(scrollContainer.value.offsetHeight / oneHeight.value) + 2;
    console.log("🚀 ~ getContainerSize ~ count.value:", count.value)
}
const scrollFn = async() => {
  console.log(333);
  // 滚动完1条新闻，再管它。
  const currentIndex = Math.floor(scrollContainer.value.scrollTop / oneHeight.value);
  if (startIndex.value === currentIndex) return;
  startIndex.value = currentIndex;
  console.log("🚀 ~ handleScroll ~ startIndex.value:", startIndex.value)
  if (startIndex.value + count.value > allDataList.value.length - 1 && !loading.value) {
    const newList = await getList(20);
    if (!newList) return;
    allDataList.value = [...allDataList.value, ...newList];
  }
}
function throttleByAnimationFrame(fn: any) {
  let requestId:any = null;
  const throttled = function() {
    if (requestId === null) {
      requestId = requestAnimationFrame(() => {
        fn.apply(this, arguments);
        requestId = null;
      });
    }
  };
  // 添加取消方法
  throttled.cancel = () => {
    if (requestId) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  };

  return throttled;
}

const handleScroll = throttleByAnimationFrame(scrollFn);
// const handleScroll = scrollFn;
const getList: any = (num: number) => {
  const mockData: ListItem[] = [];
  for(let i = 0; i< num;i ++) {
      const obj = {
        id: Math.random(),
        title: "webpack",
        image: "1",
        desc: `静态模块打包工具${Math.random().toFixed(4)}`,
        origin: '构建工具',
        date: "2500-10-10"
      }
    mockData.push(obj)
  }
  loading.value = true;
  msg.value = '正在努力加载中...';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData);
      loading.value = false;
    }, 1000)
  })
}
onMounted(async() => {
  getContainerSize();
  window.onresize = getContainerSize;
  // window.orientationchange = getContainerSize;
  allDataList.value = await getList(20);
  // 接口报错， msg:网络开小差
})
</script>

<template>
<div class="news-box">
  <div class="scroll-container" ref="scrollContainer" @scroll.passive="handleScroll">
    <div :style="blankFillStyle">
      <div v-for="item in showDataList" :key="item.id">
        <!-- <router-link class="one-new" to="/article"></router-link> -->
        <a href="javascript:void(0);" class="new-box">
          <div class="new-left">
            <h3>{{ item.title }}</h3>
            <h4>{{ item.desc }}</h4>
            <h5>{{ item.date }} ???{{ allDataList.length }}</h5>
          </div>
          <div class="new-right">
                <img src="../assets/logo.svg" class="svg-box">
          </div>
        </a>
      </div>
    </div>
    <!--加载中-->
    <div class="loading-box" v-if="loading">
      <h2>{{ msg }}</h2>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.news-box{
  width: 500px;
  height: 100vh;
  .scroll-container{
    height: 100%;
    width: 100%;
    overflow-y: auto;
    .new-box{
      height:100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 2px gray;
      box-sizing: border-box;
    }
  }
}
.svg-box{
  width: 20px;
  height: 20px;
}
.loading-box{
  text-align: center;
  padding:20px;
}
</style>
```

### IntersectionObserver

在 JavaScript 中，用于检测元素是否进入或离开视口（Viewport）的主要 API 是 Intersection Observer API（交叉观察器 API）。

对比传统方法（scroll 事件 + getBoundingClientRect）
性能更优：避免主线程频繁计算布局3。
更易用：无需手动计算元素位置2。

```js
```

## 所有方案对比

维度	分块渲染（当前代码）	虚拟滚动（之前实现）
数据加载	分批次加载数据（如每次10条）	仅加载可视区域数据 + 少量缓冲
DOM 数量	累计加载的所有数据都会渲染成DOM	只渲染可视区域附近的DOM（固定数量）
滚动行为	依赖浏览器原生滚动	通过 translateY 模拟滚动，动态更新DOM内容
内存占用	随数据加载线性增长	恒定（与数据总量无关）
适用数据量	中小型数据集（< 1万条）	大型数据集（> 1万条）

指标	分块渲染	虚拟滚动
首次渲染时间	50ms	20ms
滚动流畅度	60 FPS	60 FPS
内存占用	较高（逐步增长）	低（稳定）
极限数据量支持	≤ 5000条	≥ 10万条

## 优化

* 使用requestAnimationFrame 动画帧方法来实现节流的效果。

```js

// arguments.callee: // 它指向当前正在执行的函数本身
// 替代方案

const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
```

* 移动端：scroll.passive =>  touchmove.passive & mousewheel
* 低端手机，快速滚动出现白屏

## 其他生态库

* vue-virtual-scroller
* vue-virtual-scroll-grid
* vueuc/VVirtualList