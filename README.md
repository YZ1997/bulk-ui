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


### button组件
```html
<!-- 普通调用 -->
<bulk-button>按钮</bulk-button>
<!-- 按钮的左侧部分无预设样式，自由度高，可随意填充内容，如icon，单选框，复选框 -->
<!-- icon&文字 -->
<bulk-button>
  <template #left>
    <div style="padding-left: 10px;">
      <img style="display: block;width: 16px;height: 16px;margin-right: -8px;"  src="https://gitee.com/wuyizhou/photo-bed/raw/master/1728964708349success.png">
    </div>
  </template>
  按钮
</bulk-button>
<!-- 纯icon -->
<bulk-button iconButton>
  <template #left>
    <div style="padding: 5px 8px;">
      <img style="display: block;width: 12px;height: 12px;" src="https://gitee.com/wuyizhou/photo-bed/raw/master/1728964708349success.png">
    </div>
  </template>
</bulk-button>
```
#### button组件属性
| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 按钮类型 | String | primary |
| size | 按钮大小 | String | normal |
| loading | 是否加载中 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| iconButton | 是否为纯图标按钮 | Boolean | false |
| boderButton | 是否为边框按钮 | Boolean | false |
| width | 按钮宽度 | String | 'auto' |
| height | 按钮高度 | String | 'auto' |
| border | 按钮边框 | String | '' |
| background | 按钮背景 | String | '' |
| color | 按钮文字颜色 | String | '' |


### sms-button组件(基于button组件，获取短信验证码)
```html
<!-- 普通调用 -->
<bulk-sms-button :request="getCode" :cd="120" />
```
```javascript
const getCode = () => {
  return new Promise((resolve, reject) => {
    fetch('url')
    .then(response => response.json())
    .then(data => {
      resolve(true)
      // --处理返回数据--
    })
    .catch(error => {
      reject(error)
    })
  })
}
```
#### sms-button组件属性
| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| request | 获取验证码请求函数,需返回Promise | Function | - |
| cd | 倒计时时间，单位：s | Number | 60 |



### debounc-button组件(基于button组件，节流按钮，防止重复点击)
```html
<!-- 普通调用 -->
<bulk-debounc-button :request="submit">提交</bulk-debounc-button>
```
```javascript
const submit = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    },3000)
  })
}
```
#### sms-button组件属性
| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| request | 操作请求函数,需返回Promise | Function | - |



### Loading组件（加载组件）
```javascript
import { bulkLoading } from 'bulk-ui'
let loading = bulkLoading({msg: '拼命加载中'})
setTimeout(() => {
  loading.close(() => {
    console.log('关闭')
  })
}, 2000)
```




### picture-player组件（图片播放器）
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



### clipping-tool组件（裁剪工具）
```html
<bulk-clipping-tool ref="clippingImg" :width="width" :height="height" @confirm="getImgUrl" />
```
```javascript
const imgUrl = ref('https://files.catbox.moe/9svvu5.jpg')
const clippingImg = ref(null)
// 初始化裁剪工具
clippingImg.value.install(imgUrl)
const getImgUrl = (url) => {
  // url 为裁剪后的图片地址
}
```
#### clipping-tool组件属性
| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| width | 裁剪图片目标宽度 | Number | 300 |
| height | 裁剪图片目标高度 | Number | 300 |
#### clipping-tool组件方法
| 方法名 | 说明 | 传入参数 | 调用方法 |
| ---- | ---- | ---- | ---- |
| confirm | 确认裁剪，在这获取裁剪后的图片 | url | @confirm回调 |
| install | 初始化裁剪工具 | url | ref调用 |




### picture-clipping组件（完整裁剪工具，集成选取图片）
```html
<bulk-picture-clipping ref="imgClipping" value="裁剪图片" @confirm="getImg" />
<img :src="imgUrl" alt="">
```
```javascript
const imgUrl = ref('')
const getImg = (data) => {
  // url 为裁剪后的图片地址
  imgUrl.value = data
}
```
#### picture-clipping组件属性
| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| value | 选取图片按钮文案 | String | '选取图片' |
| width | 裁剪图片目标宽度 | Number | 300 |
| height | 裁剪图片目标高度 | Number | 300 |

#### picture-clipping组件方法
| 方法名 | 说明 | 传入参数 | 调用方法 |
| ---- | ---- | ---- | ---- |
| confirm | 确认裁剪，在这获取裁剪后的图片 | url | @confirm回调 |
