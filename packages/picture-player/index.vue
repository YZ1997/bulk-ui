<template>
  <div v-show="show" class="picture-player-container" @click="show = false">
    <div class="picture-player">
      <div class="prev" @click.stop="prev"></div>
      <div class="indicator" @click.stop="">
        <img :class="ctrl?'small':'big'" :src="imgs[currentIndex]" alt="">
      </div>
      <div class="next" @click.stop="next"></div>
    </div>
    <div class="preview-container" @click.stop="">
      <div class="preview">
        <div class="slider" :style="'transform: translateX(' + (-100 + currentIndex * 100) + '%)'" :class="sliderAnimation?'slider-animation':''"></div>
        <div class="preview-item" v-for="(item,index) in imgs" :key="item" @click="currentIndex = index">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {throttle} from '../utils'

const show = ref(false)
const currentIndex = ref(0)
const imgs = ref([])

// --------------------
// ----初始化&关闭-----
// --------------------
// 初始化
const install = (options = {}) => {
  imgs.value = options.imgs
  currentIndex.value = options.index?options.index:0
  resetScale()
  show.value = true
}
// 监听esc键，关闭图片预览
const handleEsc = (e) => {
  if (e.keyCode === 27) {
    show.value = false
  }
}
defineExpose({ install })
// 添加监听器
onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

// --------------------
// ------图片切换------
// --------------------
const sliderAnimation = ref(false)
// 切换图片前
const beforeChange = () => {
  resetScale()
  sliderAnimation.value = true
  setTimeout(() => {
    sliderAnimation.value = false
  },200)
}
// 点击按钮切换图片
const prev = () => {
  beforeChange()
  currentIndex.value--
  if (currentIndex.value < 0) {
    currentIndex.value = imgs.value.length - 1
  }
}
const next = () => {
  beforeChange()
  currentIndex.value++
  if (currentIndex.value > imgs.value.length - 1) {
    currentIndex.value = 0
  }
}
// 监听鼠标滚轮事件，切换图片
const handleWheel = throttle((e) => {
  beforeChange()
  if (e.deltaY > 0) {
    currentIndex.value++
  } else {
    currentIndex.value--
  }
  if (currentIndex.value < 0) {
    currentIndex.value = imgs.value.length - 1
  } else if (currentIndex.value > imgs.value.length - 1) {
    currentIndex.value = 0
  }
},400)
// 添加监听器
onMounted(() => {
  window.addEventListener('wheel', handleWheel)
})

// --------------------
// ------图片缩放------
// --------------------
// 监听ctrl键，修改光标样式
const ctrl = ref(false)
const handleKeydown = (e) => {
  ctrl.value = e.ctrlKey
}
// 监听松开ctrl键，修改光标样式
const handleKeyup = (e) => {
  ctrl.value = e.ctrlKey
}
// 监听鼠标左键点击事件
const scale = ref(1)
const handleMouseLeftClick = (e) => {
  if (ctrl.value) {
    // 如果ctrl键被按下，则缩小图片
    if(scale.value>1) scale.value-=0.5
  } else {
    // 否则，放大图片
    if(scale.value<3) scale.value+=0.5
  }
  e.target.style.transform = `scale(${scale.value})`
}
// 重置缩放比例
const resetScale = () => {
  scale.value = 1
  document.querySelector('.indicator img').style.transform = `scale(${scale.value})`
}
// 添加监听器
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
  document.querySelector('.indicator img').addEventListener('click', handleMouseLeftClick)
})
</script>

<style scoped>
.picture-player-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.picture-player {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prev {
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
  z-index: 1;
}
.prev::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  border-left: 2px solid rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%) rotate(-45deg);
}

.indicator {
  width: 50%;
  background-color: #ccc;
  border-radius: 50%;
}

.indicator img {
  width: 100%;
  display: block;
}

.indicator .big:hover{
  cursor: zoom-in;
}

.indicator .small:hover{
  cursor: zoom-out;
}

.next {
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 50%;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
}
/* 箭头 */
.next::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  border-right: 2px solid rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%) rotate(45deg);
}

.preview-container {
  position: fixed;
  bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.preview {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(225, 225, 225, 0.5);
  border-radius: 50px;
  padding: 10px 20px;
  position: relative;
  z-index: 0;
  overflow: hidden;
}

.slider {
  position: absolute;
  height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  z-index: -1;
  transition: all 0.4s ease-in-out;
}

.slider-animation {
  width: 100px;
}

.preview-item {
  width: 50px;
  height: 50px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
  cursor: pointer;
}

.preview-item:last-child {
  margin-right: 0;
}

.preview-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
</style>