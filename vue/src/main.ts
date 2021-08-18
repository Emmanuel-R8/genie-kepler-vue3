// Required by `typestack/typedi` dependency injection package
// This is required to be _very first_ import of any app using `typestack/typed`
// See: https://docs.typestack.community/typedi/v/develop/01-getting-started
import 'reflect-metadata'

import { createApp } from 'vue'

import App from './App'
import { router } from './router'
import './styles/screen.css'

createApp(App).use(router).mount('#app')
