import 'reflect-metadata'
import { createApp } from 'vue'

import App from './App'
import { router } from './router'
import './styles/index.scss'

createApp(App).use(router).mount('#app')
