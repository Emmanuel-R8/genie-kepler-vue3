import 'reflect-metadata'
import { createApp } from 'vue'

import App from './App'
import { router } from './router'
import './styles/screen.css'

createApp(App).use(router).mount('#app')
