import bulkButton from './button'
import bulkSmsButton from './button/sms-button'
import bulkDebouncButton from './button/debounc-button'
import bulkPicturePlayer from './picture-player'
import bulkPictureClipping from './picture-clipping'
import bulkClippingTool from './picture-clipping/clipping-tool'

import bulkLoading from './loading'

// 导出组件
const components = [
  bulkButton,
  bulkSmsButton,
  bulkDebouncButton,
  bulkPicturePlayer,
  bulkPictureClipping,
  bulkClippingTool
]

// 定义 install 方法，接收 Vue 作为参数
const install = function (Vue) {
  // 判断是否安装，如果安装过直接返回
  if (install.installed) return
  install.installed = true

  // 遍历注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出 install 方法
export default {
  install
}

export {
  bulkLoading
}