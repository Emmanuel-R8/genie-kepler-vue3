import { createStore } from 'vuex'
import mapSettings from './modules/map-settings'

export default createStore({
  modules: {
    mapSettings
  }
})
