import { createRouter, createWebHistory } from 'vue-router'

import { Routes } from '@/enums'

const { DECKGL, MAPBOX } = Routes
const Deckgl = () => import('@/views/Deckgl')
const Mapbox = () => import('@/views/Mapbox')
const history = createWebHistory()
const routes = [
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
