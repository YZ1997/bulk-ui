<template>
  <div>
    <bulk-button :loading="myloading" :disabled="myloading" @click="handleClick">
      <slot></slot>
    </bulk-button>
  </div>
</template>

<script setup>
import { ref,defineProps } from 'vue'
import {loadingObj} from '../common'
import bulkButton from '../index'
const props = defineProps({
  ...loadingObj,
  request: {// 获取验证码的请求， 返回一个Promise
    type: Function,
    default: () => {}
  }
})

const myloading = ref(false)
const handleClick = async () => {
  if(myloading.value) return
  myloading.value = true
  try {
    await props.request()
  } finally {
    console.log('finally')
    myloading.value = false
  }
}
</script>

<style scoped>

</style>