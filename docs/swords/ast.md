# ast

## ast是什么



## ast应用

### babel

```js
import { parse } from '@babel/parser'

const content = readFileSync(file, 'utf-8')
const ast = parse(content, {
    plugins: ['typescript'],
    sourceType: 'module',
})
```
