import { createRouter, createWebHistory } from 'vue-router'

const Deckgl = () => import('@/views/Deckgl')
const Mapbox = () => import('@/views/Mapbox')
const history = createWebHistory()
const routes = [
    {
        path: '/',
        name: 'mapbox',
        component: Mapbox
    },
    {
        path: '/deckgl',
        name: 'deckgl',
        component: Deckgl
    },
    {
        path: '/:pathMatch(.*)*',
        component: Mapbox
    }
]

export default createRouter({ history, routes })
