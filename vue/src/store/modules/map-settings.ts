import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'
import { GetterTree, MutationTree } from 'vuex'

import { ui } from '@/config'
import { StoreMutations } from '@/enums'
import { MapSettings } from '@/interfaces'

type State = {
  mapSettings: {
    bearing: number
    bounds: LngLatBoundsLike | null
    center: LngLatLike
    pitch: number
    style: string
    zoom: number
  }
}

const {
  settings: { bearing, bounds, center, pitch, style, zoom }
} = ui

const state: State = {
  mapSettings: {
    bearing,
    bounds,
    center: center as LngLatLike,
    pitch,
    style,
    zoom
  }
}

type Mutations = {
  [StoreMutations.SET_MAP_SETTINGS](state: State, mapSettings: MapSettings): void
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.SET_MAP_SETTINGS](state, mapSettings) {
    state.mapSettings = mapSettings
  }
}

type Getters = {
  getMapSettings(state: State['mapSettings']): State['mapSettings']
}

const getters: GetterTree<State['mapSettings'], State> & Getters = {
  getMapSettings(state) {
    return { ...state }
  }
}

type RouterModule = {
  namespaced: boolean
  state: State
  mutations: Mutations
  getters: Getters
}

const mapSettings: RouterModule = {
  namespaced: true,
  state,
  mutations,
  getters
}

export default mapSettings
