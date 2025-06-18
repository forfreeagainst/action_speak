# canvas

## 简单学习API

```js
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const canvas = ref()
onMounted(() => {
    // 获取绘制上下文
    const ctx = canvas.value.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.font = "36px serif";
    ctx.fillText("My name is Mary Alice Young", 100, 200);
    // canvas是位图，需要处理缩放的问题，很多 图画 * 2 或者 * 3
    // svg 是矢量图
    // 如何获取浏览器设备的像素比
    console.log(window.devicePixelRatio) // 2
    
    ctx.closePath();
})
</script>
<template>
    <canvas ref="canvas" class="canvas-box" width="600" height="500"></canvas>
</template>

<style lang="scss" scoped>
.canvas-box {
    width: 300px;
    height: 250px;
}
</style>
```

## 可视化

### 选型

* echarts: ECharts ≈ ZRender + 图表封装 + 交互配置
* zrender
* d3

```md
特性	ECharts	ZRender	D3.js
底层技术	Canvas (默认) / SVG	纯 Canvas	SVG (主) / Canvas
抽象层级	高级（封装图表）	中级（图形元素）	低级（DOM/SVG 操作）
学习曲线	低	中	高
适用场景	快速构建标准图表	自定义 Canvas 图形	高度定制化可视化
矢量图形支持	✅ (SVG 渲染器)	❌ (仅 Canvas)	✅ (原生 SVG)
典型用例	仪表盘、报表	游戏、自定义动画	科研可视化、交互式地图

vue-echarts = ECharts + Vue 组件化封装，简化了在 Vue 中的使用。

Three.js 的核心渲染技术
渲染方式	底层技术	适用场景	性能特点
WebGLRenderer（默认）	WebGL（GPU 加速）	3D 图形、复杂场景	高性能，支持光照、阴影等高级特效
CanvasRenderer	HTML5 Canvas 2D	兼容模式（无 WebGL 时）	纯 CPU 渲染，性能较低，仅支持基础 3D 图形
SVGRenderer	SVG 矢量图形	简单 2D/3D 图形	分辨率无关，但性能最差
CSS3DRenderer	CSS3 变换	3D UI 元素（如标签）	适合与 DOM 结合的混合渲染


1. 大数据量下拉框怎么优化
  1. 滚动加载、虚拟列表
  2. 搜索，可能会需要借助接口（缓存【小数据就存内存】、【大数据量 indexedDB】）
2. 大数据量具体优化的深度思路
  1. 数据是大量的
  2. 渲染是少量
  3. 所以我们所做的所有优化工作都是想办法将大数据量中的需要渲染数据臻选出来
3. 图表导出逻辑
  1. 就是使用截图方案
  2. https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
  3.  canvas.toDataURL("image/png");
```

### echarts

```md
. 如果不使用 van-touch-emulator 会怎样？
桌面浏览器无法测试触摸逻辑：

双指缩放等功能只能在真机上测试，开发效率低。

需要写两套事件监听：

分别处理 mouse 和 touch 事件，代码冗余。


如果不想使用 van-touch-emulator，也可以：

直接使用真机调试。

手动监听鼠标事件并转换为触摸事件：

javascript
// 示例：模拟 touch 事件
element.addEventListener('mousedown', (e) => {
  const touchEvent = new TouchEvent('touchstart', {
    touches: [e],
  });
  element.dispatchEvent(touchEvent);
});
但这种方式实现复杂，不如 van-touch-emulator 封装完善。
```

npm install echarts vue-echarts vant @vant/touch-emulator

```js
<template>
  <div class="stock-chart-container">
    <!-- 使用 Vant 的触摸容器 -->
    <van-touch-emulator>
      <div ref="chartContainer" class="chart-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
        <v-chart class="chart" :option="chartOption" autoresize />
      </div>
    </van-touch-emulator>
    
    <!-- 工具栏 -->
    <div class="toolbar">
      <van-button type="primary" size="small" @click="zoomIn">放大</van-button>
      <van-button type="primary" size="small" @click="zoomOut">缩小</van-button>
      <van-button type="primary" size="small" @click="resetZoom">重置</van-button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  DataZoomComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { Button as VanButton } from 'vant';

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  DataZoomComponent,
  TooltipComponent,
  TitleComponent
]);

export default {
  components: {
    VChart,
    VanButton
  },
  setup() {
    const chartOption = ref({
      title: {
        text: '股票价格走势',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const date = params[0].axisValue;
          const value = params[0].data;
          return `日期: ${date}<br/>价格: ${value}`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [] // 初始为空，后面会填充
      },
      yAxis: {
        type: 'value',
        scale: true
      },
      series: [
        {
          name: '股价',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(58, 77, 233, 0.8)' },
              { offset: 1, color: 'rgba(58, 77, 233, 0.1)' }
            ])
          },
          lineStyle: {
            width: 2
          },
          data: [] // 初始为空，后面会填充
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
          zoomOnMouseWheel: false // 禁用鼠标滚轮，使用触摸手势
        },
        {
          type: 'slider',
          start: 0,
          end: 100
        }
      ]
    });

    // 模拟股票数据
    const generateStockData = () => {
      const dates = [];
      const prices = [];
      const basePrice = 100;
      const now = new Date();
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
        
        // 模拟价格波动
        const price = basePrice + Math.random() * 20 - 10;
        prices.push(price.toFixed(2));
      }
      
      return { dates, prices };
    };

    // 初始化图表数据
    const initChartData = () => {
      const { dates, prices } = generateStockData();
      chartOption.value.xAxis.data = dates;
      chartOption.value.series[0].data = prices;
    };

    // 手势缩放相关变量
    const touchStartX = ref(0);
    const touchStartY = ref(0);
    const chartContainer = ref(null);

    // 处理触摸开始事件
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        touchStartX.value = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
        touchStartY.value = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
      }
    };

    // 处理触摸移动事件
    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const currentX = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
        const currentY = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
        
        // 计算缩放比例
        const scaleX = currentX / touchStartX.value;
        const scaleY = currentY / touchStartY.value;
        const scale = (scaleX + scaleY) / 2;
        
        // 根据手势缩放图表
        if (scale > 1.1) {
          zoomOut();
        } else if (scale < 0.9) {
          zoomIn();
        }
        
        // 更新起始位置
        touchStartX.value = currentX;
        touchStartY.value = currentY;
      }
    };

    // 放大
    const zoomIn = () => {
      const dataZoom = chartOption.value.dataZoom[0];
      const range = dataZoom.end - dataZoom.start;
      const newRange = range * 0.8; // 缩小20%
      const center = (dataZoom.start + dataZoom.end) / 2;
      
      chartOption.value.dataZoom[0].start = Math.max(0, center - newRange / 2);
      chartOption.value.dataZoom[0].end = Math.min(100, center + newRange / 2);
      chartOption.value.dataZoom[1].start = chartOption.value.dataZoom[0].start;
      chartOption.value.dataZoom[1].end = chartOption.value.dataZoom[0].end;
      
      // 触发更新
      chartOption.value = { ...chartOption.value };
    };

    // 缩小
    const zoomOut = () => {
      const dataZoom = chartOption.value.dataZoom[0];
      const range = dataZoom.end - dataZoom.start;
      const newRange = Math.min(100, range * 1.2); // 放大20%
      const center = (dataZoom.start + dataZoom.end) / 2;
      
      chartOption.value.dataZoom[0].start = Math.max(0, center - newRange / 2);
      chartOption.value.dataZoom[0].end = Math.min(100, center + newRange / 2);
      chartOption.value.dataZoom[1].start = chartOption.value.dataZoom[0].start;
      chartOption.value.dataZoom[1].end = chartOption.value.dataZoom[0].end;
      
      // 触发更新
      chartOption.value = { ...chartOption.value };
    };

    // 重置缩放
    const resetZoom = () => {
      chartOption.value.dataZoom[0].start = 0;
      chartOption.value.dataZoom[0].end = 100;
      chartOption.value.dataZoom[1].start = 0;
      chartOption.value.dataZoom[1].end = 100;
      chartOption.value = { ...chartOption.value };
    };

    onMounted(() => {
      initChartData();
    });

    return {
      chartOption,
      chartContainer,
      handleTouchStart,
      handleTouchMove,
      zoomIn,
      zoomOut,
      resetZoom
    };
  }
};
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  height: 400px;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 350px;
  touch-action: none;
}

.chart {
  width: 100%;
  height: 100%;
}

.toolbar {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
</style>
```

## 虚拟表格

```md
1. 分页， 滚动底部加载更多
2. 虚拟表格（列表）vue-virtual-scroller
3. canvas table，因为画布性能好，它的性能瓶颈取决于你的绘图算法。
直接渲染，卡死
```

```js
<script setup lang="ts">
import { ref } from 'vue';
const data = ref<any>({
    columns: [
        {key: 'name',title: '名字', width: 100},
        {key:'age', title: '年龄', width: 100}
    ],
    dataSource: Array.from({length: 100_000}).map((item, index) => ({
        key: index,
        name: `name-${index}`,
        age: ~~(Math.random() * 100)
    }))
})
</script>
<template>
    <table>
        <thead>
            <tr>
                <th v-for="column in data.columns" :key="column.key"> {{ column.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data.dataSource" :key="row.key">
                <td v-for="column in data.columns" :key="column.key">{{row[ column.key ]}}</td>
            </tr>
        </tbody>
    </table>
</template>
```

### canvasTable

```js
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const canvas = ref()
const pixelRatio = 2;
const handleClick = (e) => {
    const {left, top} = canvas.value.getBoundingClientRect();
    const x = e.clientX - left;// 相对于画布左边的距离
    const y = e.clientY - top;
    console.log(x, y)
}

onMounted(() => {
    canvas.value.addEventListener('click', handleClick)
    // 获取绘制上下文
    const ctx = canvas.value.getContext('2d');

    ctx.beginPath();
    ctx.closePath();
})
onUnmounted(() => {
    canvas.value.removeEventListener('click');
})
</script>
<template>
    <canvas ref="canvas" class="canvas-box" width="600" height="500"></canvas>
</template>

<style lang="scss" scoped>
.canvas-box {
    background-color: skyblue;
    width: 300px;
    height: 250px;
}
</style>
```

## canvas 渲染很多数据，很卡怎么优化

### 将静态元素与动态元素分离渲染，减少重复绘制：

```js
// 创建多个Canvas分层
const staticCanvas = document.createElement('canvas');
const dynamicCanvas = document.createElement('canvas');

// 静态层只渲染一次
function renderStaticLayer() {
  const ctx = staticCanvas.getContext('2d');
  // 绘制背景、网格等不变元素
}

// 动态层频繁更新
function renderDynamicLayer(data) {
  const ctx = dynamicCanvas.getContext('2d');
  ctx.clearRect(0, 0, width, height); // 只清除动态内容
  // 绘制点、线等动态数据
}
```

### 视口渲染

###  批量绘制与 requestAnimationFrame

```js
let frameRequested = false;
let dataToDraw = [];

function enqueueDraw(item) {
  dataToDraw.push(item);
  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(drawAll);
  }
}

function drawAll() {
  // 批量绘制所有待处理数据
  dataToDraw.forEach(item => drawItem(item));
  dataToDraw = [];
  frameRequested = false;
}
```

### 硬件加速

利用 CSS transform 触发 GPU 加速：

```css
canvas {
  transform: translateZ(0);
  will-change: transform;
}
```
