//
// The routes are imported by `src/main.ts` (via importing `src/router/index.ts`.
//
// import GenieExampleView from '@/views/GenieExampleView'
import { createRouter, createWebHistory } from 'vue-router'

const Deckgl = () => import('@/views/DeckglView')
const Mapbox = () => import('@/views/MapboxView')

// Modif step 1: Local image
const LocalStaticImage = () => import('@/views/LocalStaticImageView')

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
        path: '/localstaticimage',
        name: 'genie_example',
        component: LocalStaticImage
    },
    {
        path: '/:pathMatch(.*)*',
        component: Mapbox
    }
]

export default createRouter({ history, routes })
