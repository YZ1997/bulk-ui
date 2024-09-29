import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import bulkUI from '../packages'
// import bulkUI from 'bulk-ui'
import 'bulk-ui/dist/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(ElementPlus)

app.mount('#app')
