# bulk-ui

学习整理自用组件库

## 下载

```sh
npm install bulk-ui
```

## 使用

### 引入样式
```javascript
//main.js
import 'bulk-ui/dist/style.css'
```

### 引入组件并使用
```javascript
//需要使用的页面
import { bulkLoading } from 'bulk-ui'
let loading = bulkLoading({msg: '拼命加载中'})
setTimeout(() => {
  loading.close(() => {
    console.log('关闭')
  })
}, 2000)
```
