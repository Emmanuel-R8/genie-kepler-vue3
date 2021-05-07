import { createRouter, createWebHistory, RouterHistory } from 'vue-router'

import { Deckgl, Mapbox } from '@/views'

const history: RouterHistory = createWebHistory()
const routes: any[] = [
  {
    path: '/',
    name: 'mapbox',
    component: Mapbox
  },
  {
    path: '/deckgl',
    name: 'deckgl',
    component: Deckgl
  }
]
export default createRouter({ history, routes })
