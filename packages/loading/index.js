import {createVNode,render} from 'vue'
import Loading from './index.vue'

// 使用vue底层的createVNode方法将组件渲染为虚拟节点
const VNode = createVNode(Loading)
// 使用render函数将组件挂载到body中
render(VNode, document.body)
const bulkLoading = (options) => {
  if(document.querySelector('.loading-container')) return
  VNode.component.exposed.open(options)
  VNode.component.exposed.open(options)
  return VNode.component.exposed
}

export default bulkLoading