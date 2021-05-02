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
