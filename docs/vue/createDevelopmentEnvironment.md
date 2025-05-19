# 创建开发环境

## 熟练

* pnpm + workspace: 多包架构

::: details

<!-- * npm install pnpm -g : 在全局安装pnpm -->
* shamefully-hoist: 为true，会将其扁平化，官网不建议，实践出现幽灵依赖，还不好解决

```md
扁平化代价：重复安装相同依赖时会占用更多空间，失去 pnpm 的核心优势。

// 不使用 羞耻的提升，这么玩。
import {reactive} from '../../../node_modules/.pnpm/@vue+reactivity@3.4.23/node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'
// import {reactive} from './reactivity.js';
console.log("🚀 ~ reactive:", reactive)
``` 

* -w / -workspace: 根目录
```md
创建pnpm-workspace.yaml，内容如下

packages:
  - "packages/*"
```

* 子包间互装 依赖 **pnpm install @vue/shared --workspace --filter @vue/reactivity** 

:::

* typescript: tsconfig.json，子包间互相引用

::: details

```json
{
  "compilerOptions": {
    "outDir": "dist", // 输出的目录
    "sourceMap": true, // 采用sourcemap
    "target": "es2016", // 目标语法
    "module": "esnext", // 模块格式
    "moduleResolution": "node", // 模块解析方式
    "strict": false, // 严格模式
    "resolveJsonModule": true, // 解析json模块
    "esModuleInterop": true, // 允许通过es6语法引入commonjs模块
    "jsx": "preserve", // jsx 不转义
    "lib": ["esnext", "dom"], // 支持的类库 esnext及dom
    "baseUrl": ".", // 和paths结合，做到包与包之间，可以更好地引用
    "paths": {
      "@vue/*": ["packages/*/src"]
    }
  }
}
```

:::

* esbuild: 开发环境中优秀的构建工具

::: details

构建脚本："dev": "node scripts/dev.js compiler-core -f esm"

```js
// 这个文件会帮我们打包 packages下的模块， 最终打包出js文件

// node dev.js （要打包的名字 -f 打包的格式） === argv.slice(2)

import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import esbuild from "esbuild";
// node中的命令函参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2));

// esm 使用commonjs 变量
const __filename = fileURLToPath(import.meta.url); // 获取文件的绝对路径 file: -> /usr
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const target = args._[0] || "reactivity"; // 打包哪个项目
const format = args.f || "iife"; // 打包后的模块化规范

// 入口文件 根据命令行提供的路径来进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);
// 根据需要进行打包

console.log(resolve(__dirname, `../packages/${target}/dist/${target}.js`));
esbuild
  .context({
    entryPoints: [entry], // 入口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 出口
    bundle: true, // reactivity -> shared  会打包到一起
    platform: "browser", // 打包后给浏览器使用
    sourcemap: true, // 可以调试源代码
    format, // cjs esm iife
    globalName: pkg.buildOptions?.name,
  })
  .then((ctx) => {
    console.log("start dev");
    return ctx.watch(); // 监控入口文件持续进行打包处理
  });
```

:::

* node的能力

::: details

* minimist: 命令行参数（输出格式为结构化对象）
* process.argv(命令行参数,输出格式为原始数组)，通常是将 process.argv.slice(2) 传递给 minimist 进行解析

:::
