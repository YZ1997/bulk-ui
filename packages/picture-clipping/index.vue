<template>
  <div>
    <input class="clipping-choose" type="button" :value="value" @click="toChoosePicture">
    <input type="file" id="file" accept="image/*" @change="choosePicture">
    <bulk-clipping-tool ref="clippingImg" :width="width" :height="height" @confirm="getImgUrl" />
    <!-- <img :src="imgUrl" alt=""> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import clippingTool from './clipping-tool'
import { fileToBase64 } from '../utils'

const props = defineProps({
  value: {
    type: String,
    default: '选取图片'
  },
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 300
  }
})

const clippingImg = ref(null)
const imgUrl = ref('')
const toChoosePicture = () => {
  // 触发file的点击事件
  document.getElementById('file').click()
}
const choosePicture = async () => {
  // 获取file的值
  const file = document.getElementById('file').files[0]
  // 将file转换为base64
  const base64 = await fileToBase64(file)
  document.getElementById('file').value = ''
  // 初始化裁剪工具
  clippingImg.value.install(base64)
}
// 获取裁剪后的图片并返回
const emit = defineEmits(['confirm'])
const getImgUrl = (url) => {
  // imgUrl.value = url
  emit('confirm', url)
}


</script>

<style scoped>
.clipping-choose {
  background-color: #409eff;
  color: #ffffff;
  border: none;
  padding: 6px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
#file {
  display: none;
}
</style>