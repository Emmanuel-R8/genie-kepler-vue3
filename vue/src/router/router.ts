import { createRouter, createWebHistory, RouterHistory } from 'vue-router'

import { Routes } from '@/enums'
import { Deckgl, Mapbox } from '@/views'

const history: RouterHistory = createWebHistory()
const routes: any[] = [
  {
    path: '/',
    name: Routes.MAPBOX,
    component: Mapbox
  },
  {
    path: '/deckgl',
    name: Routes.DECKGL,
    component: Deckgl
  }
]
export default createRouter({ history, routes })
