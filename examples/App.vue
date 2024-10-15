<template>

  <!-- <div>
    <input type="button" value="图片预览" @click="openImgPlayer">
  </div>
  <bulk-picture-player ref="imgPlayer" /> -->

  <!-- <bulk-picture-clipping ref="imgClipping" value="裁剪图片" @confirm="getImg" />
  <img :src="imgUrl" alt=""> -->
  <bulk-button>
    <template #left>
      <div style="padding-left: 10px;">
        <img style="display: block;width: 16px;height: 16px;margin-right: -8px;" src="https://gitee.com/wuyizhou/photo-bed/raw/master/1728964708349success.png">
      </div>
    </template>
    icon&文字
  </bulk-button>
  <bulk-button iconButton>
    <template #left>
      <div style="padding: 5px 8px;">
        <img style="display: block;width: 12px;height: 12px;" src="https://gitee.com/wuyizhou/photo-bed/raw/master/1728964708349success.png">
      </div>
    </template>
  </bulk-button>
  <bulk-debounc-button :request="submit">提交</bulk-debounc-button>
  <bulk-sms-button :request="getCode" :cd="120"></bulk-sms-button>
</template>

<script setup>
import { ref } from 'vue'
// ------bulk-loading------
// import { bulkLoading } from 'bulk-ui'
// import { bulkLoading } from '../packages'
// let loading = bulkLoading({msg: '拼命加载中'})
// setTimeout(() => {
//     loading.close(() => {
//       let loading2 = bulkLoading({msg: '客官稍等'})
//     })
//   }, 2000)
// ------bulk-picture-player------
// const imgs = ref([
//   'https://files.catbox.moe/9svvu5.jpg', 
//   'https://gitee.com/wuyizhou/photo-bed/raw/master/172586024600920200811120122909.jpg', 
//   'https://gitee.com/wuyizhou/photo-bed/raw/master/1725849881998%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230110153902.jpg'
// ])
// const imgPlayer = ref(null)
// const openImgPlayer = () => {
//   imgPlayer.value.install({imgs:imgs.value,index:1})
// }
// ------bulk-picture-clipping------
// const imgUrl = ref('')
// const getImg = (data) => {
//   imgUrl.value = data
// }
// ------bulk-sms-button------
const getCode = () => {
  return new Promise((resolve, reject) => {
    fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      resolve(data)
    })
    .catch(error => {
      reject(error)
    })
  })
}
const submit = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    },3000)
  })
}
</script>

<style scoped>

</style>
