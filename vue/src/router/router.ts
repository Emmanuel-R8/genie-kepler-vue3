//
// The routes are imported by `src/main.ts` (via importing `src/router/index.ts`.
//
// import GenieExampleView from '@/views/GenieExampleView'
import { createRouter, createWebHistory } from 'vue-router'

const Deckgl = () => import('../root_views/Deckgl_Root_View')
const Mapbox = () => import('../root_views/Mapbox_Root_View')

// TEMPLATE FOR ADDITIONAL ROUTE
// const Template = () => import('@/views/Template_Root_View')

// Modif step 1: Local image
const LocalStaticImage = () => import('../root_views/LocalStaticImage_Root_View')

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
        name: 'localstaticimage',
        component: LocalStaticImage
    },
    {
        path: '/:pathMatch(.*)*',
        component: Mapbox
    }
]

export default createRouter({ history, routes })
