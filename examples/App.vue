<script setup>
import { ref } from 'vue'
// import { bulkLoading } from 'bulk-ui'
// import { bulkLoading } from '../packages'
// let loading = bulkLoading({msg: '拼命加载中'})
// setTimeout(() => {
//     loading.close(() => {
//       let loading2 = bulkLoading({msg: '客官稍等'})
//     })
//   }, 2000)

// const imgs = ref([
//   'https://files.catbox.moe/9svvu5.jpg', 
//   'https://gitee.com/wuyizhou/photo-bed/raw/master/172586024600920200811120122909.jpg', 
//   'https://gitee.com/wuyizhou/photo-bed/raw/master/1725849881998%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230110153902.jpg'
// ])
// const imgPlayer = ref(null)
// const openImgPlayer = () => {
//   imgPlayer.value.install({imgs:imgs.value,index:1})
// }
const imgUrl = ref('')
const getImg = (data) => {
  imgUrl.value = data
}
</script>

<template>
  <!-- <div>
    <input type="button" value="图片预览" @click="openImgPlayer">
  </div>
  <bulk-picture-player ref="imgPlayer" /> -->
  <bulk-picture-clipping ref="imgClipping" value="裁剪图片" @confirm="getImg" />
  <img :src="imgUrl" alt="">
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
