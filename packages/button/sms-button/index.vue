<template>
  <div class="bulk-sms-button">
    <bulk-button v-show="buttonShow" @click="getCode" v-bind="props">获取验证码</bulk-button>
    <bulk-button v-show="!buttonShow" v-bind="props" disabled>{{ buttonText }}</bulk-button>
  </div>
</template>

<script setup>
import { ref,defineProps } from 'vue'
import propsObj from '../common'
import bulkButton from '../index'


const props = defineProps({
  ...propsObj,
  cd: {
    type: Number,
    default: 60
  },
  request: {// 获取验证码的请求， 返回一个Promise
    type: Function,
    default: () => {}
  }
})
const buttonText = ref('')
const buttonShow = ref(true)
const getCode = async () => {
  const result = await props.request()
  if(result) {
    buttonText.value = `${props.cd}s后重新获取`
    buttonShow.value = false
    let time = props.cd
    const timer = setInterval(() => {
      time--
      buttonText.value = `${time}s后重新获取`
      if(time <= 0) {
        clearInterval(timer)
        buttonShow.value = true
        clearTimeout(timer)
      }
    },1000)
  }
}
</script>

<style scoped>

</style>