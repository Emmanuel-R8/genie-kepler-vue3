import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { Routes } from '@/enums'
import { Deckgl, Mapbox } from '@/views'

const { DECKGL, MAPBOX } = Routes
const history = createWebHistory()
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: MAPBOX,
    component: Mapbox
  },
  {
    path: '/deckgl',
    name: DECKGL,
    component: Deckgl
  },
  {
    path: '/:pathMatch(.*)*',
    name: MAPBOX,
    component: Mapbox
  }
]
export default createRouter({ history, routes })
