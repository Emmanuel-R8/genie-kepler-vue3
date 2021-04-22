import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import './styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
