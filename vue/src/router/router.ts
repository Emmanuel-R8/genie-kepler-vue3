import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { Routes } from '@/enums'

const { DECKGL, MAPBOX } = Routes
const Deckgl = () => import('@/views/Deckgl')
const Mapbox = () => import('@/views/Mapbox')
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
const history = createWebHistory()
export default createRouter({ history, routes })
