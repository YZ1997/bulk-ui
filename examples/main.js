import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import bulkUI from '../packages'

// import bulkUI from '../dist/bulk-ui.es.js'
// import '../dist/style.css'

import bulkUI from 'bulk-ui'
import 'bulk-ui/dist/style.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(bulkUI)

app.mount('#app')
