# sortable可排序的

vue-draggable-plus 拖拽Multirepo（vite打包，vue2+vue3+vue-demi兼容处理，vue3 + TypeScript）

vue-draggable-next: Vue3

https://form.making.link/docs/guide/v3/getting-started.html

https://lowcode-engine.cn/index

https://github.com/alibaba/lowcode-engine

## 技术选型考量

* 原生Drag API痛点：需手动实现排序逻辑、跨容器交互复杂、无动画支持。现代浏览器支持，但移动端兼容性较差	
* vue-draggable-next：下载量 341k+， Github Stars 52k+， Unpacked Size 585 kB
* vue-draggable-plus：下载量 328k+， Github Stars 3.5k+， Unpacked Size 213 kB

## sortablejs

```md

构建工具：vite
```

## Vue-dragable-plus

| 功能 | Sortable.js原生实现 | vue-draggable-plus封装增强 |
| --- | --- | --- |
| 数据绑定 | 需手动监听事件更新数据 | 自动同步拖拽后的数据到v-model |
| 虚拟 DOM 兼容 | 直接操作真实 DOM, 可能和 Vue 渲染冲突 | 适配 Vue 的虚拟 DOM diff 机制，避免渲染问题 |

* useDraggable: 基于sortablejs，那我就先研究这个
* directive: 基于useDraggable
* components: 基于useDraggable

### 如何理解源码手动操作DOM

* insertNodeAt/removeNode 的作用：在拖拽过程中提供即时视觉反馈，属于必要的性能优化手段。
* Vue 的协作方式：通过最终同步到响应式数据，保证 UI 与数据的长期一致性。
* 设计哲学：在特定性能敏感场景下，合理的手动 DOM 操作是 Vue 官方允许的模式（参考 Transition 组件的实现）。

### package.json

```json
{
    sideEffects: false, // 没有副作用的
    // 这是一个条件导出（Conditional Exports）的配置，它能根据不同的模块系统和使用场景提供不同的入口文件
    "exports": {
        ".": {
        "import": {
            "types": "./dist/index.d.ts",
            "default": "./dist/vue-draggable-plus.js"
        },
        "require": {
            "types": "./dist/index.d.ts",
            "default": "./dist/vue-draggable-plus.cjs"
        },
        "default": "./dist/vue-draggable-plus.umd.cjs"
        }
    },
    "scripts": {
        // vitepress dev .docs --host：用 VitePress 启动 .docs 目录的开发服务器，并允许外部访问（--host）
        "dev": "initial-scan docs && vitepress dev .docs --host",
        // 使用 Vite 构建生产环境代码
        "build": "vite build",
        // npm-run-all：一个可以顺序运行多个 npm 脚本的工具
        "build:lib": "npm-run-all lint build", // 先lint, 后build
        // 执行对应的Node脚本，拷贝文档
        "copy:docs": "node scripts/copy-docs.cjs",
        // cross-env NODE_ENV=production：设置环境变量 NODE_ENV=production（跨平台兼容）
        // vitepress build .docs：用 VitePress 构建 .docs 目录的生产版本
        "docs:build": "initial-scan docs && cross-env NODE_ENV=production && npm run copy:docs && vitepress build .docs",
        // vitepress serve .docs --host：启动一个本地服务器预览构建好的文档，并允许外部访问
        "serve": "cross-env NODE_ENV=production vitepress serve .docs --host",
        // 对 src 目录下所有 .ts 文件进行代码规范检查
        "lint": "eslint src/**/*.ts",
        "lint-fix": "pnpm lint --fix",
        // np 是一个流行的 npm 发布工具，可以交互式地完成版本号升级、Git 打标签、发布到 npm 等操作
        // 运行后会提示选择版本号（patch/minor/major），然后自动执行测试、构建、发布流程
        "release": "np"
    },
    // sortablejs 是 devDependencies：因为它只是前端库，由构建工具打包，不直接影响 Node.js 运行时。
    // @types/sortablejs 是 dependencies：可能是因为服务端代码或构建过程依赖它的类型定义
    //（否则应该也放在 devDependencies）。
}
```

## 其他拖拽方案

* mouseup
* 

## 临时代码

::: details

```js
import Sortable, { type Options, type SortableEvent } from 'sortablejs'
import {
  getCurrentInstance,
  isRef,
  onMounted,
  onUnmounted,
  unref,
  nextTick,
  watch,
  type Ref
} from 'vue-demi'
import type { Fn, RefOrElement, MaybeRef } from './types'

import { error } from './utils/log'

import {
  extend,
  forEachObject,
  getElementBySelector,
  insertElement,
  insertNodeAt,
  isHTMLElement,
  isOn,
  isString,
  isUndefined,
  mergeOptionsEvents,
  moveArrayElement,
  removeElement,
  removeNode
} from './utils'

function defaultClone<T>(element: T): T {
  if (element === undefined || element === null) return element
  return JSON.parse(JSON.stringify(element))
}

/**
 * copied from vueuse: https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnUnmounted/index.ts
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 * @param fn
 */
function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn)
}

/**
 * copied from vueuse:https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnMounted/index.ts
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 * @param fn
 */
function tryOnMounted(fn: Fn) {
  if (getCurrentInstance()) onMounted(fn)
  else nextTick(fn)
}

let data: any = null
let clonedData: any = null

function setCurrentData(
  _data: typeof data = null,
  _clonedData: typeof data = null
) {
  data = _data
  clonedData = _clonedData
}

function getCurrentData() {
  return {
    data,
    clonedData
  }
}

const CLONE_ELEMENT_KEY = Symbol('cloneElement')

export interface DraggableEvent<T = any> extends SortableEvent {
  item: HTMLElement & { [CLONE_ELEMENT_KEY]: any }
  data: T
  clonedData: T
}
type SortableMethod = 'closest' | 'save' | 'toArray' | 'destroy' | 'option'

export interface UseDraggableReturn extends Pick<Sortable, SortableMethod> {
  /**
   * Start the sortable.
   * @param {HTMLElement} target - The target element to be sorted.
   * @default By default the root element of the VueDraggablePlus instance is used
   */
  start: (target?: HTMLElement) => void
  pause: () => void
  resume: () => void
}

export interface UseDraggableOptions<T> extends Options {
  clone?: (element: T) => T
  immediate?: boolean
  customUpdate?: (event: SortableEvent) => void
}

/**
 * A custom compositionApi utils that allows you to drag and drop elements in lists.
 * @param el
 * @param {Array} list - The list to be dragged
 * @param {Object} options - The options of the sortable
 * @returns {Object} - The return of the sortable
 */
export function useDraggable<T>(
  el: RefOrElement,
  list?: Ref<T[] | undefined>,
  options?: MaybeRef<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: null | undefined,
  list?: Ref<T[] | undefined>,
  options?: MaybeRef<UseDraggableOptions<T>>
): UseDraggableReturn
export function useDraggable<T>(
  el: RefOrElement<HTMLElement | null | undefined>,
  options?: MaybeRef<UseDraggableOptions<T>>
): UseDraggableReturn

/**
 * A custom compositionApi utils that allows you to drag and drop elements in lists.
 * @param {Ref<HTMLElement | null | undefined> | string} el
 * @param {Ref<T[]>} list
 * @param {MaybeRef<UseDraggableOptions<T>>} options
 * @returns {UseSortableReturn}
 */
export function useDraggable<T>(...args: any[]): UseDraggableReturn {
  const vm = getCurrentInstance()?.proxy
  let currentNodes: Node[] | null = null
  const el = args[0]
  let [, list, options] = args

  if (!Array.isArray(unref(list))) {
    options = list
    list = null
  }

  let instance: Sortable | null = null
  const {
    immediate = true,
    clone = defaultClone,
    customUpdate
  } = unref(options) ?? {}

  /**
   * Element dragging started
   * @param {DraggableEvent} evt - DraggableEvent
   */
  function onStart(evt: DraggableEvent) {
    const { from, oldIndex, item } = evt
    currentNodes = Array.from(from.childNodes)
    const data = unref(unref(list)?.[oldIndex!])
    const clonedData = clone(data)
    setCurrentData(data, clonedData)
    item[CLONE_ELEMENT_KEY] = clonedData
  }

  /**
   * Element is dropped into the list from another list
   * @param {DraggableEvent} evt
   */
  function onAdd(evt: DraggableEvent) {
    const element = evt.item[CLONE_ELEMENT_KEY]
    if (isUndefined(element)) return
    removeNode(evt.item)
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      list.value = insertElement(newList, evt.newDraggableIndex!, element)
      return
    }
    insertElement(unref(list), evt.newDraggableIndex!, element)
  }

  /**
   * Element is removed from the list into another list
   * @param {DraggableEvent} evt
   */
  function onRemove(evt: DraggableEvent) {
    const { from, item, oldIndex, oldDraggableIndex, pullMode, clone } = evt
    insertNodeAt(from, item, oldIndex!)
    if (pullMode === 'clone') {
      removeNode(clone)
      return
    }
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      list.value = removeElement(newList, oldDraggableIndex!)
      return
    }
    removeElement(unref(list), oldDraggableIndex!)
  }

  /**
   * Changed sorting within list
   * @param {DraggableEvent} evt
   */
  function onUpdate(evt: DraggableEvent) {
    if (customUpdate) {
      customUpdate(evt)
      return
    }
    const { from, item, oldIndex, oldDraggableIndex, newDraggableIndex } = evt
    removeNode(item)
    insertNodeAt(from, item, oldIndex!)
    if (isRef<any[]>(list)) {
      const newList = [...unref(list)]
      list.value = moveArrayElement(
        newList,
        oldDraggableIndex!,
        newDraggableIndex!
      )
      return
    }
    moveArrayElement(unref(list), oldDraggableIndex!, newDraggableIndex!)
  }

  function onEnd(e: DraggableEvent) {
    const { newIndex, oldIndex, from, to } = e
    let error: Error | null = null
    const isSameIndex = newIndex === oldIndex && from === to
    try {
      //region #202
      if (isSameIndex) {
        let oldNode: Node | null = null
        currentNodes?.some((node, index) => {
          if (oldNode && currentNodes?.length !== to.childNodes.length) {
            from.insertBefore(oldNode, node.nextSibling)
            return true
          }
          const _node = to.childNodes[index]
          oldNode = to?.replaceChild(node, _node)
        })
      }
      //endregion
    } catch (e) {
      error = e
    } finally {
      currentNodes = null
    }
    nextTick(() => {
      setCurrentData()
      if (error) throw error
    })
  }

  /**
   * preset options
   */
  const presetOptions: UseDraggableOptions<T> = {
    onUpdate,
    onStart,
    onAdd,
    onRemove,
    onEnd
  }

  function getTarget(target?: HTMLElement) {
    const element = unref(el) as any
    if (!target) {
      target = isString(element)
        ? getElementBySelector(element, vm?.$el)
        : element
    }
    // @ts-ignore
    if (target && !isHTMLElement(target)) target = target.$el

    if (!target) error('Root element not found')
    return target
  }

  function mergeOptions() {
    // eslint-disable-next-line
    const { immediate, clone, ...restOptions } = unref(options) ?? {}

    forEachObject(restOptions, (key, fn) => {
      if (!isOn(key)) return
      restOptions[key] = (evt: DraggableEvent, ...args: any[]) => {
        const data = getCurrentData()
        extend(evt, data)
        return fn(evt, ...args)
      }
    })

    return mergeOptionsEvents(
      list === null ? {} : presetOptions,
      restOptions
    ) as Options
  }

  const start = (target?: HTMLElement) => {
    target = getTarget(target)
    if (instance) methods.destroy()

    instance = new Sortable(target as HTMLElement, mergeOptions())
  }

  watch(
    () => options,
    () => {
      if (!instance) return
      forEachObject(mergeOptions(), (key, value) => {
        // @ts-ignore
        instance?.option(key, value)
      })
    },
    { deep: true }
  )

  const methods = {
    option: (name: keyof Options, value?: any) => {
      // @ts-ignore
      return instance?.option(name, value)
    },
    destroy: () => {
      instance?.destroy()
      instance = null
    },
    save: () => instance?.save(),
    toArray: () => instance?.toArray(),
    closest: (...args) => {
      // @ts-ignore
      return instance?.closest(...args)
    }
  } as Pick<Sortable, SortableMethod>

  const pause = () => methods?.option('disabled', true)
  const resume = () => methods?.option('disabled', false)

  tryOnMounted(() => {
    immediate && start()
  })

  tryOnUnmounted(methods.destroy)

  return { start, pause, resume, ...methods }
}
```

:::