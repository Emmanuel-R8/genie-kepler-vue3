import { GetterTree, MutationTree } from 'vuex'

import { mapSettings } from '@/config'
import { StoreMutations } from '@/enums'
import { MapSetting, MapSettings } from '@/interfaces'

const { settings } = mapSettings

const state: MapSettings = {
  mapSettings: settings
}

type Mutations = {
  [StoreMutations.SET_MAP_SETTINGS](state: MapSettings, mapSettings: MapSetting): void
}

const mutations: MutationTree<MapSettings> & Mutations = {
  [StoreMutations.SET_MAP_SETTINGS](state, mapSettings) {
    state.mapSettings = mapSettings
  }
}

type Getters = {
  getMapSettings(state: MapSettings): MapSettings['mapSettings']
}

const getters: GetterTree<MapSettings, MapSettings['mapSettings']> & Getters = {
  getMapSettings: (state) => state.mapSettings
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
