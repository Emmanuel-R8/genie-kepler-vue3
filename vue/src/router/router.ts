import { createRouter, createWebHistory, RouterHistory, RouteRecordRaw } from 'vue-router'

import { Routes } from '@/enums'
import { Deckgl, Mapbox } from '@/views'

const history: RouterHistory = createWebHistory()
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: Routes.MAPBOX,
    component: Mapbox
  },
  {
    path: '/deckgl',
    name: Routes.DECKGL,
    component: Deckgl
  },
  {
    path: '/:pathMatch(.*)*',
    name: Routes.MAPBOX,
    component: Mapbox
  }
]
export default createRouter({ history, routes })
