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
import bulkUI from 'bulk-ui'
import 'bulk-ui/dist/style.css'
app.use(bulkUI)
```

### Loading组件
```javascript
import { bulkLoading } from 'bulk-ui'
let loading = bulkLoading({msg: '拼命加载中'})
setTimeout(() => {
  loading.close(() => {
    console.log('关闭')
  })
}, 2000)
```

### picture-player组件
```html
<bulk-picture-player ref="imgPlayer" />
```
```javascript
const imgs = ref([
  'https://files.catbox.moe/9svvu5.jpg', 
  'https://files.catbox.moe/9svvu5.jpg', 
  'https://files.catbox.moe/9svvu5.jpg' 
])
const imgPlayer = ref(null)
const openImgPlayer = () => {
  imgPlayer.value.install({imgs:imgs.value,index:1})
}
```
