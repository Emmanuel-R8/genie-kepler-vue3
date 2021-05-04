import { createLogger, createStore } from 'vuex'

import { layerElements, mapSettings, mapStyles, styleLayers } from './modules'

export default createStore<any>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: {
    layerElements,
    mapSettings,
    mapStyles,
    styleLayers
  }
})

/* Vuex 4 boilerplate using Vue3 and typed modules with TypeScript - credit Lucas Koury
 * https://gist.github.com/lucaska3/ad3e2a2a62533aa590784a0eff2bef17
 */
