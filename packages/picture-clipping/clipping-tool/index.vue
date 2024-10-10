<template>
  <div v-show="show" class="clipping-tool-container">
    <div class="clipping-tool-main">
      <div class="clipping-tool" :style="'width:' + width + 'px;height:' + height + 'px'">
        <canvas id="clipping-canvas"></canvas>
        <div class="mask"></div>
      </div>
      <!-- <div class="clipping-tool-preview"></div> -->
       <div class="clipping-tool-button">
        <input class="confirm" @click="confirm" type="button" value="确认" />
        <input class="cancel" @click="close" type="button" value="取消" />
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const props = defineProps({
  width: {// 裁剪框宽度
    type: Number,
    default: 300
  },
  height: {// 裁剪框高度
    type: Number,
    default: 300
  },
  clippingWidth: {// 裁剪目标宽度
    type: Number,
    default: 300
  },
  clippingHeight: {// 裁剪目标高度
    type: Number,
    default: 300
  }
})

const show = ref(false)
const imgUrl = ref('')
const cropWidth = ref(props.width)
const cropHeight = ref(props.height)
const canvasTop = ref(0)
const canvasLeft = ref(0)
// 初始化
const install = (url) => {
  imgUrl.value = url
  cropWidth.value = props.width
  cropHeight.value = props.height
  canvasTop.value = 0
  canvasLeft.value = 0
  scale.value = 1
  var canvas = document.getElementById('clipping-canvas')
  canvas.style.left = '0px'
  canvas.style.top = '0px'
  show.value = true
  cropImage(imgUrl.value)
}

// 生成裁剪工具
const cropImage = async (imgUrl) => {
  var canvas = document.getElementById('clipping-canvas')
  var ctx = canvas.getContext('2d')
  var image = new Image()
  image.src = imgUrl
  
  image.onload = function(){
    if (image.width > image.height) {
      cropWidth.value = cropHeight.value * (image.width / image.height)
      if (cropWidth.value < props.width) {
        cropWidth.value = props.width
        cropHeight.value = cropWidth.value * (image.height / image.width)
      }
    } else {
      cropHeight.value = cropWidth.value * (image.height / image.width)
      if (cropHeight.value < props.height) {
        cropHeight.value = props.height
        cropWidth.value = cropHeight.value * (image.width / image.height)
      }
    }
    canvas.width = cropWidth.value
    canvas.height = cropHeight.value
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, cropWidth.value, cropHeight.value)
  }
}

// 关闭裁剪工具
const close = () => {
  show.value = false
}

// 确认裁剪
const emit = defineEmits(['confirm'])
const confirm = () => {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var image = new Image()
  image.src = imgUrl.value
  image.onload = function() {
    canvas.width = props.width
    canvas.height = props.height
    console.log(Math.abs(canvasLeft.value), cropWidth.value)
    let x = Math.abs(canvasLeft.value)/(cropWidth.value*scale.value)*image.width
    let y = Math.abs(canvasTop.value)/(cropHeight.value*scale.value)*image.height
    let cw = cropWidth.value*scale.value
    let ch = cropHeight.value*scale.value
    // var centerX = canvas.width / 2
    // var centerY = canvas.height / 2
    // ctx.save()
    // ctx.translate(centerX, centerY)
    // ctx.rotate(Math.PI / 4)
    // ctx.translate(-centerX, -centerY)
    ctx.drawImage(image, x, y, image.width,image.height, 0, 0, cw, ch)
    // ctx.restore()
    var dataURL = canvas.toDataURL('image/png')
    emit('confirm', dataURL)
    close()
  }
}

// 监听鼠标滚轮事件，改变canvas大小
const scale = ref(1)
const handleMouseWheel = (event) => {
  const clippingTool = document.querySelector('.clipping-tool')
  clippingTool.addEventListener('wheel', function(event) {
    event.preventDefault()
    var canvas = document.getElementById('clipping-canvas')
    var ctx = canvas.getContext('2d')
    var image = new Image()
    image.src = imgUrl.value
    scale.value = scale.value + event.deltaY * -0.001
    if(scale.value < 1) scale.value = 1
    if(scale.value > 3) scale.value = 3
    var newWidth = cropWidth.value * scale.value
    var newHeight = cropHeight.value * scale.value
    // 判断画布位置，如果超出画布范围，则将画布位置重置到画布中心
    if(Math.abs(canvasLeft.value - props.width) > newWidth) {
      canvasLeft.value = props.width - newWidth
      canvas.style.left = canvasLeft.value + 'px'
    }
    if(Math.abs(canvasTop.value - props.height) > newHeight) {
      canvasTop.value = props.height - newHeight
      canvas.style.top = canvasTop.value + 'px'
    }
    canvas.width = newWidth
    canvas.height = newHeight
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight)
  })
}
onMounted(() => { handleMouseWheel() })

// 监听鼠标拖拽事件，改变canvas位置
const handleMouseDown = () => {
  const clippingTool = document.querySelector('.clipping-tool')
  clippingTool.addEventListener('mousedown', (event) => {
    event.preventDefault()
    var canvas = document.getElementById('clipping-canvas')
    var startX = event.clientX
    var startY = event.clientY
    var isDragging = true
    clippingTool.addEventListener('mousemove', (event) => {
      if (isDragging) {
        // 如果鼠标移出clippingTool，则停止拖拽并 移除事件监听器
        if (event.clientX < clippingTool.offsetLeft || event.clientX > clippingTool.offsetLeft + clippingTool.offsetWidth || event.clientY < clippingTool.offsetTop || event.clientY > clippingTool.offsetTop + clippingTool.offsetHeight) {
          isDragging = false
          return
        }
        var deltaX = event.clientX - startX
        var deltaY = event.clientY - startY
        startX = event.clientX
        startY = event.clientY
        let canvasX = canvasLeft.value + deltaX
        let canvasY = canvasTop.value + deltaY
        if(canvasX > 0) canvasX = 0
        if(canvasY > 0) canvasY = 0
        if(canvasX < -canvas.width + props.width) canvasX = -canvas.width + props.width
        if(canvasY < -canvas.height + props.height) canvasY = -canvas.height + props.height
        canvasLeft.value = canvasX
        canvasTop.value = canvasY
        canvas.style.left = canvasLeft.value + 'px'
        canvas.style.top = canvasTop.value + 'px'
      }
    })
    clippingTool.addEventListener('mouseup', function(event) {
      isDragging = false
    })
  })
}
onMounted(() => { handleMouseDown() })

// 暴露给外部使用
defineExpose({
  install
})
</script>

<style scoped>
.clipping-tool-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.clipping-tool-main {
  background-color: #ffffff;
  padding: 30px;
}
.clipping-tool-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.clipping-tool-button input {
  padding: 5px 12px;
  margin-left: 10px;
  cursor: pointer;
}
.clipping-tool-button .confirm {
  border: none;
  background-color: #409eff;
  color: #ffffff;
}
.clipping-tool-button .cancel {
  border: 1px solid #409eff;
  background-color: transparent;
  color: #409eff;
}
.clipping-tool {
  overflow: hidden;
  position: relative;
}
.clipping-tool canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.clipping-tool .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: grab;
}
.clipping-tool .mask:active {
  cursor: grabbing;
}
.clipping-tool .mask::after {
  content: '';
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  border: 1px dashed #ffffff;
}
</style>