import { createRouter, createWebHistory, RouterHistory } from 'vue-router'

import { Mapbox } from '@/views'

const history: RouterHistory = createWebHistory()
const routes: any[] = [
  {
    path: '/',
    name: 'mapbox',
    component: Mapbox
  }
]

export default createRouter({ history, routes })
