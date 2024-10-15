<template>
  <div class="bulk-button" :class="classList" :style="style">
    <div class="bulk-button-left">
      <slot name="left">
        <div v-if="loading" class="loading"><span></span></div>
      </slot>
    </div>
    <div v-if="!iconButton" class="bulk-button-right">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref,defineProps,watch } from 'vue'
import propsObj from './common'
import '../main.css'

const props = defineProps({
  ...propsObj
})

const classList = ref([
  props.size,
  props.type,
  props.borderButton?'bulk-button-border':'',
  props.disabled?'bulk-button-disabled':''
])

watch(()=>props.size,(newVal)=>{
  classList.value = classList.value.filter(item=>item!=='small'&&item!=='medium'&&item!=='large')
  classList.value.push(newVal)
})

watch(()=>props.type,(newVal)=>{
  classList.value = classList.value.filter(item=>item!=='primary'&&item!=='success'&&item!=='warning'&&item!=='danger'&&item!=='info')
  classList.value.push(newVal)
})

watch(()=>props.borderButton,(newVal)=>{
  if(newVal){
    classList.value.push('bulk-button-border')
  } else {
    classList.value = classList.value.filter(item=>item!=='bulk-button-border')
  }
})

watch(()=>props.disabled,(newVal)=>{
  if(newVal){
    classList.value.push('bulk-button-disabled')
  }else{
    classList.value = classList.value.filter(item=>item!=='bulk-button-disabled')
  }
})

const style = ref({
  width: Number.isNaN(Number(props.width)) ? props.width : `${props.width}px`,
  height: Number.isNaN(Number(props.height)) ? props.height : `${props.height}px`,
  background: props.background,
  color: props.color
})

watch(()=>props.width,(newVal)=>{
  style.value.width = Number.isNaN(Number(newVal)) ? newVal : `${newVal}px`
})

watch(()=>props.height,(newVal)=>{
  style.value.height = Number.isNaN(Number(newVal)) ? newVal : `${newVal}px`
})

watch(()=>props.background,(newVal)=>{
  style.value.background = newVal
})

watch(()=>props.color,(newVal)=>{
  style.value.color = newVal
})
</script>

<style scoped>
.bulk-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 14px;
  user-select: none;
}
.bulk-button:active {
  opacity: 0.8;
}
.bulk-button-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.bulk-button-disabled:active {
  opacity: 0.6;
}
.bulk-button .loading {
  padding: 6px 0 6px 10px;
  margin-right: -8px;
}
.mini .loading {
  padding: 3px 0 3px 6px;
  margin-right: -4px;
}
.bulk-button .loading span {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.mini .loading span {
  width: 14px;
  height: 14px;
}
.bulk-button-border .loading span {
  border: 2px solid var(--primary-color-opacity);
  border-top-color: var(--primary-color);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.bulk-button .bulk-button-right {
  flex: 1;
  text-align: center;
  padding: 6px 18px;
}
.mini {
  font-size: 12px;
}
.mini .bulk-button-right {
  padding: 3px 10px;
}

.primary {
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: white;
}
.primary.bulk-button-border {
  background: transparent;
  color: var(--primary-color);
}
.success {
  border: 1px solid var(--success-color);
  background-color: var(--success-color);
  color: white;
}
.success.bulk-button-border {
  background: transparent;
  color: var(--success-color);
}
.warning {
  border: 1px solid var(--warning-color);
  background-color: var(--warning-color);
  color: white;
}
.warning.bulk-button-border {
  background: transparent;
  color: var(--warning-color);
}
.danger {
  border: 1px solid var(--danger-color);
  background-color: var(--danger-color);
  color: white;
}
.danger.bulk-button-border {
  background: transparent;
  color: var(--danger-color);
}
.info {
  border: 1px solid var(--info-color);
  background-color: var(--info-color);
  color: white;
}
.info.bulk-button-border {
  background: transparent;
  color: var(--info-color);
}
</style>