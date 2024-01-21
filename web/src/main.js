import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import pinia from "./store"
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(pinia).use(router).mount('#app')
