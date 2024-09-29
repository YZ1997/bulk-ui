<template>
  <transition  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut">
    <div class="loading-container" v-if="show">
      <div class="mask" :style="{ opacity: opacity }" @click="clickMask"></div>
      <div class="loading">
        <div v-if="type == 'custom'" slot></div>
        <div v-else :class="type">
          <div class="front"></div>
          <div class="back"></div>
          <div class="top"></div>
          <div class="bottom"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
        <div class="text">{{msg}}</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted,toRefs,ref } from 'vue'
const props = defineProps({
  // 自动关闭时间 单位毫秒 0为不自动关闭
  autoClose: {
    type: Number,
    default: 0
  },
  // 蒙层透明度
  opacity: {
    type: Number,
    default: 0.5
  },
  // 是否点击蒙层关闭
  clickClose: {
    type: Boolean,
    default: false
  }
})

const show = ref(false)
const msg = ref('加载中...')
const type = ref('progress')//progress进度条  cube魔方  custom自定义
// 显示
const open = (options) => {
  options.msg?msg.value = options.msg:msg.value = '加载中...'
  options.type?type.value = options.type:type.value = 'progress'
  show.value = true
}
// 关闭
const close = (callback) => {
  show.value = false
  callback && setTimeout(() => {callback()}, 500)
}

defineExpose({
  open,
  close
})

//  点击蒙层关闭
const clickMask = () => {
  if (props.clickClose) {
    close()
  }
}

onMounted(() => {
  if (props.autoClose) {
    setTimeout(() => {
      close()
    }, props.autoClose)
  }
})

</script>

<style scoped>
.animate__animated animate__fadeIn {
  animation-duration: 0.3s;
}
.animate__animated animate__fadeOut {
  animation-duration: 0.3s;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 9999;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress {
  width: 50px;
  height: 50px;
  border: 4px solid #fff;
  border-top-color: #f00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* 魔方 */
.cube {
  width: 40px;
  height: 40px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate 3s linear infinite;
}

.cube div {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.8;
  border: 1px solid #ccc;
}

.cube .front {
  transform: translateZ(20px);
}

.cube .back {
  transform: translateZ(-20px) rotateY(180deg);
}

.cube .left {
  transform: translateX(-20px) rotateY(-90deg);
}

.cube .right {
  transform: translateX(20px) rotateY(90deg);
}

.cube .top {
  transform: translateY(-20px) rotateX(90deg);
}

.cube .bottom {
  transform: translateY(20px) rotateX(-90deg);
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
.text {
  margin-top: 12px;
  color: #fff;
  font-size: 16px;
}
</style>