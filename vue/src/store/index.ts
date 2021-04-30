import { createLogger, createStore } from 'vuex'

import { layers, layerElements, mapSettings, mapStyles, markers } from './modules'

export default createStore<any>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: {
    layers,
    layerElements,
    mapSettings,
    mapStyles,
    markers
  }
})
