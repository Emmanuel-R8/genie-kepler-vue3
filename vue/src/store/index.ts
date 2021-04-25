import { createLogger, createStore } from 'vuex'

import { layers, mapSettings, markers } from './modules'

export default createStore<any>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: {
    layers,
    mapSettings,
    markers
  }
})
