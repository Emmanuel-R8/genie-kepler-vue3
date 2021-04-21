import { createRouter, createWebHistory, Router, RouterHistory } from 'vue-router'
import Mapbox from '@/views/Mapbox'

const history: RouterHistory = createWebHistory()

const routes: any[] = [
  {
    path: '/',
    name: 'mapbox',
    component: Mapbox
  }
]

const router: Router = createRouter({
  history,
  routes
})

export default router
