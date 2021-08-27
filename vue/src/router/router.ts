//
// The routes are imported by `src/main.ts` (via importing `src/router/index.ts`.
//
// import GenieExampleView from '@/views/GenieExampleView'
import { createRouter, createWebHistory } from 'vue-router';

const Deckgl = () => import('../root_components/Deckgl_Root');
const Mapbox = () => import('../root_components/Mapbox_Root');

// Modif step 1: Local image
const LocalStaticImage = () => import('../root_components/LocalStaticImage_Root');

// TEMPLATE FOR ADDITIONAL ROUTE
// const Template = () => import('@/views/Template_Root_View')


const history = createWebHistory();
const routes = [
    {
        path: '/',
        name: 'localstaticimage',
        component: LocalStaticImage
    },
    {
        path: '/mapbox',
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
        component: LocalStaticImage
    }
];

export default createRouter({ history, routes });
