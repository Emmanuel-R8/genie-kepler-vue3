import { GetterTree, MutationTree } from 'vuex'

import { map_settings } from '@/config'
import { StoreMutations } from '@/enums'
import { MapSetting, MapSettings } from '@/interfaces'

const {
  options: { bearing, bounds, center, pitch, style, zoom }
} = map_settings

const state: MapSettings = {
  mapSettings: {
    bearing,
    bounds,
    center,
    pitch,
    style,
    zoom
  }
}

type Mutations = {
  [StoreMutations.SET_MAP_SETTINGS](state: MapSettings, mapSettings: MapSetting): void
}

const mutations: MutationTree<MapSettings> & Mutations = {
  [StoreMutations.SET_MAP_SETTINGS](state, mapSettings) {
    state.mapSettings = { ...mapSettings }
  }
}

type Getters = {
  getMapSettings(state: MapSettings): MapSettings
}

const getters: GetterTree<MapSettings, MapSettings> & Getters = {
  getMapSettings(state) {
    return { ...state }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
