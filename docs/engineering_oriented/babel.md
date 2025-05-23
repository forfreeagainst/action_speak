# babel


```js
import { parse } from '@babel/parser'

const content = readFileSync(file, 'utf-8')
const ast = parse(content, {
    plugins: ['typescript'],
    sourceType: 'module',
})
```