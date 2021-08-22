import GenieExampleView from '@/views/GenieExample'
import { createRouter, createWebHistory } from 'vue-router'

const Deckgl = () => import('@/views/Deckgl')
const Mapbox = () => import('@/views/Mapbox')
const GenieExample = () => import('@/views/GenieExample')

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
        path: '/genie_example',
        name: 'genie_example',
        component: GenieExample
    },
    {
        path: '/:pathMatch(.*)*',
        component: Mapbox
    }
]

export default createRouter({ history, routes })
