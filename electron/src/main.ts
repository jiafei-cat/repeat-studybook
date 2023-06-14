import { createApp } from 'vue'
import './style.css'
import './renderer/assets/iconfont/iconFont.css'
import App from './App.vue'
import router from './renderer/router'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(router).mount('#app')
